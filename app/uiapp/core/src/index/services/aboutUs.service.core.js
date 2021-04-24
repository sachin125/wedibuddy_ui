(function() {
  'use strict';
  
  angular.module('app.core').service('AboutUsServiceCore', AboutUsServiceCore);
	
  AboutUsServiceCore.$inject = ['$rootScope','$resource', '$q','UrlConstantsCore','GlobalConstantsCore','IndexServiceCore','$filter'];

  /**
   * ApkAdmin DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor	
   */
function AboutUsServiceCore($rootScope,$resource, $q, UrlConstantsCore,GlobalConstantsCore,IndexServiceCore,$filter) {
     var self = this;
	
	this.createApkDetail = function(apkAdminObj){
		var url = UrlConstantsCommon.CREATE_APK_ADMIN;
		return  IndexServiceCore.sendPOSTRequest(url,apkAdminObj).then(
			function(res){
				return res;
			});
	};
	
	/******************************************************************************************************/	
	
	this.getAllApkReleaseNoteFeature = function(limit,page,orderBy,fiql){
		
		var url = UrlConstantsCore.GET_ALL_RELEASENOTE_FEATURES;
		var searchUlr = url+"?";
		if($filter("HasValueFilterCore")(fiql)){
          searchUlr+=fiql+"&";
        }
		 url = searchUlr+IndexServiceCore.getfiqlParam(limit,page,orderBy)+"&date=" + new Date();
		return  IndexServiceCore.sendGETRequest(url).then(function(res){return res;});
	};
	        
	        
	        this.getWebApkObjectListservice = function(limit,page,orderBy)
	       {    
			    var url = UrlConstantsCore.GET_ALL_WEB_VERSION_INFORMATION; 
			    var searchUrl=url+"?";
			    url=searchUrl+IndexServiceCore.getfiqlParam(limit,page,orderBy)+"&date=" + new Date();
				return  IndexServiceCore.sendGETRequest(url);
		  };
	/********************************************************************************************************/
	
	this.createHistoryFiql = function(fiql) {
		  var fql = '';
		  if($filter("HasValueFilterCore")(fiql)){
				fql+="_s=";
				if($filter("HasValueFilterCore")(fiql.moduleName)){
					 fql += "(moduleName=="+fiql.moduleName+");";
				}
				if($filter("HasValueFilterCore")(fiql.version)){
					 fql += "(version=="+fiql.version+");";
				}
				
		  }         
		  if($filter("HasValueFilterCore")(fql)){
				fql = fql.substring(0,fql.length -1);
		  }
		  if(fql == '_s'){
				fql = '';
		  }
		  return fql;
    };   
    
    //~ this.createFiql = function(fiql) {	
		//~ 
		  //~ var fql = '';
		  //~ if($filter("HasValueFilterCore")(fiql)){
				//~ fql+="_s=";
				//~ if($filter("HasValueFilterCore")(fiql.moduleName)){
					 //~ fql += "(apkModule.moduleName=="+fiql.moduleName+");"
				//~ }
				//~ if($filter("HasValueFilterCore")(fiql.type)){
					 //~ fql += "(type=="+fiql.type+");"
				//~ }
		  //~ }         
		  //~ if($filter("HasValueFilterCore")(fql)){
				//~ fql = fql.substring(0,fql.length -1)
		  //~ }
		  //~ if(fql == '_s'){
				//~ fql = '';
		  //~ }
		  //~ return fql;
    //~ };
    
    
    	
	
	
	
	
	
	this.getfiqlParam=function(pagesize,pageno,orderby,orderType){
		if(!$filter('HasValueFilterCore')(pagesize))
			pagesize=10;
		if(!$filter('HasValueFilterCore')(pageno))
			pageno=1;
		if(!$filter('HasValueFilterCore')(orderby))
			orderby='modifiedTime';
		if(!$filter('HasValueFilterCore')(orderType))
			orderType='desc';
		var llimit = (parseInt(pageno) - 1) * parseInt(pagesize);
		var ulimit = (pageno * pagesize)-1;
		return "&orderBy="+orderby+"&orderType="+orderType+"&ulimit="+ulimit+"&llimit="+llimit;
	};	
		
	  
    this.createFiqlForConfigurationChange = function(apkId) {
		
		
		var fiql="?";
		if ($filter("HasValueFilterCore")(apkId)) {
			
		fiql +="_s=";
		if ($filter("HasValueFilterCore")(apkId)) 
			fiql += "(id=="+apkId+");";
		
	    fiql = fiql.substring(0, fiql.length - 1);
	   
	}
	return fiql;
	};
	
	 this.createFiqlForReleaseNoteDetailpagesearch = function(relaseDetailPageId) {
		
		
		var fiql="?";
		if ($filter("HasValueFilterCore")(relaseDetailPageId)) {
			
		fiql +="_s=";
		if ($filter("HasValueFilterCore")(relaseDetailPageId)) 
			fiql += "(releaseNotes.id=="+relaseDetailPageId+");";
		
	    fiql = fiql.substring(0, fiql.length - 1);
	   
	}
	return fiql;
	};
	
	this.createFiqlForReleaseDetail = function() {
		var fiql="?";	
		
		
	    return fiql;
	};
	
	
	
	
    
  }
})();
