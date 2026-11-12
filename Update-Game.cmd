@echo off
setlocal
 echo Close the dashboard and launcher before updating. Keep a private settings export.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Update-Game.ps1"
pause
endlocal
