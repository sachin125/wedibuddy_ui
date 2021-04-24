(function() {
'use strict';

angular.module('app.core')
	.constant('TemplatesConstantsCore', {
	
		MAIN_CORE_HTML : buildAppPath+'app/uiapp/core/src/index/views/main.core.html',
		MENU_TEMPLATE: buildAppPath+'app/uiapp/core/src/index/views/menu.core.html',
		HOME_VIEW_TEMPLATE: buildAppPath+'app/uiapp/core/src/home/views/home.core.html',
		ABOUT_US: buildAppPath+'/app/uiapp/core/src/index/views/aboutUs.core.html',
		NOTIFICATION_TEMPLATE : buildAppPath+'app/uiapp/common/src/notificationpanel/views/notificationpanel.common.tmpl.html',
		TASK_NOTIFICATION_TEMPLATE : buildAppPath+'app/uiapp/ftr/src/dashboard/views/notification/notification.ftr.html',
		TASK_NOTIFICATION_TEMPLATE_MTR : buildAppPath+'app/uiapp/mtr/src/dashboard/views/notification/notification.mtr.html',
		ERROR_404_HTML:context+'/app/uiapp/core/src/index/views/error/error_404.html',
	    ERROR_500_HTML:context+'/app/uiapp/core/src/index/views/error/error_500.html',
		CHANGE_PREFERENCE_MODAL : context+'/app/uiapp/core/src/index/views/changePreference.core.html',
		GLOBAL_SEARCH_BOX : context+'/app/uiapp/core/src/index/views/globalsearch.core.html',
		NO_TICKET_IMAGE : context+'/app/assets/img/map/no_issues.png',
		NO_DATA_IMAGE : context+'/app/assets/img/map/no_data.png',
		PROFILE_CORE_HTML: context+'/app/uiapp/core/src/profile/views/profile.common.html',
		EDIT_PROFILE_CORE_HTML: context+'/app/uiapp/core/src/profile/views/editprofile.common.html',
		
});
})();

