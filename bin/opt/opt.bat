@echo off

title Opt program...

cls
set apppath=%1%
set plataformpath=%2%
set opttype=%3%

taskkill /F /FI "IMAGENAME eq xulrunner.exe"
%plataformpath%\knl\xulrunner\xulrunner.exe %plataformpath%\opt\%opttype%\application.ini -profile "%apppath%\var\profile\%opttype%"
exit