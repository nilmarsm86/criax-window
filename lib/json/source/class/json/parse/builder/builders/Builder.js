 /**
  *  Abstraccion para los constructores
  * 
  * @class Builder
  * @abstract
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace json.parse.builder.builders
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.parse.builder.builders.Builder",
{
    extend : qx.core.Object,
    type : "abstract",

    /**
     * @property
     */  
    properties :
    {
        /**
         * propiedad para el componente a transformar
         * 
         * @name _from
         * @protected
         * @type {json.parse.decorator.Component}
         * 
         */
        _from : {},
        
        /**
         * propiedad para el decorador que transforma
         * 
         * @name _to
         * @protected
         * @type {json.parse.decorator.decorators.Decortor}
         * 
         */
        _to : {},
        
        /**
         * propiedad para el nodo que transforma los valores antes del parser
         * puede ser una funcion o un arreglo 
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
         *  metodo para devolver el componente
         *
         * @method getComponent
         * @public
         * @return {json.parse.decorator.Component} 
         * 
         */
        
        getComponent : function(){
            return this._to;
        },
        
        /**
         *  metodo para crear el componente
         *
         * @abstract
         * @method createComponent
         * @public 
         * 
         */
        
        createComponent : function(){},
        
        /**
         *  metodo para construir el reviver
         *
         * @abstract
         * @method buildReviver
         * @public 
         * 
         */
        
        buildReviver : function(){},
        
        /**
         *  metodo para construir el decorador
         *
         * @abstract
         * @method buildDecorator
         * @public 
         * 
         */
        
        buildDecorator : function(){}
    }
});