// EXECUTE: 
//1- cd ${Namespace}
//2- xulrunner\xpcshell.exe -w bootstrap.js

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
load("src/script/${Namespace}.js");
