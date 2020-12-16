Crear los servicios de la aplicacion

-los servicion son archivos json, existe un servicio interno que es el llamado
servicio, este es el servicio por defecto de la aplicacion, a partir de el se
cargan los demas servicion

1-Crear un archivo json, para los servicios: {}
  Se pueden crear cuantos archivos para servicios se deseen

2-Definir primero los servicios solitarios o simples
  El primer y unico elemento del objeto json, sera un arreglo llamado services:
-services: arreglo, con los objetos de los servicios de la aplicacion. Por 
          cada servicio se crea un objeto en el arreglo
          services : []

3-Los elementos del arreglo services, seran objetos para cada servicio:
  services : [{},{},{}]

4-A continuacion se detalla cada elemento de los servicios para cada uno establecer:
-id: nombre identificador del servicio, este debe ser unico entre todos los servicios
-clazz: namespace de la clase del servicio

 Hasta aqui la definicion de un servicio simple, los demas elementos son para configuraciones
 para personalizar el servicio

-arguments: arreglo de parametros del constructor del servicio, si el argumento tiene @ es el
            nombre de otro servicio, que tiene que haber estado definido previamente
            arguments:['parametro1','@servicio']
-call: objetos de metodos a llamar en la creacion del servicio, los objetos son numericos secuenciales
       por cada objeto se define un arreglo que tiene como elementos, el nombre del metodo y
       el valor del parametro en caso de tener (solo se permite un solo parametro)
       call:{
		1:["metodo","valor_parametro"],
		2:["metodo","valor"]
	    }
-singleton: valor booleano, en caso de que la clase del servicio sea singleton o no por defecto es false
            singleton:false
-serviceNew: valor booleano, en caso de que cada vez que se llame al servicio se crea un objeto nuevo
             por defecto es false
             serviceNew:false

5-Incluir un servicio externo:
-include:lo primero es crear el json de servicios y los servicios del mismo
         Dentro del servicio que se vaya a incluir, se crea un objeto de servicio, pero con un solo elemento
         include, y el valor del mismo sera el nombre del archivo que contiene el servicio a incluir (sin .json)
         include:'archivo'

Ejemplo:

//primer servicio(solitario)
{
    id:"servicio1",
    clazz:"app.dir.ClassName"
},
        
//segundo servicio(usa el primero)
{
    id:"servicio2",
    clazz:"app.dir.ClassName",
    arguments:["@servicio1",'parametro'],
    call:{
             1:["metodo","valor"],
             2:["metodo","@servicio1"]
         },
    singleton:false,
    serviceNew:false
},

//tercer servicio (incluir un servicio externo)
{
    include:'externo'
}

6-Existen declarados ya varios servicios por defecto para el funcionamiento de Criax, algunos comentariados

7-Cuando se cree un servicio nuevo (de la app), la clase debe ser cargada automaticamente, lo cual se hace en
  la configuracion de la aplicacion en la session de USE
