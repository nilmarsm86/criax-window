@echo off

title Running application...

cls
set apppath=%1%
set plataformpath=%2%
taskkill /F /FI "IMAGENAME eq xpcshell.exe"

cd %apppath%\source\
%plataformpath%\knl\xulrunner\xpcshell.exe -w %apppath%\source\bootstrap.js

pause
exit