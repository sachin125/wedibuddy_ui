(function() {
'use strict';

var BASE_URL = context+"/rest";
angular.module('app.common')
	.constant('UrlConstantsCommon', {
		
		USER_SEARCH_URL:BASE_URL+'/User/search',
		USER_FILTER_URL:BASE_URL+'/User/filter',
		USERPROFILE_FILTER_URL:BASE_URL+'/UserProfile/filter',
		WISH_CREATE_URL:BASE_URL+'/Wish/create',
		WISH_UPDATE_URL:BASE_URL+'/Wish/update',
		WISH_DELETE_URL:BASE_URL+'/Wish/delete',
		WISH_SEARCH_URL:BASE_URL+'/Wish/search',
		WISH_SEARCHCOUNT_URL:BASE_URL+'/Wish/searchCount',
		WISH_ADD_TO_WISH_URL:BASE_URL+'/Wish/addToWish',
		countByEducationLevelUsingGroupBy:BASE_URL+'/Dashboard/countByEducationLevelUsingGroupBy',
		countByEducationCoursenameUsingGroupBy:BASE_URL+'/Dashboard/countByEducationCoursenameUsingGroupBy',

	});

})();

