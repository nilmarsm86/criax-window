REM criax.bat 
REM - gui
REM name: appname 
REM path: C:\Users\user\proyects

@echo off
set PATH=%cd%\;%PATH%
cls
title CRIAX-SDK
GOTO :LISTOPTIONS

:INIT
set /P option=criax^>

if "%option%" EQU "" (
    GOTO :LISTOPTIONS
) else (
    GOTO :OKTYPE
)

:LISTOPTIONS
echo CRIAX-SDK
echo List of options:
echo -gui
REM echo -share
echo -cli
echo -httpd
echo -mobile
GOTO :INIT

:OKTYPE
if "%option%"=="gui" (
    bin\criax\new.bat desktop
    GOTO :INIT
)
REM if "%option%"=="share" (
REM    bin\criax\share.bat
REM    GOTO :INIT
REM )
if "%option%"=="cli" (
    bin\criax\new.bat native
    GOTO :INIT
)
if "%option%"=="httpd" (
    bin\criax\new.bat server
    GOTO :INIT
)
if "%option%"=="mobile" (
    bin\criax\new.bat mobile
    GOTO :INIT
)
GOTO :LISTOPTIONS