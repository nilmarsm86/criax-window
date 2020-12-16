 /**
  *  Constructor para pasar de un string a un objeto Qx
  * 
  * @class StringToModel
  * @extends json.parse.builder.builders.Builder
  * @author Nilmar Sanchez Muguercia
  * @namespace json.parse.builder.builders
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.parse.builder.builders.StringToModel",
{
    extend : json.parse.builder.builders.Builder,

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
     * @param value {String} valor a transformar
     * @param reviver {Function} reviver de la conversion
     */

    construct : function(value, reviver)
    { 
        this.__value = value;
        this._reviver = reviver;
    },

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para crear el componente
         *
         * @abstract
         * @method createComponent
         * @public 
         * 
         */
        
        createComponent : function(){
            this._from = new json.parse.decorator.components.StringData(this.__value);
        },
        
        /**
         *  metodo para construir el reviver
         *
         * @abstract
         * @method buildReviver
         * @public 
         * 
         */
        
        buildReviver : function(){
            this._from.setReviver(this._reviver);            
        },
        
        /**
         *  metodo para construir el decorador
         *
         * @abstract
         * @method buildDecorator
         * @public 
         * 
         */
        
        buildDecorator : function(){
            var parse = new json.parse.decorator.decorators.Parse();
            parse.setComponent(this._from);
            this._to = new json.parse.decorator.decorators.Model();
            this._to.setComponent(parse);
        }
    }
});