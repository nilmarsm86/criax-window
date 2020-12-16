var authentication = false;


var advancedClient = {
	username: null,
	password: null,
		
	submit: function() {
		var url = document.getElementById("url").value;		
		var history = Components.classes["@mozilla.org/satchel/form-history;1"].getService(Components.interfaces.nsIFormHistory ? Components.interfaces.nsIFormHistory : Components.interfaces.nsIFormHistory2);
		history.addEntry("advancedhistory", url);			
		var method = document.getElementById("requestMethod").value;
		var header = document.getElementById("advancedHeaderbox").value;
		var body = document.getElementById("box_requestBody").value;
		var async = "";
		
		var urlOk = advancedClient.checkUrl(url);
		
		if (!authentication){
			username = "";
			password = "";
		}
		if (urlOk){
			if (document.getElementById("radiosync").selected) {
				async = false;
				
				try
				{
					HTTPProxy.send(url, method, header, body, async, username, password, 3);
				}
				catch(e)
				{
					alert("An error has occured, please check the URL.");
				}
			}
			if (document.getElementById("radioasync").selected) {
				async = true;
				
				try
				{
					HTTPProxy.send(url, method, header, body, async, username, password, 3);
				}
				catch(e)
				{
					alert("An error has occured, please check the URL.");
				}
			}
		}
		else{
			alert("Please check the url, e.g. http://www.webservicex.com/ValidateEmail.asmx?WSDL");
		}
	},
	
	checkUrl: function(url) {
	    var correctUrl = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		if (correctUrl.test(url)){
			return true;	
		}
		else{
			return false;
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
			document.getElementById("advancedHeaderbox").value = "Authorization: " + "Basic " + HTTPProxy.toBase64(username + ":" + password);
		}
	}
}   
