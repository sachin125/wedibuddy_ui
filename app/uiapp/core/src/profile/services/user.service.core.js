(function() {
  'use strict';

  angular.module('app.core')
  .service('UserServiceCore', UserServiceCore);

	UserServiceCore.$inject = [ '$translate', '$resource', '$http','$filter', 'UrlConstantsCore', 'GlobalConstantsCore','$rootScope','$state','IndexServiceCore'];

  function UserServiceCore($translate, $resource, $http,$filter, UrlConstantsCore, GlobalConstantsCore,$rootScope,$state,IndexServiceCore) {

	var service = {
        search: search,
        mergePersonalInfo:mergePersonalInfo,
        mergeFamilyInfo:mergeFamilyInfo,
        mergeEducationInfo:mergeEducationInfo,
        mergeWorkInfo:mergeWorkInfo,
        deleteEducation:deleteEducation,
        deleteWork:deleteWork,
        updateUserAccountInfo:updateUserAccountInfo,
        updateUserProfileInfo:updateUserProfileInfo,
        createUser:createUser
    };
    return service;
    
    function search(url){
		if($filter('HasValueFilterCore')(url)){
			return IndexServiceCore.sendGETRequest(url);
		}
    }
    
    function updateUserAccountInfo(data){
		var url = UrlConstantsCore.UPDATE_USERACCOUNT_INFO_URL;
		if($filter('HasValueFilterCore')(url)){
			return IndexServiceCore.sendPOSTRequest(url,data);
		}
    }
    
    function updateUserProfileInfo(data){
		var url = UrlConstantsCore.UPDATE_USERPROFILE_INFO_URL;
		if($filter('HasValueFilterCore')(url)){
			return IndexServiceCore.sendPOSTRequest(url,data);
		}
    }
    
    function mergePersonalInfo(data){
		var url = UrlConstantsCore.USER_MERGE_PERSONAL_INFO_URL;
		if($filter('HasValueFilterCore')(url)){
			return IndexServiceCore.sendPOSTRequest(url,data);
		}
    }
    
    function mergeFamilyInfo(data){
		var url = UrlConstantsCore.USER_MERGE_FAMILY_INFO_URL;
		if($filter('HasValueFilterCore')(url)){
			return IndexServiceCore.sendPOSTRequest(url,data);
		}
    }
    
    function mergeEducationInfo(data){
		var url = UrlConstantsCore.USER_MERGE_EDUCATION_INFO_URL;
		if($filter('HasValueFilterCore')(url)){
			return IndexServiceCore.sendPOSTRequest(url,data);
		}
    }
   
    function mergeWorkInfo(data){
		var url = UrlConstantsCore.USER_MERGE_WORK_INFO_URL;
		if($filter('HasValueFilterCore')(url)){
			return IndexServiceCore.sendPOSTRequest(url,data);
		}
    }
    
    function deleteEducation(educationId){
		var url = UrlConstantsCore.USER_DELETE_EDUCATION_INFO_URL;
		if($filter('HasValueFilterCore')(url)){
			return IndexServiceCore.sendPOSTRequest(url,educationId);
		}
    }
    function deleteWork(workId){
		var url = UrlConstantsCore.USER_DELETE_WORK_INFO_URL;
		if($filter('HasValueFilterCore')(url)){
			return IndexServiceCore.sendPOSTRequest(url,workId);
		}
    }
    function createUser(data){
		var url = UrlConstantsCore.USER_CREATE_URL;
		if($filter('HasValueFilterCore')(url)){
			return IndexServiceCore.sendPOSTRequest(url,data);
		}
    }
    
    function mergeDp(url,data){
		if($filter('HasValueFilterCore')(url)){
			return IndexServiceCore.sendPOSTRequest(url,data);
		}
    }

  }
})();
