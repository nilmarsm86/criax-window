 /**
  *  Que sirve como director en la construccion del componente y sus diferentes metodos 
  * 
  * @class Director
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace json.parse.builder.director
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.parse.builder.directors.Director",
{
    extend : qx.core.Object,

    /**
     * @property
     */  
    properties :
    {
        /**
         * propiedad para el builder
         * 
         * @name __builder
         * @private
         * @type {json.parse.builder.builders.Builder}
         * 
         */
        __builder : {}
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
        
    },

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para establecer el builder para construir el componente
         *
         * @method setBuilder
         * @public
         * @param builder {json.parse.builder.builders.Builder} builder
         * @throws {Error} si el componente pasado no es de tipo json.parse.decorator.Component
         * 
         */
        
        setBuilder : function(builder){
            criax.oop.TypeHinting.tHClass(json.parse.builder.builders.Builder, builder);
            this.__builder = builder;
        },
        
        /**
         *  metodo para construir el componente
         *
         * @method buildComponent
         * @public
         * 
         */
        
        buildComponent: function(){
            this.__builder.createComponent();
            this.__builder.buildReviver();
            this.__builder.buildDecorator();
        }
    }
});