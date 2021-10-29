(function() {
  'use strict';

  angular.module('app.common')
  .service('PhotographerServiceCommon', PhotographerServiceCommon);

	PhotographerServiceCommon.$inject = [ '$translate', '$resource', '$http','$filter', 'UrlConstantsCore', 'GlobalConstantsCore','$rootScope','$state','IndexServiceCore','UrlConstantsCommon','GlobalValuesCore'];

  function PhotographerServiceCommon($translate, $resource, $http,$filter, UrlConstantsCore, GlobalConstantsCore,$rootScope,$state,IndexServiceCore,UrlConstantsCommon,GlobalValuesCore) {

	var service = {
        search: search,
        addToWish:addToWish,
        deleteWish:deleteWish,
        updateWish:updateWish,
        
    };
    return service;

    function search(url){
		if($filter('HasValueFilterCore')(url)){
			var promise = IndexServiceCore.sendGETRequest(url);
			console.log('promise: ',promise);
			return promise;
		}
    }
    
    function addToWish(userid,status,description){
		var url = "";
		if($filter('HasValueFilterCore')(description)){
			url = UrlConstantsCommon.WISH_ADD_TO_WISH_URL+"/"+userid+"?&status="+status+"&description="+description;
		}else{
			url = UrlConstantsCommon.WISH_ADD_TO_WISH_URL+"/"+userid+"?&status="+status;
		}
		
		if($filter('HasValueFilterCore')(url)){
			var promise = IndexServiceCore.sendPOSTRequest(url);
			console.log('promise: ',promise);
			return promise;
		}
    }

	function deleteWish(wishId){
		var url = UrlConstantsCommon.WISH_DELETE_URL+"/"+wishId;
		if($filter('HasValueFilterCore')(url)){
			var promise = IndexServiceCore.sendPOSTRequest(url);
			console.log('promise: ',promise);
			return promise;
		}
    }
    
    function updateWish(wishJson){
		var url = UrlConstantsCommon.WISH_UPDATE_URL+"/"+wishId;
		if($filter('HasValueFilterCore')(url)){
			var promise = IndexServiceCore.sendPOSTRequest(url,data);
			console.log('promise: ',promise);
			return promise;
		}
    }

  }
})();
