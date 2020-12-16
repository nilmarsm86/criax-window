 /**
  *  Abstraccion para los constructores
  * 
  * @class Builder
  * @abstract
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace json.stringify.builder.builders
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.stringify.builder.builders.Builder",
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
         * propiedad para el nodo que transforma los valores antes del stringify
         * puede ser un arreglo o una funcion 
         * 
         * @name _replacer
         * @protected
         * @type {Function}
         * 
         */
        _replacer : {},
        
        /**
         * propiedad para el espacio del stringify
         * 
         * @name _space
         * @protected
         * @type {Number}
         * 
         */
        _space : {},
        
        /**
         * propiedad para el modelo Qx a transformar
         * 
         * @name _modelQx
         * @protected
         * @type {}
         * 
         */
        _modelQx : {}
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
         *  metodo para construir el replacer
         *
         * @abstract
         * @method buildReplacer
         * @public 
         * 
         */
        
        buildReplacer : function(){},
        
        /**
         *  metodo para construir el decorador
         *
         * @abstract
         * @method buildDecorator
         * @public 
         * 
         */
        
        buildDecorator : function(){},
        
        /**
         *  metodo para construir el espacio
         *
         * @abstract
         * @method buildSpace
         * @public 
         * 
         */
        
        buildSpace : function(){}
    }
});