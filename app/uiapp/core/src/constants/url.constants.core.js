(function() {
'use strict';

var BASE_URL = context+"/rest";
angular.module('app.core')
	.constant('UrlConstantsCore', {
		
		J_SPRING_SECURITY_LOGOUT_URL : "./../j_spring_security_logout",
		LOGOUT_URL : "./../logout",
		USER_CONTEXT_URL : BASE_URL+"/User/userincontext",
		USER_SEARCH_URL:BASE_URL+'/User/search',
		USER_CREATE_URL: BASE_URL+'/User/createUser/',
		UPDATE_USER_INFORMATION_URL: BASE_URL+'/User/update',
		USER_PROFILE_URL:BASE_URL+'/UserProfile/profile',
		USER_MERGE_PERSONAL_INFO_URL:BASE_URL+'/UserProfile/mergePersonalInfo',
		USER_MERGE_FAMILY_INFO_URL:BASE_URL+'/UserProfile/mergeFamily',
		USER_MERGE_EDUCATION_INFO_URL:BASE_URL+'/UserProfile/mergeEducation',
		USER_DELETE_EDUCATION_INFO_URL:BASE_URL+'/UserProfile/deleteEducation',
		USER_MERGE_WORK_INFO_URL:BASE_URL+'/UserProfile/mergeWork',
		USER_DELETE_WORK_INFO_URL:BASE_URL+'/UserProfile/deleteWork',
		USER_MERGE_DP_INFO_URL:BASE_URL+'/UserProfile/mergeDp',
		UPDATE_USERACCOUNT_INFO_URL:BASE_URL+'/UserProfile/updateUserAccountInfo',
		UPDATE_USERPROFILE_INFO_URL:BASE_URL+'/UserProfile/updateUserProfileInfo',
		USER_CREATE_URL:BASE_URL+'/User/create',

		
		
		
});

})();
