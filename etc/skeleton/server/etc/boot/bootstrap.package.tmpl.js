Components.utils.import("resource://gre/modules/Services.jsm");
Components.utils.import("resource://gre/modules/FileUtils.jsm");

var Bootstrap = function () { // open IIFE
    
    const isLinuxOS = (Services.appinfo.OS === "Linux");
    const FileInputStream = Components.Constructor("@mozilla.org/network/file-input-stream;1","nsIFileInputStream","init");
    const ScriptableInputStream = Components.Constructor("@mozilla.org/scriptableinputstream;1","nsIScriptableInputStream","init");
    let __appPath;
    
    function Bootstrap(){
        print('start server...');
        initAppPath();
    }
    
    function initAppPath(){
        if(isLinuxOS){
            __appPath = environment["PWD"];
        }else{
            __appPath = environment["apppath"].replace(/\//g,"\\");    
        }
        __appPath = __appPath.trim();
    }
    
    function __serverHost(loadConfig){            
        let exp = /^(?!0)(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)$$/;
        if(exp.exec(loadConfig.host)){
            return loadConfig.host;
        }
        return "localhost";
    }
    
    function __serverPort(loadConfig){
        if(/^[0-9]+$$/.exec(loadConfig.port) && loadConfig.port > 1024){
            return loadConfig.port;
        }
        return 9090;
    }
    
    function __serverPath(loadConfig){
        if(Boolean(loadConfig.path)){
            return loadConfig.path;
        }else{                
            return __appPath + ((isLinuxOS) ? "/src/script" : "\\src\\script");
        }
    }
    
    function readConfig(path){            
        const PR_RDONLY = 0x01;
        const PERMS_READONLY = (4 << 6) | (4 << 3) | 4;
        const CLOSE_ON_EOF = Components.interfaces.nsIFileInputStream.CLOSE_ON_EOF; 
        
        let bootloadFile = new FileUtils.File(path);
        let fileInputStream = new FileInputStream(bootloadFile, PR_RDONLY, PERMS_READONLY,CLOSE_ON_EOF);
        let scriptableInputStream = new ScriptableInputStream(fileInputStream);
        let configData = scriptableInputStream.read(bootloadFile.fileSize);
        fileInputStream.close();
        return configData;
    }
    
    function isValidRootDirectory(basePath){
            let rootDirectory = new FileUtils.File(basePath);
            return (rootDirectory.exists() && rootDirectory.isDirectory() && rootDirectory.isReadable());
        }
        
        /**
         * Creates a new HTTP server listening for loopback traffic on the given port,
         * starts it, and runs the server until the server processes a shutdown request,
         * spinning an event loop so that events posted by the server's socket are
         * processed.
         *
         * This method is primarily intended for use in running this script from within
         * xpcshell and running a functional HTTP server without having to deal with
         * non-essential details.
         *
         * Note that running multiple servers using variants of this method probably
         * doesn't work, simply due to how the internal event loop is spun and stopped.
         *
         * @note
         *   This method only works with Mozilla 1.9 (i.e., Firefox 3 or trunk code);
         *   you should use this server as a component in Mozilla 1.8.
         * @param port
         *   the port on which the server will run, or -1 if there exists no preference
         *   for a specific port; note that attempting to use some values for this
         *   parameter (particularly those below 1024) may cause this method to throw or
         *   may result in the server being prematurely shut down
         * @param basePath
         *   a local directory from which requests will be served (i.e., if this is
         *   "/home/jwalden/" then a request to /index.html will load
         *   /home/jwalden/index.html); if this is omitted, only the default URLs in
         *   this server implementation will be functional
         */
        function server(host, port, basePath){
            let lp;
            if (isValidRootDirectory(basePath)){
                lp = new FileUtils.File(basePath);                
            }
                        
            let httpdFile = __appPath + ((isLinuxOS) ? "/webserver/httpd.js" : "\\webserver\\httpd.js");                
            load(httpdFile);
            DEBUG = true;
            
            let srv = new HttpServer();
            if (lp){
                srv.registerDirectory("/", lp);//registrar este directorio como root
            }
            srv.registerContentType("sjs", SJS_TYPE);
            srv.identity.setPrimary("http", host, port);            
            srv.start(port, host);//add support for other hosts

            let thread = Services.tm.currentThread;
            while (!srv.isStopped()){        
                thread.processNextEvent(true);
            }

            // get rid of any pending requests
            while (thread.hasPendingEvents()){
                thread.processNextEvent(true);
            }
        }
    
    Bootstrap.prototype.loadConfig = function(){
        let configFile = __appPath + ((isLinuxOS) ? "/src/bootload.json" : "\\src\\bootload.json");            
        return readConfig(configFile);
    };
    
    Bootstrap.prototype.start = function(loadConfig){            
        let config = JSON.parse(loadConfig);
        
        var host = __serverHost(config);            
        var port = __serverPort(config);
        var path = __serverPath(config);
        server(host, port, path);
    };
    
    return Bootstrap;        
}(); // close IIFE

var bootstrap = new Bootstrap();    
let config = bootstrap.loadConfig();
bootstrap.start(config);