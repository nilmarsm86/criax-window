Guía rápida de desarrollo para CRIAX-SDK
===============================================================================

Cree aplicaciones nativas multiplataformas con HTML5

4 simples pasos para trabajar con CRIAX-SDK:

-descargar
-crear skeleton
-desarrollar
-empaquetar

1- DESCARGAR

Descargue la última versión del SDK para su S.O, descompacte y siga las instrucciones de desarrollo.

2- CREAR SKELETON

Mediante un simple comando, podrá crear la estructura y configuraciones básicas de la WebApp.

$ cd .../CRIAX
$ create-aplication -n ${Name} -o .../output-dir/ -t ${type}
$ cd .../output-dir/${Name}
$ bin.bat generate

3- DESARROLLAR

CRIAX-SDK le permite con sus conocimientos como desarrollador web, crear aplicaciones nativas multiplataforma.

$ cd .../output-dir/${Name}
$ bin.bat update

4- EMPAQUETAR

Cuando su desarrollo haya terminado CRIAX le permitirá crear un paquete de la aplicación, listo para ser instalado.

$ cd .../outptu-dir/${Name}
$ bin.bat standalone
