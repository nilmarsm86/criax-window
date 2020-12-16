@echo off

title Building Test...

cls
set apppath=%1%
set plataformpath=%2%
taskkill /F /FI "IMAGENAME eq xpcshell.exe"

rmdir /Q /S %apppath%\test\
%plataformpath%\opt\python\python.exe %apppath%\generate.py test-cli -m TESTRUNNER_ROOT:%plataformpath%\lib\testrunner
copy %apppath%\etc\boot\bootstrap.test.js %apppath%\test\bootstrap.js
cd %apppath%\test\
%plataformpath%\knl\xulrunner\xpcshell.exe -w %apppath%\test\bootstrap.js

pause
exit