@echo off

title Inspect application...

cls
set apppath=%1%
set plataformpath=%2%
taskkill /F /FI "IMAGENAME eq xulrunner.exe"

rmdir /Q /S %apppath%\inspector\

cd %plataformpath%
xcopy "lib\inspector\build" "%apppath%\inspector\" /E /Y /Q
xcopy "opt\selenium-server" "%apppath%\inspector\selenium-server\" /E /Y /Q
copy "%apppath%\etc\tpl\inspector.js" "%apppath%\etc\defaults\preferences\prefs.js"
copy "%apppath%\etc\tpl\inspector.html" "%apppath%\inspector\index.html"
copy %plataformpath%\etc\user-extensions.js %apppath%\inspector\script\user-extensions.js
md %apppath%\var\profile\inspector
%plataformpath%\knl\xulrunner\xulrunner.exe --app %apppath%\etc\application.ini -profile "%apppath%\var\profile\inspector" -purgecaches
exit
