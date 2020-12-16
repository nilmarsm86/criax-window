 /**  
  * Clase para las validacion de que el valor pasado este entre una de las opciones
  * 
  * @class Choice
  * @extends validator.constraints.Constraint
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.Choice",
{   
    extend : validator.constraints.Constraint,
    
    /**
     * @property
     */
    properties :
    {
        /**
         * posibles valores
         * 
         * @name __choices
         * @protected
         * @type {var}
         * 
         */
        __choices : {}
    },
    
    /**
     * @method
     */ 
    statics :
    {   
        /**         
         * metodo para validar que el dato pasado sea igual que la comparacion
         * no estricta
         * 
         * @method validate
         * @public        
         * @param errorMessage {String}: mensaje de error, posee uno por defecto
         * @param choices {Array} posibles valores
         * @return {Function} funcion de validacion, toma como unico parametro
         * el valor a validar
         *
         */
        
        validate : function(errorMessage, choices) {            
            return function(value){
                var constraint = new validator.constraints.Choice(value);                
                constraint.setMessage(errorMessage);
                constraint.setChoices(choices);
                constraint.validate();
            };
        }
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param value {var} valor a validar
     */
    
    construct : function(value)
    {
        this._message = "Seleccione una opci"+'\u00f3'+"n!";        
        this._value = value;        
    },
    
    /**
     * @method
     */
    members :
    {
        /**
         *  metodo para validar
         *
         * @method validate
         * @public 
         * @throws {qx.core.ValidationError}
         */
        
        validate : function(){
            if(this.__choices.indexOf(this._value) === -1){
                throw new qx.core.ValidationError("Validation Error", this._message);
            }
        },
        
        /**
         *  metodo para establecer los posibles valores
         *
         * @method setChoices
         * @public
         * @param choices {Array} posibles valores
         * 
         */
        
        setChoices : function(choices){
            this.__choices = choices;
        }
        
    }
});