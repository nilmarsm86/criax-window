 /**
  *  Clase para las violaciones de las validaciones
  * 
  * @class ConstrainViolation
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace validator.ConstrainViolation
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("validator.ConstraintViolation",
{
    extend : qx.core.Object,

    /**
     * @property
     */  
    properties :
    {
        /**
         * propiedad para el mensage de error
         * 
         * @name __errorMessage
         * @private
         * @type {String}
         * 
         */
        __errormessage : {},
        
        /**
         * propiedad para el mesaje de error conformado
         * 
         * @name __message
         * @private
         * @type {Array}
         * 
         */
        __message : {},
        
        /**
         * propiedad para el namespace en caso de que lo validado sea un objeto
         * 
         * @name __entityNamespace
         * @private
         * @type {String}
         * 
         */
        __entityNamespace : {},
        
        /**
         * propiedad para el nombre del atributo de la entidad validado
         * 
         * @name __entityAttr
         * @private
         * @type {String}
         * 
         */
        __entityAttr : {},
        
        /**
         * propiedad para el nombre del metodo de la entidad validado
         * 
         * @name __entityMethod
         * @private
         * @type {String}
         * 
         */
        __entityMethod : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param message {String} mensaje
     */

    construct : function(message)
    { 
        this.__errorMessage = message || "";
        this.__entityNamespace = "";
        this.__entityAttr = "";
        this.__entityMethod = "";
        this.__message = [];
    },

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para devovler el mensaje creado
         *
         * @method getMessage
         * @public
         * @return {String} el mensaje generado 
         * 
         */
        
        getMessage : function(){
            return this.__createMessage();
        },
        
        /**
         *  metodo para saber si existe la entidad
         *
         * @method __existEntity
         * @private
         * @return {Boolean}
         * 
         */
        
        __existEntity : function(){            
            return (this.__entityNamespace.length > 0);
        },
        
        /**
         *  metodo para saber si existe el metodo
         *
         * @method __existMethod
         * @private
         * @return {Boolean}
         * 
         */
        
        __existMethod : function(){            
            return (this.__entityMethod.length > 0);
        },
        
        /**
         *  metodo para saber si existe el atributo
         *
         * @method __existAttr
         * @private
         * @return {Boolean}
         * 
         */
        
        __existAttr : function(){            
            return (this.__entityAttr.length > 0);
        },
        
        /**
         *  metodo para crear la estructura del namespace
         *
         * @method __conformEntityNamesapceMessage
         * @private
         * 
         */
        
        __conformEntityNamesapceMessage : function(){            
            /*var entityNamespace = "";
            if(this.__existMethod() || this.__existAttr()){
                entityNamespace = this.__entityNamespace + "."
            }else{
                entityNamespace = this.__entityNamespace + ": "
            }*/
            var entityNamespace = this.__entityNamespace;
            entityNamespace += (this.__existMethod() || this.__existAttr()) ? "." : ": ";
            this.__message.push(entityNamespace);
        },
        
        /**
         *  metodo para crear la estructura del metodo
         *
         * @method __conformEntityMethodMessage
         * @private
         * 
         */
        
        __conformEntityMethodMessage : function(){
            if(this.__existMethod()){
                this.__message.push(this.__entityMethod+"(): ");
            }
        },
        
        /**
         *  metodo para crear la estructura del atributo
         *
         * @method __conformEntityAttrMessage
         * @private
         * 
         */
        
        __conformEntityAttrMessage : function(){
            if(this.__existAttr()){
                this.__message.push(this.__entityAttr+": ");
            }
        },
        
        /**
         *  metodo para generar el mensaje de error
         *
         * @method __createMessage
         * @private
         * @return {String} el mensaje
         * 
         */
        
        __createMessage : function(){
            if(this.__existEntity()){
                this.__conformEntityNamesapceMessage(); 
                this.__conformEntityMethodMessage();
                this.__conformEntityAttrMessage();
            }
            this.__message.push(this.__errorMessage);
            return this.__message.join("");
        },
        
        /**
         *  metodo para establecer el mensaje
         *
         * @method setMessage
         * @public
         * @param message {String} mensaje
         * @return {validator.ConstrainViolation}
         * 
         */
        
        setMessage : function(message){
            this.__errorMessage = message;
            return this;
        },
        
        /**
         *  metodo para establecer el namespace de la entidad validada
         *
         * @method setEntityNamespace
         * @public
         * @param entityNamespace {String} namespace
         * @return {validator.ConstrainViolation}
         * 
         */
        
        setEntityNamespace : function(entityNamespace){
            this.__entityNamespace = entityNamespace; 
            return this;
        },
        
        /**
         *  metodo para establecer el nombre del metodo de la entidad validada
         *
         * @method setEntityMethod
         * @public
         * @param entityMethod {String} nombre del metodo
         * @return {validator.ConstrainViolation}
         * 
         */
        
        setEntityMethod : function(entityMethod){
            this.__entityMethod = entityMethod; 
            return this;
        },
        
        /**
         *  metodo para establecer el nombre del atributo de la entidad validada
         *
         * @method setEntityAttr
         * @public
         * @param entityAttr {String} nombre del atributo
         * @return {validator.ConstrainViolation}
         * 
         */
        
        setEntityAttr : function(entityAttr){
            this.__entityAttr = entityAttr; 
            return this;
        }
    }
});