 /**
  *  Decorador para convertir un modelo qx a objeto js
  * 
  * @class ModelToJs
  * @extends json.stringify.decorator.decorators.Decorator
  * @author Nilmar Sanchez Muguercia
  * @namespace json.stringify.decorator.decorators
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.stringify.decorator.decorators.ModelToJs",
{
    extend : json.stringify.decorator.decorators.Decorator,

    /**
     * @property
     */  
    properties :
    {
        
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * 
     */

    construct : function()
    { 
        this._data = null;
    },

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para transformar el dato de modelo qx a json
         *
         * @method _transform
         * @protected
         * @return {Object} json
         * 
         */
        
        _transform : function(){
            this._data = this._component.getData();            
            var result = this.__isObject(this._data);
            var replacer = this._component.getReplacer();
            var space = this._component.getSpace();
            var stringify = JSON.stringify(result, replacer, space);
            return JSON.parse(stringify);            
        },
        
        /**
         *  metodo para transformar el dato de modelo qx a json
         *
         * @method _transform
         * @private
         * @param data {Object} parte del modelo a transformar 
         * @return {Object} json
         * 
         */
        
        __isObject : function(data){
            var model = {};
            for(var key in data){
                var posUser = key.indexOf("$$user_");
                if(qx.lang.Type.isObject(this._data[key])){
                    if(posUser !== -1){
                        model[key.substring(7)] = this.__isObject(data[key]);                        
                    }    
                }else{
                    if(qx.lang.Type.isArray(data[key])){
                        return this.__isArray(data[key]);                    
                    }else{
                        if(posUser !== -1){
                            if(key !== '$$user_autoDisposeItems'){
                                model[key.substring(7)] = data[key];
                            }
                        }
                    }
                } 
            }
            return model;
        },
        
        /**
         * Transformar un modelo con un arreglo dentro
         * 
         * @param model {Array} parte del modelo a transformar
         * @return {Array}
         */
        
        __isArray : function(model){
            var arr = [];
            for(var i=0;i<model.length;i++){
                if(qx.lang.Type.isObject(model[i])){
                    arr.push(this._transform(model[i]));
                }else if(qx.lang.Type.isArray(model[i])){
                    arr.push(this.__isArray(model[i]));
                }else{
                    arr.push(model[i]);
                }
            }
            return arr;
        }
    }
});