function InitWSDLParser() {}

var definitionstagname = "";
var wsdldefinitions = "";
var wsdlversion = "";

InitWSDLParser.startParsing = function(wsdl)
{
	definitionstagname = wsdl.documentElement.tagName;
		
	wsdlversion = InitWSDLParser.checkVersion(wsdl);
	
	if (wsdlversion == "11") {
		WSDLParser11.parseWSDL(wsdl);
	}
	else if (wsdlversion == "20") {
		WSDLParser20.parseWSDL(wsdl);
	}
	else{
		alert("The version of WSDL can't be recognized. Please check the WSDL address.");
	}
}

//find the version of WSDL
InitWSDLParser.checkVersion = function(wsdl)
{
	var version = "";
	wsdldefinitions = wsdl.getElementsByTagName(definitionstagname);
	
	for(var i = 0; i < wsdldefinitions[0].attributes.length; i++)
	{
		if (wsdldefinitions[0].attributes[i].value == "http://schemas.xmlsoap.org/wsdl/"){
			version = "11";
		}
		if (wsdldefinitions[0].attributes[i].value == "http://www.w3.org/ns/wsdl"){
			version = "20";
		}
	}
	return version;
}