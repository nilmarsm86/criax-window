@echo off
cls
title ${Name}
set apppath="%cd%\.."
set plataformpath="${ABS_QOOXDOO_PATH}\..\.."
GOTO :LISTOPTIONS

:INIT
set /P option=${Name}^>

if "%option%" EQU "" (
    GOTO :LISTOPTIONS
) else (
    GOTO :OKTYPE
)

:LISTOPTIONS
echo List of options:
echo -generate
echo -update
echo -run
echo -inspector
echo -prebuild
echo -package
echo -api
echo -clean
echo -jsuml
echo -playground
echo -soaclient
echo -sqlitestudio
echo -test-cli
echo -test-gui
echo -cormxdesktop
echo -translate
echo -validate
echo -info
echo -white-space
echo -lint
echo -beauty
echo -profiling
GOTO :INIT

:OKTYPE
if "%option%"=="generate" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\gui\generate.bat %apppath% %plataformpath%
    GOTO :INIT
)
if "%option%"=="update" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\gui\update.bat %apppath% %plataformpath%
    GOTO :INIT
)
if "%option%"=="run" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\gui\run.bat %apppath% %plataformpath%
    GOTO :INIT
)
if "%option%"=="inspector" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\gui\inspector.bat %apppath% %plataformpath%
    GOTO :INIT
)
if "%option%"=="prebuild" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\gui\prebuild.bat %apppath% %plataformpath%
    GOTO :INIT
)
if "%option%"=="api" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\api.bat %apppath% %plataformpath%
    GOTO :INIT
)
if "%option%"=="test-cli" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\gui\test-cli.bat %apppath% %plataformpath%
    GOTO :INIT
)
if "%option%"=="test-gui" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\gui\test-gui.bat %apppath% %plataformpath%
    GOTO :INIT
)
if "%option%"=="package" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\gui\package.bat %apppath% %plataformpath% ${Name}
    GOTO :INIT
)
if "%option%"=="clean" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\clean.bat %apppath% %plataformpath% clean-all
    cls
    GOTO :INIT
)
if "%option%"=="jsuml" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\opt\opt.bat %apppath% %plataformpath% jsuml
    GOTO :INIT
)
if "%option%"=="playground" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\opt\opt.bat %apppath% %plataformpath% playground
    GOTO :INIT
)
if "%option%"=="soaclient" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\opt\opt.bat %apppath% %plataformpath% soaclient
    GOTO :INIT
)
if "%option%"=="sqlitestudio" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\opt\sqlitestudio.bat %plataformpath%
    GOTO :INIT
)
if "%option%"=="cormxdesktop" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\opt\cormxdesktop.bat %apppath% %plataformpath%
    GOTO :INIT
)
if "%option%"=="translate" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\original.bat %apppath% %plataformpath% translation
    GOTO :INIT
)
if "%option%"=="validate" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\original.bat %apppath% %plataformpath% validate
    GOTO :INIT
)
if "%option%"=="info" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\original.bat %apppath% %plataformpath% info
    GOTO :INIT
)
if "%option%"=="white-space" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\original.bat %apppath% %plataformpath% white-space
    GOTO :INIT
)
if "%option%"=="lint" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\original.bat %apppath% %plataformpath% lint
    GOTO :INIT
)
if "%option%"=="beauty" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\original.bat %apppath% %plataformpath% beauty
    GOTO :INIT
)
if "%option%"=="profiling" (
    start ${ABS_QOOXDOO_PATH}\..\..\bin\original.bat %apppath% %plataformpath% profiling
    GOTO :INIT
)
GOTO :LISTOPTIONS