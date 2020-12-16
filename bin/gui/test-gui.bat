@echo off

title Building Test...

cls
set apppath=%1%
set plataformpath=%2%
taskkill /F /FI "IMAGENAME eq xulrunner.exe"

rmdir /Q /S %apppath%\test\
%plataformpath%\opt\python\python.exe %apppath%\generate.py test-source -m TESTRUNNER_ROOT:%plataformpath%\lib\testrunner
copy "%apppath%\etc\tpl\test.js" "%apppath%\etc\defaults\preferences\prefs.js"
copy "%apppath%\etc\tpl\test.html" "%apppath%\test\index.html"
copy "%apppath%\etc\tpl\html-tests-source.html" "%apppath%\test\html\tests-source.html"
md %apppath%\var\profile\test
%plataformpath%\knl\xulrunner\xulrunner.exe --app %apppath%\etc\application.ini -profile "%apppath%\var\profile\test" -purgecaches
exit