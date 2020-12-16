 /**
  *  Constructor para pasar de un modelo Qx a un objeto js
  * 
  * @class ModelToJs
  * @extends json.stringify.builder.builders.Builder
  * @author Nilmar Sanchez Muguercia
  * @namespace json.stringify.builder.builders
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.stringify.builder.builders.ModelToJs",
{
    extend : json.stringify.builder.builders.Builder,

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
     * @param modelQx {qx.data.model} modelo Qx
     * @param replacer {Function?null} replacer de stringify
     * @param space {Number?0} space de stringify
     */

    construct : function(modelQx, replacer, space)
    { 
        this._modelQx = modelQx;
        this._replacer = replacer || null;
        this._space = space || 0;
    },

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para crear el componente
         *
         * @abstract
         * @method createComponent
         * @public 
         * 
         */
        
        createComponent : function(){
            this._from = new json.stringify.decorator.components.ModelData(this._modelQx);
        },
        
        /**
         *  metodo para construir el replacer
         *
         * @abstract
         * @method buildReplacer
         * @public 
         * 
         */
        
        buildReplacer : function(){
            this._from.setReplacer(this._replacer);            
        },
        
        /**
         *  metodo para construir el space
         *
         * @abstract
         * @method buildSpace
         * @public 
         * 
         */
        
        buildSpace : function(){
            this._from.setSpace(this._space);            
        },
        
        /**
         *  metodo para construir el decorador
         *
         * @abstract
         * @method buildDecorator
         * @public 
         * 
         */
        
        buildDecorator : function(){
            this._to = new json.stringify.decorator.decorators.ModelToJs();
            this._to.setComponent(this._from);
        }
    }
});