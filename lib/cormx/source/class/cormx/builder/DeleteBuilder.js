 /**  
  * Clase para el builder de eliminar
  * 
  * @class DeleteBuilder
  * @public
  * @extends cormx.builder.ChangeBuilder
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.builder  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.builder.DeleteBuilder",
{
    extend : cormx.builder.ChangeBuilder,
    implement : [cormx.builder.IQueryBuilder],
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * Arreglo de partes de la consulta
         * 
         * @name _sql
         * @protected
         * @type {Array}
         * 
         */
        _sql : {}         
    },
    
    /**
     * metodo de inicializacion de la clase
     * en caso de que no se pase condicion, se vacia la tabla completa
     *
     * @constructor
     * @public
     * @param table {String}: nombre de la tabla
     * 
     */
    
    construct : function(table) 
    { 
        this._table = table;  
        this.base(arguments);
        this._sql.push("DELETE FROM");
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  generar el codigo sql de la consulta
         *
         * @method generate
         * @public
         * @return {String} codigo de la consulta 
         * 
         */ 
                      
        generate : function(){
            this._sql.push(this._table);
            if(this._whereBuilder != null){
                this._sql.push(this._whereBuilder.generate());
            }            
            return this._sql.join(" ");
        }
    }
});