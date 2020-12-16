var authentication = false;
var localfile = false;
var webservicesClient = {
	username: null,
	password: null,
	everythingOK: true,
	
	browseFile: function() {
      var nsIFilePicker = Components.interfaces.nsIFilePicker;
      var getfile = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
      getfile.init(window, "Choose File to Upload", nsIFilePicker.modeOpen);
      if(getfile.show() == nsIFilePicker.returnOK) {
		 var requestURL = document.getElementById('wsdlUrl');
		 requestURL.value = getfile.file.path;
		 var thefile = getfile.file;
		 var filecontent = "";
			var fstream = Components.classes["@mozilla.org/network/file-input-stream;1"]
			                        .createInstance(Components.interfaces.nsIFileInputStream);
			var sstream = Components.classes["@mozilla.org/scriptableinputstream;1"]
			                        .createInstance(Components.interfaces.nsIScriptableInputStream);
			fstream.init(thefile, -1, 0, 0);
			sstream.init(fstream);

			var str = sstream.read(4096);
			while (str.length > 0) {
			  filecontent += str;
			  str = sstream.read(4096);
			}
			sstream.close();
			fstream.close();
			document.getElementById('box_wsdl').value = filecontent;
			document.getElementById("box_responseHeader").value = "";
			document.getElementById("box_responseBody").value = "";
			document.getElementById("statusbox").value = "Using a local WSDL file";
			localfile = true;
      }
	},
	
	doParse: function(){
		var wsMethod = "GET";
		var wsHeader = document.getElementById("box_requestHeader").value;
		document.getElementById("box_requestBody").value = "";
		var wsBody = document.getElementById("box_requestBody").value;
		var wsAsync = "";
		var wsdlcontent = "";
		var sendbutton = document.getElementById("sendRequest");
		sendbutton.setAttribute("disabled",false);
		
		webservicesClient.checklocalfile();
		
		everythingOK = true;
		if (!localfile || document.getElementById("box_wsdl").value == ""){				
			webservicesClient.check_wsdlUrl();
			var wsdlUrl = document.getElementById("wsdlUrl").value;
			var history = Components.classes["@mozilla.org/satchel/form-history;1"].getService(Components.interfaces.nsIFormHistory ? Components.interfaces.nsIFormHistory : Components.interfaces.nsIFormHistory2);
			history.addEntry("wsdlhistory", wsdlUrl);
			
			if (everythingOK){	
				document.getElementById("box_wsdl").value = "";
				document.getElementById("box_responseHeader").value = "";
				document.getElementById("box_responseBody").value = "";
				document.getElementById("statusbox").value = "";
				
				if (!authentication){
					username = "";
					password = "";
				}
				if (document.getElementById("radiosync").selected) {
					wsAsync = false;
					try
					{
						wsdlcontent = HTTPProxy.send(wsdlUrl, wsMethod, wsHeader, wsBody, wsAsync, username, password, 1);	
						try
						{
							if (wsdlcontent != null){
								InitWSDLParser.startParsing(wsdlcontent);
							}
							else
							{
								var domparser = new DOMParser();
								var wsdlAsXml = domparser.parseFromString(document.getElementById("box_wsdl").value,'text/xml');
								InitWSDLParser.startParsing(wsdlAsXml);
							}
						}
						catch(e)
						{
							alert("An error has occured while parsing.");
						}
					}
					catch(e)
					{
						alert("An error has occured, please check the WSDL Address.");
					}
				}
				if (document.getElementById("radioasync").selected) {
					wsAsync = true;
					try
					{
						wsdlcontent = HTTPProxy.send(wsdlUrl, wsMethod, wsHeader, wsBody, wsAsync, username, password, 1);
					}
					catch(e)
					{
						alert("An error has occured, please check the WSDL Address.");
					}
				}		
			}	
		}
		else{
			var parser = new DOMParser();
			var wsdl = parser.parseFromString(document.getElementById("box_wsdl").value,'text/xml');
			document.getElementById("box_responseHeader").value = "";
			document.getElementById("box_responseBody").value = "";
			try
			{
				InitWSDLParser.startParsing(wsdl);
			}
			catch(e)
			{
				alert("An error has occured while parsing.");
			}
		}
	},
	// asmx replaced with asmx?wsdl
	check_wsdlUrl: function() {
		var wsdlUrl = document.getElementById("wsdlUrl").value;
		var correctUrl = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		if (correctUrl.test(wsdlUrl)){
			var checkAsmx = /.asmx/i
			if (wsdlUrl.match(checkAsmx)){
				var checkWsdl = /wsdl/i
				if (!wsdlUrl.match(checkWsdl)){
					wsdlUrl = wsdlUrl + "?wsdl";
					document.getElementById('wsdlUrl').value = wsdlUrl;
				}
			}
		}
		else{
				everythingOK = false;
				alert("An error has occured, please check the WSDL Address.");
			}
	},
	
	checklocalfile: function() {
		var wsdlUrl = document.getElementById("wsdlUrl").value;
		var correctUrl = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		if (correctUrl.test(wsdlUrl)){
			localfile = false;
		}
	},
	
	doSendRequest: function() {
		var parser = new DOMParser();
		var wsdl = parser.parseFromString(document.getElementById("box_wsdl").value,'text/xml');
		
		var targetnamespace = WSDLParser11.getTargetNamespace(wsdl);
		
		var choosedoperationnr = "";
		// find the number of the choosed operation
		choosedoperationnr = GUI.getOperationnumber();

		var choosedoperationname = "";
		// find the choosed operation name
		choosedoperationname = GUI.getOperationname();
		
		// as Array:  parameternames_and_inputs[name] = value
		var param_and_inputs = new Array();
		//find all parameters and inputs
		param_and_inputs = GUI.getInputs(choosedoperationnr);
		
		var usingcomplextype = false;
  		for(var p in param_and_inputs)
		{
			if (SOAPParser.isexistText(p, ":::")){
				usingcomplextype = true;
			}
		}

		var soaprequest = "";
		if (usingcomplextype == true){
			soaprequest = SOAPGenerator.soaprequest(targetnamespace, choosedoperationname, SOAPGenerator.toXmlComplex(param_and_inputs));
			document.getElementById("box_requestBody").value = soaprequest;
		}
		else{
			soaprequest = SOAPGenerator.soaprequest(targetnamespace, choosedoperationname, SOAPGenerator.toXml(param_and_inputs));
			document.getElementById("box_requestBody").value = soaprequest;
		}
		
		// using SOAP Version 1.1
		var soap11namespace = "http://schemas.xmlsoap.org/wsdl/soap/";
		// using SOAP Version 1.2
		var soap12namespace = "http://schemas.xmlsoap.org/wsdl/soap12/";
		
		//check wsdl version
		var wsdlversion = InitWSDLParser.checkVersion(wsdl);
		var address = "";
		var location = "";
		if (wsdlversion == "11") {
			address = wsdl.getElementsByTagNameNS(soap11namespace, "address");
			location = address[0].attributes["location"].value;
		}
		if (wsdlversion == "20") {
			address = wsdl.getElementsByTagName("endpoint");
			location = address[0].attributes["address"].value;
		}
		
		//prepare to send the soap request
		var wsMethod = "POST";
		var wsHeader = document.getElementById("box_requestHeader").value;
		var wsBody = document.getElementById("box_requestBody").value;
		var wsAsync = "";
		var response = "";
		
		document.getElementById("box_responseHeader").value = "";
		document.getElementById("box_responseBody").value = "";
		
		if (!authentication){
			username = "";
			password = "";
		}
		
		var sendbutton = document.getElementById("sendRequest");
		var disabled = sendbutton.getAttribute("disabled").value;
		
		if (document.getElementById("radiosync").selected && !document.getElementById("sendRequest").disabled) {
			wsAsync = false;
			try
			{
				response = HTTPProxy.send(location, wsMethod, wsHeader, wsBody, wsAsync, username, password, 4);
				soundURL = "chrome://soaclient/skin/done.wav";
				gSound = Components.classes["@mozilla.org/sound;1"].createInstance(Components.interfaces.nsISound);
				var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
				var url = ioService.newURI(soundURL, null, null);
				gSound.play(url);
				
				SOAPParser.startParsingWS(response, choosedoperationname, param_and_inputs);
				
				var sendbutton = document.getElementById("sendRequest");
				sendbutton.setAttribute("disabled",true);
			}
			catch(e)
			{
				alert("An error has occured, please check the WSDL Address.");
			}
		}
		if (document.getElementById("radioasync").selected && !document.getElementById("sendRequest").disabled) {
			wsAsync = true;
			try
			{
				response = HTTPProxy.send(location, wsMethod, wsHeader, wsBody, wsAsync, username, password, 4);
			}
			catch(e)
			{
				alert("An error has occured, please check the WSDL Address.");
			}
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
	}
}   