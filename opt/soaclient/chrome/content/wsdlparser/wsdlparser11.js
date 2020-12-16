function WSDLParser11() {}

var wsdlnamespace = "";
var xsdnamespace = "";
var soap11namespace = "";
var soap12namespace = "";
var servicename = "";
var documentation = "";
var targetnamespace = "";
var wsdldefinitions = "";
var ports = "";
var bindings = "";
var porttypes = "";
var operations = new Array();
var allparameters = new Array();
var inputparameters = new Array();
var inputtypes = new Array();

//Parse WSDL Version 1.1 and show the service name, the targetnamespace, the operations and the input felds for parameters
WSDLParser11.parseWSDL = function(wsdl)
{
	wsdlnamespace = "http://schemas.xmlsoap.org/wsdl/";
	xsdnamespace = "http://www.w3.org/2001/XMLSchema";
	soap11namespace = "http://schemas.xmlsoap.org/wsdl/soap/";
	soap12namespace = "http://schemas.xmlsoap.org/wsdl/soap12/";
	
	var iframe = document.getElementById("webservicesMainbox");
	
	// clear iframe firstly
	GUI.clearContent(iframe);
	
	servicename = WSDLParser11.getServicename(wsdl);
	
	// change iframe -- Service Name
	GUI.showService(iframe, servicename);

	documentation = WSDLParser11.getDocumentation(wsdl);
	// change iframe -- Documentation
	GUI.showDocumentation(iframe, documentation);
	
	targetnamespace = WSDLParser11.getTargetNamespace(wsdl);

	// change iframe -- Targetnamespace
	GUI.showTargetnamespace(iframe, targetnamespace);
	
	ports = WSDLParser11.getAllPorts(wsdl);

	bindings = WSDLParser11.getAllBindings(wsdl);

	porttypes = WSDLParser11.getAllPorttypes(wsdl);
	
	operations = WSDLParser11.getAllOperations(wsdl);
 	for(var i = 0; i < operations.length; i++)
	{
			allparameters = WSDLParser11.getAllInputParameters(operations[i], wsdl);
			inputparameters = allparameters[0];
			inputtypes = allparameters[1];
			
			// change iframe -- Operations
			GUI.showOperation(iframe, i, operations.length, operations[i], inputparameters, inputtypes, wsdl);
	}
}

WSDLParser11.getDefinitions = function(wsdl)
{
	return wsdl.documentElement.tagName;	
}

WSDLParser11.getServicename = function(wsdl)
{
	var service = "";
	service = wsdl.getElementsByTagNameNS(wsdlnamespace, "service");
	return service[0].attributes["name"].value;
}

WSDLParser11.getDocumentation = function(wsdl)
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

WSDLParser11.getTargetNamespace = function(wsdl)
{
	return wsdl.documentElement.attributes.getNamedItem("targetNamespace").nodeValue;	
}

WSDLParser11.getSoap11BindingAddress = function(wsdl)
{
	var binding = "";
	binding = wsdl.getElementsByTagNameNS(soap11namespace, "address");
	return binding[0].attributes["location"].value;
}

WSDLParser11.getSoap12BindingAddress = function(wsdl)
{
	var binding = "";
	binding = wsdl.getElementsByTagNameNS(soap12namespace, "address");
	return binding[0].attributes["location"].value;
}

WSDLParser11.getAllPorts = function(wsdl)
{
	var ports = wsdl.getElementsByTagNameNS(wsdlnamespace, "port");
	return ports;
}

WSDLParser11.getAllBindings = function(wsdl)
{
	var bindings = wsdl.getElementsByTagNameNS(wsdlnamespace, "binding");
	return bindings;
}

WSDLParser11.getAllPorttypes = function(wsdl)
{
	var porttypes = wsdl.getElementsByTagNameNS(wsdlnamespace, "portType");
	return porttypes;
}

// return a array of operation names
WSDLParser11.getAllOperations = function(wsdl)
{
	var operationsnames = new Array();
	var count = 0;
	for(var i = 0; i < porttypes[0].childNodes.length; i++)
	{
		if (porttypes[0].childNodes[i].attributes != null){
			operationsnames[count] = porttypes[0].childNodes[i].getAttribute("name");
			count = count + 1;
		}
	}
	return operationsnames;
}

//return the input parameters for a operation
WSDLParser11.getAllInputParameters = function(operation, wsdl)
{
	var inputparametertypes = new Array();
	var inputparameternames = new Array();
	var messagename = "";
	var input = "";
	var messages = wsdl.getElementsByTagNameNS(wsdlnamespace, "message");
	var elements = wsdl.getElementsByTagNameNS(xsdnamespace, "element");
	var part = "";

	//get input message names
	for(var i = 0; i < porttypes[0].childNodes.length; i++)
	{
		if (porttypes[0].childNodes[i].attributes != null && porttypes[0].childNodes[i].getAttribute("name") == operation){
			input = porttypes[0].childNodes[i].getElementsByTagNameNS(wsdlnamespace, "input");
			messagename = WSDLParser11.splitAttribute(input[0].getAttribute("message"));
			for(var j = 0; j < messages.length; j++)
			{	
				if (messages[j].attributes["name"].value == messagename){
					var count = 0;
					for(var k = 0; k < messages[j].childNodes.length; k++)
					{
 						if (messages[j].childNodes[k].attributes != null){
							if (messages[j].childNodes[k].hasAttribute("type") && messages[j].childNodes[k].getAttribute("type") != null){
								if (WSDLParser11.splitAttributeNS(messages[j].childNodes[k].getAttribute("type")) != "xs" && WSDLParser11.splitAttributeNS(messages[j].childNodes[k].getAttribute("type")) != "xsd"){									
									//type is a complexType
									var complextypes = wsdl.getElementsByTagNameNS(xsdnamespace, "complexType");									
									var complextypename = WSDLParser11.splitAttribute(messages[j].childNodes[k].getAttribute("type"));
									
									for(var n = 0; n < complextypes.length; n++)
									{									
										if (complextypes[n].hasAttribute("name") && complextypes[n].getAttribute("name") == complextypename){
											if (complextypes[n].childNodes.length > 1){
												var complextypes_elements = complextypes[n].childNodes[1].getElementsByTagNameNS(xsdnamespace, "element");
												
												for(var m = 0; m < complextypes_elements.length; m++)
												{
													inputparameternames[count] = complextypes_elements[m].getAttribute("name");
													inputparametertypes[count] = complextypes_elements[m].getAttribute("type");	
													count = count + 1;
												}	
											}
										}
									}
								}
								else{
									inputparameternames[count] = messages[j].childNodes[k].getAttribute("name");
									inputparametertypes[count] = messages[j].childNodes[k].getAttribute("type");
									count = count + 1;
								}
							}	
							else{	
								//the message input as element or as type 
								if (messages[j].childNodes[k].hasAttribute("element") && messages[j].childNodes[k].getAttribute("element") != null){
								
									for(var l = 0; l < elements.length; l++)
									{
										if (elements[l].hasAttribute("name") && elements[l].hasAttribute("type") == false && WSDLParser11.splitAttribute(messages[j].childNodes[k].getAttribute("element")) == elements[l].attributes["name"].value){
											
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
																		
																		if (WSDLParser11.splitAttributeNS(complextypes_elements[o].getAttribute("type")) != "xs" && WSDLParser11.splitAttributeNS(complextypes_elements[o].getAttribute("type")) != "xsd" && WSDLParser11.splitAttribute(complextypes_elements[o].getAttribute("type")) != "string" && WSDLParser11.splitAttribute(complextypes_elements[o].getAttribute("type")) != "float" && WSDLParser11.splitAttribute(complextypes_elements[o].getAttribute("type")) != "boolean" && WSDLParser11.splitAttribute(complextypes_elements[o].getAttribute("type")) != "short" && WSDLParser11.splitAttribute(complextypes_elements[o].getAttribute("type")) != "date" && WSDLParser11.splitAttribute(complextypes_elements[o].getAttribute("type")) != "int"){

																			var complex_types = wsdl.getElementsByTagNameNS(xsdnamespace, "complexType");
									
																			var complex_typename = WSDLParser11.splitAttribute(complextypes_elements[o].getAttribute("type"));
																			
																			for(var p = 0; p < complex_types.length; p++)
																			{
																				if (complex_types[p].hasAttribute("name") && complex_types[p].getAttribute("name") == complex_typename){
																			
																					if (complex_types[p].childNodes.length > 0){
																						var complex_types_elements = complex_types[p].getElementsByTagNameNS(xsdnamespace, "element");
																						
																						for(var q = 0; q < complex_types_elements.length; q++)
																						{
																							var element_nr = q + 1;
																							var part_name = complex_types_elements[q].getAttribute("name");
																							inputparameternames[count] = part_name + "&&&" + m + "%%%" + element_nr + "!!!" + count + ":::" + complex_types_elements[q].getAttribute("name");
																							inputparametertypes[count] = complex_types_elements[q].getAttribute("type");
																							count = count + 1;
																						}
																					}
																				}
																			}
																		}
																		else{
																			inputparameternames[count] = partname + "&&&" + m + "%%%" + elementnr + "!!!" + count + ":::" + complextypes_elements[o].getAttribute("name");
																			inputparametertypes[count] = complextypes_elements[o].getAttribute("type");	
																			count = count + 1;																		
																		}
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

WSDLParser11.splitAttribute = function(attributename)
{
	var ns = attributename.split(":");	
	return ns[1];
}

WSDLParser11.splitAttributeNS = function(attributename)
{
	var ns = attributename.split(":");	
	return ns[0];
}

WSDLParser11.splitAttributeLinks = function(attributename, text)
{
	var ns = attributename.split(text);	
	return ns[0];
}

WSDLParser11.splitAttributeRechts = function(attributename, text)
{
	var ns = attributename.split(text);	
	return ns[1];
}

WSDLParser11.splitAttributeAll = function(attributename, text)
{
	var ns = attributename.split(text);	
	return ns;
}