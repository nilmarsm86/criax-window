@echo off

title Prebuilding application...

cls
set apppath=%1%
set plataformpath=%2%
set appname=%3%

taskkill /F /FI "IMAGENAME eq xpcshell.exe"

rmdir /Q /S %apppath%\build\
%plataformpath%\opt\python\python.exe %apppath%\generate.py build -m OPTIMIZE:[]
copy %apppath%\etc\boot\bootstrap.build.js %apppath%\build\bootstrap.js
move "%apppath%\build\script\%appname%.js" "%apppath%\build\script\index.sjs"
copy %apppath%\etc\configs\bootload.json %apppath%\build\bootload.json
cd %apppath%\build\
%plataformpath%\knl\xulrunner\xpcshell.exe -w %apppath%\build\bootstrap.js
pause
exit