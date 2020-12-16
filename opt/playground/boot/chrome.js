//usa el componente de HTTP para cargar las configuraciones externas para personalizar la app
//TRANSFORMAR EN UNA CLASE NORMAL DE JS

'use strict';
Components.utils.import("resource://gre/modules/Http.jsm");
Components.utils.import("resource://gre/modules/Services.jsm");

var Chrome = function () { // open IIFE

    function Chrome() {        
        this.loadConfig();
    }

    Chrome.prototype.initWindow = function (chromeConfigs) {
        var xulNs = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
        var xhtmlNs = "http://www.w3.org/1999/xhtml";

        var style = "padding:"+chromeConfigs['chrome.padding']+" !important;" +
                    "background-color:"+chromeConfigs['chrome.background']+" !important;" +//#dfdfdf, si es transparente el chrome desaparece
                    "background:"+chromeConfigs['chrome.background']+" !important;" +//#dfdfdf, si es transparente el chrome desaparece
                    "box-shadow:"+chromeConfigs['chrome.boxshadow']+" !important;" +
                    "margin:"+chromeConfigs['chrome.margin']+" !important;" +
                    "opacity:"+chromeConfigs['chrome.opacity']+" !important;" +
                    "transform:"+chromeConfigs['chrome.transform']+" !important;" +
                    "border:"+chromeConfigs['chrome.border']+" !important;" +
                    "border-radius:"+chromeConfigs['chrome.borderradius']+" !important;";

        var blankXul = ('<?xml version="1.0"?>' +
                        '<?xml-stylesheet type="text/css"?> ' +
                        '<window windowtype="navigator:browser" xmlns:html="'+ xhtmlNs+'" xmlns="' + xulNs + '" accelerated="true" style="'+style+'" disablechrome="'+chromeConfigs['chrome.disablechrome']+'" hidechrome="'+chromeConfigs['chrome.hidechrome']+'" chromemargin="'+chromeConfigs['chrome.chromemargin']+'"><html:head><html:link rel="icon" href="chrome://playground/content/boot/icons/default/chrome.ico"/></html:head></window>');

        var features = ["width="+chromeConfigs['chrome.width'],
                        "height="+chromeConfigs['chrome.height'],
                        "centerscreen="+Number(chromeConfigs['chrome.centerscreen']),
                        "titlebar="+Number(chromeConfigs['chrome.titlebar']),
                        "resizable="+Number(chromeConfigs['chrome.resizable']),
                        "minimizable="+Number(chromeConfigs['chrome.minimizable']),
                        "noopener=yes",
                        "chrome=yes",
                        "alwaysRaised=no",
                        "close="+Number(chromeConfigs['chrome.close'])];

        var url = "data:application/vnd.mozilla.xul+xml," + escape(blankXul);
        var mainWindow = Services.wm.getMostRecentWindow(null);
        var openWindow = Services.ww.openWindow(null, url, null, features.join(","), null);
        openWindow.focus();
        mainWindow.close();
        return openWindow;
    };

    Chrome.prototype.loadConfig = function(){
        this.browser = document.getElementById('chromeapp');
        var that = this;

        var onLoad = function(responseText, xhr){
            var chromeConfig = JSON.parse(responseText);
            that.load(chromeConfig.jobs.chrome.environment);
        };

        var onError = function(error, responseText, xhr){            
            dump(error);
        };
        //el logger solo se pone en tiempo de desarrollo
        let xhr = httpRequest('chrome://playground/content/boot/chrome.json',{'onLoad':onLoad, 'onError':onError});
    };

    Chrome.prototype.initBrowser = function(openWindow){
        var browser = openWindow.document.createElement("browser");
        browser.setAttribute("id", "main-window");
        browser.setAttribute("disablehistory", "indeed");
        browser.setAttribute("type", "content-primary");
        browser.setAttribute("style", "background:transparent ! important;background-color:transparent ! important");
        browser.setAttribute("flex", "1");
        browser.setAttribute("height", "100%");
        browser.setAttribute("border", "none !important");
        browser.setAttribute("src", "chrome://playground/content/src/index.html");
        browser.setAttribute('disablehistory',true);
        return browser;
    };

    Chrome.prototype.load = function(chromeConfigs){
        var that = this;
        var openWindow = this.initWindow(chromeConfigs);
        openWindow.addEventListener("DOMContentLoaded", function(event){
            openWindow.document.title = "playground";
            event.target.documentElement.appendChild(that.initBrowser(openWindow/*, chromeConfigs*/));
        }, false);
    };

    return Chrome;
}(); // close IIFE

new Chrome();