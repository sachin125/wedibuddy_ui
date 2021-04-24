(function() {
  'use strict';

  angular.module('app.core')
  .service('ServiceCore', ServiceCore);
	
	ServiceCore.$inject = ['$rootScope','$filter'];
  
  function ServiceCore($rootScope,$filter) {
		
		
	var self = this;
	self.ProjectDetailsObj = {};
	self.SiteDetailsObj={};
	self.projectState="";
	self.projectGridViewState="";
	self.siteState="";
	self.siteDetailState="";
	var service = {
       setUserRegion : setUserRegion,
       setProjectDetailsObj : setProjectDetailsObj ,
		getProjectDetailsObj : getProjectDetailsObj,
		setSiteDetailsObj : setSiteDetailsObj ,
		getSiteDetailsObj :getSiteDetailsObj,
		getProjectState :getProjectState,
		getProjectGridViewState :getProjectGridViewState,
		getSiteState :getSiteState,
		getSiteDetailState:getSiteDetailState,
		getQueryForListByQueryObject : getQueryForListByQueryObject,
		getTimeSettingObject: getTimeSettingObject,
		getKeywordSettingParsed: getKeywordSettingParsed,
    };
    return service;
    
    
    
      function setProjectDetailsObj(ProjectDetailsObj) {
		self.ProjectDetailsObj=ProjectDetailsObj;
	}
		
	function getProjectDetailsObj(){
		return self.ProjectDetailsObj;
	}
      function setSiteDetailsObj(SiteDetailsObj) {
		self.SiteDetailsObj=SiteDetailsObj;
	}
		
	function getSiteDetailsObj(){
		return self.SiteDetailsObj;
	}
	
	  
    	
	function getProjectState(){
		if(globalWorkspace=="WIRELESS EnodeB")
			self.projectSate="dashboard.Projects";
		else if(globalWorkspace=="VERIZON WIRELESS")
				self.projectSate="dashboard.ProjectsVzw";
		else if(globalWorkspace=="Facebook")
			self.projectSate="dashboard.ProjectsSmc";
		else if(globalWorkspace=="Microwave")
			self.projectSate="dashboard.mwprojectRjil";
		else if(globalWorkspace=="FTTX")
			self.projectSate="dashboard.fttxProject";	
			else self.projectSate="dashboard.fttxProject";
		
		return self.projectSate;
		
		
	}
	
	function getProjectGridViewState(){
		if(globalWorkspace=="WIRELESS EnodeB")
			self.projectGridViewState="dashboard.projectsTaskDetailsGridView";
		else if(globalWorkspace=="VERIZON WIRELESS")
				self.projectGridViewState="dashboard.projectsTaskDetailsGridViewVzw";
				else if(globalWorkspace=="Facebook")
			self.projectGridViewState="dashboard.projectsTaskDetailsGridViewsmc";
			else if(globalWorkspace=="Microwave")
			self.projectGridViewState="dashboard.projectTaskDetailsRjil";
			else if(globalWorkspace=="FTTX")
			self.projectGridViewState="dashboard.ProjectsTaskDetailsGridViewFTTX";
			else self.projectGridViewState="dashboard.projectsTaskDetailsGridViewFTTX";
		
		return self.projectGridViewState;
		
	}
	
	function getSiteState(){
		if(globalWorkspace=="WIRELESS EnodeB")
			self.siteState="dashboard.sites";
		else if(globalWorkspace=="VERIZON WIRELESS")
				self.siteState="dashboard.regulatorySites";
		else if(globalWorkspace=="Microwave")
				self.siteState="dashboard.sitesRjil";
				else if(globalWorkspace=="Facebook")
			self.siteState="dashboard.SiteSmc";
			else self.siteState="dashboard.sitewirecenter";
			
		
		return self.siteState;
	}
	
	function getSiteDetailState(){
		if(globalWorkspace=="WIRELESS EnodeB")
			self.siteDetailState="dashboard.sitesdetails";
		else if(globalWorkspace=="VERIZON WIRELESS")
			self.siteDetailState="dashboard.regulatorySites";
		else if(globalWorkspace=="Facebook")
			self.siteDetailState="dashboard.sitesdetailsmc";
		else if(globalWorkspace=="FTTX"){
			self.siteDetailState=$rootScope.$previousStateName;
		}
		else if(globalWorkspace=="Microwave")
			self.siteDetailState="dashboard.sitesDetailsRjil";
		else
		self.siteDetailState="dashboard.siteWireCenterDetail";
		
		return self.siteDetailState;
	}
	
	
	
    
    function setUserRegion(userMapping){
       var json = ""  ;
       var regionName='';
        if(userMapping !== null && userMapping.length!==0 && userMapping[0].region!==null){
           GlobalConstantsFtr.REGIONS_NAME=[];
           if(userMapping.length>1){
              GlobalConstantsFtr.REGIONS_NAME.push({ACTUAL:'All',TOSHOW:'All'});
           }
        }
   }
   function getQueryForListByQueryObject(queryObject,query){
	   if($filter("HasValueFilterCore")(queryObject.filter)){
			angular.forEach(queryObject.filter,function(attributes){
				query[attributes.name]=attributes.value[0];
				if(attributes.name=="cityModel")
				query[attributes.name]={name:attributes.value[0]};
			});
		}
		return query;
	}
	function getTimeSettingObject(timeSetting){
		var timeSettingObj={};
		var fiql="",value,title,key;
		key = timeSetting[0].name;
		title = getTitle(timeSetting[0].name);
		timeSettingObj.title = title;
		
		var firstDayOfWeek,lastDayOfWeek;
		var firstDayOfMonth,lastDayOfMonth;
		var firstDayOfQuarter,lastDayOfQuarter;
		var firstDayOfYear,lastDayOfYear;
		if($filter('HasValueFilterCore')(timeSetting[0].value[0]))
				{
					var valSelectID=getDateValue(timeSetting[0].value[0]);
					console.log(valSelectID);
					if(valSelectID===0 || valSelectID==1 || valSelectID==7 ||valSelectID==14 || valSelectID==15  || valSelectID==30 || valSelectID==60 || valSelectID==90 || valSelectID==180 || valSelectID==365 || valSelectID==730)
					{
						var currData = $filter('GetSearchDateValueFilterCore')(valSelectID);
						var newLastDate, newStartDate;
						if(valSelectID === 0  || valSelectID==1) {
							newLastDate = currData + " 23:59:59";
							newLastDate = new Date(newLastDate);
							newStartDate = currData + " 00:00:00";
							newStartDate = new Date(newStartDate);
							console.dir(newStartDate+"dddd"+newLastDate);
							fiql += "(("+key+"=ge="+newStartDate.getTime()+ ";"+key+"" + "=le=" + newLastDate.getTime() + "));";
							value = $filter("PreferenceDateformatFilterCore")(newStartDate)+" To "+$filter("PreferenceDateformatFilterCore")(newLastDate);
						}
						else if(valSelectID==7) {
								firstDayOfWeek = currData + " 00:00:00";
								firstDayOfWeek = new Date(firstDayOfWeek);
								lastDayOfWeek = $filter('GetCurrentWeekEndDateFilterCore')();
								lastDayOfWeek = lastDayOfWeek+ " 23:59:59";
								lastDayOfWeek = new Date(lastDayOfWeek);
								console.dir(firstDayOfWeek+"/"+lastDayOfWeek);
								fiql += "(("+key+"=ge="+firstDayOfWeek.getTime()+"));";	
								fiql += "(("+key+"=le="+lastDayOfWeek.getTime()+"));";	
								value = $filter("PreferenceDateformatFilterCore")(firstDayOfWeek)+" To "+$filter("PreferenceDateformatFilterCore")(lastDayOfWeek);
						}
						else if(valSelectID==14) {
								firstDayOfWeek = currData + " 00:00:00";
								firstDayOfWeek = new Date(firstDayOfWeek);
								lastDayOfWeek = $filter('GetLastWeekEndDateFilterCore')();
								lastDayOfWeek = lastDayOfWeek+ " 23:59:59";
								lastDayOfWeek = new Date(lastDayOfWeek);
								console.dir(firstDayOfWeek+"/"+lastDayOfWeek);
								fiql += "(("+key+"=ge="+firstDayOfWeek.getTime()+"));";	
								fiql += "(("+key+"=le="+lastDayOfWeek.getTime()+"));";	
								value = $filter("PreferenceDateformatFilterCore")(firstDayOfWeek)+" To "+$filter("PreferenceDateformatFilterCore")(lastDayOfWeek);
						}
						else if(valSelectID==15) {
							var beforeDate = currData + " 00:00:00";
								beforeDate = new Date(beforeDate);
							var today = new Date();
								today = $filter("ConvertToSendFormatFordateFilterCore")(today)+ " 23:59:59";
								today = new Date(today);
								console.dir(beforeDate+"/"+today);
								fiql += "(("+key+"=ge="+beforeDate.getTime()+"));";	
								fiql += "(("+key+"=le="+today.getTime()+"));";	
								value = $filter("PreferenceDateformatFilterCore")(beforeDate)+" To "+$filter("PreferenceDateformatFilterCore")(today);
						}else if(valSelectID==30) {
								firstDayOfMonth = currData + " 00:00:00";
								firstDayOfMonth = new Date(firstDayOfMonth);
								lastDayOfMonth = $filter('GetCurrentMonthLastDateFilterCore')();
								lastDayOfMonth = lastDayOfMonth+ " 23:59:59";
								lastDayOfMonth = new Date(lastDayOfMonth);
								console.dir(firstDayOfMonth+"/"+lastDayOfMonth);
								fiql += "(("+key+"=ge="+firstDayOfMonth.getTime()+"));";	
								fiql += "(("+key+"=le="+lastDayOfMonth.getTime()+"));";	
								value = $filter("PreferenceDateformatFilterCore")(firstDayOfMonth)+" To "+$filter("PreferenceDateformatFilterCore")(lastDayOfMonth);
						}else if(valSelectID==60) {
								firstDayOfMonth = currData + " 00:00:00";
								firstDayOfMonth = new Date(firstDayOfMonth);
								lastDayOfMonth = $filter('GetLastMonthEndDateFilterCore')();
								lastDayOfMonth = lastDayOfMonth+ " 23:59:59";
								lastDayOfMonth = new Date(lastDayOfMonth);
								console.dir(firstDayOfMonth+"/"+lastDayOfMonth);
								fiql += "(("+key+"=ge="+firstDayOfMonth.getTime()+"));";	
								fiql += "(("+key+"=le="+lastDayOfMonth.getTime()+"));";	
								value = $filter("PreferenceDateformatFilterCore")(firstDayOfMonth)+" To "+$filter("PreferenceDateformatFilterCore")(lastDayOfMonth);
						}else if(valSelectID==90) {
								firstDayOfQuarter = currData + " 00:00:00";
								firstDayOfQuarter = new Date(firstDayOfQuarter);
								lastDayOfQuarter = $filter('GetCurrentQuarterEndDateFilterCore')();
								lastDayOfQuarter = $filter("ConvertToSendFormatFordateFilterCore")(lastDayOfQuarter)+ " 23:59:59";
								lastDayOfQuarter = new Date(lastDayOfQuarter);
								console.dir(firstDayOfQuarter+"/"+lastDayOfQuarter);
								fiql += "(("+key+"=ge="+firstDayOfQuarter.getTime()+"));";	
								fiql += "(("+key+"=le="+lastDayOfQuarter.getTime()+"));";	
								value = $filter("PreferenceDateformatFilterCore")(firstDayOfQuarter)+" To "+$filter("PreferenceDateformatFilterCore")(lastDayOfQuarter);
						}
						else if(valSelectID==180) {
								firstDayOfQuarter = currData + " 00:00:00";
								firstDayOfQuarter = new Date(firstDayOfQuarter);
								lastDayOfQuarter = $filter('GetLastQuarterEndDateFilterCore')()+ " 23:59:59";
								lastDayOfQuarter = new Date(lastDayOfQuarter);
								console.dir(firstDayOfQuarter+"/"+lastDayOfQuarter);
								fiql += "(("+key+"=ge="+firstDayOfQuarter.getTime()+"));";	
								fiql += "(("+key+"=le="+lastDayOfQuarter.getTime()+"));";	
								value = $filter("PreferenceDateformatFilterCore")(firstDayOfQuarter)+" To "+$filter("PreferenceDateformatFilterCore")(lastDayOfQuarter);
						}
						else if(valSelectID==365) {
									firstDayOfYear = currData + " 00:00:00";
									firstDayOfYear= new Date(firstDayOfYear);
									lastDayOfYear = $filter('GetCurrentYearEndDateFilterCore')();
									lastDayOfYear= $filter("ConvertToSendFormatFordateFilterCore")(lastDayOfYear)+ " 23:59:59";
									lastDayOfYear = new Date(lastDayOfYear);
									console.dir(firstDayOfYear+"/"+lastDayOfYear);
									fiql += "(("+key+"=ge="+firstDayOfYear.getTime()+"));";	
									fiql += "(("+key+"=le="+lastDayOfYear.getTime()+"));";	
									value = $filter("PreferenceDateformatFilterCore")(firstDayOfYear)+" To "+$filter("PreferenceDateformatFilterCore")(lastDayOfYear);
						}
						else if(valSelectID==730) {
									firstDayOfYear = currData + " 00:00:00";
									firstDayOfYear= new Date(firstDayOfYear);
									lastDayOfYear = $filter('GetLastYearEndDateFilterCore')()+" 23:59:59";
									lastDayOfYear = new Date(lastDayOfYear);
									console.dir(firstDayOfYear+"/"+lastDayOfYear);
									fiql += "(("+key+"=ge="+firstDayOfYear.getTime()+"));";	
									fiql += "(("+key+"=le="+lastDayOfYear.getTime()+"));";	
									value = $filter("PreferenceDateformatFilterCore")(firstDayOfYear)+" To "+$filter("PreferenceDateformatFilterCore")(lastDayOfYear);
						}
						timeSettingObj.fiqlOfTime=fiql;
						timeSettingObj.timeValue=value;
					}
				}
		return timeSettingObj;
	}
    function getDateValue(timevalue){
		var result;
			switch(timevalue) {
				case "today":
				result = 0;
				break;
				case "yesterday":
				result = 1;
				break;
				case "thisweek":
				result = 7;
				break;
				case "lastweek":
				result = 14;
				break;
				case "thismonth":
				result = 30;
				break;
				case "lastmonth":
				result = 60;
				break;
				case "thisquarter":
				result = 90;
				break;
				case "lastquarter":
				result = 180;
				break;
				case "thisyear":
				result = 365;
				break;
				case "lastyear":
				result = 730;
				break;
		}
		return result;
	}
	function getTitle(mixedWord){
		var title = mixedWord.charAt(0).toUpperCase();
		for(var i=1;i<mixedWord.length;i++){
			if(mixedWord.charAt(i) === mixedWord.charAt(i).toUpperCase()){
				title +=" ";
			}
			title +=mixedWord.charAt(i);
		}
		return title;
	}
	function getKeywordSettingParsed(keywordSetting){
			var keywordSettingObj = {};
			var valueObj = JSON.parse(keywordSetting[0].value);
			keywordSettingObj.fiql = keywordSetting[0].name+".userid=="+valueObj.userid+";";
			keywordSettingObj.title = keywordSetting[0].showName ? getTitle(keywordSetting[0].showName) : getTitle(keywordSetting[0].name);
			keywordSettingObj.value = $filter("HtmlDecodeFilterCore")(valueObj.firstname+" "+valueObj.lastname);
			return keywordSettingObj;
		}
	}

  

})();
