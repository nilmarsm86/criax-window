 /**  
  * Clase para las validacion de protocolos
  * 
  * @class Protocol
  * @extends validator.constraints.Constraint
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.Protocol",
{   
    extend : validator.constraints.Constraint,
    
    /**
     * @property
     */
    properties :
    {
        /**
         * propiedad para el nombre del protocolo
         * 
         * @name __protocol
         * @private
         * @type {String}
         * 
         */
        __protocol : {}
    },
    
    /**
     * @method
     */ 
    statics :
    {   
        /**         
         * metodo para validar que el dato pasado sea del protocolo especificado
         * 
         * @method validate
         * @public        
         * @param errorMessage {String}: mensaje de error, posee uno por defecto
         * @param protocol {String} protocolo
         * @return {Function} funccion de validacion, toma como unico parametro
         * el valor a validar
         *
         */
        
        validate : function(errorMessage, protocol) {            
            return function(value){
                var constraint = new validator.constraints.Protocol(value);                
                constraint.setMessage(errorMessage);
                constraint.setProtocol(protocol);
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
        this._message = "Direcci"+'\u00f3'+"n %s incorrecta!";
        this._value = value;
    },
    
    /**
     * @method
     */
    members :
    {
        /**
         *  metodo para establecer el protocolo
         *
         * @method setProtocol
         * @public
         * @param protocol {String} nombre del protocolo
         * 
         */
        
        setProtocol : function(protocol){
            this.__protocol = protocol;
        },
        
        /**
         *  metodo para validar basado en el patron
         *
         * @method validate
         * @public 
         * @throws {qx.core.ValidationError}
         * 
         */
        
        validate : function(){            
            this._message = this._message.replace('%s',this.__protocol);
            //var expresionPattern = "^(\%s):\/\/[a-zA-Z0-9_ \/-\/.\/:]$";
            var expresionPattern = "^(\%s):\/\/[a-zA-Z0-9_ \/-\/.\/:]";            
            this._pattern = new RegExp(expresionPattern.replace('%s',this.__protocol));
            this.base(arguments);
        }
    }
});