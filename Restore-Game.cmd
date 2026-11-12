@echo off
setlocal
 echo Close the dashboard and launcher before restoring the previous application files.
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -NonInteractive -ExecutionPolicy Bypass -File "%~dp0Update-Game.ps1" -Restore
pause
endlocal
