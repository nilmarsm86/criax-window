@echo off
REM borra cache, profile, build, api, test, standalone

title Cleaning application...

cls
set apppath=%1%
set plataformpath=%2%

%plataformpath%\opt\python\python.exe %apppath%\generate.py clean-all
rd %apppath%\standalone /S /Q
rd %apppath%\inspector /S /Q
rd %apppath%\var\profile /S /Q
md %apppath%\var\profile
exit