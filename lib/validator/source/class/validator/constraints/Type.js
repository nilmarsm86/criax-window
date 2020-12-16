 /**  
  * Clase para las validacion de tipo de dato
  * 
  * @class Type
  * @static  
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.Type",
{   
    extend : validator.constraints.Constraint,
    
    /**
     * @property
     */
    properties :
    {
        /**
         * propiedad para el tipo de dato
         * 
         * @name __type
         * @private
         * @type {String}
         * 
         */
        __type : {}
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
         * @param type {Stirng} tipo de dato
         * @return {Boolean} si es valido el campo
         *
         */
        
        validate : function(errorMessage, type) {            
            return function(value){
                var constraint = new validator.constraints.Type(value);                
                constraint.setMessage(errorMessage);
                constraint.setType(type);
                constraint.validate();
            };
        },
        
        STRING : "__stringType",
        NUMBER : "__numberType",
        UNDEFINED : "__undefinedType",
        NULL : "__nullType",
        OBJECT : "__objectType",
        BOOLEAN : "__booleanType",
        FUNCTION : "__functionType",
        ARRAY : "__arrayType",
        REGEXP : "__regexpType",
        ERROR : "__errorType",
        DATE : "__dateType"
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param value {var} valor
     */
    
    construct : function(value)
    {
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
         * 
         */
        
        validate : function(){
            var constraint;
            if((typeof this[this.__type]) !== 'function'){                
                throw new qx.core.ValidationError("Validation Error", "El tipo de dato " + this.__type + " no existe!");
            }
            constraint = this[this.__type]();
            constraint(this._value);
        },
        
        /**
         *  metodo para crear la funcion del constraint
         *
         * @method __constraintCallback
         * @private
         * @param callback {Function} callback del constraint
         * @return {Function} constraint
         * 
         */
        
        __constraintCallback : function(callback){
            var message = this._message;
            return function(value){                       
                       if(!callback(value)){
                           throw new qx.core.ValidationError("Validation Error", message);
                       }
                   };
        },
        
        /**
         *  metodo para establecer el tipo de dato
         *
         * @method setType
         * @public
         * @param type {String} tipo de dato, admitidos, aunque no coinciden 
         * exactamente con los tipos de datos de JS
         * (string, number, undefined, null, object, boolean, function, array, 
         * regexp, error, date)
         * 
         */
        
        setType : function(type){
            this.__type = type;
        },
        
        /**
         *  metodo para validar que sea un string
         *
         * @method __stringType
         * @private
         * @return {Function}
         */
        
        __stringType : function(){
            this._message = this._message || "Debe ser un string!";
            return this.__constraintCallback(function(value){                        
                return ((typeof value) === "string" && Boolean(qx.lang.Type.isString(value)));
            });
        },
        
        /**
         *  metodo para validar que sea un numero
         *
         * @method __numberType
         * @private
         * @return {Function}
         * 
         */
        
        __numberType : function(){
            this._message = this._message || "Debe ser un n"+'\u00fa'+"mero!";                    
            return this.__constraintCallback(function(value){
                return (
                    value !== null && (
                    (qx.Bootstrap.getClass(value) == "Number" || 
                    value instanceof Number) && 
                    (typeof value) === "number")
                );
            });
        },
        
        /**
         *  metodo para validar que sea undefined
         *
         * @method __undefinedType
         * @private
         * @return {Function}
         * 
         */
        
        __undefinedType : function(){
            this._message = this._message || "Debe ser indefinido!";
            return this.__constraintCallback(function(value){
                return (typeof value) === "undefined";
            });
        },
        
        /**
         *  metodo para validar que sea null
         *
         * @method __nullType
         * @private
         * @return {Function}
         * 
         */
        
        __nullType : function(){
            return validator.constraints.IsNull.validate(this._message);
        },
        
        /**
         *  metodo para validar que es un objeto
         *
         * @method __objectType
         * @private
         * @return {Function}
         * 
         */
        
        __objectType : function(){
            this._message = this._message || "Debe ser un objeto!";                    
            return this.__constraintCallback(qx.lang.Type.isObject);    
        },
        
        /**
         *  metodo para validar que sea un booleano
         *
         * @method __booleanType
         * @private
         * @return {Function}
         * 
         */
        
        __booleanType : function(){
            this._message = this._message || "Debe ser un booleano!";                    
            return this.__constraintCallback(function(value){
                return (
                    value !== null && (
                    qx.Bootstrap.getClass(value) == "Boolean" ||
                    value instanceof Boolean) &&
                    (typeof value) === "boolean"
                );
            });
        },
        
        /**
         *  metodo para validar que es una funcion
         *
         * @method __functionType
         * @private
         * @return {Function}
         * 
         */
        
        __functionType : function(){
            this._message = this._message || "Debe ser una funci"+'\u00f3'+"n!";                    
            return this.__constraintCallback(function(value){                        
                return ((typeof value) === "function" && Boolean(qx.lang.Type.isFunction(value)));
            });
        },
        
        /**
         *  metodo para validar que es un array
         *
         * @method __arrayType
         * @private
         * @return {Function}
         * 
         */
        
        __arrayType : function(){
            this._message = this._message || "Debe ser un arreglo!";                    
            return this.__constraintCallback(qx.lang.Type.isArray);
        },
        
        /**
         *  metodo para validar que es una expresion regular
         *
         * @method __regexpType
         * @private
         * @return {Function}
         * 
         */
        
        __regexpType : function(){
            this._message = this._message || "Debe ser una expresi"+'\u00f3'+"n regular!";                    
            return this.__constraintCallback(function(value){
                return (qx.Bootstrap.getClass(value) == "RegExp" && value instanceof RegExp);
            });
        },
        
        /**
         *  metodo para validar que es un error
         *
         * @method __errorType
         * @private
         * @return {Function}
         * 
         */
        
        __errorType : function(){
            this._message = this._message || "Debe ser un error!";                    
            return this.__constraintCallback(function(value){
                return (
                    value !== null && (
                    qx.Bootstrap.getClass(value) == "Error" ||
                    value instanceof Error)
                );
            });
        },
        
        /**
         *  metodo para validar que es un objeto de tipo Date
         *
         * @method __dateType
         * @private
         * @return {Function}
         * 
         */
        
        __dateType : function(){
            return validator.constraints.Date.validate(this._message);
        }
        
    }
});