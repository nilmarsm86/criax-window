@echo off

title Package application...

cls
set apppath=%1%
set plataformpath=%2%
set appname=%3%

rmdir /Q /S %apppath%\standalone\

%plataformpath%\opt\python\python.exe %apppath%\generate.py app-package
md %apppath%\standalone
%plataformpath%\opt\python\python.exe %plataformpath%\knl\qooxdoo\tool\bin\create-application.py -n %appname% -o %apppath%\standalone -t website -p %plataformpath%\etc\skeleton
REM xcopy no me permite trabajar en el source con variables
cd %plataformpath%
xcopy "knl\xulrunner" "%apppath%\standalone\%appname%\xulrunner\" /E /Y /Q
REM debo de eliminar js.exe, plugin-container.exe, plugin-hang-ui.exe, redit.exe, updater.exe, wow_helper.exe, xpcshell.exe
del %apppath%\standalone\%appname%\xulrunner\js.exe
del %apppath%\standalone\%appname%\xulrunner\plugin-container.exe
del %apppath%\standalone\%appname%\xulrunner\plugin-hang-ui.exe
del %apppath%\standalone\%appname%\xulrunner\redit.exe
del %apppath%\standalone\%appname%\xulrunner\updater.exe
del %apppath%\standalone\%appname%\xulrunner\wow_helper.exe
del %apppath%\standalone\%appname%\xulrunner\xpcshell.exe
copy %plataformpath%\etc\xulrunner-stub.exe %apppath%\standalone\%appname%\%appname%.exe
move "%apppath%\build" "%apppath%\standalone\%appname%\src"
del %apppath%\standalone\%appname%\Gruntfile.js
del %apppath%\standalone\%appname%\package.json
del %apppath%\standalone\%appname%\generate.py
rd %apppath%\standalone\%appname%\script\ /S /Q
copy %apppath%\etc\chrome.json %apppath%\standalone\%appname%\boot\chrome.json
REM el comando no me permite trabajar con variables
cd %apppath%\standalone\%appname%\src\script
for %%x in (*.js) do %plataformpath%\opt\jre\bin\java.exe -jar "%plataformpath%\opt\yuicompressor\yuicompressor-2.4.2.jar" --type js -o "%apppath%\standalone\%appname%\src\script\%%x" "%apppath%\standalone\%appname%\src\script\%%x"
REM ELIMINAR EL BASE DEL INDEX.HTML
echo ^<^!DOCTYPE html^>>>%apppath%\standalone\%appname%\src\index.html2
echo ^<html^>>>%apppath%\standalone\%appname%\src\index.html2
echo ^<head^>>>%apppath%\standalone\%appname%\src\index.html2
REM el comando no me permite trabajar con variables
cd %apppath%\standalone\%appname%\src\
for /F "skip=4 delims=" %%i in (index.html) do (@echo %%i)>>%apppath%\standalone\%appname%\src\index.html2
del %apppath%\standalone\%appname%\src\index.html
move /Y %apppath%\standalone\%appname%\src\index.html2 %apppath%\standalone\%appname%\src\index.html
%plataformpath%\opt\7zip\7za.exe a -tzip "%apppath%\standalone\%appname%.zip" "%apppath%\standalone\%appname%\*"
echo Package created at %apppath%\standalone\%appname%.zip
pause
exit