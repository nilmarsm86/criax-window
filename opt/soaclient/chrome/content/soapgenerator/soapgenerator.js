function SOAPGenerator() {}

// Generate SOAP request messages for UDDI
SOAPGenerator.soaprequestuddi = function(criteria, query, version)
{
	var soaprequest = "";
	
	var generic = "";
	var targetnamespace = "";
	if (version == 1) {
		generic = "1.0";
		targetnamespace = "urn:uddi-org:api";
	}
	else if (version == 2) {
		generic = "2.0";
		targetnamespace = "urn:uddi-org:api_v2";
	}
	else if (version == 3) {
		generic = "3.0";
		targetnamespace = "urn:uddi-org:api_v3";
	}
	
	if (criteria == "Business Names"){ 	
		if (query == "") {
			query = "%";
		}
		
		soaprequest =	"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
						"<soapenv:Envelope " +
						"xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
						"<soapenv:Body>" +
						"<find_business generic=\""+ generic +"\" " +
						"xmlns=\""+ targetnamespace +"\">" +
						"<findQualifiers/>" +
						"<name>" + query + "</name>" +					
						"</find_business>" +
						"</soapenv:Body></soapenv:Envelope>";
	}

	if (criteria == "Service Names"){ 	
		if (query == "") {
			query = "%";
		}
		
		soaprequest =	"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
						"<soapenv:Envelope " +
						"xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
						"<soapenv:Body>" +
						"<find_service generic=\""+ generic +"\" " +
						"xmlns=\""+ targetnamespace +"\">" +
						"<findQualifiers/>" +
						"<name>" + query + "</name>" +
						"</find_service>" +
						"</soapenv:Body></soapenv:Envelope>";
	}	
	
	if (criteria == "Service Types (tModel)"){ 	
		if (query == "") {
			query = "%";
		}
		
		soaprequest =	"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
						"<soapenv:Envelope " +
						"xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
						"<soapenv:Body>" +
						"<find_tModel generic=\""+ generic +"\" " +
						"xmlns=\""+ targetnamespace +"\">" +
						"<findQualifiers/>" +
						"<name>" + query + "</name>" +					
						"</find_tModel>" +
						"</soapenv:Body></soapenv:Envelope>";
	}	
	
	if (criteria == "find_binding"){ 	
		if (query == "") {
			query = "%";
		}
		
		soaprequest =	"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
						"<soapenv:Envelope " +
						"xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
						"<soapenv:Body>" +
						"<find_binding serviceKey=\"" + query + "\" generic=\""+ generic +"\" " +
						"xmlns=\""+ targetnamespace +"\">" +
						"<findQualifiers/>" +
						"<tModelBag/>" +	
						"</find_binding>" +
						"</soapenv:Body></soapenv:Envelope>";
	}

	if (criteria == "find_relatedBusinesses"){ 	
		if (query == "") {
			query = "%";
		}
		
		soaprequest =	"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
						"<soapenv:Envelope " +
						"xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
						"<soapenv:Body>" +
						"<find_relatedBusinesses generic=\""+ generic +"\" " +
						"xmlns=\""+ targetnamespace +"\">" +
						"<findQualifiers/>" +
						"<businessKey>"+ query +"</businessKey>" +						
						"</find_relatedBusinesses>" +
						"</soapenv:Body></soapenv:Envelope>";
	}

	//if (criteria == "get_businessDetail"){
	if (criteria == "Business Details using Business Key"){ 	
		if (query == "") {
			query = "%";
		}
		
		soaprequest =	"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
						"<soapenv:Envelope " +
						"xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
						"<soapenv:Body>" +
						"<get_businessDetail generic=\""+ generic +"\" " +
						"xmlns=\""+ targetnamespace +"\">" +
						"<businessKey>"+ query +"</businessKey>" +						
						"</get_businessDetail>" +
						"</soapenv:Body></soapenv:Envelope>";
	}

	if (criteria == "get_businessDetailExt"){ 	
		if (query == "") {
			query = "%";
		}
		
		soaprequest =	"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
						"<soapenv:Envelope " +
						"xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
						"<soapenv:Body>" +
						"<get_businessDetailExt generic=\""+ generic +"\" " +
						"xmlns=\""+ targetnamespace +"\">" +
						"<businessKey>"+ query +"</businessKey>" +						
						"</get_businessDetailExt>" +
						"</soapenv:Body></soapenv:Envelope>";
	}	
	
	//if (criteria == "get_serviceDetail"){
	if (criteria == "Service Details using Service Key"){ 	
		if (query == "") {
			query = "%";
		}
		
		soaprequest =	"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
						"<soapenv:Envelope " +
						"xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
						"<soapenv:Body>" +
						"<get_serviceDetail generic=\""+ generic +"\" " +
						"xmlns=\""+ targetnamespace +"\">" +
						"<serviceKey>"+ query +"</serviceKey>" +						
						"</get_serviceDetail>" +
						"</soapenv:Body></soapenv:Envelope>";
	}

	//if (criteria == "get_tModelDetail"){
	if (criteria == "tModel Details using tModel Key"){ 	
		if (query == "") {
			query = "%";
		}
		
		soaprequest =	"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
						"<soapenv:Envelope " +
						"xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
						"<soapenv:Body>" +
						"<get_tModelDetail generic=\""+ generic +"\" " +
						"xmlns=\""+ targetnamespace +"\">" +
						"<tModelKey>"+ query +"</tModelKey>" +						
						"</get_tModelDetail>" +
						"</soapenv:Body></soapenv:Envelope>";
	}	
	
	if (criteria == "get_bindingDetail"){ 	
		if (query == "") {
			query = "%";
		}
		
		soaprequest =	"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
						"<soapenv:Envelope " +
						"xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
						"<soapenv:Body>" +
						"<get_bindingDetail generic=\""+ generic +"\" " +
						"xmlns=\""+targetnamespace+"\">" +
						"<bindingKey>"+ query +"</bindingKey>" +						
						"</get_bindingDetail>" +
						"</soapenv:Body></soapenv:Envelope>";
	}
	
	return soaprequest;
}

// convert parameters in xml
SOAPGenerator.toXml = function(_pl)
{
	var xml = "";
	for(var p in _pl)
	{
		switch(typeof(_pl[p])) 
		{
			case "string":
			case "number":
			case "boolean":
			case "object":
					xml += "<" + p + ">" + SOAPClientParameters._serialize(_pl[p]) + "</" + p + ">";
				break;
			default:
				break;
		}
	}
	return xml;	
}

// convert parameters in xml complex
SOAPGenerator.toXmlComplex = function(_pl)
{
	//alert("Generate SOAP Complex");
	var xml = "";
	
	var elementcount = 0;
	for(var p in _pl)
	{	
		elementcount = elementcount + 1;
	}
	
	var partcount = 0;
	for(var p in _pl)
	{	
		var temp = SOAPGenerator.splitAttributeRechts(p, "%%%");
		if (SOAPGenerator.splitAttributeLinks(temp, "!!!") == 1){
			partcount = partcount + 1;
		}
	}

	for(var p in _pl)
	{	
		var temp = SOAPGenerator.splitAttributeRechts(p, "&&&");	
	}
	
	
  	for(var i = 0; i < partcount; i++)
	{
		var param_input = new Array();
		for(var p in _pl)
		{
			var temp = SOAPGenerator.splitAttributeRechts(p, "&&&");
			if (SOAPGenerator.splitAttributeLinks(temp, "%%%") == i){
				var partname = SOAPGenerator.splitAttributeLinks(p, "&&&");
				var elementname = SOAPGenerator.splitAttributeRechts(p, ":::");
				param_input[elementname] = _pl[p];
			}
		}
		xml = xml + "<" + partname + ">" + SOAPGenerator.toXml(param_input) + "</" + partname + ">";
	}
	return xml;	
}

SOAPGenerator.splitAttribute = function(attributename)
{
	var ns = attributename.split(":");
	
	return ns[1];
}

SOAPGenerator.splitAttributeNS = function(attributename)
{
	var ns = attributename.split(":");
	
	return ns[0];
}

SOAPGenerator.splitAttributeLinks = function(attributename, text)
{
	var ns = attributename.split(text);
	
	return ns[0];
}

SOAPGenerator.splitAttributeRechts = function(attributename, text)
{
	var ns = attributename.split(text);
	
	return ns[1];
}

SOAPGenerator.splitAttributeAll = function(attributename, text)
{
	var ns = attributename.split(text);
	
	return ns;
}

/////////////////////////////////////////////////////////////////////////////////////////////
// Generate SOAP request messages for Web Services
SOAPGenerator.soaprequest = function(targetnamespace, method, parameters)
{
	var soaprequest = 
						"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
						"<soap:Envelope " +
						"xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
						"xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
						"xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
						"<soap:Body>" +
						"<" + method + " xmlns=\"" + targetnamespace + "\">" +
						parameters +
						"</" + method + "></soap:Body></soap:Envelope>";
				
	return soaprequest;
}