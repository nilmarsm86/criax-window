 /**
  *  Clase abstracta de para el decorador del stringify
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

qx.Class.define("json.stringify.decorator.Component",
{
    extend : qx.core.Object,
    type : "abstract",

    /**
     * @property
     */  
    properties :
    {
        /**
         * propiedad para el nodo que transforma los valores antes del stringify
         * puede ser una function o un arreglo 
         * 
         * @name _reviver
         * @protected
         * @type {Function}
         * 
         */
        _replacer : {},
        
        /**
         * propiedad para los espacios del resultado
         * 
         * @name _space
         * @protected
         * @type {Number}
         * 
         */
        _space : {}
    },

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para establecer el replacer
         *
         * @method setReplacer
         * @public
         * @param replacer {Function} nodo que transforma los valores antes 
         * del stringify. Tambien puede ser un arreglo 
         * 
         * 
         */
        
        setReplacer : function(replacer){
            this._replacer = replacer;
        },
        
        /**
         *  metodo para devolver la funcion replacer
         *
         * @method getReplacer
         * @public
         * @return {Function} nodo que transforma los valores antes del stringify
         * puede ser una funcion o un arreglo 
         * 
         */
        
        getReplacer : function(){
            return this._replacer;
        },
        
        /**
         *  metodo para establecer los valores de espaciado
         *
         * @method setSpace
         * @public
         * @param space {Number} espaciado
         * 
         */
        
        setSpace : function(space){
            this._space = space;
        },
        
        /**
         *  metodo para devolver los valores de espaciado
         *
         * @method getSpace
         * @public
         * @return {Number} devolver los valores de espaciado
         * 
         */
        
        getSpace : function(){
            return this._space
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