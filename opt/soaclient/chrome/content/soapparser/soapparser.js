function SOAPParser() {}

var targetnamespace = "";
var soapenvnamespace = "";
var body = "";
var businessinfo = "";
var businessinfonames = new Array();
var businesskeys = new Array();
var businessinfodescriptions = new Array();
var serviceinfo = "";
var serviceinfonames = new Array();
var servicekeys = new Array();
var tmodelinfo = "";
var tmodelinfonames = new Array();
var tmodelkeys = new Array();

SOAPParser.startParsingUDDI = function(soap)
{
	//alert("Start Parsing SOAP Response from UDDI");
	
	if (document.getElementById("uddiv1").selected) {
		targetnamespace = "urn:uddi-org:api";
	}
	else if (document.getElementById("uddiv2").selected) {
		targetnamespace = "urn:uddi-org:api_v2";
	}
	else if (document.getElementById("uddiv3").selected) {
		targetnamespace = "urn:uddi-org:api_v3";
	}
	
	soapenvnamespace = "http://schemas.xmlsoap.org/soap/envelope/";
	
	var criteria = document.getElementById("requestMethod").value;
	
	var iframe = document.getElementById("uddiMainbox");
	
	// clear iframe firstly
	GUI.clearContent2(iframe);
	
	var query = document.getElementById("query").value;
	if (query == null || query == ""){
		query = "%";
	}
	GUI.showSearchfor(iframe, query);
	
	body = soap.getElementsByTagNameNS(soapenvnamespace, "Body");

	if (criteria == "Business Names"){
		
		var childposition = "";
		if (body[0].childNodes[0].tagName == "businessList"){
			childposition = 0;
		}
		
		else if (body[0].childNodes[1].tagName == "businessList"){
			childposition = 1;
		}
		
		else if (body[0].childNodes[2].tagName == "businessList"){
			childposition = 2;
		}
		
		else
		{
			SOAPParser.startParsingUDDIFault(soap);
			//alert("The content of the SOAP response message is not correct");			
		}

		if (body[0].childNodes[childposition].tagName == "businessList"){
			
			businessinfo = soap.getElementsByTagNameNS(targetnamespace, "businessInfo");
			
			businesskeys = new Array();
			
			for(var i = 0; i < businessinfo.length; i++)
			{
				for(var j = 0; j < businessinfo[i].childNodes.length; j++)
				{
					if (businessinfo[i].childNodes[j].tagName == "name"){
						businessinfonames[i] = businessinfo[i].childNodes[j].textContent;	
					}
					
					if (businessinfo[i].childNodes[j].tagName == "description"){
						businessinfodescriptions[i] = businessinfo[i].childNodes[j].textContent;	
					}

					if (businessinfo[i].childNodes[j].tagName == "serviceInfos"){
						var serviceInfos = businessinfo[i].childNodes[j];
						var servicenames = new Array();
						var s_keys = new Array();
						var nr = 0;
						for(var k = 0; k < serviceInfos.childNodes.length; k++)
						{
							for(var l = 0; l < serviceInfos.childNodes[k].childNodes.length; l++)
							{				
								if (serviceInfos.childNodes[k].childNodes[l].tagName == "name"){								
									nr = nr + 1;
									servicenames[nr] = serviceInfos.childNodes[k].childNodes[l].textContent;
									s_keys[nr] = serviceInfos.childNodes[k].getAttribute("serviceKey");
									
								}
							}
						}
					}
				}
				businesskeys[i] = businessinfo[i].getAttribute("businessKey");
							
				var count = i + 1;
				GUI.showBusiness(iframe, businessinfonames[i], businesskeys[i], businessinfodescriptions[i], servicenames, s_keys, count);
			}
		}
	}
		
	else if (criteria == "Service Names"){
	
		var childposition = "";
		if (body[0].childNodes[0].tagName == "serviceList"){
			childposition = 0;
		}
		
		else if (body[0].childNodes[1].tagName == "serviceList"){
			childposition = 1;
		}
		
		else if (body[0].childNodes[2].tagName == "serviceList"){
			childposition = 2;
		}
		
		else
		{
			SOAPParser.startParsingUDDIFault(soap);
			//alert("The content of the SOAP response message is not correct");
		}
	
		if (body[0].childNodes[childposition].tagName == "serviceList"){
			
			serviceinfo = soap.getElementsByTagNameNS(targetnamespace, "serviceInfo");
			
			servicekeys = new Array();
			businesskeys = new Array();
			
			for(var i = 0; i < serviceinfo.length; i++)
			{
				for(var j = 0; j < serviceinfo[i].childNodes.length; j++)
				{
					if (serviceinfo[i].childNodes[j].tagName == "name"){
						serviceinfonames[i] = serviceinfo[i].childNodes[j].textContent;	
					}
				}
				servicekeys[i] = serviceinfo[i].getAttribute("serviceKey");
							
				businesskeys[i] = serviceinfo[i].getAttribute("businessKey");
				
				var count = i + 1;
				GUI.showServiceUDDI(iframe, serviceinfonames[i], servicekeys[i], businesskeys[i], count);
			}	
		}
	}
		
	else if (criteria == "Service Types (tModel)"){
	
		var childposition = "";
		if (body[0].childNodes[0].tagName == "tModelList"){
			childposition = 0;
		}
		
		else if (body[0].childNodes[1].tagName == "tModelList"){
			childposition = 1;
		}
		
		else if (body[0].childNodes[2].tagName == "tModelList"){
			childposition = 2;
		}
		
		else
		{
			SOAPParser.startParsingUDDIFault(soap);
			//alert("The content of the SOAP response message is not correct");
		}
	
		if (body[0].childNodes[childposition].tagName == "tModelList"){
			
			tmodelinfo = soap.getElementsByTagNameNS(targetnamespace, "tModelInfo");
			
			tmodelkeys = new Array();
			
			for(var i = 0; i < tmodelinfo.length; i++)
			{
				for(var j = 0; j < tmodelinfo[i].childNodes.length; j++)
				{
					if (tmodelinfo[i].childNodes[j].tagName == "name"){
						tmodelinfonames[i] = tmodelinfo[i].childNodes[j].textContent;	
					}
				}
				tmodelkeys[i] = tmodelinfo[i].getAttribute("tModelKey");
				
				var count = i + 1;
				GUI.showTmodel(iframe, tmodelinfonames[i], tmodelkeys[i], count);
			}
		}
	}
	else if (criteria == "Business Details using Business Key"){
		var businessentity = soap.getElementsByTagNameNS(targetnamespace, "businessEntity");
		
		if (businessentity != undefined && businessentity != null){
			if (businessentity[0].hasAttribute("businessKey")){
				var businesskey = businessentity[0].getAttribute("businessKey");
			}
			
			if (businessentity[0].hasAttribute("operator")){
				var operator = businessentity[0].getAttribute("operator");
			}

			if (businessentity[0].hasAttribute("authorizedName")){
				var authorizedname = businessentity[0].getAttribute("authorizedName");
			}		
			
			for(var i = 0; i < businessentity[0].childNodes.length; i++)
			{		
				if (businessentity[0].childNodes[i].tagName == "discoveryURLs"){
					for(var j = 0; j < businessentity[0].childNodes[i].childNodes.length; j++)
					{
						var discoveryurls = new Array();
						if (businessentity[0].childNodes[i].childNodes[j].tagName == "discoveryURL"){
							discoveryurls[j] = businessentity[0].childNodes[i].childNodes[j].textContent;					
						}
					}	
				}

				if (businessentity[0].childNodes[i].tagName == "name"){
					var businessname = businessentity[0].childNodes[i].textContent;	
				}

				if (businessentity[0].childNodes[i].tagName == "description"){
					var description = businessentity[0].childNodes[i].textContent;
				}

				if (businessentity[0].childNodes[i].tagName == "contacts"){
					var personnames = soap.getElementsByTagNameNS(targetnamespace, "personName");
					var phones = soap.getElementsByTagNameNS(targetnamespace, "phone");
					var emails = soap.getElementsByTagNameNS(targetnamespace, "email");	
				}
				if (businessentity[0].childNodes[i].tagName == "businessServices"){			
					var servicenames = new Array();
					var servicedescriptions = new Array();
					var s_keys = new Array();
					var nr = 0;
					for(var j = 0; j < businessentity[0].childNodes[i].childNodes.length; j++)
					{
						if (businessentity[0].childNodes[i].childNodes[j].tagName == "businessService"){
							var businessservice = businessentity[0].childNodes[i].childNodes[j];

							for(var k = 0; k < businessservice.childNodes.length; k++)
							{		
								if (businessservice.childNodes[k].tagName == "name"){								
									nr = nr + 1;
									servicenames[nr] = businessservice.childNodes[k].textContent;
									s_keys[nr] = businessservice.getAttribute("serviceKey");	
								}
								if (businessservice.childNodes[k].tagName == "description"){								
									servicedescriptions[nr] = businessservice.childNodes[k].textContent;
								}
							}					
						}
					}
				}
			}
			GUI.showBusinessDetail(iframe, businessname, description, operator, authorizedname, discoveryurls, personnames, phones, emails, servicenames, servicedescriptions, s_keys);
		}
		else{
			SOAPParser.startParsingUDDIFault(soap);
		}	
	}
	
	else if (criteria == "Service Details using Service Key"){
		var businessservice = soap.getElementsByTagNameNS(targetnamespace, "businessService");
		
		if (businessservice != undefined && businessservice != null){
		
			if (businessservice[0].hasAttribute("serviceKey")){
				var servicekey = businessservice[0].getAttribute("serviceKey");
			}

			if (businessservice[0].hasAttribute("businessKey")){
				var businesskey = businessservice[0].getAttribute("businessKey");
			}		
			
			for(var i = 0; i < businessservice[0].childNodes.length; i++)
			{
				if (businessservice[0].childNodes[i].tagName == "name"){
					var servicename = businessservice[0].childNodes[i].textContent;
				}
				
				if (businessservice[0].childNodes[i].tagName == "description"){
					var description = businessservice[0].childNodes[i].textContent;
				}			

				if (businessservice[0].childNodes[i].tagName == "bindingTemplates"){
					for(var j = 0; j < businessservice[0].childNodes[i].childNodes.length; j++)
					{
						if (businessservice[0].childNodes[i].childNodes[j].tagName == "bindingTemplate"){
							var bindingtemplate = businessservice[0].childNodes[i].childNodes[j];
							
							for(var k = 0; k < bindingtemplate.childNodes.length; k++)
							{
								if (bindingtemplate.childNodes[k].tagName == "description"){
									var accesspoint_desc = bindingtemplate.childNodes[k].textContent;	
								}
							
								if (bindingtemplate.childNodes[k].tagName == "accessPoint"){
									var accesspoint = bindingtemplate.childNodes[k].textContent;	
								}

								if (bindingtemplate.childNodes[k].tagName == "tModelInstanceDetails"){
									for(var l = 0; l < bindingtemplate.childNodes[k].childNodes.length; l++)
									{
										if (bindingtemplate.childNodes[k].childNodes[l].tagName == "tModelInstanceInfo"){
											var tmodelkey = bindingtemplate.childNodes[k].childNodes[l].getAttribute("tModelKey");	
										}
									}
								}
							}
						}
					}	
				}			
			}
			GUI.showServiceDetail(iframe, servicename, description, businesskey, accesspoint_desc, accesspoint, tmodelkey);
		}
		else{
			SOAPParser.startParsingUDDIFault(soap);		
		}
	}

	else if (criteria == "tModel Details using tModel Key"){
		var tmodel = soap.getElementsByTagNameNS(targetnamespace, "tModel");

		if (tmodel != undefined && tmodel != null){
			if (tmodel[0].hasAttribute("tModelKey")){
				var tmodelkey = tmodel[0].getAttribute("tModelKey");
			}
			
			if (tmodel[0].hasAttribute("operator")){
				var operator = tmodel[0].getAttribute("operator");
			}

			if (tmodel[0].hasAttribute("authorizedName")){
				var authorizedname = tmodel[0].getAttribute("authorizedName");
			}		
			
			for(var i = 0; i < tmodel[0].childNodes.length; i++)
			{
				if (tmodel[0].childNodes[i].tagName == "name"){
					var servicename = tmodel[0].childNodes[i].textContent;	
				}
				
				if (tmodel[0].childNodes[i].tagName == "description"){
					var description = tmodel[0].childNodes[i].textContent;	
				}
				
				if (tmodel[0].childNodes[i].tagName == "overviewDoc"){
					for(var j = 0; j < tmodel[0].childNodes[i].childNodes.length; j++)
					{
						if (tmodel[0].childNodes[i].childNodes[j].tagName == "overviewURL"){
							var overviewurl = tmodel[0].childNodes[i].childNodes[j].textContent;	
						}
					}	
				}
			}
			GUI.showTmodelDetail(iframe, servicename, description, tmodelkey, operator, authorizedname, overviewurl);
		}
		else{
			SOAPParser.startParsingUDDIFault(soap);		
		}				
	}	
}

SOAPParser.parsingBusinessDetail = function(soap)
{
	if (document.getElementById("uddiv1").selected) {
		targetnamespace = "urn:uddi-org:api";
	}
	else if (document.getElementById("uddiv2").selected) {
		targetnamespace = "urn:uddi-org:api_v2";
	}
	else if (document.getElementById("uddiv3").selected) {
		targetnamespace = "urn:uddi-org:api_v3";
	}
	soapenvnamespace = "http://schemas.xmlsoap.org/soap/envelope/";
	
	var iframe = document.getElementById("uddiMainbox");
	
	discoveryurls = soap.getElementsByTagNameNS(targetnamespace, "discoveryURL");
	
	businessservices = soap.getElementsByTagNameNS(targetnamespace, "businessService");
	
	for(var i = 0; i < businessservices.length; i++)
	{
		for(var j = 0; j < businessservices[i].childNodes.length; j++)
		{
			if (businessservices[i].childNodes[j].tagName == "name"){
				businessservicenames[i] = businessservices[i].childNodes[j].textContent;	
			}	
		}
	}
	GUI.showBusinessDetail(iframe, discoveryurls, businessservicenames);
}

SOAPParser.startParsingWS = function(soap, op_name, param_and_inputs)
{
	//alert("Start Parsing SOAP response message from web service");
	
	var iframe = document.getElementById("webservicesMainbox");
	
	soapenvnamespace = "http://schemas.xmlsoap.org/soap/envelope/";
	
	body = soap.getElementsByTagNameNS(soapenvnamespace, "Body");

	// clear iframe firstly
	GUI.clearContent(iframe);
	
	GUI.showOperationname(iframe, op_name, param_and_inputs);
	
	for(var i = 0; i < body.length; i++)
	{
		for(var j = 0; j < body[i].childNodes.length; j++)
		{
			if (body[i].childNodes[j].tagName != undefined){
				if (body[i].childNodes[j].prefix != null){
					var responsetagname = SOAPParser.splitAttribute(body[i].childNodes[j].tagName);
				}
				else{
					var responsetagname = body[i].childNodes[j].tagName;
				}
				
				GUI.showResponse(iframe, responsetagname);
				
				for(var k = 0; k < body[i].childNodes[j].childNodes.length; k++)
				{
					if (body[i].childNodes[j].childNodes[k].tagName != undefined){
						var returntagname = body[i].childNodes[j].childNodes[k].tagName;

						if (body[i].childNodes[j].childNodes[k].prefix != null){
							var returntagname = SOAPParser.splitAttribute(body[i].childNodes[j].childNodes[k].tagName);
						}
						else{
							var returntagname = body[i].childNodes[j].childNodes[k].tagName;
						}						

						//alert(body[i].childNodes[j].childNodes[k].childNodes.length);
						if (body[i].childNodes[j].childNodes[k].childNodes.length == 1){
							var returntext = body[i].childNodes[j].childNodes[k].textContent;
						}
						else{
							var returntext = " ";
						}
						
						var tagnames = new Array();
						var values = new Array();
						var checkvalue = false;
			
						var count = 0;
						
						// the number of displayed values
						var valuecounter = 0;
						
						for(var l = 0; l < body[i].childNodes[j].childNodes[k].childNodes.length; l++)
						{	
							if (body[i].childNodes[j].childNodes[k].childNodes[l].tagName != undefined){
								tagnames[l] = body[i].childNodes[j].childNodes[k].childNodes[l].tagName;
								
								if (body[i].childNodes[j].childNodes[k].childNodes[l].prefix != null){
									tagnames[l] = SOAPParser.splitAttribute(body[i].childNodes[j].childNodes[k].childNodes[l].tagName);
								}
								else{
									tagnames[l] = body[i].childNodes[j].childNodes[k].childNodes[l].tagName;
								}								
								
								if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes.length == 1){
									values[l] = body[i].childNodes[j].childNodes[k].childNodes[l].textContent;
								}
								else{
									values[l] = " ";
								}								
																
								if (count == 0){
									GUI.showReturn(iframe, returntagname, " ", responsetagname);
								}
								
								GUI.showValues(iframe, tagnames[l], values[l], responsetagname, valuecounter);
								checkvalue = true;
								count = count + 1;
								
								if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes.length > 1){
									for(var m = 0; m < body[i].childNodes[j].childNodes[k].childNodes[l].childNodes.length; m++)
									{
										if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].tagName != undefined){
											tagnames[m] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].tagName;
											
											//alert(body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes.length);
											if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes.length == 1){
												values[m] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].textContent;
											}
											else{
												values[m] = " ";
											}
											
											GUI.showValues(iframe, tagnames[m], values[m], responsetagname, valuecounter);
											
											if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes.length > 1){
											
												for(var n = 0; n < body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes.length; n++)
												{
													if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].tagName != undefined){
														tagnames[n] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].tagName;
											
														//alert(body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes.length);
														if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes.length == 1){
														values[n] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].textContent;
														}
														else{
															values[n] = " ";
														}
														GUI.showValues(iframe, tagnames[n], values[n], responsetagname, valuecounter);
														
														if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes.length > 1){
											
															for(var o = 0; o < body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes.length; o++)
															{
																if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].tagName != undefined){
																	tagnames[o] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].tagName;
																								
																	if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes.length == 1){
																		values[o] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].textContent;
																	}
																	else{
																		values[o] = " ";
																	}
																	GUI.showValues(iframe, tagnames[o], values[o], responsetagname, valuecounter);
																	
																	if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes.length > 1){
														
																		for(var p = 0; p < body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes.length; p++)
																		{
																			if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].tagName != undefined){
																				tagnames[p] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].tagName;
																														
																				if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes.length == 1){
																					values[p] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].textContent;
																				}
																				else{
																					values[p] = " ";
																				}
																				GUI.showValues(iframe, tagnames[p], values[p], responsetagname, valuecounter);
																				
																				if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes.length > 1){
																	
																					for(var q = 0; q < body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes.length; p++)
																					{
																						if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].tagName != undefined){
																							tagnames[q] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].tagName;
																																	
																							if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].childNodes.length == 1){
																								values[q] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].textContent;
																							}
																							else{
																								values[q] = " ";
																							}
																							GUI.showValues(iframe, tagnames[q], values[q], responsetagname, valuecounter);
																							
																							if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].childNodes.length > 1){
																				
																								for(var r = 0; r < body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].childNodes.length; p++)
																								{
																									if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].childNodes[r].tagName != undefined){
																										tagnames[r] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].childNodes[r].tagName;
																																				
																										if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].childNodes[r].childNodes.length == 1){
																											values[r] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].childNodes[r].textContent;
																										}
																										else{
																											values[r] = " ";
																										}
																										GUI.showValues(iframe, tagnames[r], values[r], responsetagname, valuecounter);
																										
																										if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].childNodes[r].childNodes.length > 1){
																							
																											for(var s = 0; s < body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].childNodes[r].childNodes.length; p++)
																											{
																												if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].childNodes[r].childNodes[s].tagName != undefined){
																													tagnames[s] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].childNodes[r].childNodes[s].tagName;
																																							
																													if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].childNodes[r].childNodes[s].childNodes.length == 1){
																														values[s] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes[p].childNodes[q].childNodes[r].childNodes[s].textContent;
																													}
																													else{
																														values[s] = " ";
																													}
																													valuecounter = valuecounter + 1;
																													GUI.showValues(iframe, tagnames[s], values[s], responsetagname, valuecounter);																													
																												}
																											}
																										}
																										valuecounter = valuecounter + 1;																											
																									}
																								}
																							}
																							valuecounter = valuecounter + 1;																							
																						}
																					}
																				}
																				valuecounter = valuecounter + 1;																					
																			}
																		}
																	}
																	valuecounter = valuecounter + 1;																	
																}
															}
														}
														valuecounter = valuecounter + 1;
													}
												}
											}
											valuecounter = valuecounter + 1;
										}
									}
								}
								valuecounter = valuecounter + 1;								
							}
							valuecounter = valuecounter + 1;
						}
						if (!checkvalue){
							GUI.showReturn(iframe, returntagname, returntext, responsetagname);
						}
					}
				}
			}
		}
	}
}

SOAPParser.startParsingUDDIFault = function(soap)
{
	var iframe = document.getElementById("uddiMainbox");
	
	soapenvnamespace = "http://schemas.xmlsoap.org/soap/envelope/";
	
	body = soap.getElementsByTagNameNS(soapenvnamespace, "Body");
	
	// clear iframe firstly
	GUI.clearContent2(iframe);
	
	for(var i = 0; i < body.length; i++)
	{
		for(var j = 0; j < body[i].childNodes.length; j++)
		{
			if (body[i].childNodes[j].tagName != undefined){
				var responsetagname = GUI.splitAttribute(body[i].childNodes[j].tagName);
				GUI.showResponse(iframe, responsetagname);
				
				for(var k = 0; k < body[i].childNodes[j].childNodes.length; k++)
				{
					if (body[i].childNodes[j].childNodes[k].tagName != undefined){
						var returntagname = body[i].childNodes[j].childNodes[k].tagName;
												
						if (body[i].childNodes[j].childNodes[k].childNodes.length == 1){
							var returntext = body[i].childNodes[j].childNodes[k].textContent;
						}
						else{
							var returntext = " ";
						}
						
						var tagnames = new Array();
						var values = new Array();
						var checkvalue = false;
			
						var count = 0;
						
						// the number of displayed values
						var valuecounter = 0;
						
						for(var l = 0; l < body[i].childNodes[j].childNodes[k].childNodes.length; l++)
						{	
							if (body[i].childNodes[j].childNodes[k].childNodes[l].tagName != undefined){
								tagnames[l] = body[i].childNodes[j].childNodes[k].childNodes[l].tagName;
								
								if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes.length == 1){
									values[l] = body[i].childNodes[j].childNodes[k].childNodes[l].textContent;
								}
								else{
									values[l] = " ";
								}								
																
								if (count == 0){
									GUI.showReturn(iframe, returntagname, " ", responsetagname);
								}
								
								GUI.showValues(iframe, tagnames[l], values[l], responsetagname, valuecounter);
								checkvalue = true;
								count = count + 1;
								
								if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes.length > 1){
									for(var m = 0; m < body[i].childNodes[j].childNodes[k].childNodes[l].childNodes.length; m++)
									{
										if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].tagName != undefined){
											tagnames[m] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].tagName;
											
											//alert(body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes.length);
											if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes.length == 1){
												values[m] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].textContent;
											}
											else{
												values[m] = " ";
											}
											
											GUI.showValues(iframe, tagnames[m], values[m], responsetagname, valuecounter);
											
											if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes.length > 1){
											
												for(var n = 0; n < body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes.length; n++)
												{
													if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].tagName != undefined){
														tagnames[n] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].tagName;
											
														//alert(body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes.length);
														if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes.length == 1){
														values[n] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].textContent;
														}
														else{
															values[n] = " ";
														}
														GUI.showValues(iframe, tagnames[n], values[n], responsetagname, valuecounter);
														
														if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes.length > 1){
											
															for(var o = 0; o < body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes.length; o++)
															{
																if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].tagName != undefined){
																	tagnames[o] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].tagName;
																								
																	if (body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].childNodes.length == 1){
																		values[o] = body[i].childNodes[j].childNodes[k].childNodes[l].childNodes[m].childNodes[n].childNodes[o].textContent;
																	}
																	else{
																		values[o] = " ";
																	}
																	valuecounter = valuecounter + 1;
																	GUI.showValues(iframe, tagnames[o], values[o], responsetagname, valuecounter);																																		
																}
															}
														}
														valuecounter = valuecounter + 1;
													}
												}
											}
											valuecounter = valuecounter + 1;
										}
									}
								}
								valuecounter = valuecounter + 1;								
							}
							valuecounter = valuecounter + 1;
						}
						if (!checkvalue){
							GUI.showReturn(iframe, returntagname, returntext, responsetagname);
						}
					}
				}
			}
		}
	}
}

SOAPParser.isexistText = function(QuellText, SuchText)
{
    var check = false;
	
	// Fehlerpruefung
	if ((QuellText == null) && (SuchText != null))				{ return check; }
	else if ((QuellText == null) && (SuchText == null))        	{ return true; }
	else if ((QuellText.length == 0) && (SuchText.length != 0)) { return check; }
	else if ((QuellText.length == 0) && (SuchText.length == 0)) { return true; }
	
    var Find = SuchText;
	
	var LaengeSuchText = SuchText.length;
	var LaengeFind = Find.length;
	var Pos = QuellText.indexOf(SuchText, 0);
	
	while (Pos >= 0)
	{		
		QuellText = QuellText.substring(0, Pos) + Find + QuellText.substring(Pos + LaengeSuchText);
		Pos = QuellText.indexOf(SuchText, Pos + LaengeFind);
		check = true;
	}
	return check;
}

SOAPParser.splitAttribute = function(attributename)
{
	var ns = attributename.split(":");
	return ns[1];
}

SOAPParser.splitAttributeNS = function(attributename)
{
	var ns = attributename.split(":");
	return ns[0];
}

SOAPParser.splitAttributeLinks = function(attributename, text)
{
	var ns = attributename.split(text);
	return ns[0];
}

SOAPParser.splitAttributeRechts = function(attributename, text)
{
	var ns = attributename.split(text);
	return ns[1];
}

SOAPParser.splitAttributeAll = function(attributename, text)
{
	var ns = attributename.split(text);
	return ns;
}

