 /**
  *  Clase para el dato a transformar en modelo qx
  * 
  * @class ModelData
  * @extends json.stringify.decorator.Component
  * @author Nilmar Sanchez Muguercia
  * @namespace json.stringify.decorator.components
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.stringify.decorator.components.ModelData",
{
    extend : json.stringify.decorator.Component,

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
     * @param value {qx.data.model} modelo Qx
     * 
     */

    construct : function(value)
    { 
        this.__value = value;
        this._replacer = null;
        this._space = 0;
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