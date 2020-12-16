 /**
  *  Clase para transformar un objeto js en string
  *  VERIFICAR QUE EL COMPONENTE PAASADO NO SEA ModelData
  * 
  * @class Stringify
  * @extends json.stringify.decorator.decorators.Decorator
  * @author Nilmar Sanchez Muguercia
  * @namespace json.stringify.decorator.decorators
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.stringify.decorator.decorators.Stringify",
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
         * @return {String}
         * 
         */
        
        _transform : function(){
            this._data = this._component.getData();
            var replacer = this._component.getReplacer();
            var space = this._component.getSpace();
            return JSON.stringify(this._data, replacer, space);
        }
    }
});