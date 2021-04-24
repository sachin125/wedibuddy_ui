(function() {
  'use strict';

  angular.module('app.common')
  .service('BridgeGroomServiceCommon', BridgeGroomServiceCommon);

	BridgeGroomServiceCommon.$inject = [ '$translate', '$resource', '$http','$filter', 'UrlConstantsCore', 'GlobalConstantsCore','$rootScope','$state','IndexServiceCore','UrlConstantsCommon','GlobalValuesCore'];

  function BridgeGroomServiceCommon($translate, $resource, $http,$filter, UrlConstantsCore, GlobalConstantsCore,$rootScope,$state,IndexServiceCore,UrlConstantsCommon,GlobalValuesCore) {

	var service = {
        search: search,
        addToWish:addToWish,
        deleteWish:deleteWish,
        updateWish:updateWish,
        filterUser:filterUser,
        initiateUserWrapper:initiateUserWrapper,
        
    };
    return service;

    function initiateUserWrapper(){
		var userWrapper ={};
		var currentUser = GlobalValuesCore.USER_CONTEXT;
		currentUser.gender='Male';
		if(currentUser.gender==='Male'){
			userWrapper.gender = 'Female';	
			userWrapper.minAge=18;
		}else{
			userWrapper.gender = 'Male';	
			userWrapper.maxAge=21;
		}
		return userWrapper;
	}
	
    function search(url){
		if($filter('HasValueFilterCore')(url)){
			var promise = IndexServiceCore.sendGETRequest(url);
			console.log('promise: ',promise);
			return promise;
		}
    }
    
    function filterUser(userWrapper){
		if($filter('HasValueFilterCore')(userWrapper)){
			var url = UrlConstantsCommon.USERPROFILE_FILTER_URL+"?&llimit=0&ulimit=10";
			var promise = IndexServiceCore.sendPOSTRequest(url,userWrapper);
			console.log('promise: ',promise);
			return promise;
		}
    }
z    
    function addToWish(username,description){
		var url = "";
		if($filter('HasValueFilterCore')(description)){
			url = UrlConstantsCommon.WISH_ADD_TO_WISH_URL+"/"+username+"&description="+description;
		}else{
			url = UrlConstantsCommon.WISH_ADD_TO_WISH_URL+"/"+username;
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
