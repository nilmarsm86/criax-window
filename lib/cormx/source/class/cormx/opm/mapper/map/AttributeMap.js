 /**  
  * Clase para la carga de la informacion de los atributos
  * 
  * @class AttributeMapper
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm.mapper.map
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.mapper.map.AttributeMap",
{
    extend : qx.core.Object,
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * nombre de la columna de la tabla
         * 
         * @name __column
         * @private
         * @type {String}
         * 
         */
        __column : {},
        
        /**
         * tipo de dato del atributo (basado en los tipos del js)
         * 
         * @name __type
         * @private
         * @type {String}
         * 
         */
        __type : {}, 
        
        /**
         * nombre del atributo
         * 
         * @name __name
         * @private
         * @type {String}
         * 
         */
        __name : {},
        
        /**
         * tamanno maximo del valor del atributo
         * 
         * @name __length
         * @private
         * @type {Integer}
         * @default {0}
         * 
         */
        __length : {},
        
        /**
         * para ver si el campo es llave primaria
         * 
         * @name __primaryKey
         * @private
         * @type {Boolean}
         * @default {false}
         * 
         */
        __primaryKey : {},
        
        /**
         * para ver si el campo se autoincrementa
         * 
         * @name __autoIncrement
         * @private
         * @type {Boolean}
         * @default {false}
         * 
         */
        __autoIncrement : {},
        
        /**
         * para ver si el campo acepta valores nulos
         * 
         * @name __notNull
         * @private
         * @type {Boolean}
         * @default {true}
         * 
         */
        __notNull : {},
        
        /**
         * valor por defecto
         * 
         * @name __defaultValue
         * @private
         * @type {String}
         * @default {null}
         * 
         */
        __defaultValue : {},
        
        /**
         * para ver si el campo debe de tener un valor unico
         * 
         * @name __unique
         * @private
         * @type {Boolean}
         * @default {false}
         * 
         */
        __unique : {},
        
        /**
         * nombre del metodo accessor
         * 
         * @name __accessor
         * @private
         * @type {String}
         * @default {null}
         * 
         */
        __accessor : {},
        
        /**
         * nombre del metodo mutator
         * 
         * @name __mutator
         * @private
         * @type {String}
         * @default {null}
         * 
         */
        __mutator : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param name {String}: nombre del atributo de la clase
     * @param attributeMap {Object}: objeto de las caracteristicas del atributo
     * 
     */
    
    construct : function(name,attributeMap) 
    { 
        //verificar que la columna no es nula
        if(attributeMap.column === null){
            this.__column = null;
        }else{
            this.__column = attributeMap.column || name;
        }
        this.__type = attributeMap.type;
        this.__name = name;
        this.__length = attributeMap.length || 0;
        this.__primaryKey = attributeMap.primaryKey || false;
        this.__autoIncrement = attributeMap.autoIncrement || false;
        this.__notNull = attributeMap.notNull || true;
        this.__defaultValue = attributeMap.defaultValue || null;
        this.__unique = attributeMap.unique || false;
        this.__accessor = attributeMap.accessor || this.__accessorMutator("get",name);
        this.__mutator = attributeMap.mutator || this.__accessorMutator("set",name);
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  sacar el nombre del metodo accessor a partir del nombre del campo
         *
         * @method __accessorMutator
         * @private
         * @param type {String}: prefijo del metodo (get/set)
         * @param name {String}: nombre del atributo
         * @return {String} el nombre formateado
         * 
         */ 
                      
        __accessorMutator : function(type,name){
            return type+name[0].toUpperCase()+name.substring(1);
        },
        
        /**
         *  devolver el nombre de la tabla
         *
         * @method getColumn
         * @public
         * @return {String} nombre de la columna 
         * 
         */ 
                      
        getColumn : function(){
            return this.__column;
        },
        
        /**
         *  devolver el tipo de dato
         *
         * @method getType
         * @public
         * @return {String} tipo de dato 
         * 
         */ 
                      
        getType : function(){
            return this.__type;
        },
        
        /**
         *  devolver el nombre del atributo
         *
         * @method getName
         * @public
         * @return {String} nombre del atributo 
         * 
         */ 
                      
        getName : function(){
            return this.__name;
        },
        
        /**
         *  devolver capacidad del atributo
         *
         * @method getLength
         * @public
         * @return {Integer} capacidad 
         * 
         */ 
                      
        getLength : function(){
            return this.__length;
        },
        
        /**
         *  si es llave primarua
         *
         * @method getPrimaryKey
         * @public
         * @return {Boolean} si es o no 
         * 
         */ 
                      
        getPrimaryKey : function(){
            return this.__primaryKey;
        },
        
        /**
         *  si es auto incrementado
         *
         * @method getAutoIncrement
         * @public
         * @return {Boolean} si es o no 
         * 
         */ 
                      
        getAutoIncrement : function(){
            return this.__autoIncrement;
        },
        
        /**
         *  si el campo es no nulo
         *
         * @method getNotNull
         * @public
         * @return {Boolean} si es o no 
         * 
         */ 
                      
        getNotNull : function(){
            return this.__notNull;
        },
        
        /**
         *  devolver el valor por defecto del campo
         *
         * @method getDefaultValue
         * @public
         * @return {String} valor por defecto 
         * 
         */ 
                      
        getDefaultValue : function(){
            return this.__defaultValue;
        },
        
        /**
         *  si el campo debe tener valor unico o no
         *
         * @method getUnique
         * @public
         * @return {Boolean} si es o no 
         * 
         */ 
                      
        getUnique : function(){
            return this.__unique;
        },
        
        /**
         *  devolver el nombre del metodo para get
         *
         * @method getAccessor
         * @public
         * @return {String} nombre del metodo 
         * 
         */ 
                      
        getAccessor : function(){
            return this.__accessor;
        },
        
        /**
         *  devolver el nombre del metodo para set
         *
         * @method getMutator
         * @public
         * @return {String} nombre del metodo 
         * 
         */ 
                      
        getMutator : function(){
            return this.__mutator;
        }
    }
});