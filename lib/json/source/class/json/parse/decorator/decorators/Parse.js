 /**
  *  Clase para parsear un string
  *  AUN ESTA PENDIENTE EL HECHO DE QUE SI EL COMPONENTE ES EL MODELO TENGO QUE 
  *  TRANSOFMRAR A OBJETO JS 
  * 
  * @class Parse
  * @extends json.parse.decorator.decorators.Decorator
  * @author Nilmar Sanchez Muguercia
  * @namespace json.parse.decorator.decorators
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.parse.decorator.decorators.Parse",
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
         *  metodo para transformar el dato de string a objeto js
         *
         * @method _transform
         * @protected
         * @return {Object} dato procesado
         * 
         */
        
        _transform : function(){
            this._data = this._component.getData();
            if((typeof this._data) !== "string"){
                //convertir el dato a objeto js plano
            }
            var reviver = this._component.getReviver();
            return JSON.parse(this._data, reviver);
        }
    }
});