@echo off

title Running criax-server...

taskkill /F /FI "IMAGENAME eq xpcshell.exe"
set apppath=%cd%
echo To stop the server Ctrl + C
xulrunner\xpcshell.exe -w bootstrap.js