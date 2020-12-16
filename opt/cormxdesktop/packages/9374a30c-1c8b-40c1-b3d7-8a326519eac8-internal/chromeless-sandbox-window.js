const {Cc, Ci, Cu} = require("chrome");

var gWindows = [];

const xpcom = require("xpcom");
const appinfo = require("appinfo");

const ww = Cc["@mozilla.org/embedcomp/window-watcher;1"]
    .getService(Ci.nsIWindowWatcher);

const observers = require("observer-service");

function isTopLevelWindow(w) {
  for (var i = 0; i < gWindows.length; i++) {
    if (gWindows[i]._browser && gWindows[i]._browser.contentWindow == w) return true;
  }
  return false;
}

var checkWindows = function(subject, url) {

  if (subject.window.top != subject.window.self) {
    if (isTopLevelWindow(subject.window.parent))
    {
      // top level iframe window
      var ifWin = subject.window.self;
      ifWin.wrappedJSObject.eval("window.top = window.self");
      ifWin.wrappedJSObject.eval("window.parent = window.self");
    }
    else
    {
      // this is a frame nested underneath the top level frame
      var ifWin = subject.window.self;
      ifWin.wrappedJSObject.eval("window.top = window.parent.top");
    }
  } else if (isTopLevelWindow(subject.window)) {
      // this is application code!  let's handle injection at this point.
      let i;
      for (i = 0; i < gWindows.length; i++) {
          if (gWindows[i]._browser && gWindows[i]._browser.contentWindow == subject.window) break;
      }
      if (i < gWindows.length) {
          let wo = gWindows[i];

          // "requiring" the prevent navigation module will install a
          // content policy that disallows changing the root HTML page.
          require("prevent-navigation");

          if (wo.options.injectProps) {
              let sandbox = new Cu.Sandbox(
                  Cc["@mozilla.org/systemprincipal;1"].
                      createInstance(Ci.nsIPrincipal)
              );

              sandbox.window = subject.wrappedJSObject;

              for (var k in wo.options.injectProps) {
                  // functions are easy to inject
                  if (typeof(wo.options.injectProps[k]) === 'function') {
                      sandbox.importFunction(wo.options.injectProps[k], k);
                  }
                  // objects are easy too, just different
                  else {
                      sandbox[k] = wo.options.injectProps[k];
                  }

                  Cu.evalInSandbox("window."+k+" = "+k+";", sandbox);
              }
          }
      }
  }
};

observers.add("content-document-global-created", checkWindows);
observers.add("chrome-document-global-created", checkWindows);

var xulNs = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
var xhtmlNs = "http://www.w3.org/1999/xhtml";
const ai = appinfo.contents;

var bordersWidth = "border:none !important;";//cuando se pone no sale el marco de la ventana
if((typeof(ai.borders) == "string") && (ai.borders_radius != "none") || (ai.borders != "0px solid #000")){
    bordersWidth = "border:"+ai.borders+" !important;";
}
var borderRadius = "";//cuando se pone no sale el marco de la ventana
if((typeof(ai.borders_radius) == "string") && (ai.borders_radius != "0px 0px 0px 0px")){
	borderRadius = "border-radius:"+ai.borders_radius+" !important;";
}
var backgroundApp = ai.background_app;
if(ai.hidechrome == true){
	backgroundApp = "transparent";//con este valor se quita el chrome
}
var margins = "margin:"+ai.margins+" !important;";
var shadow = "box-shadow:"+ai.shadow+" !important;";
var opacityApp = "opacity:"+ai.opacity+" !important;";//si se pone un valor distinto de 1 se quita el chrome
var transformApp = "transform:"+ai.transform+" !important;";
var appPadding = "0px 0px 0px 0px !important;";
var appBackImage = "";
if(ai.firefoxos == true){
    appPadding = "73px 17px 73px 17px !important;";
    appBackImage = "background-image:url(chrome://chromeless/content/criax_movil.png) !important;";
}
var blankXul = ('<?xml version="1.0"?>' +
                '<?xml-stylesheet ' + ' type="text/css"?> ' +
                '<window windowtype="navigator:browser" xmlns:html="'+ xhtmlNs+'" xmlns="' + xulNs + '" accelerated="true" style="padding:'+appPadding+' background-color:'+backgroundApp+' !important;background:'+backgroundApp+' !important; '+borderRadius+' '+shadow+' '+margins+' '+opacityApp+' '+transformApp+' '+bordersWidth+' '+appBackImage+'" disablechrome="'+ai.hidechrome+'" hidechrome="'+ai.hidechrome+'"></window>');
//console.log(blankXul);
function Window(options, testCallbacks) {
  memory.track(this);

  function trueIsYes(x) { return x ? "yes" : "no"; }

  var features = ["width=" + options.width,
                  "height=" + options.height,
                  "centerscreen=yes"
                 ];

  if (options.titleBar == false) features.push("titlebar=no");

  features.push("resizable=" + trueIsYes(options.resizable));
  //features.push("menubar=" + trueIsYes(options.menubar));

  /* We now pass the options.url, which is the user app directly
  inserting it in the window, instead using the xul browser element
  that was here. This helped to make the session history work.
  */
  var url = "data:application/vnd.mozilla.xul+xml," + escape(blankXul);
  var window = ww.openWindow(null, url, null, features.join(","), null);

  this._id = gWindows.push(this) - 1;
  this._window = window;
  this._browser = null;
  this._testCallbacks = testCallbacks;
  this.options = options;

  window.addEventListener("close", this, false);
  window.addEventListener("DOMContentLoaded", this, false);
}

Window.prototype = {
  handleEvent: function handleEvent(event) {
    switch (event.type) {
    case "close":
      if (event.target == this._window) {
        if (gWindows[this._id])
          delete gWindows[this._id];
        this._window.removeEventListener("close", this, false);
      }
      break;
    case "DOMContentLoaded":
      if (event.target == this._window.document) {
        // update window title
        if (ai && ai.name) {
            this._window.document.title = ai.name;
            //console.log("Application: "+this._window.document.title);
        }
        
        var browser = this._window.document.createElement("browser");
        browser.setAttribute("id", "main-window");
        browser.setAttribute("disablehistory", "indeed");
        browser.setAttribute("type", "content-primary");
        browser.setAttribute("style", "background:transparent ! important;background-color:transparent ! important");
        browser.setAttribute("flex", "1");
        browser.setAttribute("height", "100%");
        browser.setAttribute("border", "none");
        event.target.documentElement.appendChild(browser);

        this._browser = browser;
        browser.loadURI(this.options.url);
        if(this._testCallbacks != undefined && this._testCallbacks.onload != undefined) {
           var refthis = this;
           browser.addEventListener("DOMContentLoaded", function () { 
             refthis._testCallbacks.onload();
           }, false);
        }
        var parentWindow = this._window;
        browser.addEventListener("DOMTitleChanged", function(evt){
            if (evt.target.title.trim().length > 0)
                parentWindow.document.title = evt.target.title;
        }, false);
      }
      return false;
    };
  },
  close: function() {
    this._window.close();
  }
};

require("errors").catchAndLogProps(Window.prototype, "handleEvent");

exports.Window = Window;

require("unload").when(
  function() {
    gWindows.slice().forEach(function(window) { window.close(); });
  });

// an internal export.  what's the proper way to prevent browsercode from
// getting at this?
exports.AllWindows = gWindows;

