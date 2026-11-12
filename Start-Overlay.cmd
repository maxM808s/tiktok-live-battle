@echo off
setlocal
rem This changes script execution policy only for this launcher process.
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -NonInteractive -ExecutionPolicy Bypass -File "%~dp0Start-Overlay.ps1"
if errorlevel 1 pause
endlocal
