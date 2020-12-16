'use strict';
Components.utils.import("resource://gre/modules/Http.jsm");
Components.utils.import("resource://gre/modules/Services.jsm");


var Chrome = function () { // open IIFE

    let __chromeConfig;
    
    function Chrome() {}
    
    function onLoad(responseText, xhr){
        __chromeConfig = JSON.parse(responseText).jobs.chrome.environment;
        this.start();
    }
    
    //tener en cuenta que no reconoce los metodos privados
    function onError(error, responseText, xhr){}
    
    function onDOMContentLoaded(event){        
        event.currentTarget.document.title = "${Name}";
        let browser = this.initBrowser(event.currentTarget);
        event.target.documentElement.appendChild(browser);
    }

    function initWindow() {
        let xulNs = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
        let xhtmlNs = "http://www.w3.org/1999/xhtml";

        let style = "padding:"+__chromeConfig['chrome.padding']+" !important;" +
                    "background-color:"+__chromeConfig['chrome.background']+" !important;" +//#dfdfdf, si es transparente el chrome desaparece
                    "background:"+__chromeConfig['chrome.background']+" !important;" +//#dfdfdf, si es transparente el chrome desaparece
                    "box-shadow:"+__chromeConfig['chrome.boxshadow']+" !important;" +
                    "margin:"+__chromeConfig['chrome.margin']+" !important;" +
                    "opacity:"+__chromeConfig['chrome.opacity']+" !important;" +
                    "transform:"+__chromeConfig['chrome.transform']+" !important;" +
                    "border:"+__chromeConfig['chrome.border']+" !important;" +
                    "border-radius:"+__chromeConfig['chrome.borderradius']+" !important;";

        let blankXul = ('<?xml version="1.0"?>' +
                        '<?xml-stylesheet type="text/css"?> ' +
                        '<window windowtype="navigator:browser" xmlns:html="'+ xhtmlNs+'" xmlns="' + xulNs + '" accelerated="true" style="'+style+'" disablechrome="'+__chromeConfig['chrome.disablechrome']+'" hidechrome="'+__chromeConfig['chrome.hidechrome']+'" chromemargin="'+__chromeConfig['chrome.chromemargin']+'"><html:head><html:link rel="shortcut icon" href="chrome://${Name}/content/boot/icons/default/chrome.ico"/></html:head></window>');

        let features = ["width="+__chromeConfig['chrome.width'],
                        "height="+__chromeConfig['chrome.height'],
                        "centerscreen="+Number(__chromeConfig['chrome.centerscreen']),
                        "titlebar="+Number(__chromeConfig['chrome.titlebar']),
                        "resizable="+Number(__chromeConfig['chrome.resizable']),
                        "minimizable="+Number(__chromeConfig['chrome.minimizable']),
                        "noopener=yes",
                        "chrome=yes",
                        "alwaysRaised=no",
                        "close="+Number(__chromeConfig['chrome.close'])];

        let url = "data:application/vnd.mozilla.xul+xml," + escape(blankXul);
        let mainWindow = Services.wm.getMostRecentWindow(null);
        let openWindow = Services.ww.openWindow(null, url, null, features.join(","), null);
        openWindow.focus();
        mainWindow.close();
        return openWindow;
    };

    Chrome.prototype.loadConfig = function(){
        let load = onLoad.bind(this);
        let error = onError.bind(this);
        
        //el logger solo se pone en tiempo de desarrollo
        let xhr = httpRequest('chrome://${Name}/content/boot/chrome.json',{'onLoad':load, 'onError':error});
        xhr.overrideMimeType("application/json");
    };

    Chrome.prototype.initBrowser = function(openWindow){
        let browser = openWindow.document.createElement("browser");
        browser.setAttribute("id", "main-window");
        browser.setAttribute("disablehistory", "indeed");
        browser.setAttribute("type", "content-primary");
        browser.setAttribute("style", "background:transparent !important;background-color:transparent !important");
        browser.setAttribute("flex", "1");
        browser.setAttribute("height", "100%");
        browser.setAttribute("border", "none !important");
        browser.setAttribute("src", "chrome://${Name}/content/src/index.html");
        browser.setAttribute('disablehistory',true);
        return browser;
    };

    Chrome.prototype.start = function(chromeConfigs){        
        let openWindow = initWindow();        
        openWindow.addEventListener("DOMContentLoaded",onDOMContentLoaded.bind(this),false);
    };

    return Chrome;
}(); // close IIFE

let chrome = new Chrome();
chrome.loadConfig();
