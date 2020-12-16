 /**  
  * Mixin para escapar los datos externos de la consulta
  * 
  * @mixin MEscape
  * @public
  * @extends criax.mvc.Model
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.common  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Mixin.define("cormx.common.MEscape",
{     
   /**
     * @method
     */
    members :
    {
        /**
         *  escapar el dato pasado y elimina los espacios en blanco del principio
         *  y el final
         *
         * @method escape
         * @public         
         * @param data {String}: dato a escapar
         * @return {String} dato escapado
         * 
         */ 
                      
        escape : function(data){
            if((typeof data) !== "string"){
                var data = data.toString();
            }
            data = unescape(data);
            data = qx.lang.String.clean(data);
            //data = qx.lang.String.escapeRegexpChars(data);
            data = qx.lang.String.stripTags(data);
            return data.replace(/;/gi,"")
                       .replace(/</gi,"")
                       .replace(/>/gi,"")
                       .replace(/:/gi,"")
                       .replace(/\\/gi,"\\\\")
                       .replace(/'/gi,"''")
                       .replace(/SELECT/gi,"")
                       .replace(/WHERE/gi,"")
                       .replace(/FROM/gi,"")
                       .replace(/GROUB BY/gi,"");
        }
        
    }
});