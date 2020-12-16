/**
 * @asset(parse.json)
 * @asset(parse_new.json)
 */

qx.Class.define("json.test.integration.JsonTest",
{
    extend :qx.dev.unit.TestCase,
    
    properties :
    {
        __reviver : {},
        __data : {},
        __replacer : {},
        __space : {},
        __modelData : {}
    },

    members :
    {
        setUp : function(){
            this.__replacer = this.__reviver = function(key, value) {
                if (typeof value === 'number') {
                    value = 2 * value;
                }
                return value;
            };
            this.__data = '{"a":10,"b":[4,16],"c":true,"d":"string"}';
            this.__modelData = qx.data.marshal.Json.createModel({a:5,b:[2,8],c:true,d:"string"});
            this.__space = 0;
        },
        
        testFileToModel : function(){
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse.json']);
            
            var result = json.Json.parse(filePath.getPath(), this.__reviver, true, true);
            this.assertEquals(10, result.getA());
        },
        
        testFileToParse : function(){
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse.json']);
            
            var result = json.Json.parse(filePath.getPath(), this.__reviver, true);
              
            this.assertEquals(String(JSON.parse(this.__data,this.__reviver)), String(result));
        },
        
        testStringToParse : function(){
            var result = json.Json.parse(this.__data, this.__reviver);              
            this.assertEquals(String(JSON.parse(this.__data,this.__reviver)), String(result));
        },
        
        testStringToModel : function(){
            var result = json.Json.parse(this.__data, this.__reviver, false, true);              
            this.assertEquals(20, result.getA());
        },
        
        testExternalBuilder : function(){
            //se deben crear 2 clases externas,
            
            //una para el builder que debe heredar de json.parse.builder.builders.Builder 
            //con el metodo buildDecorator donde se especifica el decorador hacia
            //el cual se transformara, pasandole el componente que no es mas que
            //el decorador desde el cual se transforma
            
            //la otra clase es para el decorador con el metodo _transform donde
            //se lleva a cabo la transformacion retornando el resultado            
            
            var result = json.Json.parse(this.__data, null, false, false, new json.test.integration.facade.ExternalBuilder(this.__data));
            this.assertEquals("STRING", result.d);
        },
        
        testModelToJs : function(){            
            var data = {a:10,b:[4,16],c:true,d:"string"};
            
            var result = json.Json.stringify(this.__modelData, this.__replacer, this.__space, false, "", true);
            this.assertEquals(JSON.stringify(data), JSON.stringify(result));            
        },
        
        testModelToStringify : function(){
            var data = {a:10,b:[4,16],c:true,d:"string"};
            
            var result = json.Json.stringify(this.__modelData, this.__replacer, this.__space);
            this.assertEquals(JSON.stringify(data), result);    
        },
        
        testModelToFile : function(){
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse_new.json']);
            
            var data = '{"a":10,"b":[4,16],"c":true,"d":"string"}';
            
            var result = json.Json.stringify(this.__modelData, this.__replacer, this.__space, true, filePath.getPath());
            this.assertEquals(data, result);
        }
    }
});