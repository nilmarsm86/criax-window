@echo off

title Package application...

cls
set apppath=%1%
set plataformpath=%2%
set appname=%3%

rmdir /Q /S %apppath%\standalone\
rmdir /Q /S %apppath%\build\

%plataformpath%\opt\python\python.exe %apppath%\generate.py build

xcopy "%apppath%\build" "%apppath%\standalone\%appname%\src\" /E /Y /Q

move /Y %apppath%\standalone\%appname%\src\script\%appname%.js %apppath%\standalone\%appname%\src\script\index.sjs

cd %plataformpath%
xcopy "knl\xulrunner" "%apppath%\standalone\%appname%\xulrunner\" /E /Y /Q
del %apppath%\standalone\%appname%\xulrunner\js.exe
del %apppath%\standalone\%appname%\xulrunner\plugin-container.exe
del %apppath%\standalone\%appname%\xulrunner\plugin-hang-ui.exe
del %apppath%\standalone\%appname%\xulrunner\redit.exe
del %apppath%\standalone\%appname%\xulrunner\updater.exe
del %apppath%\standalone\%appname%\xulrunner\wow_helper.exe

xcopy "knl\webserver" "%apppath%\standalone\%appname%\webserver\" /E /Y /Q

REM el comando no me permite trabajar con variables
cd %apppath%\standalone\%appname%\src\script
for %%x in (*.js) do %plataformpath%\opt\jre\bin\java.exe -jar "%plataformpath%\opt\yuicompressor\yuicompressor-2.4.2.jar" --type js -o "%apppath%\standalone\%appname%\src\script\%%x" "%apppath%\standalone\%appname%\src\script\%%x"

copy %apppath%\etc\boot\bootstrap.package.js %apppath%\standalone\%appname%\bootstrap.js
copy %plataformpath%\etc\run.bat %apppath%\standalone\%appname%\run.bat
copy %apppath%\etc\bootload.json %apppath%\standalone\%appname%\src\bootload.json
%plataformpath%\opt\7zip\7za.exe a -tzip "%apppath%\standalone\%appname%.zip" "%apppath%\standalone\%appname%\*"
 
echo Package created at %apppath%\standalone\%appname%.zip
pause>nul
exit