 /**  
  * Clase para las asociaciones
  * 
  * @class Association
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm.mapper.map.association  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.mapper.map.association.Association",
{
    extend : qx.core.Object,
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * clase de la relacion
         * 
         * @name __class
         * @private
         * @type {String}
         * 
         */
        __class : {},
        
        /**
         * atributo de la relacion
         * 
         * @name __field
         * @private
         * @type {String}
         * 
         */
        __field : {},
        
        /**
         * atributo de la entidad que representa la relacion
         * 
         * @name __attribute
         * @private
         * @type {String}
         * 
         */
        __attribute : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param associationMap {Object}: objeto del mapa
     * 
     */
    
    construct : function(associationMap) 
    { 
        this.__class = associationMap.clazz;
        this.__field = associationMap.field;        
        this.__attribute = associationMap.attribute;
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  devolver el namespace de la entidad de la relacion
         *
         * @method getClass
         * @public
         * @return {String} namespace de la entidad de la relacion
         * 
         */ 
                      
        getClass : function(){
            return this.__class;
        },
        
        /**
         *  devolver el nombre del atributo de la relacion
         *
         * @method getField
         * @public
         * @return {String} nombre del atributo de la relacion
         * 
         */ 
                      
        getField : function(){
            return this.__field;
        },
        
        /**
         *  devolver el nombre del atributo de la entidad que representa la relacion
         *
         * @method getAttribute
         * @public
         * @return {String} nombre del atributo 
         * 
         */ 
                      
        getAttribute : function(){
            return this.__attribute;
        }
    }
});