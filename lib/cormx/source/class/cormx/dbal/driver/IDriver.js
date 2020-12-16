 /**  
  * Interfaz de los dirvers de coneccion a la bd
  * 
  * @interface IDriver
  * @public
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.dbal.driver  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Interface.define("cormx.dbal.driver.IDriver",
{     
   /**
     * @method
     */
    members :
    {
        /**
         *  ejecutar consulta sql que no retorne nada
         *
         * @method simple
         * @public         
         * @param sql {String}: consulta sql a ejecutar
         * 
         */ 
                      
        simple : function(sql){},
        
        /**
         *  ejecutar una consulta que devuelve datos
         *
         * @method execute
         * @public         
         * @param sql {String}: consulta sql a ejecutar
         * @param params {Object}: objeto con los parametros de la consulta
         * {column:value} 
         * @return {Array} en caso de select el resultado
         * 
         */ 
                      
        execute : function(sql,params){},

        /**
         *  ejecutar una transaccion (no hace falta el begin o commit)
         *
         * @method transaction
         * @public         
         * @param sql {Array}: arreglo de consultas a ejecutar (no se aceptan select)
         * 
         */ 
                      
        transaction : function(sql){}
    }
});