Crear los mapas para la persistencia de datos, tiene sus caracteristicas:

1-Crear un archivo json, para los mapas: {}

2-El primer y unico elemento del objeto json, sera un arreglo llamado entities:
-entities: arreglo, con los objetos de las entidades de la base de datos. Por 
          cada tabla se crea un objeto en el arreglo
          entities : []

3-Los elementos del arreglo entities, seran objetos para los mapas de cada:
  tabla de la base de datos.
  entities : [{},{},{}]

4-A continuacion se detalla cada elemento de los mapas:
  
5-Establecer la clase entidad que representara la tabla en la base de datos:
-clazz: namespace de la clase entidad que representara la tabla, esta clase 
        no debe tener constructor y si lo tiene el parametro debe ser opcional 
        app.entity.Entidad 
 
6-Establecer el nombre de la tabla de la base de datos que se va a mapear:
-table: nombre de la tabla en la bd
 
7-Establecer cada uno de los atributos de la entidad:
-fields: objeto con los atributos de la clase que a su vez son objetos tambien 
         atributos de la clase entidad (en el caso del id = 'id', por convencion)

8-Para cada atributo establecer: 
-column: nombre de la columna que representa el atributo, por defecto el mismo 
         nombre que el atributo de la clase
-type: tipo de dato desde js, debe ponerce siempre (string, integer, boolean, date, float, object)
-length: tamanno maximo del campo, obligatorio para todo tipo de datos
-primaryKey: si el campo es la llave primaria de la tabla (false por defecto)
-autoIncrement: si el campo se autoincrementa automaticamente (false por defecto)
-notNull: si el campo acepta datos no nulos (true por defecto)
-defaultValue : valor por defecto del campo, opcional
-unique: si el campo debe tener datos unicos (false por defecto)
-accessor: nombre del metodo de optencion de datos (por defecto, get + nombre de
           atributo [primera letra en mayuscula])
-mutator: nombre del metodo para establecer los datos (por defecto set + nombre 
          de atributo [primera letra en mayuscula]) 
          
9-Establecer los eventos para la entidad:
-events: objeto con los eventos a ejecutar antes o despues del metodo de 
         insertar, actualizar o eliminar, son como validaciones select. Cada uno
         de ellos es un objeto. Se le pasa el nombre del metodo (este metodo se
         crea en la entidad y debe devolver true/false), y el valor del parametro
         (un arreglo) cuyos datos, seran el nombre del atributo con el que se vaya
         a trabajar.Existen 6 tipos de eventos: preInsert, postInsert, preUpdate, 
         postUpdate, preDelete y postDelete
         Tener cuidado con los eventos en ciclo 

10-Establecer las relaciones de la entidad:
-associations: objeto con las asociaciones entre la entidad y las demas entidades
               hay 3 tipos de asociaciones (one_one, one_many, many_many). Cada tipo
               de asociacion sera un elemento del ojeto de las asociaciones y su valor
               sera un arreglo de objetos associations : {tipo:[]}
               cada elemento del arreglo del tipo de asociacion sera un objeto con los 
               datos de la asociacion, associations : {tipo:[{},{}]}. Estos datos seran:
-clazz: namespace de la entidad con la que se esta relacionado
-field: nombre del atributo de la entidad relacionada cuyo valor pasa a esta entidad
-attribute: nombre del atributo de esta entidad que asume el valor en la relacion

Hasta aqui son los valores que hacen falta para la relacion 1:1 y 1:m, en el caso de m:m

-?               

11-Una vez creado el mapeo de la base de datos, pasamos a la configuracion y en la 
   directiva criax.persistence.map.name ponemos el nombre del archivo que contiene
   el mapeo

Ejemplo:

{
    entities : [
        {
            clazz : "app.entity.Entidad",
            table : "nombre_tabla",
            fields : 
            {
                atributo : {
                               column:"columna",
                               type:"tipo_dato_js",
							   length:"cantidad_caracteres",
                               primaryKey:true/false,
                               autoIncrement:true/false,
                               notNull:true/false,
                               defaultValue:null,
                               unique:true,
                               accessor:"getId",
                               mutator:"setId"
                           },
            },
            events : 
            {
                tipo_evento : {
                                  method:"nombre_metodo",
                                  data:["atributo1","atributo12"]
                              },
            },
            associations : 
            {
                tipo : [
                           {
                               clazz:"namespace_entidad_relcionada",
                               field:"atributo_entidad_relacionada",
                               attribute:"atributo_esta_entidad_asume_valor"
                           }  
                       ]
            }
        },
        {
            ...//la otra tabla
        },
    ]
}
