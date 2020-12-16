// Allow dump() calls to work.
pref("browser.dom.window.dump.enabled", true);

// Enable JS strict mode.
pref("javascript.options.strict", true);

pref("nglayout.debug.disable_xul_cache", true);
pref("javascript.options.showInConsole", true);
pref("extensions.logging.enabled", true);
pref("nglayout.debug.disable_xul_fastload", true);
pref("dom.report_all_js_exceptions", true);
pref("browser.xul.error_pages.enabled", true);

// This is here just because of the window.open issue -- see https://github.com/mozilla/chromeless/issues/43
pref("browser.chromeURL", "chrome://chromeless/content/chromeless.xul");

//preferencias personalizadas
pref("browser.urlbar.autocomplete.enabled", false);
pref("network.http.max-connections", 32);
pref("zoom.minPercent", 100);
pref("zoom.maxPercent", 100);
pref("notification.feature.enabled", true);
pref("browser.chrome.favicons",true);
pref("browser.chrome.site_icons",true);
pref("browser.sessionhistory.max_total_viewers", 0);
pref("config.trim_on_minimize",true);
pref("network.http.max-persistent-connections-per-server", 2);
pref("network.http.max-persistent-connections-per-proxy", 4);
pref("network.http.pipelining", true);
pref("network.http.pipelining", true);
pref("network.http.proxy.pipelining", true);
pref("network.http.max-connections", 24);
pref("network.http.max-connections-per-server", 8);
pref("network.http.sendRefererHeader", 0);
pref("security.enable_java",true);
pref("dom.max_script_run_time",300);
pref("dom.max_chrome_script_run_time",300);