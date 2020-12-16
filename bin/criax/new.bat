@echo off

set apptype=%1%

:APPSETNAME
set /P appname=Set application name:
REM debo ver que no solo este vacio sino que tampoco sean espacios en blanco
if "%appname%" EQU "" (
    echo Set application name please!
    GOTO :APPSETNAME
)

:APPSETPATH
set /P apppath=Set application path:
REM debo ver que no solo este vacio sino que tampoco sean espacios en blanco
if "%apppath%" EQU "" (
    echo Set application path please!
    GOTO :APPSETPATH
)

set /P appprefix=Set namespace prefix:
if "%appprefix%" EQU "" (
    opt\python\python.exe knl\qooxdoo\tool\bin\create-application.py -n %appname% -o %apppath% -t %apptype% -p etc\skeleton --cache=%apppath%\%appname%\var\cache -l var\log\log.txt
)
if "%appprefix%" NEQ "" (
    opt\python\python.exe knl\qooxdoo\tool\bin\create-application.py -n %appname% -o %apppath% -t %apptype% -p etc\skeleton --cache=%apppath%\%appname%\var\cache -s %appprefix%.%appname% -l var\log\log.txt
)
REM verificar si el directorio existe para si no imprimir error
REM abrir una consola nueva en la ruta del proyecto
REM cd %apppath%\%appname%\bin
REM start bin.bat
REM exit
REM cls
echo "Application %appname% created at %apppath%"