pref("toolkit.defaultChromeURI", "chrome://tool/content/boot/chrome.xul");//ruta base chrome://${Name}/content/ => directorio raiz
user_pref("capability.principal.codebase.chrome.granted", "UniversalXPConnect");
pref('app.support.baseURL','');
pref("toolkit.singletonWindowType", "main-window");
pref("browser.preferences.instantApply",true);
pref("toolkit.defaultChromeFeatures", "chrome,resizable=no,dialog=no,centerscreen=yes,close=no,titlebar=no");//ver como pasar para el js