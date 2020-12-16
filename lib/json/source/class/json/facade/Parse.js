 /**
  *  Clase Fachada para el subsistema
  * 
  * @class Parse
  * @extends json.facade.Transform
  * @author Nilmar Sanchez Muguercia
  * @namespace json.facade
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.facade.Parse",
{
    extend : json.facade.Transform,

    /**
     * @property
     */  
    properties :
    {
        /**
         * propiedad para el reviver
         * 
         * @name __reviver
         * @private
         * @type {Function?null}
         * 
         */
        __reviver : {},
        
        /**
         * propiedad para saber si sera un modelo
         * 
         * @name __model
         * @private
         * @type {Boolean?false}
         * 
         */
        __model : {}
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
        this.__value = "";
        this.__reviver = null;
        this.__model = false;
        this._builder = null;
        this._file = false;
    },

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para fabricar el builder
         *
         * @method _getComponentBuilder
         * @protected
         * @throws {Error}
         * @return {json.parse.builder.builders.Builder}
         * 
         */
        
        _getComponentBuilder : function(){            
            if(this._file && this.__model){
                return new json.parse.builder.builders.FileToModel(this._value, this.__reviver);
            }
            
            if(!this._file && !this.__model){
                return new json.parse.builder.builders.StringToParse(this._value, this.__reviver);
            }
            
            if(this._file && !this.__model){
                return new json.parse.builder.builders.FileToParse(this._value, this.__reviver);
            }
            
            if(!this._file && this.__model){
                return new json.parse.builder.builders.StringToModel(this._value, this.__reviver);
            }
            throw new Error('There is not a builder defined');
        },
        
        /**
         *  metodo para realizar el parse
         *
         * @method parse
         * @public
         * @return {Object}
         * 
         */
        
        parse : function(){
            return this._transform(new json.parse.builder.directors.Director());
        },
        
        /**
         *  metodo para establecer el reviver
         *
         * @method setReviver
         * @public
         * @param reviver {Function} reviver
         * @return {json.facade.Parse}
         * 
         */
        
        setReviver : function(reviver){
            this.__reviver = reviver;
            return this;
        },
        
        /**
         *  metodo para establecer si sera un modelo o no
         *
         * @method setModel
         * @public
         * @param model {Boolean}
         * @return {json.facade.Parse}
         * 
         */
        
        setModel : function(model){
            this.__model = model;
            return this;
        }
    }
});