 /**  
  * Clase para el builder de where
  * 
  * @class WhereBuilder
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.builder  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.builder.WhereBuilder",
{
    extend : qx.core.Object,
    implement : [cormx.builder.IQueryBuilder],
    include : [cormx.common.MEscape],
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * arreglo de elementos para formar la consulta
         * 
         * @name _sql
         * @protected
         * @type {Array}
         * @default {[]}
         * 
         */
        _sql : {},
        
        /**
         * separador de las condiciones AND, OR
         * 
         * @name _split
         * @protected
         * @type {String}
         * 
         */
        _split : {},
        
        /**
         * arreglo de objeto con los datos
         * {column:valor,value:valor,condition:=,split:and}
         * condition por defecto es =
         * 
         * @name _data
         * @protected
         * @type {Array}
         * @default {[]}
         * 
         */
        _data : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param data {Object}: datos
     * 
     */
    
    construct : function(data) 
    { 
        this._data = [];
        this._data.push(data);
        this._split = null;
        this._sql = [];
        this._sql.push("WHERE");
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  establecer el divisor de las condiciones
         *
         * @method setSplit
         * @public         
         * @param split {Array|String}: divisor de las condiciones
         * @return {WhereBuilder}
         * 
         */ 
                      
        setSplit : function(split){
            this._split = split;
            return this;
        },
        
        /**
         *  agregar mas condiciones
         *
         * @method addData
         * @public         
         * @param data {Object}: condicion
         * @return {WhereBuilder}
         * 
         */ 
                      
        addData : function(data){
            this._data.push(data);
            return this;
        },
        
        /**
         *  eliminar WHERE de la consulta
         *
         * @method removeWhere
         * @public 
         * @return {WhereBuilder}
         * 
         */ 
                      
        removeWhere : function(){
            this._sql.shift();
            return this;
        },
        
        /**
         *  procesar las condiciones
         *
         * @method _processConditions
         * @protected 
         * 
         */ 
                      
        _processConditions : function(){
            var dataLength = this._data.length;
            if(this._split != null){
                if((typeof this._split) == "object"){
                    this.__splitObject()
                }else if((typeof this._split) == "string"){
                   for(var i=0;i<dataLength;i++){                        
                        this._sql.push(this.__splitString(this._data[i],i,dataLength));
                    } 
                }
            }else{
                for(var i=0;i<dataLength;i++){                    
                    this._sql.push(this.__splitString(this._data[i],i,dataLength));
                }                
            }
        },
        
        /**
         *  cuando el separador es un objeto
         *
         * @method __splitObject
         * @private
         * 
         */ 
                      
        __splitObject : function(){
            var splitLength = this._split.length;
            var i = 0;
            for(var d in this._data){
                var obj = this._data[d];
                if(i === (splitLength-1)){
                    this._sql.push(obj.column+" "+obj.condition.toUpperCase()+" '"+this.escape(obj.value)+"'");
                }else{
                    this._sql.push(obj.column+" "+obj.condition.toUpperCase()+" '"+this.escape(obj.value)+"' "+this._split[i].toUpperCase());
                }
                i++;
            }
        },

        /**
         *  procesar condicion
         *
         * @lint ignoreUnused(condition)
         * @method __splitString
         * @private      
         * @param data {Array} datos
         * @param i {Integer} pocision del dato  
         * @param dataLength {Integer} tamanno del arreglo
         * @return {String} condition
         *
         */

        __splitString : function(data,i,dataLength){
            var condition = "";            
            if((dataLength-1) === i){
                return data.column+" "+data.condition.toUpperCase()+" '"+this.escape(data.value)+"'";
            }else{
                return data.column+" "+data.condition.toUpperCase()+" '"+this.escape(data.value)+"' "+data.split.toUpperCase();
            }
        },
        
        /**
         *  devuelve el codigo sql de la consulta
         *
         * @method generate
         * @public         
         * @return {String} consulta sql 
         * 
         */ 
                      
        generate : function(){
            this._processConditions();
            return this._sql.join(" ");
        }
    }
});