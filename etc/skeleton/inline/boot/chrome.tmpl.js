//usa el componente de HTTP para cargar las configuraciones externas para personalizar la app
//TRANSFORMAR EN UNA CLASE NORMAL DE JS

'use strict';
Components.utils.import("resource://gre/modules/Services.jsm");

var Chrome = function () { // open IIFE

    function Chrome() {
        this.load();
    }

    Chrome.prototype.initWindow = function () {
        var xulNs = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
        var xhtmlNs = "http://www.w3.org/1999/xhtml";

        var style = "padding:0px;" +
                    "background-color:white;" +
                    "background:white;" +
                    "box-shadow:0px 0px 0px #ccc;" +
                    "margin:0px;"+
                    "opacity:1;"+
                    "transform:rotate(0deg) skew(0deg, 0deg);"+
                    "border:0px solid #000;"+
                    "border-radius:0px 0px 0px 0px !important;";

        var blankXul = ('<?xml version="1.0"?>' +
                        '<?xml-stylesheet type="text/css"?> ' +
                        '<window windowtype="navigator:browser" xmlns:html="'+ xhtmlNs+'" xmlns="' + xulNs + '" accelerated="true" style="'+style+'" disablechrome="false" hidechrome="false" chromemargin="-1 -1 -1 -1"><html:head><html:link rel="shortcut icon" href="chrome://app/content/boot/icons/default/chrome.ico"/></html:head></window>');

        var features = ["width=1000",
                        "height=720",
                        "centerscreen=yes",
                        "titlebar=yes",
                        "resizable=yes",
                        "minimizable=yes",
                        "noopener=yes",
                        "chrome=yes",
                        "close=yes"];

        var url = "data:application/vnd.mozilla.xul+xml," + escape(blankXul);
        var mainWindow = Services.wm.getMostRecentWindow(null);
        var openWindow = Services.ww.openWindow(null, url, null, features.join(","), null);
        openWindow.focus();
        mainWindow.close();
        return openWindow;
    };

    Chrome.prototype.initBrowser = function(openWindow){
        var browser = openWindow.document.createElement("browser");
        browser.setAttribute("id", "main-window");
        browser.setAttribute("disablehistory", "indeed");
        browser.setAttribute("type", "content-primary");
        browser.setAttribute("style", "background:transparent !important;background-color:transparent !important");
        browser.setAttribute("flex", "1");
        browser.setAttribute("height", "100%");
        browser.setAttribute("border", "none !important");
        browser.setAttribute("src", "chrome://tool/content/src/index.html");
        browser.setAttribute('disablehistory',true);
        return browser;
    };

    Chrome.prototype.load = function(){
        var that = this;
        var openWindow = this.initWindow();
        openWindow.addEventListener("DOMContentLoaded", function(event){
            openWindow.document.title = "${Name}";
            event.target.documentElement.appendChild(that.initBrowser(openWindow));
        }, false);
    };

    return Chrome;
}(); // close IIFE

new Chrome();