 /**  
  * Clase para el Unit of Work
  * 
  * @class UnitOfWork
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.UnitOfWork",
{
    extend : qx.core.Object,
    type : "singleton",
    include : [cormx.opm.MPersistence],
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * arreglo de nuevas entidades
         * 
         * @name __newEntities
         * @private
         * @type {Array}
         * 
         */
        __newEntities : {},
        
        /**
         * arreglo de las entidades a actualizar
         * 
         * @name __updateEntities
         * @private
         * @type {Array}
         * 
         */
        __updateEntities : {},
        
        /**
         * arreglo de las entidades a eliminar
         * 
         * @name __deleteEntities
         * @private
         * @type {Array}
         * 
         */
        __deleteEntities : {},
        
        /**
         * propiedad para el arreglo de mappers de las entidades
         * 
         * @name __mapperEntitys
         * @private
         * @type {Array}
         * 
         */
        __mapperEntities : {}
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  comprobar que no esta en la lista de los que hay que actualizar
         *
         * @method __notInUpdate
         * @private         
         * @param entity {Object}: entidad a comprobar
         * @return {Boolean} esta o no esta
         * 
         */ 
                      
        __notInUpdate : function(entity){
            if(this.__updateEntities.indexOf(entity) != -1){
                return true;
            }
            return false;
        },
        
        /**
         *  comprobar que no esta en la lista de los que hay que eliminar
         *
         * @method __notInRemoved
         * @private         
         * @param entity {Object}: entidad a comprobar
         * @return {Boolean} esta o no esta
         * 
         */ 
                      
        __notInRemoved : function(entity){
            if(this.__deleteEntities.indexOf(entity) != -1){
                return true;
            }
            return false;
        },
        
        /**
         *  comprobar que no esta en la lista de los nuevos
         *
         * @method __notInNew
         * @private         
         * @param entity {Object}: entidad a comprobar
         * @return {Boolean} esta o no esta
         * 
         */ 
                      
        __notInNew : function(entity){
            if(this.__newEntities.indexOf(entity) != -1){
                return true;
            }
            return false;
        },
        
        /**
         *  comprobar si el id de la entidad es nulo
         *
         * @method __idNotNull
         * @private         
         * @param entity {Object}: entidad a comprobar
         * @return {Boolean} true/false
         * 
         */ 
                      
        __idNotNull : function(entity){            
            var accessor = this.__getMapper(entity).getClassMapper().getAttributeId().getAccessor();
            if(entity[accessor]() != null || entity[accessor]() != undefined){
                return true;
            }
            return false;
        },
        
        /**
         *  metodo para inicializar los arreglos de entidades
         *
         * @method init
         * @public
         * @return {UnitOfWork}
         * 
         */ 
                      
        init : function(){
            this.__newEntities = [];
            this.__updateEntities = [];
            this.__deleteEntities = [];
            this.__mapperEntities = {};
            return this;
        },
        
        /**
         *  obtener la instancia del mapper de la entidad
         *
         * @method __getMapper
         * @public         
         * @param entity {Object}: entidad a comprobar
         * @return {cormx.opm.mapper.Mapper} el mapper de la entidad
         * 
         */ 
                      
        __getMapper : function(entity){
            if(this.__mapperEntities[entity['classname']] == undefined){                
                var mapperInstance = this.transformName(entity,"mapper").getInstance();            
                mapperInstance.init(entity);    
                this.__mapperEntities[entity['classname']] = mapperInstance;                
            }
            return this.__mapperEntities[entity['classname']];
        },
        
        /**
         *  persistir la entidad nueva en local<br />
         *  <b>throw</b>
         *
         * @method __registerNew
         * @private         
         * @param entity {Object}: entidad a comprobar
         * @throws {Error}
         * @return {Boolean} si es correcto o no
         * 
         */ 
                      
        __registerNew : function(entity){            
            if(!this.__idNotNull(entity)){
                if(!this.__notInUpdate(entity)){
                    if(!this.__notInRemoved(entity)){
                        if(!this.__notInNew(entity)){
                            this.__newEntities.push(entity);
                            return true;
                        }else{
                            throw new Error("The entity "+entity.classname+" is ready to insert!");
                        }
                    }else{
                        throw new Error("The entity "+entity.classname+" is ready to delete!");
                    }
                }else{
                    throw new Error("The entity "+entity.classname+" is ready to update!");    
                }
            }else{
                throw new Error("Id not null for the new enity "+entity.classname+"!");            
            }
        },
        
        /**
         *  persistir la entidad actualizada en local<br />
         *  <strong>throw</strong>
         *
         * @method __registerUpdate
         * @private         
         * @param entity {Object}: entidad a comprobar
         * @throw {Error}
         * @return {Boolean} si es correcto o no
         * 
         */ 
                      
        __registerUpdate : function(entity){
            if(this.__idNotNull(entity)){
                if(!this.__notInRemoved(entity)){
                    if(!this.__notInNew(entity)){
                        if(!this.__notInUpdate(entity)){
                            this.__updateEntities.push(entity);
                            //cambio en el identity-map
                            var mapper = this.__getMapper(entity);
                            mapper.getChangeIdentityMap().changeIM(entity);
                            return true;
                        }else{
                            throw new Error("The entity "+entity.classname+" is ready to update!");
                        }
                    }else{
                        throw new Error("The entity "+entity.classname+" is ready to insert!");
                    }
                }else{
                    throw new Error("The entity "+entity.classname+" is ready to delete!");
                }
            }else{
                throw new Error("Id null for the enity "+entity.classname+" to update!");
            }
        },
        
        /**
         *  persistir la entidad a eliminar en local
         *
         * @method registerRemoved
         * @public         
         * @param entity {Object}: entidad a comprobar
         * @throws {Error}
         * @return {UnitOfWork}
         * 
         */ 
                      
        registerRemoved : function(entity){
            if(this.__idNotNull(entity)){
                this.__listRemove(this.__newEntities,entity);
                this.__listRemove(this.__updateEntities,entity);
                if(!this.__notInRemoved(entity)){
                    this.__deleteEntities.push(entity);
                    //elimino en el identity-map
                    var mapper = this.__getMapper(entity);
                    mapper.getChangeIdentityMap().removeIM(entity);
                    return this;
                }else{
                    throw new Error("The entity "+entity.classname+" is ready to delete!");
                }
            }else{
                throw new Error("Id null for the enity "+entity.classname+" to delete!");
            }
        },
        
        /**
         *  eliminar un elemento de una lista(listaNuevo, listaActualizar, listaEliminar)
         *
         * @method __listRemove
         * @private
         * @param list {Array}: arreglo de entities
         * @param entity {Object}: objeto de la entidad
         * @return {Boolean} true/false
         * 
         */ 
                      
        __listRemove : function(list,entity){
            var place = list.indexOf(entity);
            if(place != -1){
                list[place] = null;
                return true;
            }
            return false;
        },
        
        /**
         *  insertar las entidades
         *  se comunica con el mapper
         *
         * @method __insert
         * @public
         * 
         */ 
                      
        __insert : function(){                        
            for(var i=0;i<this.__newEntities.length;i++){
                var entity = this.__newEntities[i];
                this.__getMapper(entity).insert(entity);                
            }
        },
        
        /**
         *  actualizar las entidades
         *  se comunica con el mapper
         *
         * @method __update
         * @public
         * 
         */ 
                      
        __update : function(){            
            for(var i=0;i<this.__updateEntities.length;i++){
                var entity = this.__updateEntities[i];
                this.__getMapper(entity).update(entity);                
            }
        },
        
        /**
         *  eliminar las entidades
         *  se comunica con el mapper
         *
         * @method __delete
         * @public
         * 
         */ 
                      
        __delete : function(){            
            for(var i=0;i<this.__deleteEntities.length;i++){
                var entity = this.__deleteEntities[i];
                this.__getMapper(entity).remove(entity);                
            }
        },
        
        /**
         *  registrar en nuevo o actualizado, segun el valor del id en local
         *
         * @method persistence
         * @public         
         * @param entity {Object}: objeto de la entidad
         * @return {UnitOfWork}
         * 
         */ 
                      
        persistence : function(entity){
            if(this.__idNotNull(entity)){
                this.__registerUpdate(entity);
            }else{
                this.__registerNew(entity);
            }
            return this;
        },
        
        /**
         *  para salvar en la bd
         *
         * @method commit
         * @public
         * @param callback {Function?null} callback a ejecutar una vez que se 
         * haga flush
         * @param context {Object} contesto del callback
         */ 
                      
        commit : function(callback,context){
            this.__insert()
            this.__update();
            this.__delete();
            this.init();
            if(qx.core.Environment.get("criax.app.type") == "mobile"){
                var context = context || window;
                var callback = callback || function(data){};
                cormx.opm.mapper.Mapper.setItem(callback,context);   
            }
        },
        
        /**
         *  metodo para cargar los datos del indexeddb
         *
         * @method loadData
         * @pubic         
         * @param existDataInStorage {Function?null} callback a ejecutar si existen datos previos
         * tiene un solo parametro los datos existentes
         * <code>
         * function(){
         *     //hacer si existen datos 
         * }
         * </code>
         * @param emptyStorage {Function?null} callback a ejecutar si no existen datos
         * <code>
         * function(){
         *     //hacer si no existen datos 
         * }
         * </code>
         * @param context {Object} contesto de los callbacks
         * 
         */ 
                      
        loadData : function(existDataInStorage,emptyStorage,context){
            if(qx.core.Environment.get("criax.app.type") == "mobile"){
                var context = context || window;
                var existDataInStorage = existDataInStorage || function(){};
                var emptyStorage = emptyStorage || function(){};
                cormx.opm.mapper.Mapper.loadData(existDataInStorage,emptyStorage,context);
            }
        }
    }
});