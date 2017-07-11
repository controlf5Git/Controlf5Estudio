	function ResizeRoot()
	{   
		
		if (ConfigurationResponsive.SizeCurrent.Type== 1) 
		{

		    $("#showSearcher").removeClass("accordionDocuments");
		    $("#showSearcher .txtEnlazadorDocuments:first").show();
		    //$("#showSearcher .tituloPreguntaDocuments:first").hide();
			
		}
		
		else if (ConfigurationResponsive.SizeCurrent.Type == 2) 
		{
			
			$("#showSearcher").removeClass("accordionDocuments");
			$("#showSearcher").addClass("accordionDocuments");			
			$("#showSearcher .txtEnlazadorDocuments:first").hide();
			//$("#showSearcher .tituloPreguntaDocuments:first").show();
			$("#showSearcher .tituloPreguntaDocuments").removeClass("active");
		}
		
		else if (ConfigurationResponsive.SizeCurrent.Type == 3) 
		{
			
		    $("#showSearcher").removeClass("accordionDocuments");
		    $("#showSearcher .txtEnlazadorDocuments:first").show();
		    //$("#showSearcher .tituloPreguntaDocuments:first").hide();
		}
		
		
	}
	ConfigurationResponsive.AddResizeEvent(ResizeRoot);



