 /**
  *  Clase padre de los constraint
  * 
  * @class Constraint
  * @abstract
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace validator.constraints
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("validator.constraints.Constraint",
{
    extend : qx.core.Object,
    type : "abstract",

    /**
     * @property
     */  
    properties :
    {
        /**
         * propiedad para el mensaje de error
         * 
         * @name _message
         * @protected
         * @type {String}
         * 
         */
        _message : {},
        
        /**
         * propiedad para el patron de la validacion
         * 
         * @name _pattern
         * @protected
         * @type {RegExp}
         * 
         */
        _pattern : {},
        
        /**
         * propiedad para el valor a validar
         * 
         * @name _value
         * @protected
         * @type {var}
         * 
         */
        _value : {}
    },
    

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para validar basado en el patron
         *
         * @method validate
         * @public 
         * @throws {qx.core.ValidationError}
         * 
         */
        
        validate : function(){
            if(!this._pattern.test(this._value)){
                throw new qx.core.ValidationError("Validation Error", this._message);
            }
        },
        
        /**
         *  metodo para establecer el mensaje de error
         *
         * @method setMessage
         * @public
         * @param message {String} mensaje de error
         * 
         */
        
        setMessage : function(message){
            this._message = message || this._message;
        },
        
        /**
         *  metodo para establecer el patron de validacion
         *
         * @method setPattern
         * @public
         * @param pattern {RegExp} patron de validacion
         * 
         */
        
        setPattern : function(pattern){
            var regExpConstraint = validator.constraints.Type.validate("El patr"+'\u00f3'+"n debe ser una expresi"+'\u00f3'+"n regular!", "regexp");
            regExpConstraint(pattern);
            this._pattern = pattern;
        }
    }
});