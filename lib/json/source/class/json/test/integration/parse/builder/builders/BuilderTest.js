/*
 * @asset(parse.json)
 */

qx.Class.define("json.test.integration.parse.builder.builders.BuilderTest",
{
    extend :qx.dev.unit.TestCase,
    
    properties :
    {
        __reviver : {}
    },

    members :
    {
        __getResult : function(builder){            
            builder.createComponent();
            builder.buildReviver();
            builder.buildDecorator();
            return builder.getComponent();
        },
        
        setUp : function(){
            this.__reviver = function(key, value) {
                if (typeof value === 'number') {
                    value = 2 * value;
                }
                return value;
            };
        },
        
        testFileToParse: function(){
            var data = '{"a":10,"b":[4,16],"c":true,"d":"string"}';
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse.json']);
            
            var fileToParse = new json.parse.builder.builders.FileToParse(filePath.getPath(), this.__reviver);
            var result = this.__getResult(fileToParse);  
            this.assertEquals(String(JSON.parse(data,this.__reviver)), String(result.getData()));
        },
        
        testFileToModel : function(){
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse.json']);
            
            var fileToModel = new json.parse.builder.builders.FileToModel(filePath.getPath(), this.__reviver);
            var result = this.__getResult(fileToModel);  
            this.assertEquals(10, result.getData().getA());
        },
        
        testStringToParse : function(){
            var data = '{"a":10,"b":[4,16],"c":true,"d":"string"}';
            
            var stringToParse = new json.parse.builder.builders.StringToParse(data, this.__reviver);
            var result = this.__getResult(stringToParse);  
            this.assertEquals(String(JSON.parse(data,this.__reviver)), String(result.getData()));
        },
        
        testStringToModel : function(){            
            var data = '{"a":10,"b":[4,16],"c":true,"d":"string"}';
            
            var stringToModel = new json.parse.builder.builders.StringToModel(data, this.__reviver);
            var result = this.__getResult(stringToModel);  
            this.assertEquals(20, result.getData().getA());
        }
    }
});