 /**  
  * Clase para las validacion de ip
  * 
  * @class Ip
  * @extends validator.constraints.Constraint
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.Ip",
{   
    extend : validator.constraints.Constraint,
    
    /**
     * @property
     */
    properties :
    {
        /**
         * propiedad para la version de ip
         * 
         * @name __version
         * @private
         * @type {Number}
         * @default 4
         * 
         */
        __version : {}
    },
    
    /**
     * @method
     */ 
    statics :
    {   
        /**         
         * metodo para validar que el dato pasado sea un ipv4
         * 
         * @method validate
         * @public        
         * @param errorMessage {String}: mensaje de error, posee uno por defecto
         * @param version {Number?4} version del ip
         * @return {Function} funcion de validacion, toma como unico parametro
         * el valor a validar
         *
         */
        
        validate : function(errorMessage, version) {            
            return function(value){
                var constraint = new validator.constraints.Ip(value); 
                constraint.setVersion(version);
                constraint.setMessage(errorMessage);
                constraint.validate();
            };
        },
        
        /**
         * constante de la version 4 de ip
         * 
         * @name IPV4         
         * @type {Number}
         * 
         */
        IPV4 : 4,
        
        /**
         * constante de la version 6 de ip
         * 
         * @name IPV6         
         * @type {Number}
         * 
         */
        IPV6 : 6
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
        this._message = "Direcci"+'\u00f3'+"n Ipv4 incorrecta!";
        this._pattern = /^(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/;        
        this._value = value;
        this.__version = 4;
    },
    
    /**
     * @method
     */
    members :
    {
        /**
         *  metodo para establecer la version del ip
         *
         * @method setVersion
         * @public
         * @param version {Number} version del ip
         * 
         */
        
        setVersion : function(version){
            this.__version = version;
        },
        
        /**
         *  metodo para validar el ip
         *
         * @method validate
         * @public 
         * 
         */
        
        validate : function(){
            if(this.__version === 4){
                this._message = "Direcci"+'\u00f3'+"n Ipv4 incorrecta!";
                return validator.constraints.Ipv4.validate(this._message);
            }
            
            if(this.__version === 6){
                this._message = "Direcci"+'\u00f3'+"n Ipv6 incorrecta!";
                return validator.constraints.Ipv6.validate(this._message);
            }            
            this.base(arguments);
        }
    }
});