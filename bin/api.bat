@echo off

title Building Api...

cls
set apppath=%1%
set plataformpath=%2%

taskkill /F /FI "IMAGENAME eq xulrunner.exe"

rmdir /Q /S %apppath%\api\
%plataformpath%\opt\python\python.exe %apppath%\generate.py api -m APIVIEWER_ROOT:%plataformpath%\lib\apiviewer
copy "%apppath%\etc\tpl\api.js" "%apppath%\etc\defaults\preferences\prefs.js"
md %apppath%\var\profile\api
%plataformpath%\knl\xulrunner\xulrunner.exe --app %apppath%\etc\application.ini -profile "%apppath%\var\profile\api" -purgecaches
REM exportar el log de la consola de error a un archivo
REM set XRE_CONSOLE_LOG=%apppath%\var\log\log.txt
exit