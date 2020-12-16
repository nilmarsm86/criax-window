 /**  
  * Clase para las validacion de que un arreglo tenga la cantidad de elementos
  * entre minimo y maximo
  * 
  * @class Count
  * @extends validator.constraints.Constraint
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.Count",
{   
    extend : validator.constraints.Constraint,
    
    /**
     * @property
     */
    properties :
    {
        /**
         * objeto del numero minimo de elementos
         * 
         * @name __minElements
         * @private
         * @type {validator.constraints.MinNumber}
         * 
         */
        __minElements : {},
        
        /**
         * objeto del numero maximo de elementos
         * 
         * @name __maxElements
         * @private
         * @type {validator.constraints.MaxNumber}
         * 
         */
        __maxElements : {}
    },
    
    /**
     * @method
     */ 
    statics :
    {   
        /**         
         * metodo para validar que el arreglo pasado tenga la cantidad de elementos
         * entre el minimo y el maximo
         * 
         * @method validate
         * @public        
         * @param errorMessage {String}: mensaje de error
         * @param minElements {Number} numero minima de elementos
         * @param maxElements {Number} numero maximo de elementos
         * @return {Function} funcion de validacion, toma como unico parametro
         * el valor a validar en este caso debe ser un arreglo obligatoriamente
         *
         */
        
        validate : function(errorMessage, minElements, maxElements) {            
            return function(value){
                var constraint = new validator.constraints.Count(value);                
                constraint.setMessage(errorMessage);
                constraint.setMinElements(minElements);
                constraint.setMaxElements(maxElements);
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
        this._value = value;
        this.__validateType();
        //si no es un arreglo no llega aqui
        this.__minElements = new validator.constraints.MinNumber(this._value.length);
        this.__maxElements = new validator.constraints.MaxNumber(this._value.length);
        
    },
    
    /**
     * @method
     */
    members :
    {
        /**
         *  metodo para validar que el tipo de dato sea un array
         *
         * @method __validateType
         * @private
         * 
         */
        
        __validateType : function(){
            var arrayType = new validator.constraints.Type(this._value);
            arrayType.setType("array");
            arrayType.validate();
        },
        
        /**
         *  metodo para validar
         *
         * @method validate
         * @public 
         * @throws {qx.core.ValidationError}
         */
        
        validate : function(){
            this.__minElements.validate();
            this.__maxElements.validate();
        },
        
        /**
         *  metodo para establecer el numero minimo de elementos
         *
         * @method setMinElements
         * @public
         * @param minElements {Number} numero minimo de elementos
         * 
         */
        
        setMinElements : function(minElements){
            this.__minElements.setMinNumber(minElements);
            this.__minElements.setDecimals(false);
        },
        
        /**
         *  metodo para establecer el numero maximo de elementos
         *
         * @method setMaxElements
         * @public
         * @param maxElements {Number} numero maximo de elementos
         * 
         */
        
        setMaxElements : function(maxElements){
            this.__maxElements.setMaxNumber(maxElements);
            this.__maxElements.setDecimals(false);
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
            var minElementsMessage = message || "Debe especificar al menos %d elemento!";//resolver el problema del plural (s)
            var maxElementsMessage = message || "No debe especificar m"+'\u00e1'+"s de %d elementos!";
            
            this.__minElements.setMessage(minElementsMessage);
            this.__maxElements.setMessage(maxElementsMessage);
            
        }
        
    }
});