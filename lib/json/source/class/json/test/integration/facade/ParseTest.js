/**
 * @asset(parse.json)
 */

qx.Class.define("json.test.integration.facade.ParseTest",
{
    extend :qx.dev.unit.TestCase,
    
    properties :
    {
        __reviver : {},
        __data : {}
    },

    members :
    {
        setUp : function(){
            this.__reviver = function(key, value) {
                if (typeof value === 'number') {
                    value = 2 * value;
                }
                return value;
            };
            this.__data = '{"a":10,"b":[4,16],"c":true,"d":"string"}';
        },
        
        testFileToModel : function(){
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse.json']);
            
            var parse = new json.facade.Parse();
            parse.setValue(filePath.getPath());
            parse.setReviver(this.__reviver);
            parse.setModel(true);
            parse.setFile(true);
            
            var result = parse.parse();  
            this.assertEquals(10, result.getA());
        },
        
        testFileToParse : function(){
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse.json']);
            
            var parse = new json.facade.Parse();
            parse.setValue(filePath.getPath());
            parse.setReviver(this.__reviver);            
            parse.setFile(true);
            
            var result = parse.parse();  
            this.assertEquals(String(JSON.parse(this.__data,this.__reviver)), String(result));
        },
        
        testStringToParse : function(){
            var parse = new json.facade.Parse();
            parse.setValue(this.__data);
            parse.setReviver(this.__reviver);
            
            var result = parse.parse();  
            this.assertEquals(String(JSON.parse(this.__data,this.__reviver)), String(result));
        },
        
        testStringToModel : function(){
            var parse = new json.facade.Parse();
            parse.setValue(this.__data);
            parse.setReviver(this.__reviver);
            parse.setModel(true);
                        
            var result = parse.parse();  
            this.assertEquals(20, result.getA());
        },
        
        testExternalBuilder : function(){
            //se deben crear 2 clases externas,
            
            //una para el builder que debe heredar de json.parse.builder.builders.Builder 
            //con el metodo buildDecorator donde se especifica el decorador hacia
            //el cual se transformara, pasandole el componente que no es mas que
            //el decorador desde el cual se transforma. la misma se pasa aqui
            
            //la otra clase es para el decorador con el metodo _transform donde
            //se lleva a cabo la transformacion retornando el resultado            
            
            var parse = new json.facade.Parse();
            parse.setValue(this.__data);            
            parse.setBuilder(new json.test.integration.facade.ExternalBuilder(this.__data));
                        
            var result = parse.parse();  
            this.assertEquals("STRING", result.d);
        }
    }
});