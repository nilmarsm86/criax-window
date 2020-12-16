 /**  
  * Mixin para las consultas
  * 
  * @Mixin MQuery
  * @public
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.builder
  * @copyrigth 
  * @license
  * @version 1.0.1
  * 
  */
  
qx.Mixin.define("cormx.builder.MQuery",
{    
    /**
     * @property
     */  
    properties : 
    {        
                 
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  agrupar el resultado
         *
         * @method groupBy
         * @public         
         * @param column {String}: nombre de la columna por la cual se va agrupar
         * @return {QueryBuilder} 
         * 
         */ 
                      
        groupBy : function(column){
            this.__group = [];
            this.__group.push("GROUP BY");
            this.__group.push(column);
            return this;
        },
        
        /**
         *  ordenar los resultados
         *
         * @method orderBy
         * @public         
         * @param column {String}: nombre de la columna por la cual se va a ordenar
         * @param orderDesc {Boolean?false}: si el orden sera asc o desc [asc=false], [desc=true] 
         * @return {QueryBuilder} 
         * 
         */ 
                      
        orderBy : function(column,orderDesc){
            var order = orderDesc || false;
            this.__order = [];
            this.__order.push("ORDER BY");
            this.__order.push(column);
            if(order){
                this.__order.push("DESC");
            }else{
                this.__order.push("ASC");
            }
            return this;
        }
        
    }
});