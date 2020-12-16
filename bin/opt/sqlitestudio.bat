@echo off

title Sqlitestudio...

cls
set plataformpath=%1%

taskkill /F /FI "IMAGENAME eq sqlitestudio.exe"
%plataformpath%\opt\sqlitestudio\sqlitestudio.exe
exit