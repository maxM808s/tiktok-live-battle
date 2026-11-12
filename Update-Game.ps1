param([switch]$Restore)
$ErrorActionPreference = 'Stop'
# Updates only known application files. Settings remain in browser storage.
function Test-ManagedPath([string]$Path) {
    return ($Path -cin @('admin.html','index.html','overlay.html','admin.js','core.js','display.js','overlay.js','relay.js','tikfinity.js','style.css','catalog.json','Start-Overlay.cmd','Start-Overlay.ps1','Update-Game.cmd','Update-Game.ps1','Restore-Game.cmd','README.md','SECURITY.md','DEPLOY.md','.nojekyll','docs/OVERLAY.md','docs/TIKFINITY.md','docs/TECHNICAL.md') -or $Path -cmatch '^assets/gifts/[0-9]{1,20}\.webp$')
}
function Get-ManagedPaths([string]$Root) {
    if (-not (Test-Path -LiteralPath $Root)) { return @() }
    return @(Get-ChildItem -LiteralPath $Root -Recurse -File -Force | ForEach-Object {
        $relative = $_.FullName.Substring($Root.Length).TrimStart([char[]]@('/','\')).Replace('\','/')
        if (Test-ManagedPath $relative) { $relative }
    })
}
function Copy-ManagedFile([string]$From,[string]$To) {
    [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($To)) | Out-Null
    [IO.File]::Copy($From,$To,$true)
}
function Test-TrustedUpdateUrl([string]$Url) {
    try {
        $uri = [Uri]$Url
        if ($uri.Scheme -cne 'https' -or $uri.Port -ne 443 -or $uri.UserInfo -or $uri.Query -or $uri.Fragment) { return $false }
        return ($Url -ceq 'https://api.github.com/repos/maxM808s/tiktok-live-battle/commits/main' -or $Url -cmatch '^https://github\.com/maxM808s/tiktok-live-battle/archive/[a-f0-9]{40}\.zip$' -or $Url -cmatch '^https://codeload\.github\.com/maxM808s/tiktok-live-battle/zip/[a-f0-9]{40}$')
    } catch { return $false }
}
function Assert-NativeScriptsUnchanged([string]$Root,[string]$Stage) {
    foreach ($file in @('Start-Overlay.cmd','Start-Overlay.ps1','Update-Game.cmd','Update-Game.ps1','Restore-Game.cmd')) {
        $installed = Join-Path $Root $file; $downloaded = Join-Path $Stage $file
        if (-not (Test-Path -LiteralPath $installed) -or (Get-FileHash -LiteralPath $installed -Algorithm SHA256).Hash -cne (Get-FileHash -LiteralPath $downloaded -Algorithm SHA256).Hash) {
            throw 'This update changes Windows launch/update scripts. No files were installed. Review the GitHub changes and use a reviewed package for this update.'
        }
    }
}
function Save-TrustedDownload([string]$Url,[string]$Destination,[long]$Limit) {
    if (-not (Test-TrustedUpdateUrl $Url)) { throw 'Untrusted update download address.' }
    Add-Type -AssemblyName System.Net.Http
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $handler = [Net.Http.HttpClientHandler]::new(); $handler.AllowAutoRedirect = $false
    $client = [Net.Http.HttpClient]::new($handler)
    $client.Timeout = [TimeSpan]::FromSeconds(120)
    $client.DefaultRequestHeaders.UserAgent.ParseAdd('BattleStudio-Updater/1.0')
    $cancel = [Threading.CancellationTokenSource]::new(); $cancel.CancelAfter(120000)
    $response = $null; $inputStream = $null; $outputStream = $null
    try {
        for ($hop = 0; $hop -le 3; $hop++) {
            if (-not (Test-TrustedUpdateUrl $Url)) { throw 'Untrusted update redirect.' }
            $response = $client.GetAsync($Url,[Net.Http.HttpCompletionOption]::ResponseHeadersRead,$cancel.Token).GetAwaiter().GetResult()
            if ([int]$response.StatusCode -notin @(301,302,303,307,308)) { break }
            if ($hop -eq 3 -or -not $response.Headers.Location) { throw 'Too many or invalid update redirects.' }
            $Url = ([Uri]::new([Uri]$Url,$response.Headers.Location)).AbsoluteUri
            $response.Dispose(); $response = $null
        }
        $response.EnsureSuccessStatusCode() | Out-Null
        if ($response.Content.Headers.ContentLength -gt $Limit) { throw 'Download too large.' }
        $inputStream = $response.Content.ReadAsStreamAsync().GetAwaiter().GetResult()
        $outputStream = [IO.File]::Create($Destination)
        $buffer = New-Object byte[] 65536; [long]$total = 0
        while (($read = $inputStream.ReadAsync($buffer,0,$buffer.Length,$cancel.Token).GetAwaiter().GetResult()) -gt 0) {
            $total += $read
            if ($total -gt $Limit) { throw 'Download too large.' }
            $outputStream.Write($buffer,0,$read)
        }
    } finally {
        if ($outputStream) { $outputStream.Dispose() }; if ($inputStream) { $inputStream.Dispose() }
        if ($response) { $response.Dispose() }; $client.Dispose(); $cancel.Dispose()
    }
}
function Expand-GameArchive([string]$Zip,[string]$Stage,[string]$ExpectedSha) {
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $archive = [IO.Compression.ZipFile]::OpenRead($Zip)
    try {
        if ($archive.Entries.Count -gt 6000) { throw 'Too many archive entries.' }
        $roots = @{}; $paths = @{}; [long]$total = 0
        foreach ($entry in $archive.Entries) {
            $parts = $entry.FullName.Split('/')
            if ($parts.Length -lt 2 -or $parts[0] -notmatch '^tiktok-live-battle-[a-f0-9]{40}$' -or $entry.FullName.Contains('\') -or $parts -contains '..' -or $parts -contains '.') { throw 'Unsafe archive path.' }
            if ($parts[0] -cne ('tiktok-live-battle-' + $ExpectedSha)) { throw 'Archive version mismatch.' }
            $roots[$parts[0]] = $true
            if ($roots.Count -ne 1) { throw 'Unexpected archive roots.' }
            $relative = ($parts | Select-Object -Skip 1) -join '/'
            if (-not (Test-ManagedPath $relative)) { continue }
            if ($paths.ContainsKey($relative) -or $entry.Length -gt 4000000) { throw 'Invalid application file.' }
            $paths[$relative] = $true; $total += $entry.Length
            if ($total -gt 64000000 -or $paths.Count -gt 2000) { throw 'Archive too large.' }
            $target = Join-Path $Stage $relative
            [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($target)) | Out-Null
            $source = $entry.Open(); $dest = [IO.File]::Create($target)
            try { $source.CopyTo($dest) } finally { $source.Dispose(); $dest.Dispose() }
        }
        foreach ($required in @('admin.html','index.html','overlay.html','admin.js','core.js','display.js','overlay.js','relay.js','tikfinity.js','style.css','catalog.json','Start-Overlay.cmd','Start-Overlay.ps1','Update-Game.cmd','Update-Game.ps1','Restore-Game.cmd')) {
            if (-not $paths.ContainsKey($required) -or (Get-Item -LiteralPath (Join-Path $Stage $required)).Length -eq 0) { throw ('Missing application file: ' + $required) }
        }
        $catalog = Get-Content -LiteralPath (Join-Path $Stage 'catalog.json') -Raw | ConvertFrom-Json
        foreach ($gift in $catalog) {
            if ($gift.image -notmatch '^assets/gifts/[0-9]{1,20}\.webp$' -or -not $paths.ContainsKey($gift.image)) { throw 'Missing gift artwork.' }
        }
        return @($paths.Keys)
    } finally { $archive.Dispose() }
}
function Restore-ManagedBackup([string]$Root,[string]$Backup,[string[]]$Current) {
    $saved = @(Get-ManagedPaths $Backup)
    foreach ($path in $Current) { if ($path -notin $saved -and (Test-ManagedPath $path)) { Remove-Item -LiteralPath (Join-Path $Root $path) -Force -ErrorAction SilentlyContinue } }
    foreach ($path in $saved) { Copy-ManagedFile (Join-Path $Backup $path) (Join-Path $Root $path) }
    $version = Join-Path $Root '.battle-version'
    if (Test-Path -LiteralPath (Join-Path $Backup '.battle-version')) { Copy-ManagedFile (Join-Path $Backup '.battle-version') $version }
    elseif (Test-Path -LiteralPath $version) { Remove-Item -LiteralPath $version -Force }
}
function Invoke-GameUpdate([string]$Root,[bool]$RestoreBackup = $false) {
    $Root = [IO.Path]::GetFullPath($Root).TrimEnd([char[]]@('/','\'))
    # Do not follow links/junctions out of the chosen application directory.
    if ((Get-Item -LiteralPath $Root).Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'Use a normal extracted game folder, not a link.' }
    if (@(Get-ChildItem -LiteralPath $Root -Recurse -Force | Where-Object { $_.Attributes -band [IO.FileAttributes]::ReparsePoint }).Count -gt 0) { throw 'Remove linked files/folders from the game folder before updating.' }
    $lock = $null; $work = $null
    try {
        try { $lock = [IO.File]::Open((Join-Path $Root '.battle-operation.lock'),[IO.FileMode]::OpenOrCreate,[IO.FileAccess]::ReadWrite,[IO.FileShare]::None) }
        catch { throw 'Close the game launcher and any other updater, then try again.' }
        $backup = Join-Path $Root '.battle-backup'
        $current = @(Get-ManagedPaths $Root)
        if ($RestoreBackup) {
            if (-not (Test-Path -LiteralPath (Join-Path $backup 'admin.html'))) { throw 'No recovery backup is available.' }
            Restore-ManagedBackup $Root $backup $current
            Write-Host 'Previous application files restored. Start the game normally.'
            return
        }
        $work = Join-Path ([IO.Path]::GetTempPath()) ('BattleStudio-update-' + [Guid]::NewGuid().ToString('N'))
        [IO.Directory]::CreateDirectory($work) | Out-Null
        Write-Host 'Checking the official GitHub repository...'
        $metadata = Join-Path $work 'commit.json'
        Save-TrustedDownload 'https://api.github.com/repos/maxM808s/tiktok-live-battle/commits/main' $metadata 2000000
        $sha = (Get-Content -LiteralPath $metadata -Raw | ConvertFrom-Json).sha
        if ($sha -cnotmatch '^[a-f0-9]{40}$') { throw 'Invalid GitHub version response.' }
        $version = Join-Path $Root '.battle-version'
        if ((Test-Path -LiteralPath $version) -and (Get-Content -LiteralPath $version -Raw).Trim() -ceq $sha) { Write-Host 'Already up to date. No files changed.'; return }
        Write-Host 'Downloading and checking the update...'
        $zip = Join-Path $work 'game.zip'; $stage = Join-Path $work 'stage'
        Save-TrustedDownload ('https://github.com/maxM808s/tiktok-live-battle/archive/' + $sha + '.zip') $zip 32000000
        $next = @(Expand-GameArchive $zip $stage $sha)
        Assert-NativeScriptsUnchanged $Root $stage
        # Build a complete replacement backup before touching application files.
        $pending = Join-Path $work 'backup'
        [IO.Directory]::CreateDirectory($pending) | Out-Null
        foreach ($path in $current) { Copy-ManagedFile (Join-Path $Root $path) (Join-Path $pending $path) }
        if (Test-Path -LiteralPath $version) { Copy-ManagedFile $version (Join-Path $pending '.battle-version') }
        if (Test-Path -LiteralPath $backup) { Remove-Item -LiteralPath $backup -Recurse -Force }
        Move-Item -LiteralPath $pending -Destination $backup
        try {
            foreach ($path in $next) { Copy-ManagedFile (Join-Path $stage $path) (Join-Path $Root $path) }
            foreach ($path in $current) { if ($path -notin $next) { Remove-Item -LiteralPath (Join-Path $Root $path) -Force } }
            [IO.File]::WriteAllText($version,$sha)
        } catch {
            Restore-ManagedBackup $Root $backup $next
            throw 'Update failed; previous application files were restored. Retry later.'
        }
        Write-Host 'Updated. One recovery backup kept in .battle-backup.'
        Write-Host 'Run Start-Overlay.cmd, then copy its new private link into LIVE Studio.'
        Write-Host 'Browser settings were not changed. Import your private export if needed.'
    } finally {
        if ($work -and (Test-Path -LiteralPath $work)) { Remove-Item -LiteralPath $work -Recurse -Force -ErrorAction SilentlyContinue }
        if ($lock) { $lock.Dispose() }
    }
}
if ($MyInvocation.InvocationName -ne '.') {
    try { Invoke-GameUpdate $PSScriptRoot $Restore.IsPresent }
    catch { Write-Host ('Update stopped: ' + $_.Exception.Message); exit 1 }
}
