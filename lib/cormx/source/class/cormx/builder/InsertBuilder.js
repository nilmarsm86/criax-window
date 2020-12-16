 /**  
  * Clase para el builder de insertar
  * 
  * @class InsertBuilder
  * @public
  * @extends cormx.builder.ChangeBuilder
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.builder  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.builder.InsertBuilder",
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
        this._sql.push("INSERT INTO");
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
            this._columnsValuesLength(); 
            this._sql.push(this._table);
            this._sql.push("('"+this._columns.join("', '")+"')");
            this._sql.push("VALUES");
            this._sql.push("('"+this._values.join("', '")+"')");
            return this._sql.join(" ");
        }
    }
});