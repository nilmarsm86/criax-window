 /**  
  * Clase para manejar las entidades
  * 
  * @class EntityManager
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.EntityManager",
{
    extend : qx.core.Object,
    include : [cormx.opm.MPersistence],
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * unit of work para manejar la insercion, actualizacion y eliminacion
         * 
         * @name __uow
         * @private
         * @type {cormx.opm.UnitOfWork}
         * 
         */
        __uow : {}         
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
        this.__uow = cormx.opm.UnitOfWork.getInstance();   
        this.__uow.init();
    },
      
   /**
     * @method
     */
    members :
    {   
        /**
         *  metodo para persistir la informacion de la entidad nueva
         *
         * @method persist
         * @public         
         * @param entity {Object}: objeto de la entidad
         * @return {EntitytManager}
         * 
         */ 
                      
        persist : function(entity){
            this.__uow.persistence(entity);            
            return this;
        },
        
        /**
         *  metodo para remover la persistencia de esa entidad
         *
         * @method entity
         * @public         
         * @param entity {Object}: objeto de la entidad
         * @return {EntityManager}
         * 
         */ 
                      
        remove : function(entity){
            this.__uow.registerRemoved(entity);
            return this;
        },
        
        /**
         *  metodo para llevar a cabo las consultas en la bd
         *
         * @method flush
         * @public
         * @param callback {Function?null} callback a ejecutar una vez que se 
         * haga flush
         * @param context {Object} contesto del callback
         * 
         */ 
                      
        flush : function(callback,context){
            var context = context || window;
            var callback = callback || function(data){};
            this.__uow.commit(callback,context);
        },
        
        /**
         *  devolver el finder de la entidad
         *
         * @method getFinder
         * @public         
         * @param entity {Object}: namespace de la entidad
         * @return {Finder} objeto del finder
         * 
         */ 
                      
        getFinder : function(entity){            
            var instance = this.transformName(entity,"mapper").getInstance();
            instance.init(entity);
            return instance.getFinder();
        },
        
        /**
         *  devolver el identitymap de la entidad
         *
         * @method getIdentityMap
         * @public         
         * @param entity {Object}: namespace de la entidad
         * @return {IdentityMap} objeto del finder
         * 
         */ 
                      
        getIdentityMap : function(entity){            
			return this.transformName(entity,"identity").getInstance();
        },
        
        /**
         *  buscar una entidad a partir de su id
         *
         * @method find
         * @public         
         * @param entity {Function}: function de la entidad donde se quiere bucar
         * @param id {Integer}: id de la entidad a buscar
         * @return {Objeto} entidad encontrada
         * 
         */ 
                      
        find : function(entity,id){
            return this.getFinder(entity).findById(id);
        },
        
        /**
         *  buscar toda la informacion de la tabla
         *
         * @method all
         * @public         
         * @param entity {Function}: function de la entidad donde se quiere bucar
         * @return {Array} arreglo de entidades
         * 
         */ 
                      
        all : function(entity){
            return this.getFinder(entity).findAll();
        },
        
        /**
         *  limpiar todas las referencias de la entidad del identityMap (cache)
         *
         * @method cleanCache
         * @public         
         * @param entity {Object}: namespace de la entidad
         * 
         */ 
                      
        cleanCache : function(entity){
            this.getIdentity(entity).clean();
        },
        
        /**
         *  limpiar la persistencia por si alguna operacio dio error
         *
         * @method cleanPersist
         * @public
         * 
         */ 
                      
        cleanPersist : function(){
            this.__uow.init();
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
                this.__uow.loadData(existDataInStorage,emptyStorage,context);
            }
        }
    }
});