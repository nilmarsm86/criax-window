 /**
  *  Constructor para pasar de un archivo a un objeto Qx
  * 
  * @class FileToModel
  * @extends json.parse.builder.builders.Builder
  * @author Nilmar Sanchez Muguercia
  * @namespace json.parse.builder.builders
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.parse.builder.builders.FileToModel",
{
    extend : json.parse.builder.builders.Builder,

    /**
     * @property
     */  
    properties :
    {
        /**
         * propiedad para la ruta del archivo
         * 
         * @name __path
         * @private
         * @type {String}
         * 
         */
        __path : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param path {String} ruta del archivo con el json
     * @param reviver {Function} reviver de la conversion
     */

    construct : function(path, reviver)
    { 
        this.__path = path;
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
            this._from = new json.parse.decorator.components.FileData(this.__path);
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