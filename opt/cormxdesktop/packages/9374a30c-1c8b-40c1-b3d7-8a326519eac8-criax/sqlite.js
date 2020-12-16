/*
 * modulo sqlite 1.0.0 modificado
 *
 * Copyright (c) 2012 Nilmar Sanchez (nimlar@uci.cu)
 * Licensed under the MIT (MIT-LICENSE.txt)
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: Febrary 23 2012
 */
const {EventEmitter} = require("pure_js_events");      

function Sqlite(){
    return {__proto__: Sqlite.prototype};
}

Sqlite.prototype = {
    __proto__: EventEmitter.prototype,
    constructor: Sqlite,    
    conObject: null,
    __enviromentProduction:false,
    
    //conectar con la bd
	connect: function(db,path){		
	    /*var file = Components.classes["@mozilla.org/file/directory_service;1"]
				.getService(Components.interfaces.nsIProperties)
				.get("CurProcD", Components.interfaces.nsIFile);*/
        //para poder crear la bd donde quiera
        var file = Components.classes['@mozilla.org/file/local;1']
               .createInstance(Components.interfaces.nsILocalFile);
        file.initWithPath(path);
	    file.append(db);
	    var storageService = Components.classes["@mozilla.org/storage/service;1"]
					.getService(Components.interfaces.mozIStorageService);
	    this.conObject = storageService.openDatabase(file);	
    },	
    
    setEnviroment : function(production){
        this.enviromentProduction = production;
    },
    
    getEnviroment : function(){
        return this.enviromentProduction;
    },

	//ejecutar una consulta
    execute: function(cmd){
        if(!this.getEnviroment()){
            console.log(cmd);//mostrar la consulta ya formada
        }
        var statement = this.conObject.createStatement(cmd);
		var cols = statement.columnCount,
			rows = [],
			colNames = [],
			colTypes = [];
		if (cols>0) {
			while(statement.executeStep()){
				var row = {};
				for(col=0;col<cols;col++){
					if(colNames[col]==undefined){
						colNames[col]=statement.getColumnName(col);
						colTypes[col]=statement.getTypeOfIndex(col);
					}
					switch (colTypes[col]){
						case 0:
							value = null; break;
						case 1:
							value = statement.getInt64(col); break;
						case 2:
							value = statement.getDouble(col); break;
						case 3:
							value = statement.getUTF8String(col); break;
						case 4:
							value = statement.getBlob(col); break;
					}
					row[colNames[col]] = value;
				}
				rows.push(row); 
			}
		}else{
			statement.execute();
		}
		statement.reset();
		if(rows.length>0){
			return rows;
        }    
		return this.conObject.lastInsertRowID;				
	},
    
    //metodo interno para crear metodos
	__createMethod: function(command){
		var query = command;
		return function(params){
					var cmd = query;
					for(var i in params){
						cmd = cmd.replace('{'+i+'}',params[i]);
                    }
					return this.execute(cmd);
				}
	},
    
    //metodo para extender y personalizar consultas
	extend: function(commands){
		for(var i in commands){
			commands[i] = this.__createMethod(commands[i]);
        }    
		for(var i in commands){
			this[i] = commands[i];
        }    
	},

    //ejecutar una sentencia simple que no devuelve datos
    simple: function(sql){
	    this.conObject.executeSimpleSQL(sql);
    },
      
    createTableFromShema : function(shema,data){
        for(var name in shema.tables){
            //optener el arreglo de metas
            var meta = shema.tables[name].meta;
            //recorrer el arreglo de metas 
            var metaLength = meta.length;
            for(var i=0;i<metaLength;i++){
                var column = meta[i];
                for(var columnName in column){
                    //agregarle la columna y las caracteristicas
                    //column[columnName]
                }
            }
            //this.conObject.createTable(name, );  
        }       
    }
}

exports.Sqlite = Sqlite;
