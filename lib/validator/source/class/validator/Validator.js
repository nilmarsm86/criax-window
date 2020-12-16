 /**
  *  Clase del Validador
  * 
  * @class Validator
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace validator
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("validator.Validator",
{
    extend : qx.core.Object,

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
         *  metodo para validar un valor primitivo
         *
         * @method validateValue
         * @public
         * @param value {var} valor a validar
         * @param constraints {Array} constrains contra los cuales
         * validar, recive un solo parametro el valor, en caso de error debe 
         * lanzar una excepcion qx.core.ValidationError, se puede pasar uno solo         
         * @param entityData {Object?{}} metadatos de la entidad a validar 
         * @return {Array} violaciones
         * 
         */
        
        validateValue : function(value, constraints, entityData){            
            var violations = [];
            entityData = entityData || {"entityNamespace":"", "entityMethod":"", "entityAttr":""};            
            
            if(Array.isArray(constraints)){                
                violations = [].concat(this.__arrayConstraints(value, constraints, entityData));
            }
            
            if((typeof constraints) === "function"){
                var violation = this.__againstOneConstraint(value, constraints, entityData); 
                if(violation !== null){
                    violations.push(violation);
                }
            }
            return violations;
        },
        
        /**
         *  metodo para ejecutar los constraints si son varios
         *
         * @method __arrayConstraints
         * @private
         * @param value {var} valor a validar
         * @param constraints {Array} constrains contra los cuales
         * validar, recive un solo parametro el valor, en caso de error debe 
         * lanzar una excepcion qx.core.ValidationError, se puede pasar uno solo
         * @param entityData {Object?{}} metadatos de la entidad a validar
         * @return {Array} violaciones
         * 
         */
        
        __arrayConstraints : function(value, constraints, entityData){
            var violations = [];
            for(var i=0;i<constraints.length;i++){                    
                var violation = this.__againstOneConstraint(value, constraints[i], entityData);
                if(violation !== null){
                    violations.push(violation);
                }
            }
            return violations;
        },
        
        /**
         *  metodo para validar contra un constraint
         *
         * @method __againstOneConstraint
         * @private
         * @param value {var} valor a validar
         * @param constraint {Function} constraint contra el cual validar, 
         * recive un solo parametro el valor, en caso de error debe lanzar una 
         * excepcion qx.core.ValidationErrors
         * @param entityData {Object?{}} metadatos de la entidad a validar
         * @return {validator.ConstraintViolation} or null
         * 
         */
        
        __againstOneConstraint : function(value, constraint, entityData){
            entityData = entityData || {"entityNamespace":"", "entityMethod":"", "entityAttr":""};            
            try{
                constraint(value);
            }catch(Exception){                
                var constraintViolation = new validator.ConstraintViolation(Exception.message);
                constraintViolation.setEntityNamespace(entityData.entityNamespace);
                constraintViolation.setEntityMethod(entityData.entityMethod);
                constraintViolation.setEntityAttr(entityData.entityAttr);
                return constraintViolation;
            }
            return null;
        },
        
        /**
         *  metodo para validar una entidad, mediante mapeo
         *  
         *  {
                clazz : "app.entity.Entidad",
                fields :
                {
                    atributo : {            
                        column:"columna",
                        ...
                        visibility: private,
                        constraints : [
                            validator.constraints.String.validate("message"),
                            validator.constraints.Email.validate()
                        ]
                    },
                },
                getters : 
                {
                    method : {            
                        constraints : [
                            validator.constraints.String.validate("message"),
                            validator.constraints.Email.validate("message", true)                            
                        ]
                    }, 
                }
            },
         *
         * @method validate
         * @public
         * @param entity {qx.core.Object} entidad a validar
         * @param map {Object?null} mapeo de la entidad para la validacion
         * @return {Array}
         * 
         */
        
        validate : function(entity, map){
            var violations = [];
            map = map || null;
            //si el mapa no se pasa obtenerlo del archivo de mapeo de validacion
            if(map.fields !== undefined){
                violations = violations.concat(this.__iterateAttr(entity, map.fields));                
            }
            
            if(map.getters !== undefined){
                violations = violations.concat(this.__iterateMethod(entity, map.getters));
            }
            
            return violations;
        },
        
        /**
         *  metodo para validar las propiedades publicas de una entidad
         *  EN CASO DE QUE EL ATRIBUTO TENGA UN GETTER UTILIZAR EL MISMO PARA
         *  VALIDAR EL VALOR DEVUELTO
         *  
         *  fields :
            {
                atributo : {            
                    column:"columna",
                    ...
                    visibility: private,
                    constraints : [
                        validator.constraints.String.validate("message"),
                        validator.constraints.Email.validate()
                    ]
                },
            },
         *
         * @method __iterateAttr
         * @private
         * @param entity {qx.core.Object} entidad a validar
         * @param attrMap {Object} mapeo de los atributos
         * @return {Array} constraints violations de las propiedades
         * 
         */
        
        __iterateAttr : function(entity, attrMap){
            var violations = [];
            for(var field in attrMap){                
                if(entity[field] !== undefined){                    
                    if(attrMap[field].visibility === 'private' || attrMap[field].visibility === 'protected'){                        
                        if(attrMap[field].accessor !== undefined){
                            //ejecutar para el metodo accesor
                            // crear la configuracion del mapa de metodos y agregarle los constrains del atributo
                        }else{
                            //como no tiene metodo accesor definido, se debe buscar en getAttr, isAttr, hasAttr
                            //en caso de que no exista ninguno de esos metodos se lanza un error
                            if(entity["get"+field] !== undefined){
                            
                            }
                            
                            if(entity["is"+field] !== undefined){
                            
                            }
                            
                            if(entity["has"+field] !== undefined){
                            
                            }
                        }
                    }else{
                        var constraints = attrMap[field].constraints; //transformar los constrains para que puedan ser utilizados
                        //poner los constraints de esta manera deben ser funciones
                        var entityData = {"entityNamespace":entity.classname, "entityMethod":"", "entityAttr":field};
                        violations = violations.concat(this.validateValue(entity[field],constraints, entityData));
                    }
                }                
            }
            return violations;
        },
        
        /**
         *  metodo para validar los metodos de la entidad
         *  VERIFICAR QUE EL NOMBRE DEL METODO COMIENZA CON GET, IS, HAS
         *  PORQUE LIMITARME SOLO A ESTOS METODOS ESTE ES EL ESTANDAR
         *  ESTO DEBE SER PARA LAS PROPIEDADES PROTEGIDAS O PUBLICAS
         *  
         *  getters : 
            {
                method : {            
                    constraints : [
                        validator.constraints.String.validate("message"),
                        validator.constraints.Email.validate("message", true)                            
                    ]
                }, 
            }
         *
         * @method __iterateMethod
         * @private
         * @param entity {qx.core.Object} entidad a validar
         * @param methodsMap {Object} mapeo de los metodos
         * @return {Array} constraints violations de los metodos
         * 
         */
        
        __iterateMethod : function(entity, methodsMap){
            var violations = [];
            for(var method in methodsMap){                
                if((typeof entity[method]) === "function"){                    
                    var constraints = methodsMap[method].constraints; //transformar los constrains para que puedas ser utilizados
                    var entityData = {"entityNamespace":entity.classname, "entityMethod":method, "entityAttr":""};
                    violations = violations.concat(this.validateValue(entity[method](),constraints, entityData));
                }
                
            }
            return violations;
        }
    }
});