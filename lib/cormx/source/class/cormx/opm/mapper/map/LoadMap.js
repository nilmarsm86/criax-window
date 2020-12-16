 /**  
  * Clase para cargar el mapa de persistencia
  * 
  * @class LoadMap
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm.mapper.map  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.mapper.map.LoadMap",
{   
    type : "static",
      
   /**
    * @static
    */
    statics :
    {
        /**
         *  metodo para cargar el mapa de las entidades
         *
         * @method load
         * @public        
         * @static
         * @return {Object} Object de entidades 
         * 
         */ 
                      
        load : function(){            
            var pathMap = qx.core.Environment.get("criax.persistence.map.dir");
            var defaultMap = qx.core.Environment.get("criax.persistence.map.name");
            var ext = ".json";
            
            if(qx.core.Environment.get("criax.app.type") == "mobile"){                
                var inyection = criax.dic.DiContainer.getInstance();
                return inyection.get("schemadb"); 
            }else{                
                var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
                var pathToDefaultMap = path.join([pathMap,defaultMap+ext]);
                var file = new criax.chromeless.lib.File(pathToDefaultMap.getPath());
                var defaultContent = file.read();
                return window.eval('('+defaultContent+')');                
            }            
        }
    }
});