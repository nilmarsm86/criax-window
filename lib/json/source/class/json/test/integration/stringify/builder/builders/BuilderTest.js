/*
 * @asset(parse_new.json)
 */

qx.Class.define("json.test.integration.stringify.builder.builders.BuilderTest",
{
    extend :qx.dev.unit.TestCase,
    
    properties :
    {
        __replacer : {},
        __modelQx : {}
    },

    members :
    {
        __getResult : function(builder){            
            builder.createComponent();
            builder.buildReplacer();
            builder.buildSpace();
            builder.buildDecorator();
            return builder.getComponent();
        },
        
        setUp : function(){
            this.__modelQx = qx.data.marshal.Json.createModel({a:5,b:[2,8],c:true,d:"string"});
            this.__replacer = function(key, value) {
                if (typeof value === 'number') {
                    value = 2 * value;
                }
                return value;
            };
        },
        
        testModelToJs: function(){
            var data = {a:10,b:[4,16],c:true,d:"string"};
            var builder = new json.stringify.builder.builders.ModelToJs(this.__modelQx, this.__replacer, 0);
            var result = this.__getResult(builder);  
            this.assertEquals(JSON.stringify(data,this.__relacer), JSON.stringify(result.getData()));
        },
        
        testModelToStringify : function(){
            var data = {a:10,b:[4,16],c:true,d:"string"};
            var builder = new json.stringify.builder.builders.ModelToStringify(this.__modelQx, this.__replacer, 0);
            var result = this.__getResult(builder);  
            this.assertEquals(JSON.stringify(data,this.__relacer), result.getData());
        },
        
        testModelToFile : function(){
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse_new.json']);
            
            var data = '{"a":10,"b":[4,16],"c":true,"d":"string"}';
            
            var builder = new json.stringify.builder.builders.ModelToFile(this.__modelQx, this.__replacer, 0);
            builder.setPath(filePath.getPath());
            var result = this.__getResult(builder);
            
            this.assertEquals(data, result.getData());
        }
    }
});