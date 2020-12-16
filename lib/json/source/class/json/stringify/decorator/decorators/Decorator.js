 /**
  *  Decorador abstracto de stringify
  * 
  * @class Decorator
  * @abstract
  * @extends json.parse.decorator.Component
  * @author Nilmar Sanchez Muguercia
  * @namespace json.stringify.decorator.decorators
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.stringify.decorator.decorators.Decorator",
{
    extend : json.stringify.decorator.Component,
    type : "abstract",

    /**
     * @property
     */  
    properties :
    {
        /**
         * propiedad para el componente del decorador
         * 
         * @name _component
         * @protected
         * @type {json.stringify.decorator.Component}
         * 
         */
        _component : {},
        
        /**
         * propiedad para el dato transformado
         * 
         * @name _data
         * @protected
         * @type {var}
         * 
         */
        _data : {}
    },

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para devolver el dato original a procesar
         *
         * @method getOriginalData
         * @public
         * @return {var} dato original a procesar, puede ser Sting en caso de un
         * componente o un Objeto en caso de un decorador o un modelo qx
         * 
         */
        
        getOriginalData : function(){
            return this._component.getData();
        },
        
        /**
         *  metodo para establecer el component a decorar
         *
         * @method setComponent
         * @public
         * @param component {json.stringify.decorator.Component} componente del 
         * decorador
         * 
         */
        
        setComponent : function(component){
            criax.oop.TypeHinting.tHClass(json.stringify.decorator.Component,component);
            this._component = component;
        },
        
        /**
         *  metodo para devolver el dato procesado
         *
         * @method getData
         * @public
         * @return {Object} dato procesado
         * 
         */
        
        getData : function(){
            if(this._data === null){
                this._data = this._transform();
            }
            return this._data;
        },
        
        /**
         *  metodo para transformar el dato
         *
         * @abstract
         * @method _transform
         * @protected
         * @return {Object} dato procesado
         * 
         */
        
        _transform : function(){}
    }
});