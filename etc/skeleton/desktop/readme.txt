Esqueleto de la Webapp - Una aplicación de CRIAX-SDK
====================================================

Esta es una aplicación de escritorio desarrollada con la plataforma CRIAX-SDK.

La misma permite ...

Como usar:

1- Descargar la última versión de CRIAX-SDK para su S.O y descompactar.

2-Crear el esqueleto de la aplicaión:

cd .../CRIAX
criax(.sh .bat) desktop ${Name} .../output-dir/

3- Descargar el código fuente y ponerlo dentro de .../output-dir/${Name}/

4-Actualizar la aplicación:

cd .../outptu-dir/${Name}
bin(.sh .bat) update

5-Preempaquetar la aplicación:

cd .../outptu-dir/${Name}
bin(.sh .bat) build

6-Empaquetar la aplicación:

cd .../outptu-dir/${Name}
bin(.sh .bat) standalone