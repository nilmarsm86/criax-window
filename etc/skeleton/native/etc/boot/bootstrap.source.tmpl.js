print('xpcshell boostrap...');
//Components.utils.import("resource://gre/modules/Log.jsm");

try{
    /*//TRANSFORMAR ESTE CODIGO EN UNA CLASE JS
    function StructuredFormatter2() { }
    StructuredFormatter2.prototype = {
        format: function (logMessage) {
            let structuredFormatter = new Log.StructuredFormatter();
            let data = structuredFormatter.format(logMessage);
            return JSON.stringify(JSON.parse(data),null,2);
            //return JSON.stringify(logMessage,null,2);
        }
    };*/
    
    //registrar el console.log
    if (typeof console == "undefined"){
         var console = {};
    }
    if (!console.log){
        console.log = function() {            
            for (var i = 0; i < arguments.length; i++){
                print(arguments[i]);    
            }
        };
    }
    
    var args = arguments;
    //cargar script inicial
    load("../source/script/${Namespace}.js");    
}catch(e){
    print(e);
    print(e.stack);
    
    //let log = Log.repository.getLogger("xpcshell");
    //log.addAppender(new Log.DumpAppender(new StructuredFormatter2()));
    //log.level = Log.Level.All;    
    //log.error(e);    
}
