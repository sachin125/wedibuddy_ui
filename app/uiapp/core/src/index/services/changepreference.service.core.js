(function() {
  'use strict';
  
  angular.module('app.core').service('ChangePreferenceServiceCore', ChangePreferenceServiceCore);
	
  ChangePreferenceServiceCore.$inject = ['$rootScope','$resource', '$q','UrlConstantsCore','GlobalConstantsCore','IndexServiceCore','$filter'];

  /**
   * ApkAdmin DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor	
   */
function ChangePreferenceServiceCore($rootScope,$resource, $q, UrlConstantsCore,GlobalConstantsCore,IndexServiceCore,$filter) {
     var self = this;
     
    
	this.changePreferenceForUser = function(userConfigObj){
		var url = UrlConstantsCore.UPDATE_USER_CONFIG_FOR_USER;
		return  IndexServiceCore.sendPOSTRequest(url,userConfigObj).then(
			function(res){
				return res;
			});
	};
	
	/******************************************************************************************************/	
	
	this.getUserConfigDataByUserID = function(userid){
		
		var url = UrlConstantsCore.GET_USER_CONFIG_FOR_USER+"/"+userid;
		return  IndexServiceCore.sendPOSTRequest(url).then(function(res){return res;});
	};
	        
	 
    
  }
})();
