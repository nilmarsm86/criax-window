@echo off

title Prebuilding application...

cls
set apppath=%1%
set plataformpath=%2%
taskkill /F /FI "IMAGENAME eq xulrunner.exe"
rmdir /Q /S %apppath%\build\
%plataformpath%\opt\python\python.exe %apppath%\generate.py app-prebuild -m OPTIMIZE:[]
copy "%apppath%\etc\tpl\build.js" "%apppath%\etc\defaults\preferences\prefs.js"

%plataformpath%\knl\xulrunner\xulrunner.exe --app %apppath%\etc\application.ini -jsconsole -profile "%apppath%\var\profile\app" -purgecaches
REM exportar el log de la consola de error a un archivo
REM set XRE_CONSOLE_LOG=%apppath%\var\log\log.txt
exit