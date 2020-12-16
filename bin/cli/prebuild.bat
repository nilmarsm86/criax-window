@echo off

title Prebuilding application...

cls
set apppath=%1%
set plataformpath=%2%
taskkill /F /FI "IMAGENAME eq xpcshell.exe"

rmdir /Q /S %apppath%\build\

%plataformpath%\opt\python\python.exe %apppath%\generate.py build -m OPTIMIZE:[]
copy %apppath%\etc\boot\bootstrap.build.js %apppath%\build\bootstrap.js
cd %apppath%
xcopy "source\resource" "%apppath%\build\resource\" /E /Y /Q 
cd %apppath%\build\
%plataformpath%\knl\xulrunner\xpcshell.exe -w %apppath%\build\bootstrap.js

pause
exit