function GUI() {}

//insert content in div "service"
GUI.showService = function(iframe, input)
{
	if (iframe.contentDocument){
		var showservice = iframe.contentDocument.getElementById("service");
		
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showservice.appendChild(adddiv);
		showservice.lastChild.setAttribute("id",input);
		
		showservice = iframe.contentDocument.getElementById(input);
		
		var addinput = document.createTextNode("Service name: " + input);
		
		showservice.appendChild(addinput);
	} 
	else {
		alert("Error by trying to show service name: contentDoc is null");
	}
}

//insert content in div "description"
GUI.showDocumentation = function(iframe, input)
{
	if (iframe.contentDocument){
		var showdocumentation = iframe.contentDocument.getElementById("description");
		
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showdocumentation.appendChild(adddiv);
		showdocumentation.lastChild.setAttribute("id",input);
		
		showdocumentation = iframe.contentDocument.getElementById(input);
		
		var addinput = document.createTextNode("Description: " + input);
		
		showdocumentation.appendChild(addinput);
	} 
	else {
		alert("Error by trying to show documentation: contentDoc is null");
	}
}

//insert content in div "targetnamespace"
GUI.showTargetnamespace = function(iframe, input)
{
	if (iframe.contentDocument){
		var showtargetnamespace = iframe.contentDocument.getElementById("targetnamespace");
		
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showtargetnamespace.appendChild(adddiv);
		showtargetnamespace.lastChild.setAttribute("id",input);
		
		showtargetnamespace = iframe.contentDocument.getElementById(input);
		
		var addinput = document.createTextNode("Targetnamespace: " + input);
		
		showtargetnamespace.appendChild(addinput);
	} 
	else {
		alert("Error by trying to show targetnamespace: contentDoc is null");
	}
}

//insert content in div "operations"
GUI.showOperation = function(iframe, operationnumber, operations_length, operation, inputparameters, inputtypes, wsdl)
{
	var showoperations = iframe.contentDocument.getElementById("operations");
	
	if (iframe.contentDocument){
 		if (operationnumber == 0){
			var op_number = operationnumber + 1;
			var addtext = document.createTextNode("Operations: (please choose one of the listed operations)");
			showoperations.appendChild(addtext);
			var operation_id = "operation:" + op_number;
			
			// add h4
			var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
			showoperations.appendChild(addh4);
			
			//add div id=operation1
			var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
			showoperations.lastChild.appendChild(adddiv);
			showoperations.lastChild.lastChild.setAttribute("id",operation_id);
			
			//add radio button (uniform name = operation_radiobutton)
			var addradiobutton = document.createElementNS("http://www.w3.org/1999/xhtml","input");
			showoperations.lastChild.lastChild.appendChild(addradiobutton);
			showoperations.lastChild.lastChild.lastChild.setAttribute("type","radio");
			showoperations.lastChild.lastChild.lastChild.setAttribute("name","operation_radiobutton");
			showoperations.lastChild.lastChild.lastChild.setAttribute("value",operation);
			if (operations_length == 1){
				showoperations.lastChild.lastChild.lastChild.setAttribute("checked","checked");
			}
			else{
				showoperations.lastChild.lastChild.lastChild.setAttribute("checked","");
			}
			showoperations.lastChild.lastChild.lastChild.setAttribute("onclick","JavaScript: GUI.changeOperation(\""+operation_id+"\",\""+operations_length+"\");");
			
			//add operation name
			addtext = document.createTextNode(" " + op_number + ". " + "Operation: " + operation);
			showoperations.lastChild.lastChild.appendChild(addtext);
			
			// add h4
 			var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
			showoperations.lastChild.appendChild(addh4);
			
			//add div id=parameters
			adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
			showoperations.lastChild.lastChild.appendChild(adddiv);
			showoperations.lastChild.lastChild.lastChild.setAttribute("id","op_" + op_number + "_parameters");
			
			//add all parameters
 			for(var i = 0; i < inputparameters.length; i++)
			{
				// add h4
				var parameternumber = i + 1; 
				var parameter_id = "parameter" + parameternumber;
				addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
				showoperations.lastChild.lastChild.appendChild(addh4);
				
				if (inputparameters[i] == "none"){
					//alert("no parameter needed");	
				}
				else{
					//add div id=parameter1
					adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
					showoperations.lastChild.lastChild.lastChild.appendChild(adddiv);
					showoperations.lastChild.lastChild.lastChild.lastChild.setAttribute("id",parameter_id);
					
					if(SOAPParser.isexistText(inputparameters[i], ":::")){
						var realparamname = GUI.splitAttributeRechts(inputparameters[i], ":::");
						var addparametername = document.createTextNode(realparamname + ": ");
						showoperations.lastChild.lastChild.lastChild.lastChild.appendChild(addparametername);
					}
					else{
						var addparametername = document.createTextNode(inputparameters[i] + ": ");
						showoperations.lastChild.lastChild.lastChild.lastChild.appendChild(addparametername);
					}
					
					//add div name=op:[operation number]
					adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
					showoperations.lastChild.lastChild.lastChild.lastChild.appendChild(adddiv);
					showoperations.lastChild.lastChild.lastChild.lastChild.lastChild.setAttribute("name","op:" + op_number);
					
					//add input feld
					var addtextinput = document.createElementNS("http://www.w3.org/1999/xhtml","input");
					showoperations.lastChild.lastChild.lastChild.lastChild.lastChild.appendChild(addtextinput);
					showoperations.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.setAttribute("type","text");
					showoperations.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.setAttribute("name",inputparameters[i]);
					showoperations.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.setAttribute("value","");
					
					//add parameter type
					var addparametertype = document.createTextNode(" (type: " + inputtypes[i] + ")");
					showoperations.lastChild.lastChild.lastChild.lastChild.appendChild(addparametertype);
				}
			}
		}
		else{
			var op_number = operationnumber + 1;
			var operation_id = "operation:" + op_number;
			
			// add h4
			var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
			showoperations.appendChild(addh4);
			
			//add div id=operation_id
			var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
			showoperations.lastChild.appendChild(adddiv);
			showoperations.lastChild.lastChild.setAttribute("id",operation_id);
			
			//add radio button (uniform name = operation_radiobutton)
			var addradiobutton = document.createElementNS("http://www.w3.org/1999/xhtml","input");
			showoperations.lastChild.lastChild.appendChild(addradiobutton);
			showoperations.lastChild.lastChild.lastChild.setAttribute("type","radio");
			showoperations.lastChild.lastChild.lastChild.setAttribute("name","operation_radiobutton");
			showoperations.lastChild.lastChild.lastChild.setAttribute("value",operation);
			
			if (operations_length == (operationnumber + 1)){
				showoperations.lastChild.lastChild.lastChild.setAttribute("checked","checked");
			}
			else{
				showoperations.lastChild.lastChild.lastChild.setAttribute("checked","");
			}
			showoperations.lastChild.lastChild.lastChild.setAttribute("onclick","JavaScript: GUI.changeOperation(\""+operation_id+"\",\""+operations_length+"\");");

			//add operation name
			addtext = document.createTextNode(" " + op_number + ". " + "Operation: " + operation);
			showoperations.lastChild.lastChild.appendChild(addtext);
			
			// add h4
 			var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
			showoperations.lastChild.appendChild(addh4);
			
			//add div id=parameters
			adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
			showoperations.lastChild.lastChild.appendChild(adddiv);
			showoperations.lastChild.lastChild.lastChild.setAttribute("id","op_" + op_number + "_parameters");
			
			//add all parameters
 			for(var i = 0; i < inputparameters.length; i++)
			{
				// add h4
				var parameternumber = i + 1; 
				var parameter_id = "parameter" + parameternumber;
				addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
				showoperations.lastChild.lastChild.appendChild(addh4);
								
				if (inputparameters[i] == "none" && inputtypes[i] == "none"){	
				}
				else{
					//add div id=parameter1
					adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
					showoperations.lastChild.lastChild.lastChild.appendChild(adddiv);
					showoperations.lastChild.lastChild.lastChild.lastChild.setAttribute("id",parameter_id);
					
					if(SOAPParser.isexistText(inputparameters[i], ":::")){
						var realparamname = GUI.splitAttributeRechts(inputparameters[i], ":::");
						var addparametername = document.createTextNode(realparamname + ": ");
						showoperations.lastChild.lastChild.lastChild.lastChild.appendChild(addparametername);
					}
					else{
						var addparametername = document.createTextNode(inputparameters[i] + ": ");
						showoperations.lastChild.lastChild.lastChild.lastChild.appendChild(addparametername);
					}
					
					//add div name=op:[operation number]
					adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
					showoperations.lastChild.lastChild.lastChild.lastChild.appendChild(adddiv);
					showoperations.lastChild.lastChild.lastChild.lastChild.lastChild.setAttribute("name","op:" + op_number);
					
					//add input feld
					var addtextinput = document.createElementNS("http://www.w3.org/1999/xhtml","input");
					showoperations.lastChild.lastChild.lastChild.lastChild.lastChild.appendChild(addtextinput);
					showoperations.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.setAttribute("type","text");
					showoperations.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.setAttribute("name",inputparameters[i]);
					showoperations.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.setAttribute("value","");
										
					//add parameter type
					var addparametertype = document.createTextNode(" (type: " + inputtypes[i] + ")");
					showoperations.lastChild.lastChild.lastChild.lastChild.appendChild(addparametertype);
				}
			}
		}
	} 
	else {
		alert("Error by trying to show operations: contentDoc is null");
	}
}

//Show the invoked operation
GUI.showOperationname = function(iframe, op_name, param_and_inputs)
{
	if (iframe.contentDocument){
		var showoperationname = iframe.contentDocument.getElementById("service");
		
		// add h3
		var addh3 = document.createElementNS("http://www.w3.org/1999/xhtml","h3");
		showoperationname.appendChild(addh3);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showoperationname.lastChild.appendChild(adddiv);
		
		showoperationname.lastChild.lastChild.setAttribute("id",op_name);
				
		var addinput = document.createTextNode("The invoked operation: " + op_name);
		showoperationname.lastChild.lastChild.appendChild(addinput);		

		showoperationname = iframe.contentDocument.getElementById(op_name);
		
		// add h3
		var addh3 = document.createElementNS("http://www.w3.org/1999/xhtml","h3");
		showoperationname.appendChild(addh3);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showoperationname.lastChild.appendChild(adddiv);
				
		var addinput = document.createTextNode("Request Inputs: ");
		showoperationname.lastChild.lastChild.appendChild(addinput);
		
		//add button to show inputs
		var addbutton = document.createElementNS("http://www.w3.org/1999/xhtml","input");
		showoperationname.lastChild.lastChild.appendChild(addbutton);
		showoperationname.lastChild.lastChild.lastChild.setAttribute("id","buttonshowinputs");
		showoperationname.lastChild.lastChild.lastChild.setAttribute("type","button");
		showoperationname.lastChild.lastChild.lastChild.setAttribute("value","Show");
		var idname = "divinputs";
		showoperationname.lastChild.lastChild.lastChild.setAttribute("onclick","JavaScript: GUI.showRequestinputs(\""+idname+"\");");
		
		showoperationname = iframe.contentDocument.getElementById(op_name);
		
		// add h5
		var addh5 = document.createElementNS("http://www.w3.org/1999/xhtml","h5");
		showoperationname.appendChild(addh5);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showoperationname.lastChild.appendChild(adddiv);
		showoperationname.lastChild.lastChild.setAttribute("id","divinputs");
		
		var divinputs = iframe.contentDocument.getElementById('divinputs');
		divinputs.style.display = 'none';

		for(var p in param_and_inputs)
		{			
			if (SOAPParser.isexistText(p, ":::")){
				var param = GUI.splitAttributeLinks(p, "&&&") + ", " + GUI.splitAttributeRechts(p, ":::");
				
				showoperationname = iframe.contentDocument.getElementById("divinputs");
		
				// add h5
				var addh5 = document.createElementNS("http://www.w3.org/1999/xhtml","h5");
				showoperationname.appendChild(addh5);
				
				// add div
				var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
				showoperationname.lastChild.appendChild(adddiv);
						
				var addinput = document.createTextNode("- " + param + ": " + param_and_inputs[p]);
				showoperationname.lastChild.lastChild.appendChild(addinput);
			}
			else{
				showoperationname = iframe.contentDocument.getElementById("divinputs");
			
				// add h5
				var addh5 = document.createElementNS("http://www.w3.org/1999/xhtml","h5");
				showoperationname.appendChild(addh5);
				
				// add div
				var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
				showoperationname.lastChild.appendChild(adddiv);
						
				var addinput = document.createTextNode(p + ": " + param_and_inputs[p]);
				showoperationname.lastChild.lastChild.appendChild(addinput);	
			}
		}

		showoperationname = iframe.contentDocument.getElementById("service");

		// add h3
		var addh3 = document.createElementNS("http://www.w3.org/1999/xhtml","h3");
		showoperationname.appendChild(addh3);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showoperationname.lastChild.appendChild(adddiv);
		
		var addinput = document.createTextNode("Response: ");
		showoperationname.lastChild.lastChild.appendChild(addinput);
	}
}

GUI.showRequestinputs = function(divid)
{
	var divinputs = document.getElementById(divid);
	var button = document.getElementById('buttonshowinputs');
	if (divinputs.style.display == 'none'){
		divinputs.style.display = 'inline';
		button.setAttribute("value","Hide");
	}
	else{
		divinputs.style.display = 'none';
		button.setAttribute("value","Show");
	}
}

// Clear all contents inside iframe by access web services or agents
GUI.clearContent = function(iframe, input)
{		
	if (iframe.contentDocument){
		var repeat = 10;
		for(var r = 0; r < repeat; r++)
		{
			var content = iframe.contentDocument.getElementById("service");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}
			
			var content = iframe.contentDocument.getElementById("description");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}
			
			var content = iframe.contentDocument.getElementById("targetnamespace");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}
			
			var content = iframe.contentDocument.getElementById("operations");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}
			
			var content = iframe.contentDocument.getElementById("response");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}
			
		}
	} 
	else {
		alert("Error by trying to clear iframe content after access web service: contentDoc is null");
	}
}

// Clear all contents inside iframe by access uddi registry
GUI.clearContent2 = function(iframe, input)
{
	if (iframe.contentDocument){
		var repeat = 10;
		for(var r = 0; r < repeat; r++)
		{
			var content = iframe.contentDocument.getElementById("searchfor");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}
			
			var content = iframe.contentDocument.getElementById("part1");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}
			
			var content = iframe.contentDocument.getElementById("part2");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}
			
			var content = iframe.contentDocument.getElementById("part3");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}
			
			var content = iframe.contentDocument.getElementById("part4");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}

			var content = iframe.contentDocument.getElementById("part5");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}

			var content = iframe.contentDocument.getElementById("part6");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}			
			
			var content = iframe.contentDocument.getElementById("businessnames");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}
			
			var content = iframe.contentDocument.getElementById("contact");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}
			
			var content = iframe.contentDocument.getElementById("servicenames");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}
			
			var content = iframe.contentDocument.getElementById("response");

			for(var i = 0; i < content.childNodes.length; i++)
			{
				content.removeChild(content.childNodes[i]);
			}
		}
	} 
	else {
		alert("Error by trying to clear iframe content after access uddi registry: contentDoc is null");
	}
}

//change the value of the attribute "checked" if the option is checked
GUI.changeOperation = function(choosedoperation_id, nr_of_operation)
{
	for(var i = 1; i < nr_of_operation + 1; i++)
	{
		var temp_id = "operation:" + i;
		var operation_element = document.getElementById(temp_id);
		var radiobutton_element = operation_element.firstChild; 
		
		if (temp_id == choosedoperation_id){
			radiobutton_element.setAttribute("checked","checked");
		}
		else{
			radiobutton_element.setAttribute("checked","");
		}
	}
}

GUI.getOperationnumber = function()
{
	var choosedoperationnr = "";
	var iframe = document.getElementById("webservicesMainbox");
	var radiobutton = iframe.contentDocument.getElementsByName("operation_radiobutton");
		
	for(var i = 0; i < radiobutton.length; i++)
	{
		if (radiobutton[i].getAttribute("checked") == "checked"){
			 choosedoperationnr = i + 1;
		}
	}
	return choosedoperationnr;
}

GUI.getOperationname = function()
{
	var choosedoperationname = "";
	var iframe = document.getElementById("webservicesMainbox");
	var radiobutton = iframe.contentDocument.getElementsByName("operation_radiobutton");
		
	for(var i = 0; i < radiobutton.length; i++)
	{
		if (radiobutton[i].getAttribute("checked") == "checked"){
			 choosedoperationname = radiobutton[i].getAttribute("value");
		}
	}
	return choosedoperationname;
}

GUI.getInputs = function(op_nr)
{
	var param_and_input = new Array();
	
	var id = "op:" + op_nr;
	var iframe = document.getElementById("webservicesMainbox");
	var input = iframe.contentDocument.getElementsByName(id);
	
	for(var i = 0; i < input.length; i++)
	{
		var name = input[i].firstChild.getAttribute("name");
		param_and_input[name] = input[i].firstChild.value;
	}
	return param_and_input;
}

//insert content in div "searchfor"
GUI.showSearchfor = function(iframe, input)
{
	if (iframe.contentDocument){
		var showsearchfor = iframe.contentDocument.getElementById("searchfor");
		
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showsearchfor.appendChild(adddiv);
		showsearchfor.lastChild.setAttribute("id",input);
		
		showsearchfor = iframe.contentDocument.getElementById(input);
		
		var addinput = document.createTextNode("Search for: " + input);
		
		showsearchfor.appendChild(addinput);
	} 
	else {
		alert("Error by trying to show Search For: contentDoc is null");
	}
}

//insert content in div "businessnames" for business
GUI.showBusiness = function(iframe, businessinfoname, businesskey, businessinfodescription, servicenames, s_keys, count)
{
	if (iframe.contentDocument){
		var showbusiness = iframe.contentDocument.getElementById("businessnames");

		// add h3
		var addh3 = document.createElementNS("http://www.w3.org/1999/xhtml","h3");
		showbusiness.appendChild(addh3);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showbusiness.lastChild.appendChild(adddiv);
		
		var id = "business" + count;
		showbusiness.lastChild.lastChild.setAttribute("id",id);
		
		showbusiness = iframe.contentDocument.getElementById(id);
		
		var addinput = document.createTextNode(count + ". Business Name: " + businessinfoname);
		showbusiness.appendChild(addinput);

		// add h5
 		addh5 = document.createElementNS("http://www.w3.org/1999/xhtml","h5");
		showbusiness.appendChild(addh5);
		
		// add div
		adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showbusiness.lastChild.appendChild(adddiv);
		
		var id_bkey = "businesskey" + count;
		showbusiness.lastChild.lastChild.setAttribute("id",id_bkey);
		showbusiness.lastChild.lastChild.setAttribute("class","businesskey");
		showbusiness.lastChild.lastChild.setAttribute("onclick","JavaScript: uddiClient.get_businessDetail(\""+businesskey+"\");");
		
		showbusiness = iframe.contentDocument.getElementById(id_bkey);
		
		addinput = document.createTextNode(" - " + "Business Key: " + businesskey + "  ");
		showbusiness.appendChild(addinput); 
		
		//back to div id=business + [count]
		showbusiness = iframe.contentDocument.getElementById(id);
		
		// add h5
		addh5 = document.createElementNS("http://www.w3.org/1999/xhtml","h5");
		showbusiness.appendChild(addh5);
		
		// add div
		adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showbusiness.lastChild.appendChild(adddiv);
		
		var id_desc = "description" + count;
		showbusiness.lastChild.lastChild.setAttribute("id",id_desc);
		
		showbusiness = iframe.contentDocument.getElementById(id_desc);
		
		var addinput = document.createTextNode(" - " + "Description: " + businessinfodescription);
		showbusiness.appendChild(addinput);

		//back to div id=business + [count]
		showbusiness = iframe.contentDocument.getElementById(id);
		
		// add h5
		addh5 = document.createElementNS("http://www.w3.org/1999/xhtml","h5");
		showbusiness.appendChild(addh5);
		
		// add div
		adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showbusiness.lastChild.appendChild(adddiv);
		
		var id_services = businessinfoname + ":" + "services" + count;
		showbusiness.lastChild.lastChild.setAttribute("id",id_services);
		
		showbusiness = iframe.contentDocument.getElementById(id_services);
		
		var addinput = document.createTextNode(" - " + "Services: ");
		showbusiness.appendChild(addinput);
		
		for(var i = 1; i <= servicenames.length; i++)
		{
			showbusiness = iframe.contentDocument.getElementById(id_services);
			
			if (servicenames[i] != undefined){
				// add h5
				addh5 = document.createElementNS("http://www.w3.org/1999/xhtml","h5");
				showbusiness.appendChild(addh5);
				
				// add div
				adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
				showbusiness.lastChild.appendChild(adddiv);
				showbusiness.lastChild.lastChild.setAttribute("class","servicekey");
				showbusiness.lastChild.lastChild.setAttribute("onclick","JavaScript: uddiClient.get_serviceDetail(\""+s_keys[i]+"\");");
				
				var id_servicenr = businessinfoname + ":" +"servicenr" + i;
				showbusiness.lastChild.lastChild.setAttribute("id",id_servicenr);
				
				showbusiness = iframe.contentDocument.getElementById(id_servicenr);
				
				var addinput = document.createTextNode(i + ". " + servicenames[i] + " ( Service Key: " + s_keys[i] + " )");
				showbusiness.appendChild(addinput);
			}
		}
		//back to div id=business + [count]
		showbusiness = iframe.contentDocument.getElementById(id);
		
		// add horizontal line
		addhr = document.createElementNS("http://www.w3.org/1999/xhtml","hr");
		showbusiness.appendChild(addhr);	
	} 
	else {
		alert("Error by trying to show business: contentDoc is null");
	}
}

//GUI.showBusinessDetail = function(iframe, discoveryurls, businessservicenames)
GUI.showBusinessDetail = function(iframe, businessname, description, operator, authorizedname, discoveryurls, personnames, phones, emails, servicenames, servicedescriptions, s_keys)
{
 	if (iframe.contentDocument){
		var show = iframe.contentDocument.getElementById("part1");
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Business Name: " + businessname);
		show.appendChild(addinput);
		
		var show = iframe.contentDocument.getElementById("part2");
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Business Description: " + description);
		show.appendChild(addinput);

		var show = iframe.contentDocument.getElementById("part3");
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Operator: " + operator);
		show.appendChild(addinput);

		var show = iframe.contentDocument.getElementById("part4");
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Authorized Name: " + authorizedname);
		show.appendChild(addinput);

		var show = iframe.contentDocument.getElementById("part5");
		
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Discovery URLs:");
		show.appendChild(addinput);
		
		for(var i = 0; i < discoveryurls.length; i++)
		{
			if (discoveryurls[i] != undefined && discoveryurls[i] != null){
				// add h5
				var addh5 = document.createElementNS("http://www.w3.org/1999/xhtml","h5");
				show.appendChild(addh5);
				
				// add div
				var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
				show.lastChild.appendChild(adddiv);

				var addinput = document.createTextNode("- Discovery URL: " + discoveryurls[i].textContent);
				show.appendChild(addinput);
			}
		}
		
		var show = iframe.contentDocument.getElementById("contact");
		
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Contacts:");
		show.appendChild(addinput);		
		
		if (personnames != undefined){
			for(var i = 0; i < personnames.length; i++)
			{
				if (personnames[i] != undefined && personnames[i] != null){
					// add h5
					var addh5 = document.createElementNS("http://www.w3.org/1999/xhtml","h5");
					show.appendChild(addh5);
					
					// add div
					var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
					show.lastChild.appendChild(adddiv);

					var addinput = document.createTextNode(i + 1 + ". Person Name: " + personnames[i].textContent);
					show.appendChild(addinput);
					
					// add h5
					var addh5 = document.createElementNS("http://www.w3.org/1999/xhtml","h5");
					show.appendChild(addh5);
					
					// add div
					var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
					show.lastChild.appendChild(adddiv);

					var addinput = document.createTextNode("- Phone: " + phones[i].textContent);
					show.appendChild(addinput);
					
					// add h5
					var addh5 = document.createElementNS("http://www.w3.org/1999/xhtml","h5");
					show.appendChild(addh5);
					
					// add div
					var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
					show.lastChild.appendChild(adddiv);

					var addinput = document.createTextNode("- E-Mail: " + emails[i].textContent);
					show.appendChild(addinput);
				}
			}
		}
		
		var show = iframe.contentDocument.getElementById("servicenames");

		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Services:");
		show.appendChild(addinput);	

		for(var i = 1; i <= servicenames.length; i++)
		{
			if (servicenames[i] != undefined && servicenames[i] != null){
				var show = iframe.contentDocument.getElementById("servicenames");
				
				// add h5
				var addh5 = document.createElementNS("http://www.w3.org/1999/xhtml","h5");
				show.appendChild(addh5);
				
				// add div
				var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
				show.lastChild.appendChild(adddiv);

				var addinput = document.createTextNode(i + ". Service Name: " + servicenames[i]);
				show.appendChild(addinput);
				
				// add h5
				var addh5 = document.createElementNS("http://www.w3.org/1999/xhtml","h5");
				show.appendChild(addh5);
				
				// add div
				var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
				show.lastChild.appendChild(adddiv);

				var addinput = document.createTextNode("- Service Description: " + servicedescriptions[i]);
				show.appendChild(addinput);
				
				// add h5
				var addh5 = document.createElementNS("http://www.w3.org/1999/xhtml","h5");
				show.appendChild(addh5);
				
				// add div
				var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
				show.lastChild.appendChild(adddiv);

				show.lastChild.lastChild.setAttribute("class","servicekey");
				show.lastChild.lastChild.setAttribute("onclick","JavaScript: uddiClient.get_serviceDetail(\""+s_keys[i]+"\");");
				
				var id_servicenr = "s_nr" + i;
				show.lastChild.lastChild.setAttribute("id",id_servicenr);
				
				show = iframe.contentDocument.getElementById(id_servicenr);
				
				var addinput = document.createTextNode("- Service Key: " + s_keys[i]);
				show.appendChild(addinput);		
			}
		}	
	}
	else {
		alert("Error by trying to show business detail: contentDoc is null");
	}
}

//insert content in div "servicenames" for services
GUI.showServiceUDDI = function(iframe, serviceinfoname, servicekey, businesskey, count)
{
	if (iframe.contentDocument){
		var showservice = iframe.contentDocument.getElementById("servicenames");

		// add h3
		var addh3 = document.createElementNS("http://www.w3.org/1999/xhtml","h3");
		showservice.appendChild(addh3);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showservice.lastChild.appendChild(adddiv);
		
		var id = "service" + count;
		showservice.lastChild.lastChild.setAttribute("id",id);
		
		showservice = iframe.contentDocument.getElementById(id);
		
		var addinput = document.createTextNode(count + ". Service Name: " + serviceinfoname);
		showservice.appendChild(addinput);
		
 		// add h4
		addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		showservice.appendChild(addh4);
		
		// add div
		adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showservice.lastChild.appendChild(adddiv);
		
		var id_skey = "servicekey" + count;
		showservice.lastChild.lastChild.setAttribute("id",id_skey);
		showservice.lastChild.lastChild.setAttribute("class","servicekey");
		showservice.lastChild.lastChild.setAttribute("onclick","JavaScript: uddiClient.get_serviceDetail(\""+servicekey+"\");");
		showservice = iframe.contentDocument.getElementById(id_skey);
		
		addinput = document.createTextNode(" - " + "Service Key: " + servicekey + "  ");
		showservice.appendChild(addinput);
		
		// back to div id=service + [count]
		showservice = iframe.contentDocument.getElementById(id);
		
 		// add h4
		addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		showservice.appendChild(addh4);
		
		// add div
		adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showservice.lastChild.appendChild(adddiv);
		
		var id_bkey = "businesskey" + count;
		showservice.lastChild.lastChild.setAttribute("id",id_bkey);
		showservice.lastChild.lastChild.setAttribute("class","businesskey");
		showservice.lastChild.lastChild.setAttribute("onclick","JavaScript: uddiClient.get_businessDetail(\""+businesskey+"\");");
		
		showservice = iframe.contentDocument.getElementById(id_bkey);
		
		addinput = document.createTextNode(" - " + "Business Key: " + businesskey + "  ");
		showservice.appendChild(addinput);
		
	} 
	else {
		alert("Error by trying to show service: contentDoc is null");
	}
}

GUI.showServiceDetail = function(iframe, servicename, description, businesskey, accesspoint_desc, accesspoint, tmodelkey)
{
	if (iframe.contentDocument){
		var show = iframe.contentDocument.getElementById("part1");
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Service Name: " + servicename);
		show.appendChild(addinput);

		var show = iframe.contentDocument.getElementById("part2");
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Service Description: " + description);
		show.appendChild(addinput);		
	
		var show = iframe.contentDocument.getElementById("part3");
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		show.lastChild.lastChild.setAttribute("id",businesskey);
		show.lastChild.lastChild.setAttribute("class","businesskey");
		show.lastChild.lastChild.setAttribute("onclick","JavaScript: uddiClient.get_businessDetail(\""+businesskey+"\");");
		
		show = iframe.contentDocument.getElementById(businesskey);
		
		var addinput = document.createTextNode("Business Key: " + businesskey);
		show.appendChild(addinput);	
		
		var show = iframe.contentDocument.getElementById("part4");
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Access Point Description: " + accesspoint_desc);
		show.appendChild(addinput);	

		var show = iframe.contentDocument.getElementById("part5");
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Access Point URL: " + accesspoint);
		show.appendChild(addinput);	
		
		var show = iframe.contentDocument.getElementById("part6");
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		show.lastChild.lastChild.setAttribute("id",tmodelkey);
		show.lastChild.lastChild.setAttribute("class","tmodelkey");
		show.lastChild.lastChild.setAttribute("onclick","JavaScript: uddiClient.get_tmodelDetail(\""+tmodelkey+"\");");
		
		show = iframe.contentDocument.getElementById(tmodelkey);
		
		var addinput = document.createTextNode("tModel Key: " + tmodelkey);
		show.appendChild(addinput);
	}
}

//insert content in div "servicenames" for tModels
GUI.showTmodel = function(iframe, serviceinfoname, tmodelkey, count)
{
	if (iframe.contentDocument){
		var showtmodel = iframe.contentDocument.getElementById("servicenames");

		// add h3
		var addh3 = document.createElementNS("http://www.w3.org/1999/xhtml","h3");
		showtmodel.appendChild(addh3);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showtmodel.lastChild.appendChild(adddiv);
		
		var id = "service" + count;
		showtmodel.lastChild.lastChild.setAttribute("id",id);
		
		showtmodel = iframe.contentDocument.getElementById(id);
		
		var addinput = document.createTextNode(count + ". Service Name: " + serviceinfoname);
		showtmodel.appendChild(addinput);
		
 		// add h4
		addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		showtmodel.appendChild(addh4);
		
		// add div
		adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showtmodel.lastChild.appendChild(adddiv);
		
		var id_tkey = "tmodelkey" + count;
		showtmodel.lastChild.lastChild.setAttribute("id",id_tkey);
		showtmodel.lastChild.lastChild.setAttribute("class","tmodelkey");
		showtmodel.lastChild.lastChild.setAttribute("onclick","JavaScript: uddiClient.get_tmodelDetail(\""+tmodelkey+"\");");
		
		showtmodel = iframe.contentDocument.getElementById(id_tkey);
		
		addinput = document.createTextNode(" - " + "tModel Key: " + tmodelkey + "  ");
		showtmodel.appendChild(addinput);
		
	} 
	else {
		alert("Error by trying to show tmodel: contentDoc is null");
	}
}

GUI.showTmodelDetail = function(iframe, servicename, description, tmodelkey, operator, authorizedname, overviewurl)
{
	if (iframe.contentDocument){
		var show = iframe.contentDocument.getElementById("part1");
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Service Name: " + servicename);
		show.appendChild(addinput);

		var show = iframe.contentDocument.getElementById("part2");
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Service Description: " + description);
		show.appendChild(addinput);
		
		var show = iframe.contentDocument.getElementById("part3");
		
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Operator: " + operator);
		show.appendChild(addinput);
		
		var show = iframe.contentDocument.getElementById("part4");
		
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Authorized Name: " + authorizedname);
		show.appendChild(addinput);
		
		var show = iframe.contentDocument.getElementById("part5");
		
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		show.appendChild(addh4);
		
		// add div
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		show.lastChild.appendChild(adddiv);

		var addinput = document.createTextNode("Overview URL: " + overviewurl);
		show.appendChild(addinput);	
	}
}

//insert content in div "response"
GUI.showResponse = function(iframe, input)
{
	if (iframe.contentDocument){
		var showresponse = iframe.contentDocument.getElementById("response");
		
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showresponse.appendChild(adddiv);
		showresponse.lastChild.setAttribute("id",input);
		
		showresponse = iframe.contentDocument.getElementById(input);
		
		var addinput = document.createTextNode(input);
	} 
	else {
		alert("Error by trying to show response: contentDoc is null");
	}
}

//insert content in div "return"
GUI.showReturn = function(iframe, returntagname, returntext, responsetagname)
{
	//alert(returntext);
	if (iframe.contentDocument){
		var showresponse = iframe.contentDocument.getElementById(responsetagname);
		
		// add h4
		var addh4 = document.createElementNS("http://www.w3.org/1999/xhtml","h4");
		showresponse.appendChild(addh4);
		
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showresponse.lastChild.appendChild(adddiv);
		showresponse.lastChild.lastChild.setAttribute("id",returntagname);
		
		showreturn = iframe.contentDocument.getElementById(returntagname);
		
		var addinput = document.createTextNode(returntagname + ": " + returntext);
		
		showreturn.appendChild(addinput);
	} 
	else {
		alert("Error by trying to show return: contentDoc is null");
	}
}

//insert content in div "values"
GUI.showValues = function(iframe, tagname, value, responsetagname, counter)
{
	if (iframe.contentDocument){
		var showresponse = iframe.contentDocument.getElementById(responsetagname);
		
		// add h5
		var addh5 = document.createElementNS("http://www.w3.org/1999/xhtml","h5");
		showresponse.appendChild(addh5);
		
		var adddiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
		showresponse.lastChild.appendChild(adddiv);
		showresponse.lastChild.lastChild.setAttribute("id",tagname + counter);
		
		showreturn = iframe.contentDocument.getElementById(tagname + counter);
		if (value == " "){
			var addinput = document.createTextNode(tagname + ": " + value);
		}
		else{
			
 			if (tagname == "string" || SOAPParser.isexistText(tagname, ":string")){
				var addinput = document.createTextNode("  - " + value);
			}
			else{
				var addinput = document.createTextNode("  - " + tagname + ": " + value);
			}
		}
		showreturn.appendChild(addinput);
		
	} 
	else {
		alert("Error by trying to show values: contentDoc is null");
	}
}

GUI.splitAttribute = function(attributename)
{
	var ns = attributename.split(":");
	
	return ns[1];
}

GUI.enterAdvanced = function(e)
{
	var input = e.which;
	var inputasstring = String.fromCharCode(input);
	
	if (input == 13){
		advancedClient.submit();
	}
}

GUI.enterUDDI = function(e)
{
	var input = e.which;
	var inputasstring = String.fromCharCode(input);
	
	if (input == 13){
		uddiClient.doSearch();
	}
}

GUI.enterWS = function(e)
{
	var input = e.which;
	var inputasstring = String.fromCharCode(input);
	
	if (input == 13){
		webservicesClient.doParse();
	}
}

GUI.splitAttribute = function(attributename)
{
	var ns = attributename.split(":");
	return ns[1];
}

GUI.splitAttributeNS = function(attributename)
{
	var ns = attributename.split(":");
	return ns[0];
}

GUI.splitAttributeLinks = function(attributename, text)
{
	var ns = attributename.split(text);
	return ns[0];
}

GUI.splitAttributeRechts = function(attributename, text)
{
	var ns = attributename.split(text);
	return ns[1];
}

GUI.splitAttributeAll = function(attributename, text)
{
	var ns = attributename.split(text);
	return ns;
}
