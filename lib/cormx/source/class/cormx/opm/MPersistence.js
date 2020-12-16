 /**  
  * Mixin para las operaciones de la persistencia
  * 
  * @mixin MPersistence
  * @public
  * @author 
  * @namespace cormx  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Mixin.define("cormx.opm.MPersistence",
{         
   /**
     * @method
     */
    members :
    {
        /**
         *  devolver o el mapper, identitymap o finder
         *
         * @method transformName
         * @public         
         * @param entity {Object}: objeto de la entidad
         * @param type {String}: tipo de objeto a buscar de la entidad
         * [mapper,finder,identity,fixture]
         * @return {String} namespace del objeto buscado
         * 
         */ 
                      
        transformName : function(entity,type){
            var entityNamespace = entity.classname;
            var parts = entityNamespace.split(".");
            var name = "";
            //var typeName = "";
            
            switch(type){
                case "mapper":
                    name = parts[parts.length-1];
                    parts[parts.length-1] = "mapper";//directorio de los mappers
                    parts[parts.length] = name+"Mapper";
                break;
                case "finder":
                    name = parts[parts.length-1];
                    parts[parts.length-1] = "finder";//directorio de los finders
                    parts[parts.length] = name+"Finder";
                break;
                case "identity":
                    name = parts[parts.length-1];
                    parts[parts.length-1] = "im";//directorio de los identitymaps
                    parts[parts.length] = name+"IdentityMap";
                break;
                case "fixture":
                    name = parts[parts.length-1];
                    parts[parts.length-1] = "fixture";//directorio de los fixture
                    parts[parts.length] = name+"Fixture";
                break;
            }
            var typeName = parts.join(".");
            return qx.Class.getByName(typeName);
        }
    }
});