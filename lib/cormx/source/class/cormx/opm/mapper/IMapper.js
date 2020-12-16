 /**  
  * Interfaz para los mapper
  * 
  * @interfaz IMapper
  * @public
  * @author Nilmar Sanchez M
  * @namespace cormx.opm.mapper  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Interface.define("cormx.opm.mapper.IMapper",
{     
   /**
     * @method
     */
    members :
    {
        /**
         * metodo de inicio
         *
         * @method init
         * @public
		 * @param entity {Object}: objeto de la entidad
         * 
         */ 
                      
        init : function(entity){},
		
		/**
         * metodo de insertar
         *
         * @method insert
         * @public
		 * @param entity {Object}: objeto de la entidad
         * 
         */ 
                      
        insert : function(entity){},
		
		/**
         * metodo de actualizar
         *
         * @method update
         * @public
		 * @param entity {Object}: objeto de la entidad
         * 
         */ 
                      
        update : function(entity){},
		
		/**
         * metodo de eliminar
         *
         * @method remove
         * @public
		 * @param entity {Object}: objeto de la entidad
         * 
         */ 
                      
        remove : function(entity){}
    }
});