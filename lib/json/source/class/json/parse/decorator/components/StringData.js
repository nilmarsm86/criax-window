 /**
  *  Clase para el dato a transformar en string
  * 
  * @class StringData
  * @extends json.parse.decorator.Component
  * @author Nilmar Sanchez Muguercia
  * @namespace json.parse.decorator.components
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.parse.decorator.components.StringData",
{
    extend : json.parse.decorator.Component,

    /**
     * @property
     */  
    properties :
    {
        /**
         * propiedad para el string a transformar
         * 
         * @name __value
         * @private
         * @type {String}
         * 
         */
        __value : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param value {String} string a transformar
     */

    construct : function(value)
    { 
        this.__value = value;
        this._reviver = null;
    },

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para devolver el valor del dato
         *
         * @method getData
         * @public
         * @return {Stirng}
         * 
         */
        
        getData : function(){
            return this.__value;
        }
    }
});