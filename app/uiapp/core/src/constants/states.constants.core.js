(function() {
'use strict';

angular.module('app.core')
	.constant('StatesConstantsCore', {
	
		DASHBOARD : 'dashboard',
		HOME : 'home',
		HOME_VIEW : 'dashboard.ome_view',
		InternalServerError: 'dashboard.InternalServerError',
	    pageNotFound: 'dashboard.pageNotFound',
	    PROFILE: 'dashboard.profile',
	    editProfile: 'dashboard.editProfile',

		
});
})();

