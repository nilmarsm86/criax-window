@echo off

title Original command...

cls
set apppath=%1%
set plataformpath=%2%
set command=%3%

%plataformpath%\opt\python\python.exe %apppath%\generate.py %command%
pause
exit