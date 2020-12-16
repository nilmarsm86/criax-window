@echo off

title Cormxdesktop...

cls
set apppath=%1%
set plataformpath=%2%

taskkill /F /FI "IMAGENAME eq xulrunner.exe"
%plataformpath%\opt\cormxdesktop\xulrunner\xulrunner.exe %plataformpath%\opt\cormxdesktop\application.ini -profile "%plataformpath%\var\profile\cormxdesktop"
exit