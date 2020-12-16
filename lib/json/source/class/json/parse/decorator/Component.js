 /**
  *  Clase abstracta de para el decorador del parse
  * 
  * @class Component
  * @abstract
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace json.parse.decorator
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.parse.decorator.Component",
{
    extend : qx.core.Object,
    type : "abstract",

    /**
     * @property
     */  
    properties :
    {
        /**
         * propiedad para el nodo que transforma los valores antes del parser
         * puede ser un arreglo o una funcion
         * 
         * @name _reviver
         * @protected
         * @type {Function}
         * 
         */
        _reviver : {}
    },

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para establecer el reviver
         *
         * @method setReviver
         * @public
         * @param reviver {Function} nodo que transforma los valores antes
         *  del parser. Tambien puede ser un arreglo
         * 
         */
        
        setReviver : function(reviver){
            this._reviver = reviver
        },
        
        /**
         *  metodo para devolver el reviver puede ser un arreglo o una funcion
         *
         * @method getReviver
         * @public
         * @return {Function} nodo que transforma los valores antes del parser 
         * 
         */
        
        getReviver : function(){
            return this._reviver;
        },
        
        /**
         *  metodo para devolver el dato a transformar
         *
         * @abstract
         * @method getData
         * @public
         * @return {String}
         * 
         */
        
        getData : function(){}
    }
});