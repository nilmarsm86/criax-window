function WSDLParser20() {}

var wsdlnamespace = "";
var xsdnamespace = "";
var soap11namespace = "";
var soap12namespace = "";

var servicename = "";
var documentation = "";
var targetnamespace = "";
var wsdldefinitions = "";
var endpoints = "";
var bindings = "";
var interfaces = "";
var operations = new Array();
var allparameters = new Array();
var inputparameters = new Array();
var inputtypes = new Array();

//Parse WSDL Version 2.0 and show the service name, the targetnamespace, the operations and the input felds for parameters
WSDLParser20.parseWSDL = function(wsdl)
{
	wsdlnamespace = "http://www.w3.org/ns/wsdl";
	xsdnamespace = "http://www.w3.org/2001/XMLSchema";
	soap11namespace = "http://schemas.xmlsoap.org/wsdl/soap/";
	soap12namespace = "http://schemas.xmlsoap.org/wsdl/soap12/";
	
	var iframe = document.getElementById("webservicesMainbox");
	// clear iframe firstly
	GUI.clearContent(iframe);
	
	servicename = WSDLParser20.getServicename(wsdl);
	// change iframe -- Service Name
	GUI.showService(iframe, servicename);

	documentation = WSDLParser20.getDocumentation(wsdl);
	// change iframe -- Documentation
	GUI.showDocumentation(iframe, documentation);
	
	targetnamespace = WSDLParser20.getTargetNamespace(wsdl);
	// change iframe -- Targetnamespace
	GUI.showTargetnamespace(iframe, targetnamespace);
	
	endpoints = WSDLParser20.getAllEndpoints(wsdl);

	bindings = WSDLParser20.getAllBindings(wsdl);

	interfaces = WSDLParser20.getAllInterfaces(wsdl);
	
	operations = WSDLParser20.getAllOperations(wsdl);
 	for(var i = 0; i < operations.length; i++)
	{
			allparameters = WSDLParser20.getAllInputParameters(operations[i], wsdl);
			inputparameters = allparameters[0];
			inputtypes = allparameters[1];

			// change iframe -- Operations
			GUI.showOperation(iframe, i, operations.length, operations[i], inputparameters, inputtypes, wsdl);
	} 
}

WSDLParser20.getDefinitions = function(wsdl)
{
	return wsdl.documentElement.tagName;	
}

WSDLParser20.getServicename = function(wsdl)
{
	var service = "";
	service = wsdl.getElementsByTagNameNS(wsdlnamespace, "service");
	return service[0].attributes["name"].value;
}

WSDLParser20.getDocumentation = function(wsdl)
{
	var documentation = "";
	if (wsdl.getElementsByTagNameNS(wsdlnamespace, "documentation")){
		documentation = wsdl.getElementsByTagNameNS(wsdlnamespace, "documentation");
		if (documentation.length >= "1"){
			return documentation[documentation.length - 1].firstChild.nodeValue;
		}
		else{
			return undefined;
		}
	}
	else {
		return undefined;
	}
}

WSDLParser20.getTargetNamespace = function(wsdl)
{
	return wsdl.documentElement.attributes.getNamedItem("targetNamespace").nodeValue;	
}

WSDLParser20.getSoap11BindingAddress = function(wsdl)
{
	var binding = "";
	binding = wsdl.getElementsByTagNameNS(soap11namespace, "address");
	return binding[0].attributes["location"].value;
}

WSDLParser20.getSoap12BindingAddress = function(wsdl)
{
	var binding = "";
	binding = wsdl.getElementsByTagNameNS(soap12namespace, "address");
	return binding[0].attributes["location"].value;
}

WSDLParser20.getAllEndpoints = function(wsdl)
{
	var all_endpoints = wsdl.getElementsByTagNameNS(wsdlnamespace, "endpoint");
	return all_endpoints;
}

WSDLParser20.getAllBindings = function(wsdl)
{
	var bindings = wsdl.getElementsByTagNameNS(wsdlnamespace, "binding");
	return bindings;
}

WSDLParser20.getAllInterfaces = function(wsdl)
{
	var interfaces = wsdl.getElementsByTagNameNS(wsdlnamespace, "interface");
	return interfaces;
}

// return a array of operation names
WSDLParser20.getAllOperations = function(wsdl)
{
	var operationsnames = new Array();
	var count = 0;
	for(var i = 0; i < interfaces[0].childNodes.length; i++)
	{
		if (interfaces[0].childNodes[i].attributes != null){
			operationsnames[count] = interfaces[0].childNodes[i].getAttribute("name");
			count = count + 1;
		}
	}
	return operationsnames;
}

//return the input parameters for a operation
WSDLParser20.getAllInputParameters = function(operation, wsdl)
{
	var inputparametertypes = new Array();
	var inputparameternames = new Array();
	var elementname = "";
	var input = "";
	var elements = wsdl.getElementsByTagNameNS(xsdnamespace, "element");
	var part = "";

	//get input element names
	for(var i = 0; i < interfaces[0].childNodes.length; i++)
	{
		if (interfaces[0].childNodes[i].attributes != null && interfaces[0].childNodes[i].getAttribute("name") == operation){
			
			input = interfaces[0].childNodes[i].getElementsByTagNameNS(wsdlnamespace, "input");
			
			elementname = WSDLParser20.splitAttribute(input[0].getAttribute("element"));
			
			for(var l = 0; l < elements.length; l++)
			{
				var count = 0;
				if (elements[l].hasAttribute("name") && elements[l].hasAttribute("type") == false && elementname == elements[l].attributes["name"].value){
					
					var element_elements = elements[l].getElementsByTagNameNS(xsdnamespace, "element");
					
					if (element_elements.length > 0){
					
						for(var m = 0; m < element_elements.length; m++)
						{
							if (WSDLParser11.splitAttributeNS(element_elements[m].getAttribute("type")) != "xs" && WSDLParser11.splitAttributeNS(element_elements[m].getAttribute("type")) != "xsd" && WSDLParser11.splitAttribute(element_elements[m].getAttribute("type")) != "string" && WSDLParser11.splitAttribute(element_elements[m].getAttribute("type")) != "float" && WSDLParser11.splitAttribute(element_elements[m].getAttribute("type")) != "boolean" && WSDLParser11.splitAttribute(element_elements[m].getAttribute("type")) != "short" && WSDLParser11.splitAttribute(element_elements[m].getAttribute("type")) != "date" && WSDLParser11.splitAttribute(element_elements[m].getAttribute("type")) != "int"){	
								var complextypes = wsdl.getElementsByTagNameNS(xsdnamespace, "complexType");
			
								var complextypename = WSDLParser11.splitAttribute(element_elements[m].getAttribute("type"));
								
								for(var n = 0; n < complextypes.length; n++)
								{									
									if (complextypes[n].hasAttribute("name") && complextypes[n].getAttribute("name") == complextypename){
										
										if (complextypes[n].childNodes.length > 0){
											var complextypes_elements = complextypes[n].getElementsByTagNameNS(xsdnamespace, "element");
											
											for(var o = 0; o < complextypes_elements.length; o++)
											{
												var elementnr = o + 1;
												var partname = element_elements[m].getAttribute("name");
												inputparameternames[count] = partname + "&&&" + m + "%%%" + elementnr + "!!!" + count + ":::" + complextypes_elements[o].getAttribute("name");
												inputparametertypes[count] = complextypes_elements[o].getAttribute("type");
												count = count + 1;
											}	
										}
									}
								}
							}
							else{
								inputparameternames[count] = element_elements[m].getAttribute("name");
								inputparametertypes[count] = element_elements[m].getAttribute("type");
								count = count + 1;
							}
						}
					}
				}
			}
		}
	}
	var inputallparameters = new Array();
	inputallparameters[0] = inputparameternames;
	inputallparameters[1] = inputparametertypes;	
	return inputallparameters;
}

WSDLParser20.splitAttribute = function(attributename)
{
	var ns = attributename.split(":");
	
	return ns[1];
}