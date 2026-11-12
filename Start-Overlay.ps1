param([ValidateRange(1024,65535)][int]$Port = 8765)
# Local-only static host + private overlay snapshot relay. Windows PowerShell 5.1+.
$ErrorActionPreference = 'Stop'
$Root = [IO.Path]::GetFullPath($PSScriptRoot)
$BaseUrl = 'http://127.0.0.1:' + $Port
function New-PrivateKey {
    $bytes = New-Object byte[] 32
    $rng = [Security.Cryptography.RandomNumberGenerator]::Create()
    try { $rng.GetBytes($bytes) } finally { $rng.Dispose() }
    return [BitConverter]::ToString($bytes).Replace('-','').ToLowerInvariant()
}
$script:WriterKey = New-PrivateKey
$script:ViewerKey = New-PrivateKey
$script:Snapshot = $null
$script:Revision = 0
$script:ViewerLink = $BaseUrl + '/overlay.html#view=' + $script:ViewerKey
function Key-Matches([string]$Provided,[string]$Expected) {
    if ($Provided.Length -ne 64) { return $false }
    $difference = 0
    for ($i = 0; $i -lt 64; $i++) { $difference = $difference -bor ([int][char]$Provided[$i] -bxor [int][char]$Expected[$i]) }
    return $difference -eq 0
}
function Write-Reply($Stream,[int]$Status,[string]$Type,[byte[]]$Body,[bool]$ProtectAdmin = $false) {
    $labels = @{200='OK';204='No Content';400='Bad Request';401='Unauthorized';403='Forbidden';404='Not Found';405='Method Not Allowed';413='Payload Too Large';415='Unsupported Media Type';503='Service Unavailable'}
    $head = "HTTP/1.1 $Status $($labels[$Status])`r`nContent-Type: $Type`r`nContent-Length: $($Body.Length)`r`nConnection: close`r`nCache-Control: no-store`r`nX-Content-Type-Options: nosniff`r`nReferrer-Policy: no-referrer`r`n"
    if ($ProtectAdmin) { $head += "X-Frame-Options: DENY`r`nContent-Security-Policy: frame-ancestors 'none'`r`n" }
    $bytes = [Text.Encoding]::ASCII.GetBytes($head + "`r`n")
    $Stream.Write($bytes,0,$bytes.Length)
    if ($Body.Length -gt 0) { $Stream.Write($Body,0,$Body.Length) }
    $Stream.Flush()
}
function Reply-Text($Stream,[int]$Status,[string]$Text) {
    Write-Reply $Stream $Status 'application/json; charset=utf-8' ([Text.Encoding]::UTF8.GetBytes($Text))
}
function Select-OverlayFields($Value,[string[]]$Fields) {
    $result = [ordered]@{}
    foreach ($field in $Fields) { $result[$field] = $Value.$field }
    return $result
}
function Handle-Request($Stream) {
    # Parse a bounded HTTP/1.1 request. No chunked bodies, keep-alive or proxying.
    $header = New-Object Collections.Generic.List[byte]
    while ($true) {
        $next = $Stream.ReadByte()
        if ($next -lt 0) { return }
        $header.Add([byte]$next)
        $n = $header.Count
        if ($n -gt 16384) { Reply-Text $Stream 413 '{"error":"Headers too large"}'; return }
        if ($n -ge 4 -and $header[$n-4] -eq 13 -and $header[$n-3] -eq 10 -and $header[$n-2] -eq 13 -and $header[$n-1] -eq 10) { break }
    }
    $lines = [Text.Encoding]::ASCII.GetString($header.ToArray()).Split(@("`r`n"),[StringSplitOptions]::None)
    $request = $lines[0].Split(' ')
    if ($request.Length -ne 3 -or $request[2] -ne 'HTTP/1.1' -or $request[1].Length -gt 2048 -or -not $request[1].StartsWith('/')) { Reply-Text $Stream 400 '{"error":"Invalid request"}'; return }
    $method = $request[0]; $headers = @{}
    for ($i = 1; $i -lt $lines.Length; $i++) {
        if ($lines[$i] -eq '') { continue }
        $colon = $lines[$i].IndexOf(':')
        if ($colon -lt 1) { Reply-Text $Stream 400 '{"error":"Invalid header"}'; return }
        $key = $lines[$i].Substring(0,$colon).Trim()
        if ($headers.ContainsKey($key)) { Reply-Text $Stream 400 '{"error":"Duplicate header"}'; return }
        $headers[$key] = $lines[$i].Substring($colon+1).Trim()
    }
    # Reject DNS rebinding/alternate hostnames and cross-site browser calls.
    if ($headers['Host'] -cne ('127.0.0.1:' + $Port)) { Reply-Text $Stream 403 '{"error":"Invalid host"}'; return }
    if ($headers.ContainsKey('Origin') -and $headers['Origin'] -cne $BaseUrl) { Reply-Text $Stream 403 '{"error":"Cross-origin requests denied"}'; return }
    if ($headers['Sec-Fetch-Site'] -eq 'cross-site' -and ($method -ne 'GET' -or $request[1].StartsWith('/api/'))) { Reply-Text $Stream 403 '{"error":"Cross-site requests denied"}'; return }
    if ($headers.ContainsKey('Transfer-Encoding')) { Reply-Text $Stream 400 '{"error":"Chunked requests unsupported"}'; return }
    [int]$length = 0
    if ($headers.ContainsKey('Content-Length') -and (-not [int]::TryParse($headers['Content-Length'],[ref]$length) -or $length -lt 0)) { Reply-Text $Stream 400 '{"error":"Invalid length"}'; return }
    if ($length -gt 8000000) { Reply-Text $Stream 413 '{"error":"Body too large"}'; return }
    $path = [Uri]::UnescapeDataString($request[1].Split('?')[0])
    $authorization = [string]$headers['Authorization']
    $token = ''
    if ($authorization.StartsWith('Bearer ',[StringComparison]::Ordinal)) { $token = $authorization.Substring(7) }
    if ($path -eq '/api/overlay-link' -and $method -eq 'GET') {
        if (-not (Key-Matches $token $script:WriterKey)) { Reply-Text $Stream 401 '{"error":"Writer key required"}'; return }
        Reply-Text $Stream 200 ('{"url":"' + $script:ViewerLink + '"}'); return
    }
    if ($path -eq '/api/state' -and $method -eq 'GET') {
        if (-not (Key-Matches $token $script:ViewerKey)) { Reply-Text $Stream 401 '{"error":"Viewer key required"}'; return }
        if ($null -eq $script:Snapshot) { Reply-Text $Stream 503 '{"error":"Waiting for dashboard"}'; return }
        Reply-Text $Stream 200 ('{"revision":' + $script:Revision + ',"state":' + $script:Snapshot + '}'); return
    }
    if ($path -eq '/api/state' -and $method -eq 'PUT') {
        if (-not (Key-Matches $token $script:WriterKey)) { Reply-Text $Stream 401 '{"error":"Writer key required"}'; return }
        if ($headers['Origin'] -cne $BaseUrl) { Reply-Text $Stream 403 '{"error":"Local dashboard origin required"}'; return }
        if ($length -lt 2 -or $headers['Content-Type'] -notmatch '^application/json(?:;|$)') { Reply-Text $Stream 415 '{"error":"JSON body required"}'; return }
        $body = New-Object byte[] $length; $received = 0
        while ($received -lt $length) {
            $read = $Stream.Read($body,$received,$length-$received)
            if ($read -eq 0) { Reply-Text $Stream 400 '{"error":"Incomplete body"}'; return }
            $received += $read
        }
        try {
            $json = [Text.Encoding]::UTF8.GetString($body)
            if ($json.Length -gt 4000000) { Reply-Text $Stream 413 '{"error":"State too large"}'; return }
            $data = ConvertFrom-Json -InputObject $json -ErrorAction Stop
            if ($data.version -ne 1 -or @($data.teams).Count -ne 2 -or $data.lang -notin @('en','he')) { throw 'Invalid state' }
            # Only rendering fields cross the application boundary. No replay keys/session info.
            $teams = @(foreach ($team in $data.teams) {
                $selected = Select-OverlayFields $team @('id','name','en','he','photo','color','color2','x','y','zoom','score')
                $selected['start'] = 0
                $selected['gifts'] = @(foreach ($gift in $team.gifts) { Select-OverlayFields $gift @('id','points') })
                $selected
            })
            $custom = @(foreach ($gift in $data.custom) { Select-OverlayFields $gift @('id','name','coins','image') })
            $events = @(foreach ($event in $data.events) { Select-OverlayFields $event @('giftId','sender','delta','points','team','time','simulated') })
            $match = $null
            if ($null -ne $data.match) { $match = Select-OverlayFields $data.match @('mode','duration','round','remainingMs','deadline','phase','roundWinner','winner'); $match['wins'] = Select-OverlayFields $data.match.wins @('a','b') }
            $safe = [ordered]@{version=1;match=$match;lang=$data.lang;title=$data.title;brand=$data.brand;instructions=$data.instructions;logo=$data.logo;animations=$data.animations;running=$data.running;finished=$data.finished;appearance=$data.appearance;teams=$teams;custom=$custom;events=$events;seen=@();combos=@{};connection=@{session='overlay'}}
            $snapshot = ConvertTo-Json -InputObject $safe -Depth 30 -Compress
            if ($snapshot -cne $script:Snapshot) { $script:Snapshot = $snapshot; $script:Revision++ }
            Reply-Text $Stream 200 '{"saved":true}'; return
        } catch { Reply-Text $Stream 400 '{"error":"Invalid snapshot"}'; return }
    }
    if ($path.StartsWith('/api/')) { Reply-Text $Stream 405 '{"error":"Method or endpoint not allowed"}'; return }
    if ($method -ne 'GET' -or $length -ne 0) { Reply-Text $Stream 405 '{"error":"GET only"}'; return }
    if ($path -eq '/') { $path = '/admin.html' }
    $allowed = @('/admin.html','/index.html','/overlay.html','/core.js','/admin.js','/display.js','/tikfinity.js','/relay.js','/overlay.js','/style.css','/catalog.json')
    if ($path -notin $allowed -and $path -notmatch '^/assets/gifts/[0-9]{1,20}\.webp$') { Reply-Text $Stream 404 '{"error":"Not found"}'; return }
    $file = Join-Path $Root $path.TrimStart('/')
    if (-not [IO.File]::Exists($file)) { Reply-Text $Stream 404 '{"error":"Not found"}'; return }
    $types = @{'.html'='text/html; charset=utf-8';'.js'='application/javascript; charset=utf-8';'.css'='text/css; charset=utf-8';'.json'='application/json; charset=utf-8';'.webp'='image/webp'}
    Write-Reply $Stream 200 $types[[IO.Path]::GetExtension($file)] ([IO.File]::ReadAllBytes($file)) ($path -eq '/admin.html')
}
$operationLock = $null
try { $operationLock = [IO.File]::Open((Join-Path $Root '.battle-operation.lock'),[IO.FileMode]::OpenOrCreate,[IO.FileAccess]::ReadWrite,[IO.FileShare]::None) }
catch { throw 'An updater or another launcher is using this game folder. Close it and try again.' }
$listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback,$Port)
try {
    $listener.Start()
    Write-Host ('Private overlay relay running on this PC (port ' + $Port + '). Keep this window open. Ctrl+C stops it.')
    Write-Host 'Opening the local dashboard. Use its Copy private overlay link button for LIVE Studio.'
    try { Start-Process ($BaseUrl + '/admin.html#writer=' + $script:WriterKey) } catch { throw 'Browser launch failed. Check your default browser and restart the launcher. Private keys were not printed.' }
    while ($true) {
        $client = $listener.AcceptTcpClient()
        try {
            $client.ReceiveTimeout = 3000; $client.SendTimeout = 3000
            $stream = $client.GetStream()
            try { Handle-Request $stream } catch { try { Reply-Text $stream 400 '{"error":"Request rejected"}' } catch {} }
        } finally { $client.Dispose() }
    }
} finally { $listener.Stop(); $script:Snapshot = $null; $script:WriterKey = ''; $script:ViewerKey = ''; if ($operationLock) { $operationLock.Dispose() } }
