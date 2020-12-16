pref("toolkit.defaultChromeURI", "chrome://${Name}/content/boot/chrome.xul");//ruta base chrome://${Name}/content/ => directorio raiz
user_pref("capability.principal.codebase.chrome.granted", "UniversalXPConnect");
pref('app.support.baseURL','');
pref("toolkit.singletonWindowType", "main-window");
pref("browser.preferences.instantApply",true);
pref("toolkit.defaultChromeFeatures", "chrome,resizable=no,dialog=no,centerscreen=yes,close=no,titlebar=no");//ver como pasar para el js

pref("browser.dom.window.dump.enabled", false);
pref("javascript.options.showInConsole", false);
pref("javascript.options.strict", false);
pref("nglayout.debug.disable_xul_cache", false);
pref("nglayout.debug.disable_xul_fastload", false);