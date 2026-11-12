$ErrorActionPreference = 'Stop'
$repo = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
. (Join-Path $repo 'Update-Game.ps1')
Add-Type -AssemblyName System.IO.Compression.FileSystem
$testRoot = Join-Path ([IO.Path]::GetTempPath()) ('battle-updater-test-' + [Guid]::NewGuid().ToString('N'))
[IO.Directory]::CreateDirectory($testRoot) | Out-Null
$script:Checks = @(); $script:Sha = 'a' * 40; $script:FailDownload = $false; $script:SelectedZip = ''
function Check($Value,[string]$Label) { if (-not $Value) { throw $Label }; $script:Checks += $Label }
function Save-TrustedDownload([string]$Url,[string]$Destination,[long]$Limit) {
    if ($script:FailDownload) { throw 'Simulated network failure' }
    if ($Url -eq 'https://api.github.com/repos/maxM808s/tiktok-live-battle/commits/main') { [IO.File]::WriteAllText($Destination,('{"sha":"' + $script:Sha + '"}')) }
    elseif ($Url -eq ('https://github.com/maxM808s/tiktok-live-battle/archive/' + $script:Sha + '.zip')) { [IO.File]::Copy($script:SelectedZip,$Destination,$true) }
    else { throw 'Unexpected download URL' }
}
function Make-Zip([string]$Sha,[string]$Marker,[string]$Extra = '') {
    $dir = Join-Path $testRoot $Sha; $app = Join-Path $dir ('tiktok-live-battle-' + $Sha)
    [IO.Directory]::CreateDirectory($app) | Out-Null
    foreach ($path in @(Get-ManagedPaths $repo)) { Copy-ManagedFile (Join-Path $repo $path) (Join-Path $app $path) }
    [IO.File]::WriteAllText((Join-Path $app 'admin.html'),$Marker)
    # A source archive may contain tests, exports or other non-runtime files. Never install them.
    [IO.File]::WriteAllText((Join-Path $app 'battle-settings-private.json'),'MUST NOT INSTALL')
    $zip = Join-Path $testRoot ($Sha + '.zip')
    [IO.Compression.ZipFile]::CreateFromDirectory($dir,$zip)
    if ($Extra) { $z = [IO.Compression.ZipFile]::Open($zip,[IO.Compression.ZipArchiveMode]::Update);try { $e=$z.CreateEntry(('tiktok-live-battle-' + $Sha + '/' + $Extra));$w=[IO.StreamWriter]::new($e.Open());try{$w.Write('unsafe')}finally{$w.Dispose()} } finally{$z.Dispose()} }
    return $zip
}
try {
    $install = Join-Path $testRoot 'game'; [IO.Directory]::CreateDirectory($install) | Out-Null
    foreach ($path in @(Get-ManagedPaths $repo)) { Copy-ManagedFile (Join-Path $repo $path) (Join-Path $install $path) }
    [IO.File]::WriteAllText((Join-Path $install 'admin.html'),'old')
    [IO.File]::WriteAllText((Join-Path $install 'battle-settings-private.json'),'PRIVATE USER EXPORT')
    [IO.File]::WriteAllText((Join-Path $install 'personal-notes.txt'),'USER NOTES')
    $script:SelectedZip = Make-Zip $script:Sha 'new-a'
    $before = @(Get-ChildItem ([IO.Path]::GetTempPath()) -Directory -Filter 'BattleStudio-update-*' | ForEach-Object FullName)
    Invoke-GameUpdate $install
    Check ((Get-Content (Join-Path $install 'admin.html') -Raw) -ceq 'new-a') 'Install downloaded application files in the same folder'
    Check ((Get-Content (Join-Path $install 'battle-settings-private.json') -Raw) -ceq 'PRIVATE USER EXPORT') 'Preserve private settings exports'
    Check ((Get-Content (Join-Path $install 'personal-notes.txt') -Raw) -ceq 'USER NOTES') 'Preserve unrelated user files'
    Check ((Get-Content (Join-Path $install '.battle-backup/admin.html') -Raw) -ceq 'old') 'Keep one previous application backup'
    Check ((Get-Content (Join-Path $install '.battle-version') -Raw) -ceq $script:Sha) 'Record the installed commit'
    Invoke-GameUpdate $install
    Check ((Get-Content (Join-Path $install '.battle-backup/admin.html') -Raw) -ceq 'old') 'Already-current update does not replace recovery backup'
    Invoke-GameUpdate $install $true
    Check ((Get-Content (Join-Path $install 'admin.html') -Raw) -ceq 'old') 'Manual restore returns previous application files'
    Invoke-GameUpdate $install
    $script:Sha = 'b' * 40; $script:SelectedZip = Make-Zip $script:Sha 'new-b'
    Invoke-GameUpdate $install
    Check ((Get-Content (Join-Path $install '.battle-backup/admin.html') -Raw) -ceq 'new-a') 'Next update replaces the single backup'
    Check (@(Get-ChildItem $install -Directory -Force | Where-Object Name -like '.battle-backup*').Count -eq 1) 'No accumulating backup folders'
    $script:FailDownload=$true;try {Invoke-GameUpdate $install;throw 'Expected failure'} catch {if($_.Exception.Message -eq 'Expected failure'){throw}}
    Check ((Get-Content (Join-Path $install 'admin.html') -Raw) -ceq 'new-b') 'Download failure leaves application unchanged'
    $script:FailDownload=$false
    $held = [IO.File]::Open((Join-Path $install '.battle-operation.lock'),[IO.FileMode]::OpenOrCreate,[IO.FileAccess]::ReadWrite,[IO.FileShare]::None)
    try { $blocked=$false;try{Invoke-GameUpdate $install}catch{$blocked=$_.Exception.Message -like 'Close the game launcher*'};Check $blocked 'Running launcher/update lock prevents concurrent changes' } finally{$held.Dispose()}
    $script:Sha = 'c' * 40; $script:SelectedZip = Make-Zip $script:Sha 'bad' '../outside.txt'
    $rejected=$false;try{Invoke-GameUpdate $install}catch{$rejected=$_.Exception.Message -like '*archive path*'}
    Check $rejected 'Reject ZIP path traversal before changing application files'
    Check ((Get-Content (Join-Path $install 'admin.html') -Raw) -ceq 'new-b') 'Unsafe archive preserves application and backup'
    Check (Test-TrustedUpdateUrl 'https://api.github.com/repos/maxM808s/tiktok-live-battle/commits/main') 'Allow only the configured GitHub metadata endpoint'
    foreach($url in @('http://github.com/maxM808s/tiktok-live-battle/archive/aaa.zip','https://evil.example/payload.exe','https://github.com/other/repo/archive/' + ('a'*40) + '.zip','https://user:password@api.github.com/repos/maxM808s/tiktok-live-battle/commits/main','https://api.github.com/repos/maxM808s/tiktok-live-battle/commits/main?token=secret')) { Check (-not (Test-TrustedUpdateUrl $url)) 'Reject unexpected hosts, repositories, credentials, queries and plaintext HTTP' }
    $script:Sha = 'e' * 40; $script:SelectedZip = Make-Zip $script:Sha 'native-change'
    $nativeZip=[IO.Compression.ZipFile]::Open($script:SelectedZip,[IO.Compression.ZipArchiveMode]::Update)
    try { $entry=$nativeZip.GetEntry(('tiktok-live-battle-' + $script:Sha + '/Start-Overlay.cmd'));$entry.Delete();$entry=$nativeZip.CreateEntry(('tiktok-live-battle-' + $script:Sha + '/Start-Overlay.cmd'));$writer=[IO.StreamWriter]::new($entry.Open());try{$writer.Write('malicious-script-placeholder')}finally{$writer.Dispose()} } finally{$nativeZip.Dispose()}
    $rejected=$false;try{Invoke-GameUpdate $install}catch{$rejected=$_.Exception.Message -like '*changes Windows launch/update scripts*'}
    Check $rejected 'Block changed native scripts before installation'
    Check ((Get-Content (Join-Path $install 'admin.html') -Raw) -ceq 'new-b') 'Blocked native update leaves existing game unchanged'
    $script:Sha = 'd' * 40; $script:SelectedZip = Make-Zip $script:Sha 'new-d'
    $script:FailOnce=$true; $originalCopy=${function:Copy-ManagedFile}
    function Copy-ManagedFile([string]$From,[string]$To) {
        if ($script:FailOnce -and $From -match '[/\\]stage[/\\]' -and $To.EndsWith('admin.html')) { $script:FailOnce=$false; throw 'Simulated install failure' }
        [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($To)) | Out-Null
        [IO.File]::Copy($From,$To,$true)
    }
    $rolledBack=$false;try{Invoke-GameUpdate $install}catch{$rolledBack=$_.Exception.Message -like '*previous application files were restored*'}
    Check $rolledBack 'Installation failure triggers rollback'
    Check ((Get-Content (Join-Path $install 'admin.html') -Raw) -ceq 'new-b') 'Rollback restores previous files'
    Check ((Get-Content (Join-Path $install '.battle-version') -Raw) -ceq ('b'*40)) 'Rollback restores previous version marker'
    $after = @(Get-ChildItem ([IO.Path]::GetTempPath()) -Directory -Filter 'BattleStudio-update-*' | ForEach-Object FullName)
    Check (@($after | Where-Object {$_ -notin $before}).Count -eq 0) 'Temporary downloads cleaned after success and failure'
    $report=[ordered]@{date=[DateTime]::UtcNow.ToString('o');scope='PowerShell 7 on Linux with synthetic GitHub archives and mocked downloads; Windows 5.1 and real updater HTTP still require broadcast-PC verification';checks=$script:Checks}
    [IO.File]::WriteAllText((Join-Path $PSScriptRoot 'updater-results.json'),($report | ConvertTo-Json -Depth 5))
    Write-Host ('PASS ' + $script:Checks.Count + ' updater checks')
} finally { Remove-Item -LiteralPath $testRoot -Recurse -Force -ErrorAction SilentlyContinue }
