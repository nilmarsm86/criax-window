@echo off

title Generating application...

cls
set apppath=%1%
set plataformpath=%2%
taskkill /F /FI "IMAGENAME eq xulrunner.exe"

del %apppath%\Gruntfile.js
del %apppath%\package.json
%plataformpath%\opt\python\python.exe %apppath%\generate.py generate
copy "%apppath%\etc\tpl\source.js" "%apppath%\etc\defaults\preferences\prefs.js"
md %apppath%\var\profile\app
%plataformpath%\knl\xulrunner\xulrunner.exe --app %apppath%\etc\application.ini -jsconsole -profile "%apppath%\var\profile\app" -purgecaches
REM exportar el log de la consola de error a un archivo
REM set XRE_CONSOLE_LOG=%apppath%\var\log\log.txt
exit