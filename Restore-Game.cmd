@echo off
setlocal
 echo Close the dashboard and launcher before restoring the previous application files.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Update-Game.ps1" -Restore
pause
endlocal
