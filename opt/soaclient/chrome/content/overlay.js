//loading a Tab "Access Web Services"
function loadWSClient() {
    var WSTab          = gBrowser.addTab('chrome://soaclient/content/webservices.xul');
    WSTab.label        = "Access Web Services";
    gBrowser.selectedTab = WSTab;
	gBrowser.setIcon(WSTab, "chrome://soaclient/skin/logo24.png");
	var event = { notify: function(timer) { gBrowser.setIcon(WSTab, "chrome://soaclient/skin/logo24.png"); } }
	var timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
	timer.initWithCallback(event,300,Components.interfaces.nsITimer.TYPE_ONE_SHOT);
}

//loading a Tab "Access UDDI Registries"
function loadUDDIClient() {
    var UDDITab          = gBrowser.addTab('chrome://soaclient/content/uddi.xul');
    UDDITab.label        = "Access UDDI Registries";
    gBrowser.selectedTab = UDDITab;
	gBrowser.setIcon(UDDITab, "chrome://soaclient/skin/logo24.png");
	var event = { notify: function(timer) { gBrowser.setIcon(UDDITab, "chrome://soaclient/skin/logo24.png"); } }
	var timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
	timer.initWithCallback(event,300,Components.interfaces.nsITimer.TYPE_ONE_SHOT);
}

//loading a Tab "Advanced Access"
function loadAdvancedClient() {
    var AdvancedTab          = gBrowser.addTab('chrome://soaclient/content/advanced.xul');
    AdvancedTab.label        = "Advanced Access";
    gBrowser.selectedTab = AdvancedTab;
	gBrowser.setIcon(AdvancedTab, "chrome://soaclient/skin/logo24.png");
	var event = { notify: function(timer) { gBrowser.setIcon(AdvancedTab, "chrome://soaclient/skin/logo24.png"); } }
	var timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
	timer.initWithCallback(event,300,Components.interfaces.nsITimer.TYPE_ONE_SHOT);
}