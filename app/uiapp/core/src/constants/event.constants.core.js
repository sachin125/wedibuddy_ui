(function() {
'use strict';

angular.module('app.core')
	.constant('EventConstantsCore', {
	
		LEFT_SIDE_NAV_TOGGLE : "leftsidenavToggle",
		GO_TO_PREVIEVIOUS_STATE : 'ev:goPreviousState',
		
		/****Frontier Events****/
		GET_ALL_PROJECT_LIST_FTR_EVENT : "getAllProjectList",
		GET_BACK_FROM_DOCUMENT_FTR_EVENT : "getBackFromDocument",
		GET_SITE_PERMIT_DETAIL_INFO_FTR_EVENT : "getSitePermitDetailInfo",
		GET_SITE_POWER_DETAIL_INFO_FTR_EVENT : "getSitePowerDetailInfo",
		GET_UPDATE_FILES_FTR_EVENT : "getUpdatedFiles",
		OPEN_TAB_FTR_EVENT : "openTab",
		
});

})();
