/*
 * @asset(parse_write.json)
 */

qx.Class.define("json.test.unit.stringify.decorator.decorators.WriteFileTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testModel : function(){
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse_write.json']);
            
            var modelQx = qx.data.marshal.Json.createModel({a:5,b:[2,8],c:true,d:"string"});
            var modelData = new json.stringify.decorator.components.ModelData(modelQx);
            
            var modelToJs = new json.stringify.decorator.decorators.ModelToJs();
            modelToJs.setComponent(modelData);
            
            var stringify = new json.stringify.decorator.decorators.Stringify();
            stringify.setComponent(modelToJs);
            
            
            var writeFile = new json.stringify.decorator.decorators.WriteFile(filePath.getPath());
            writeFile.setComponent(stringify);
            var result = writeFile.getData();
            
            this.assertEquals('{"a":5,"b":[2,8],"c":true,"d":"string"}', result);
        }
    }    
});