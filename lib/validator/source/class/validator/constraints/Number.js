 /**  
  * Clase para las validacion de numeros
  * 
  * @class Number
  * @static  
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.Number",
{   
    extend : validator.constraints.Constraint,
    
    /**
     * @property
     */
    properties :
    {
        /**
         * propiedad para saber si se aceptan decimales o no
         * 
         * @name _decimals
         * @protected
         * @type {Boolean}
         * 
         */
        _decimals : {}
    },
    
    /**
     * @method
     */ 
    statics :
    {   
        /**         
         * metodo para validar que el dato pasado sea un numero o una letra
         * 
         * @method validate
         * @public        
         * @param errorMessage {String}: mensaje de error
         * @param decimals {Boolean} si se aceptan decimales o no
         * @return {Boolean} si es valido el campo
         *
         */
        
        validate : function(errorMessage, decimals) {            
            return function(value){
                var constraint = new validator.constraints.Number(value);                
                constraint.setMessage(errorMessage);
                constraint.setDecimals(decimals);
                constraint.validate();
            };
        }
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param value {vars} valor a comparar
     */
    
    construct : function(value)
    {
        this._value = value;
        this._decimals = false;
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
         * 
         */
        
        validate : function(){            
            (this._decimals) ? this._decimal() : this._integer();  
        },
        
        /**
         *  metodo para establecer si se aceptan numeros decimales o no
         *
         * @method setDecimals
         * @public
         * @param decimals {Boolean} se aceptan decimales o no
         * 
         */
        
        setDecimals : function(decimals){
            this._decimals = decimals || this._decimals;
        },
        
        /**
         *  metodo para validar numeros
         *
         * @method _integer
         * @protected
         * 
         */
        
        _integer : function(){
            var pattern = /^([0-9]{1,})$/;
            var message = this._message || "Debe contener solo n"+'\u00fa'+"meros enteros!";
            if(!pattern.test(this._value) || !qx.lang.Type.isNumber(this._value)){
                throw new qx.core.ValidationError("Validation Error", message);
            }
        },
        
        /**
         *  metodo para validar numero decimales
         *
         * @method _decimal
         * @protected
         * 
         */
        
        _decimal : function(){
            var pattern = /^([0-9]+).(([0-9]+){1,})$/;
            var message = this._message || "Debe contener solo n"+'\u00fa'+"meros decimales!";
            if(!pattern.test(this._value) || !qx.lang.Type.isNumber(this._value)){
                throw new qx.core.ValidationError("Validation Error", message);
            }
        }
        
    }
});