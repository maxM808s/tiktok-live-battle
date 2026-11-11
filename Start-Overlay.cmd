@echo off
setlocal
rem This changes script execution policy only for this launcher process.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Start-Overlay.ps1"
if errorlevel 1 pause
endlocal
