@echo off

title Updating application...

cls
set apppath=%1%
set plataformpath=%2%
taskkill /F /FI "IMAGENAME eq xulrunner.exe"

%plataformpath%\opt\python\python.exe %apppath%\generate.py app-update -m OPTIMIZE:[]
copy "%apppath%\etc\tpl\source.js" "%apppath%\etc\defaults\preferences\prefs.js"

%plataformpath%\knl\xulrunner\xulrunner.exe --app %apppath%\etc\application.ini -jsconsole -profile "%apppath%\var\profile\app" -purgecaches
REM exportar el log de la consola de error a un archivo
REM set XRE_CONSOLE_LOG=%apppath%\var\log\log.txt
exit