function HTTPProxy() {}

HTTPProxy.username = null;
HTTPProxy.password = null;
HTTPProxy.xmlresult = null;

// accesstype "1" to get wsdl from web services or agents
//            "2" to access uddi 
//            "3" to advanced access  
//            "4" to send soap request to web services
	
HTTPProxy.send = function(url, method, header, body, async, username, password, accesstype)
{
	var httprequest = new XMLHttpRequest();
	HTTPProxy.username = username;
	HTTPProxy.password = password;
	if (accesstype == "1") {
		if (async) {
			//alert("Asynchronous Communication");
			var getresponse = function () {
				//callback gets response
				if (httprequest.readyState == 4) {
					try {
						var statusinfo = httprequest.status + " " + httprequest.statusText + "";
						document.getElementById("statusbox").value = statusinfo;
						document.getElementById("box_responseHeader").value = httprequest.getAllResponseHeaders();
						document.getElementById("box_responseBody").value = httprequest.responseText;
						HTTPProxy.xmlresult = httprequest.responseXML;
						
						if (document.getElementById("box_wsdl")){
							
							if (httprequest.responseXML != null){
								document.getElementById("box_wsdl").value = (new XMLSerializer()).serializeToString(httprequest.responseXML);
							}
							else{
								document.getElementById("box_wsdl").value = httprequest.responseText;
							}
						}
						try
							{
								if (httprequest.responseXML != null){
									InitWSDLParser.startParsing(HTTPProxy.xmlresult);
								}
								else
								{
									var domparser = new DOMParser();
									var wsdlAsXml = domparser.parseFromString(httprequest.responseText,'text/xml');
									InitWSDLParser.startParsing(wsdlAsXml);
								}
							}
							catch(e)
							{
								alert("An error has occured while parsing.");
							}
					}
					catch(e) {
						alert("Error getting response");
					}
				}
			}
			document.getElementById("box_responseHeader").value = "";
			document.getElementById("box_responseBody").value = "";
			
			//callback
			httprequest.onreadystatechange = getresponse;
			try {
				if (HTTPProxy.username && HTTPProxy.password){
					httprequest.open(method, url, true, HTTPProxy.username, HTTPProxy.password);
				}
				else {
					httprequest.open(method, url, true);
				}
				
				var headers = header;
				headers = headers.split("\n");
				for (var i = 0; i < headers.length; i++) {
					var eachheader = headers[i].split(": ");
					if (eachheader[1])
						httprequest.setRequestHeader(eachheader[0],eachheader[1]);
				}
				httprequest.send(body);
			}
			catch(e){
				alert("Error while requesting");		
			}
		}
		
		if (!async) {
			//alert("Synchronous Communication");
			document.getElementById("box_responseHeader").value = "";
			document.getElementById("box_responseBody").value = "";
			try {
				if (HTTPProxy.username && HTTPProxy.password){
					httprequest.open(method, url, false, HTTPProxy.username, HTTPProxy.password);
				}
				else {
					httprequest.open(method, url, false);
				}
				var headers = header;
				headers = headers.split("\n");
				for (var i = 0; i < headers.length; i++) {
					var eachheader = headers[i].split(": ");
					if (eachheader[1])
						httprequest.setRequestHeader(eachheader[0],eachheader[1]);
				}
				httprequest.send(body);
				document.getElementById("box_responseHeader").value = httprequest.getAllResponseHeaders();
				document.getElementById("box_responseBody").value = httprequest.responseText;
				if (document.getElementById("box_wsdl")){
					if (httprequest.responseXML != null){
						document.getElementById("box_wsdl").value = (new XMLSerializer()).serializeToString(httprequest.responseXML);
					}
					else{
						document.getElementById("box_wsdl").value = httprequest.responseText;
					}					
				}
				var statusinfo = httprequest.status + " " + httprequest.statusText + "";
				document.getElementById("statusbox").value = statusinfo;
				HTTPProxy.xmlresult = httprequest.responseXML;
			}
			catch(e){
				alert("Error while requesting");
			}		
		}
	}
	
	else if (accesstype == "2") {
		if (async) {
			//alert("Asynchronous Communication");
			var getresponse = function () {
				//callback gets response
				if (httprequest.readyState == 4) {
					try {
						var statusinfo = httprequest.status + " " + httprequest.statusText + "";
						document.getElementById("statusbox").value = statusinfo;
						document.getElementById("box_responseHeader").value = httprequest.getAllResponseHeaders();
						document.getElementById("box_responseBody").value = httprequest.responseText;
						HTTPProxy.xmlresult = httprequest.responseXML;
						document.getElementById("tab_box").selectedIndex = "3";
						try
						{
							SOAPParser.startParsingUDDI(HTTPProxy.xmlresult);
						}
						catch(e)
						{
							//alert("An error has occured while parsing the SOAP response message. Please check the UDDI Inquiry API Address and the received response message.");
							SOAPParser.startParsingUDDIFault(HTTPProxy.xmlresult);
						}
						return HTTPProxy.xmlresult;
					}
					catch(e) {
						alert("Error getting response");
					}
				}
			}
			document.getElementById("box_responseHeader").value = "";
			document.getElementById("box_responseBody").value = "";
			
			//callback
			httprequest.onreadystatechange = getresponse;
			try {
				if (HTTPProxy.username && HTTPProxy.password){
					httprequest.open(method, url, true, HTTPProxy.username, HTTPProxy.password);
				}
				else {
					httprequest.open(method, url, true);
				}
				
				var headers = header;
				headers = headers.split("\n");
				for (var i = 0; i < headers.length; i++) {
					var eachheader = headers[i].split(": ");
					if (eachheader[1])
						httprequest.setRequestHeader(eachheader[0],eachheader[1]);
				}
				var soapactionvalue = "\"\"";
				httprequest.setRequestHeader("Soapaction",soapactionvalue);
				httprequest.send(body);
			}
			catch(e){
				alert("Error while requesting");		
			}
		}
		
		if (!async) {
			//alert("Synchronous Communication");
			document.getElementById("box_responseHeader").value = "";
			document.getElementById("box_responseBody").value = "";
			try {
				if (HTTPProxy.username && HTTPProxy.password){
					httprequest.open(method, url, false, HTTPProxy.username, HTTPProxy.password);
				}
				else {
					httprequest.open(method, url, false);
				}
				var headers = header;
				headers = headers.split("\n");
				for (var i = 0; i < headers.length; i++) {
					var eachheader = headers[i].split(": ");
					if (eachheader[1])
						httprequest.setRequestHeader(eachheader[0],eachheader[1]);
				}
				var soapactionvalue = "\"\"";
				httprequest.setRequestHeader("Soapaction",soapactionvalue);
				
				httprequest.send(body);
				
				document.getElementById("box_responseHeader").value = httprequest.getAllResponseHeaders();
				document.getElementById("box_responseBody").value = httprequest.responseText;
				if (document.getElementById("box_wsdl")){
					document.getElementById("box_wsdl").value = (new XMLSerializer()).serializeToString(httprequest.responseXML);					
				}
				var statusinfo = httprequest.status + " " + httprequest.statusText + "";
				document.getElementById("statusbox").value = statusinfo;
				HTTPProxy.xmlresult = httprequest.responseXML;
				document.getElementById("tab_box").selectedIndex = "3";
			}
			catch(e){
				alert("Error while requesting");
			}		
		}
	}
	
	else if (accesstype == "3") {
		if (async) {
			//alert("Asynchronous Communication");
			var getresponse = function () {
				//callback gets response
				if (httprequest.readyState == 4) {
					try {
						var statusinfo = httprequest.status + " " + httprequest.statusText + "";
						document.getElementById("statusbox").value = statusinfo;
						document.getElementById("box_responseHeader").value = httprequest.getAllResponseHeaders();
						document.getElementById("box_responseBody").value = httprequest.responseText;
						HTTPProxy.xmlresult = httprequest.responseXML;
						document.getElementById("tab_box").selectedIndex = "2";
						return HTTPProxy.xmlresult;
					}
					catch(e) {
						alert("Error getting response");
					}
				}
			}
			document.getElementById("box_responseHeader").value = "";
			document.getElementById("box_responseBody").value = "";
			
			//callback
			httprequest.onreadystatechange = getresponse;
			try {
				if (HTTPProxy.username && HTTPProxy.password){
					httprequest.open(method, url, true, HTTPProxy.username, HTTPProxy.password);
				}
				else {
					httprequest.open(method, url, true);
				}
				
				var headers = header;
				headers = headers.split("\n");
				for (var i = 0; i < headers.length; i++) {
					var eachheader = headers[i].split(": ");
					if (eachheader[1])
						httprequest.setRequestHeader(eachheader[0],eachheader[1]);
				}
				httprequest.send(body);
			}
			catch(e){
				alert("Error while requesting");		
			}
		}
		
		if (!async) {
			//alert("Synchronous Communication");
			document.getElementById("box_responseHeader").value = "";
			document.getElementById("box_responseBody").value = "";
			try {
				if (HTTPProxy.username && HTTPProxy.password){
					httprequest.open(method, url, false, HTTPProxy.username, HTTPProxy.password);
				}
				else {
					httprequest.open(method, url, false);
				}
				var headers = header;
				headers = headers.split("\n");
				for (var i = 0; i < headers.length; i++) {
					var eachheader = headers[i].split(": ");
					if (eachheader[1])
						httprequest.setRequestHeader(eachheader[0],eachheader[1]);
				}
				httprequest.send(body);
				document.getElementById("box_responseHeader").value = httprequest.getAllResponseHeaders();
				document.getElementById("box_responseBody").value = httprequest.responseText;
				document.getElementById("tab_box").selectedIndex = "2";
				
				var statusinfo = httprequest.status + " " + httprequest.statusText + "";
				document.getElementById("statusbox").value = statusinfo;
				HTTPProxy.xmlresult = httprequest.responseXML;
			}
			catch(e){
				alert("Error while requesting");
			}		
		}
	}
	
	else if (accesstype == "4") {
		var parser = new DOMParser();
		var wsdl = parser.parseFromString(document.getElementById("box_wsdl").value,'text/xml');
		var targetnamespace = WSDLParser11.getTargetNamespace(wsdl);
		var choosedoperationname = GUI.getOperationname();
				
		if (async) {
			//alert("Asynchronous Communication");
			var getresponse = function () {
				//callback gets response
				if (httprequest.readyState == 4) {
					try {
						var statusinfo = httprequest.status + " " + httprequest.statusText + "";
						document.getElementById("statusbox").value = statusinfo;
						document.getElementById("box_responseHeader").value = httprequest.getAllResponseHeaders();
						
						var responsetext  = httprequest.responseText;
						responsetext = HTTPProxy.replaceText(responsetext, "&lt;", "<");
						responsetext = HTTPProxy.replaceText(responsetext, "&gt;", ">");
						document.getElementById("box_responseBody").value = httprequest.responseText;
						
						HTTPProxy.xmlresult = httprequest.responseXML;
						
						soundURL = "chrome://soaclient/skin/done.wav";
						gSound = Components.classes["@mozilla.org/sound;1"].createInstance(Components.interfaces.nsISound);
						var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
						var url = ioService.newURI(soundURL, null, null);
						gSound.play(url);
						
						document.getElementById("tab_box").selectedIndex = "4";
						
						var choosedoperationname = GUI.getOperationname();
						var choosedoperationnr = GUI.getOperationnumber();
						var param_and_inputs = GUI.getInputs(choosedoperationnr);
						SOAPParser.startParsingWS(httprequest.responseXML, choosedoperationname, param_and_inputs);
						
						var sendbutton = document.getElementById("sendRequest");
						sendbutton.setAttribute("disabled",true);
					}
					catch(e) {
						alert("Error getting response");
					}
				}
			}
			document.getElementById("box_responseHeader").value = "";
			document.getElementById("box_responseBody").value = "";
			
			//callback
			httprequest.onreadystatechange = getresponse;
			try {
				if (HTTPProxy.username && HTTPProxy.password){
					httprequest.open(method, url, true, HTTPProxy.username, HTTPProxy.password);
				}
				else {
					httprequest.open(method, url, true);
				}
				var headers = header;
				headers = headers.split("\n");
				for (var i = 0; i < headers.length; i++) {
					var eachheader = headers[i].split(": ");
					if (eachheader[1])
						httprequest.setRequestHeader(eachheader[0],eachheader[1]);
				}
				
 				var soapaction = ((targetnamespace.lastIndexOf("/") != targetnamespace.length - 1) ? targetnamespace + "/" : targetnamespace) + choosedoperationname;
				httprequest.setRequestHeader("Soapaction",soapaction);
	
				httprequest.send(body);
			}
			catch(e){
				alert("Error while requesting");		
			}
		}
		
		if (!async) {
			//alert("Synchronous Communication");
			document.getElementById("box_responseHeader").value = "";
			document.getElementById("box_responseBody").value = "";
			try {
				if (HTTPProxy.username && HTTPProxy.password){
					httprequest.open(method, url, false, HTTPProxy.username, HTTPProxy.password);
				}
				else {
					httprequest.open(method, url, false);
				}
				var headers = header;
				headers = headers.split("\n");
				for (var i = 0; i < headers.length; i++) {
					var eachheader = headers[i].split(": ");
					if (eachheader[1])
						httprequest.setRequestHeader(eachheader[0],eachheader[1]);
				}
				
				var soapaction = ((targetnamespace.lastIndexOf("/") != targetnamespace.length - 1) ? targetnamespace + "/" : targetnamespace) + choosedoperationname;
				httprequest.setRequestHeader("Soapaction",soapaction);
				
				httprequest.send(body);
				document.getElementById("box_responseHeader").value = httprequest.getAllResponseHeaders();
				
				var responsetext  = httprequest.responseText;
				responsetext = HTTPProxy.replaceText(responsetext, "&lt;", "<");
				responsetext = HTTPProxy.replaceText(responsetext, "&gt;", ">");
				document.getElementById("box_responseBody").value = httprequest.responseText;
				
				var statusinfo = httprequest.status + " " + httprequest.statusText + "";
				document.getElementById("statusbox").value = statusinfo;
				HTTPProxy.xmlresult = httprequest.responseXML;
				document.getElementById("tab_box").selectedIndex = "4";				
			}
			catch(e){
				alert("Error while requesting");
			}		
		}
	}
	return HTTPProxy.xmlresult;
}

// Converting to Base64
// From  Javascript "SOAP Client" library
// @version: 2.4 - 2007.12.21
// @author: Matteo Casati - http://www.guru4.net/
HTTPProxy.toBase64 = function(input)
{
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
		keyStr.charAt(enc3) + keyStr.charAt(enc4);
	} while (i < input.length);

	return output;
}

// Sourcecode from http://www.arstechnica.de/index.html?name=http://www.arstechnica.de/computer/JavaScript/JS11_01.html
// Open Source Code from Ralf Pfeifer
HTTPProxy.replaceText = function(QuellText, SuchText, ErsatzText)
{
	// Fehlerpruefung
	if ((QuellText == null) || (SuchText == null))           { return null; }
	if ((QuellText.length == 0) || (SuchText.length == 0))   { return QuellText; }

	// Kein ErsatzText?
	if ((ErsatzText == null) || (ErsatzText.length == 0))    { ErsatzText = ""; }

	var LaengeSuchText = SuchText.length;
	var LaengeErsatzText = ErsatzText.length;
	var Pos = QuellText.indexOf(SuchText, 0);

	while (Pos >= 0)
	{
		QuellText = QuellText.substring(0, Pos) + ErsatzText + QuellText.substring(Pos + LaengeSuchText);
		Pos = QuellText.indexOf(SuchText, Pos + LaengeErsatzText);
	}
	return QuellText;
}