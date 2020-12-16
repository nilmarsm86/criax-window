 /**  
  * Clase para mapear los eventos de la entidad
  * 
  * @class EventMapper
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm.mapper.map
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.mapper.map.EventMap",
{
    extend : qx.core.Object,
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * nombre del metodo del evento
         * 
         * @name __method
         * @private
         * @type {String}
         * 
         */
        __method : {},
              
        /**
         * nombre del evento
         * 
         * @name __name
         * @private
         * @type {String}
         * 
         */
        __name : {},
        
        /**
         * datos a pasar en el parametro al metodo
         * 
         * @name __data
         * @private
         * @type {Array}
         * @default {null}
         * 
         */
        __data : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param eventName {String}: nombre del tipo de evento a ejecutar
     * @param eventMap {Object}: mapa de los eventos
     * 
     */
    
    construct : function(eventName,eventMap) 
    { 
        this.__name = eventName;
        this.__method = eventMap.method;        
        this.__data = eventMap.data || null;
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  devolver el nombre del metodo a ejecutar
         *
         * @method getMethodName
         * @public
         * @return {String} nombre del metodo 
         * 
         */ 
                      
        getMethodName : function(){
            return this.__method;
        },
        
        /**
         *  devolver los elementos del arreglo parametro
         *
         * @method getValues
         * @public
         * @return {Array} elementos del arreglo 
         * 
         */ 
                      
        getValues : function(){
            return this.__data;
        },
        
        /**
         *  devolver el nombre del evento
         *
         * @method getName
         * @public         
         * @return {String} nombre del evento
         * 
         */ 
                      
        getName : function(){
            return this.__name;
        }
    }
});