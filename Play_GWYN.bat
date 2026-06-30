@echo off
title GWYN Launcher
echo Starting GWYN Web Server...
start powershell -WindowStyle Hidden -ExecutionPolicy Bypass -File "%~dp0server.ps1"
ping -n 2 127.0.0.1 >nul
echo Launching GWYN in browser...
start "" "http://localhost:8000/"
exit
