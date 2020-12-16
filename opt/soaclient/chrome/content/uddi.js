var authentication = false;
var localfile = false;
var everythingOK = true;

var uddiClient = {
	username: null,
	password: null,

	doSearch: function(api, input) {
		var url = document.getElementById("inquiryaddress").value;
		var history = Components.classes["@mozilla.org/satchel/form-history;1"].getService(Components.interfaces.nsIFormHistory ? Components.interfaces.nsIFormHistory : Components.interfaces.nsIFormHistory2);
		history.addEntry("uddihistory", url);
		var method = "POST";
		var	header = document.getElementById("box_requestHeader").value;
		var criteria = api;
		if (criteria == null){
			var methodlist = document.getElementById("query");
			if (methodlist.getAttribute("keytype") == "business"){
				document.getElementById("requestMethod").value = "Business Details using Business Key";
				document.getElementById("query").value = methodlist.getAttribute("key");
			}
			else if (methodlist.getAttribute("keytype") == "service"){
				document.getElementById("requestMethod").value = "Service Details using Service Key";
				document.getElementById("query").value = methodlist.getAttribute("key");
			}
			else if (methodlist.getAttribute("keytype") == "tmodel"){
				document.getElementById("requestMethod").value = "tModel Details using tModel Key";
				document.getElementById("query").value = methodlist.getAttribute("key");
			}			
			methodlist.setAttribute("keytype", "");
			methodlist.setAttribute("key", "");
			criteria = document.getElementById("requestMethod").value;
		}
		
		var query = input;
		if (query == null){
			query = document.getElementById("query").value;
			var history = Components.classes["@mozilla.org/satchel/form-history;1"].getService(Components.interfaces.nsIFormHistory ? Components.interfaces.nsIFormHistory : Components.interfaces.nsIFormHistory2);
			history.addEntry("searchhistory", query);
		}
		
		var body = "";
		if (document.getElementById("uddiv1").selected) {
			body = SOAPGenerator.soaprequestuddi(criteria, query, 1);
		}
		else if (document.getElementById("uddiv2").selected) {
			body = SOAPGenerator.soaprequestuddi(criteria, query, 2);
		}
		else if (document.getElementById("uddiv3").selected) {
			body = SOAPGenerator.soaprequestuddi(criteria, query, 3);
		}
		
		var async = "";
		var cache;		
		everythingOK = true;
	
		uddiClient.checkUrl();
		
		if (everythingOK){	
			document.getElementById("box_responseHeader").value = "";
			document.getElementById("box_responseBody").value = "";
			document.getElementById("statusbox").value = "";
			
			if (!authentication){
				username = "";
				password = "";
			}
			if (document.getElementById("radiosync").selected) {
				async = false;
				
				try
				{
					document.getElementById("box_requestBody").value = body;
					cache = HTTPProxy.send(url, method, header, body, async, username, password, 2);						
					try
					{
						SOAPParser.startParsingUDDI(cache);
					}
					catch(e)
					{
						SOAPParser.startParsingUDDIFault(cache);
					}
				}
				catch(e)
				{
					alert("An error has occured, please check the UDDI Inquiry API Address.");
				}
			}
			if (document.getElementById("radioasync").selected) {
				async = true;
				
				try
				{
					document.getElementById("box_requestBody").value = body;
					cache = HTTPProxy.send(url, method, header, body, async, username, password, 2);
				}
				catch(e)
				{
					alert("An error has occured, please check the UDDI Inquiry API Address.");
				}
			}

		}
	},
	
	checkUrl: function() {
		var uddi_url = document.getElementById("inquiryaddress").value;
		var correctUrl = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		if (correctUrl.test(uddi_url)){
		}
		else{
				everythingOK = false;
				alert("An error has occured, please check the UDDI Inquiry API Address.");
			}
	},

	doAuthentication: function() {
		var passwordObject       = new Object();
		passwordObject.username  = null;
		passwordObject.password  = null;
		window.openDialog("chrome://soaclient/content/authentication.xul", "login", "chrome,modal,dialog,resizable,centerscreen", passwordObject);
		
		if (passwordObject.username && passwordObject.password){
			username = passwordObject.username;
			password = passwordObject.password;
			authentication = true;
			document.getElementById("box_requestHeader").value = "Content-Type: text/xml";
			var content_requestHeader = document.getElementById("box_requestHeader").value;
			document.getElementById("box_requestHeader").value = content_requestHeader + "\n" + "Authorization: " + "Basic " + HTTPProxy.toBase64(username + ":" + password);
		}
	},
	
	get_businessDetail: function(businesskey) {
		var parentdocument = window.parent.document;		
		var searchfeld = parentdocument.getElementById("query");
		searchfeld.setAttribute("value", businesskey);
		searchfeld.setAttribute("keytype", "business");
		searchfeld.setAttribute("key", businesskey);
		parentdocument.getElementById('requestMethod').selectedItem = parentdocument.getElementById("method_businessdetails");
	},
	
	get_serviceDetail: function(servicekey) {
		var parentdocument = window.parent.document;
		var searchfeld = parentdocument.getElementById("query");
		searchfeld.setAttribute("value", servicekey);
		searchfeld.setAttribute("keytype", "service");
		searchfeld.setAttribute("key", servicekey);
		parentdocument.getElementById('requestMethod').selectedItem = parentdocument.getElementById("method_servicedetails");
	},

	get_tmodelDetail: function(tmodelkey) {
		var parentdocument = window.parent.document;
		var searchfeld = parentdocument.getElementById("query");
		searchfeld.setAttribute("value", tmodelkey);
		searchfeld.setAttribute("keytype", "tmodel");
		searchfeld.setAttribute("key", tmodelkey);
		parentdocument.getElementById('requestMethod').selectedItem = parentdocument.getElementById("method_tmodeldetails");
	}
}   
