/*
 * @asset(parse_new.json)
 */

qx.Class.define("json.test.integration.stringify.builder.directors.DirectorTest",
{
    extend :qx.dev.unit.TestCase,
    
    properties :
    {
        __replacer : {},
        __space : {},
        __data : {}
    },

    members :
    {
        __getResult : function(constructor){            
            var director = new json.stringify.builder.directors.Director();            
            director.setBuilder(constructor);
            director.buildComponent();
            
            var componente = constructor.getComponent();
            return componente.getData(); 
        },
        
        setUp : function(){
            this.__replacer = function(key, value) {
                if (typeof value === 'number') {
                    value = 2 * value;
                }
                return value;
            };
            this.__space = 0;
            this.__data = qx.data.marshal.Json.createModel({a:5,b:[2,8],c:true,d:"string"});
        },
        
        testModelToJs: function(){
            var data = {a:10,b:[4,16],c:true,d:"string"};

            var constructor = new json.stringify.builder.builders.ModelToJs(this.__data, this.__replacer, this.__space);
            var result = this.__getResult(constructor);       
            this.assertEquals(JSON.stringify(data), JSON.stringify(result));
        },
        
        testModelToStringify : function(){
            var data = {a:10,b:[4,16],c:true,d:"string"};
            var builder = new json.stringify.builder.builders.ModelToStringify(this.__data, this.__replacer, this.__space);
            var result = this.__getResult(builder);  
            this.assertEquals(JSON.stringify(data), result);
        },
        
        testModelToFile : function(){
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse_new.json']);
            
            var data = '{"a":10,"b":[4,16],"c":true,"d":"string"}';
            
            var builder = new json.stringify.builder.builders.ModelToFile(this.__data, this.__replacer, this.__space);            
            builder.setPath(filePath.getPath());
            var result = this.__getResult(builder);  
            
            this.assertEquals(data, result);
        }
        
    }
});