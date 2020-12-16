@echo off

title Generating application...

cls
set apppath=%1%
set plataformpath=%2%
set appname=%3%
taskkill /F /FI "IMAGENAME eq xpcshell.exe"

del %apppath%\Gruntfile.js
del %apppath%\package.json
%plataformpath%\opt\python\python.exe %apppath%\generate.py app-source
move "%apppath%\source\script\%appname%.js" "%apppath%\source\script\index.sjs"
rmdir /Q /S %apppath%\script\
cd %apppath%\source\
%plataformpath%\knl\xulrunner\xpcshell.exe -w %apppath%\source\bootstrap.js

exit