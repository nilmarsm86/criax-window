print('xpcshell boostrap...');
//Components.utils.import("resource://gre/modules/Log.jsm");
Components.utils.import("resource://gre/modules/Services.jsm");

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
    load("script/testrunner-basic-source.js");
    
    //mantener en espera de la ejecucion de todos los test
    var criaxTest = true;//ApplicationBasic de testrunner 66 y 79    
    var thread = Services.tm.currentThread;
    while (criaxTest === true){        
        thread.processNextEvent(true);
    }
}catch(e){
    print(e);
    print(e.stack);
    
    //let log = Log.repository.getLogger("xpcshell");
    //log.addAppender(new Log.DumpAppender(new StructuredFormatter2()));
    //log.level = Log.Level.All;    
    //log.error(e);    
}
