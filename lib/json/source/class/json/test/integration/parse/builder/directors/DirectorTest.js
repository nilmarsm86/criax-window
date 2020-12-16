/*
 * @asset(parse.json)
 */

qx.Class.define("json.test.integration.parse.builder.directors.DirectorTest",
{
    extend :qx.dev.unit.TestCase,
    
    properties :
    {
        __reviver : {},
        __data : {}
    },

    members :
    {
        __getResult : function(constructor){            
            var director = new json.parse.builder.directors.Director();            
            director.setBuilder(constructor);
            director.buildComponent();
            
            var componente = constructor.getComponent();
            return componente.getData(); 
        },
        
        setUp : function(){
            this.__reviver = function(key, value) {
                if (typeof value === 'number') {
                    value = 2 * value;
                }
                return value;
            };
            this.__data = '{"a":10,"b":[4,16],"c":true,"d":"string"}';
        },
        
        testFileToParse : function(){
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse.json']);
            
            var constructor = new json.parse.builder.builders.FileToParse(filePath.getPath(),this.__reviver);
            var result = this.__getResult(constructor);  
            this.assertEquals(String(JSON.parse(this.__data,this.__reviver)), String(result));
        },
        
        testFileToModel : function(){
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse.json']);
            
            var constructor = new json.parse.builder.builders.FileToModel(filePath.getPath(), this.__reviver);
            var result = this.__getResult(constructor);
            this.assertEquals(10, result.getA());
        },
        
        testStringToParse : function(){
            var constructor = new json.parse.builder.builders.StringToParse(this.__data, this.__reviver);
            var result = this.__getResult(constructor);          
            this.assertEquals(String(JSON.parse(this.__data,this.__reviver)), String(result));
        },
        
        testStringToModel : function(){
            var constructor = new json.parse.builder.builders.StringToModel(this.__data, this.__reviver);
            var result = this.__getResult(constructor);       
            this.assertEquals(20, result.getA());
        }
    }
});