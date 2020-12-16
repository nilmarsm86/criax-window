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
load("script/${Namespace}.js");
