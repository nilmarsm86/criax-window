Componente validator de CRIAX-SDK
====================================================

Este es un library desarrollado con y para la plataforma CRIAX-SDK.

El mismo permite validar datos tanto primitivos como objetos

Como usar:

1- Descargar la última versión de CRIAX-SDK para su S.O y descompactar.

2- El componente ya viene internamente con la plataforma.

3- En caso de tener alguna dependencia copiar las mismas (config.json) en la sección de jobs->libraries:

"library" :
[
    ...
    {"manifest" : "library/library_name/Manifest.json"}
    ...
]

hacia la configuración de las librerías de la aplicación (config/libraries.json):

"library" :
    [
    	...
        {"manifest" : "library/library_name/Manifest.json"}
        ...
    ]



4- Hacer uso de las clases del library ${Name} en la aplicación (Leer documentación y API).
