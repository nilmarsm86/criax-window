@echo off

title Generating application...

cls
set apppath=%1%
set plataformpath=%2%
taskkill /F /FI "IMAGENAME eq xpcshell.exe"

del %apppath%\Gruntfile.js
del %apppath%\package.json

%plataformpath%\opt\python\python.exe %apppath%\generate.py app-source

cd %apppath%\source\
%plataformpath%\knl\xulrunner\xpcshell.exe -w %apppath%\source\bootstrap.js

pause
exit