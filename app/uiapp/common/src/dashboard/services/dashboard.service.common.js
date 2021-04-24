(function() {
  'use strict';

  angular.module('app.common')
  .service('DashboardServiceCommon', DashboardServiceCommon);

	DashboardServiceCommon.$inject = [ '$translate', '$resource', '$http','$filter', 'UrlConstantsCore', 'GlobalConstantsCore','$rootScope','$state','IndexServiceCore','UrlConstantsCommon','GlobalValuesCore'];

  function DashboardServiceCommon($translate, $resource, $http,$filter, UrlConstantsCore, GlobalConstantsCore,$rootScope,$state,IndexServiceCore,UrlConstantsCommon,GlobalValuesCore) {

	var service = {
        countByEducationLevelUsingGroupBy:countByEducationLevelUsingGroupBy,        
        countByEducationCoursenameUsingGroupBy:countByEducationCoursenameUsingGroupBy,        
    };
    
    return service;
    
    function countByEducationLevelUsingGroupBy(){
		var url = "";
		url = UrlConstantsCommon.countByEducationLevelUsingGroupBy;
		if($filter('HasValueFilterCore')(url)){
			var promise = IndexServiceCore.sendGETRequest(url);
			return promise;
		}
    }
    
     function countByEducationCoursenameUsingGroupBy(){
		var url = "";
		url = UrlConstantsCommon.countByEducationCoursenameUsingGroupBy;
		if($filter('HasValueFilterCore')(url)){
			var promise = IndexServiceCore.sendGETRequest(url);
			return promise;
		}
    }

  }
})();
