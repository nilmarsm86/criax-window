 /**
  *  Clase para ser usada por el cliente como fachada
  * 
  * @class Json
  * @static
  * @author Nilmar Sanchez Muguercia
  * @namespace json
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.Json",
{
    type : "static",

   /**
     * @static
     */
    statics :
    {
        /**
         *  metodo para hacer parse
         *
         * @method parse
         * @public
         * @param value {String} puede ser el string a convertir o la ruta del
         * archivo que contiene el json a transformar
         * @param reviver {Function?null} funcion del reviver
         * @param file {Boolean?false} en caso que la informacion se obtenga de
         * un archivo
         * @param model {Boolean?false} en caso de que se quiera transformar a un
         * modelo de Qx 
         * @param builder {json.parse.builder.builders.Builder} builder de la
         * transformacion 
         * @return {Object}
         * 
         */
        
        parse : function(value, reviver, file, model, builder){
            reviver = reviver || null;
            model = model || false;
            file = file || false;
            builder = builder || null;
            
            var parseFacade = new json.facade.Parse();
            parseFacade.setValue(value);
            parseFacade.setReviver(reviver);
            parseFacade.setModel(model);
            parseFacade.setFile(file);      
            if(builder !== null){
                parseFacade.setBuilder(builder);
            }
            return parseFacade.parse();
        },
        
        /**
         *  metodo para hacer stringify
         *
         * @method stringify
         * @public
         * @param value {Object} modelo Qx a transformar
         * @param replacer {Function?null} funcion replacer 
         * @param space {Number?0} space para el replacer
         * @param file {Boolean?false} si se salvara el json en un archivo
         * @param path {String} ruta del archivo que se salvara
         * @param jsObject {Boolean?false} en caso de que se desee transformar a
         * un objeto js
         * @param builder {json.stringify.builder.builders.Builder} builder de la
         * transformacion  
         * @return {String} 
         * 
         */
        
        stringify : function(value, replacer, space, file, path, jsObject, builder){
            replacer = replacer || null;
            space = space || 0;
            file = file || false;
            path = path || "";
            jsObject = jsObject || false;
            builder = builder || null;
            
            var stringifyFacade = new json.facade.Stringify();
            stringifyFacade.setValue(value);
            stringifyFacade.setReplacer(replacer);            
            stringifyFacade.setSpace(space);
            stringifyFacade.setFile(file);
            stringifyFacade.setJsObject(jsObject);  
            stringifyFacade.setPath(path);
            if(builder !== null){
                stringifyFacade.setBuilder(builder);
            }
            return stringifyFacade.stringify();
        }
    }
});