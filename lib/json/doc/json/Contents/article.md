#Introducci&oacute;n#

<span class='nota'>**NOTA:** El componente Json nos permite transformar un modelo Qx en un string json salvandolo en un archivo y vicevesa.</span>

Normalmente si deseamos transformar un string en un objeto js utilizamos parse y para el caso contrario stringify. En CRIAX-SDK vamos un poco mas alla, pues podemos leer la informaicion de un archivo *.json y transformarla en un modelo Qx o salvar un modelo Qx en un archivo json.

#Instalaci&oacute;n#

Para utilizar este componente en la aplicacion, debemos agregarlo en la configuracion de la misma. Una vez que tenemos creada la aplicacion, vamos a la configuracion de librerias **config->libraries.json**:

    [javascript]
    {"manifest" : "${QOOXDOO_PATH}/component/library/json/Manifest.json"}

#Utilizaci&oacute;n#

Donde deseamos utilizar el componente json, solo tenemos que llamar a json.Json.parse o json.Json.stringify

#Como utilizar el componente desde el Json#

    [javascript]
    var data = '{"a":10,"b":[4,16],"c":true,"d":"string"}';
    var reviver = function(key, value) {
        if (typeof value === 'number') {
            value = 2 * value;
        }
        return value;
    };
    var result = json.Json.parse(data, reviver);
    
- como personalizar el funcionamieto del componente con los builders y decoradores