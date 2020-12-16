 /**
  *  Clase para parsear un objeto y convertirlo a modelo de qx
  * 
  * @class Model
  * @extends json.parse.decorator.decorators.Decorator
  * @author Nilmar Sanchez Muguercia
  * @namespace json.parse.decorator.decorators
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.parse.decorator.decorators.Model",
{
    extend : json.parse.decorator.decorators.Decorator,

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
         *  metodo para transformar el dato de objeto js a modelo qx
         *
         * @method _transform
         * @protected
         * @return {qx.data.model} modelo de qx
         * 
         */
        
        _transform : function(){
            this._data = this._component.getData();
            if((typeof this._data) === "string"){
                var parse = new json.parse.decorator.decorators.Parse();
                parse.setComponent(this._component);
                this._data = parse.getData();
                this.setComponent(parse);
            }else{
                var stringify = JSON.stringify(this._data);
                var reviver = this._component.getReviver();
                this._data = JSON.parse(stringify, reviver);
            }            
            return qx.data.marshal.Json.createModel(this._data);
        }
    }
});