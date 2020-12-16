@echo off

title Updating application...

cls
set apppath=%1%
set plataformpath=%2%
set appname=%3%

taskkill /F /FI "IMAGENAME eq xpcshell.exe"

%plataformpath%\opt\python\python.exe %apppath%\generate.py app-source -m OPTIMIZE:[]
move "%apppath%\source\script\%appname%.js" "%apppath%\source\script\index.sjs"
cd %apppath%\source\
%plataformpath%\knl\xulrunner\xpcshell.exe -w %apppath%\source\bootstrap.js

exit