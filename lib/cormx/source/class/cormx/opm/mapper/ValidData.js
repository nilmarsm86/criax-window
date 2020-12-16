 /**  
  * Clase para verificar la integridad de los datos a insertar
  * 
  * @class ValidData
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercias
  * @namespace cormx.opm.mapper  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.mapper.ValidData",
{
    extend : qx.core.Object,
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * objeto de tipo AttributeMap
         * 
         * @name __attribute
         * @private
         * @type {AttributeMap}
         * 
         */
        __attribute : {},
        
        /**
         * objeto de la entidad
         * 
         * @name __entity
         * @private
         * @type {Object}
         * 
         */
        __entity : {},
        
        /**
         * valor del atributo
         * 
         * @name __value
         * @private
         * @type {}
         * 
         */
        __value : {},
        
        /**
         * arreglo de asociaciones de la entidad
         * 
         * @name __associations
         * @private
         * @type {Array}
         * 
         */
        __associations : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param entity {Object}: objeto de la entidad
     * @param attribute {AttributeMap}: objeto del atributo
     * @param associations {Array}: arreglo de tipos de asociaciones
     * 
     */
    
    construct : function(entity,attribute,associations) 
    { 
        this.__attribute = attribute;
        this.__entity = entity;
        this.__associations = associations;
        this.__value = ""; 
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  verificar la longitud del valor
         *
         * @method __validLength
         * @private
         * 
         */ 
                      
        __validLength : function(){
            var accessor = this.__attribute.getAccessor();            
            //this.__value = this.__entity[accessor]();
            var attrName = this.__attribute.getName();
            this.__value = this.__entity["__"+attrName]; 
            if(this.__value == undefined){
                this.__value = this.__entity[accessor]();
            }
            var maxLength = this.__attribute.getLength();
            if((this.__attribute.getType() !== "object") && (this.__attribute.getType() !== "date")){
                if(this.__value.toString().length > maxLength){
                    this.__value = this.__value.slice(0,maxLength);
                }
            }
        },
        
        /**
         *  trabajar con el tip de dato
         *  <strong>REFACTORIZAR METODO MUY LARGO</strong>
         *
         * @method __validType
         * @private
         * @param type {String}: tipo de valor del atributo
         * 
         */ 
                      
        __validType : function(type){
            switch(type){
                case "integer":
                    if(((typeof this.__value) !== "integer") || ((typeof this.__value) !== "number")){
                        //this.__value = this.__value.parseInt();
                        this.__value = parseInt(this.__value);
                        return;
                    }
                break;
                
                case "string":
                    if((typeof this.__value) !== "string"){
                        this.__value = this.__value.toString();
                        return;
                    }
                break;
                
                case "boolean":
                    if((typeof this.__value) !== "boolean"){
                        this.__value = (this.__value === "true") ? 1 : 0; 
                        return;
                    }
                break;
                
                case "date":                    
                    if((typeof this.__value) !== "date"){
                        if((typeof this.__value) == "object"){
                            this.__value = this.__value.toISOString();  //2015-10-16T20:17:01.042Z
                        }else{
                            /*this.__value = new Date(this.__value.substring(0,4),this.__value.substring(5,7),this.__value.substring(8));
                            console.log(this.__value.substring(0,4));
                            console.log(this.__value.substring(5,7));
                            console.log(this.__value.substring(8,10));*/
                        }                                                
                    }else{
                        this.__value = this.__value.toISOString();  //1986-12-23
                    }                    
                    return;
                break;
                
                case "float":
                    if((typeof this.__value) !== "float"){
                        //this.__value = this.__value.parseFloat();
                    	this.__value = parseFloat(this.__value);
                        return;
                    }
                break;
                
                case "object":                    
                    //si el valor es un objeto este objeto debe ser insertado primero en la bd
                    var process = new cormx.opm.mapper.AssociationProcess(this.__associations,this.__attribute,this.__value);
                    this.__value = process.relationValue();
                    //deberia reprocesar el tipo del valor
                break;
            }
        },
        
        /**
         *  procesar el valor del atributo
         *
         * @method proccess
         * @public
         * @return {} valor del atributo procesado
         * 
         */ 
                      
        proccess : function(){
            this.__validLength();
            this.__validType(this.__attribute.getType());
            return this.__value;
        }
    }
});