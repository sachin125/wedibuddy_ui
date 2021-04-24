(function() {
    'use strict';
    angular.module('app.core').controller('DashboardControllerCore', DashboardControllerCore);
    DashboardControllerCore.$inject = ['menuService', '$mdSidenav', '$mdMedia', '$location', '$mdBottomSheet', '$scope', '$rootScope', '$log', '$q', '$http', '$window', '$state', '$timeout', 'TemplatesConstantsCore', '$filter', 'GlobalValuesCore', 'StatesConstantsCommon', 'TemplatesConstantsCommon','StatesConstantsCore'];

    function DashboardControllerCore(menuService, $mdSidenav, $mdMedia, $location, $mdBottomSheet, $scope, $rootScope, $log, $q, $http, $window, $state, $timeout, TemplatesConstantsCore, $filter, GlobalValuesCore, StatesConstantsCommon, TemplatesConstantsCommon,StatesConstantsCore) {
        //alert(6);
        var self = this;
        self.menus = [];
        self.adminMenus = [];
        self.matMenus = [];
        self.contextUser = {};
        $scope.currentUser = GlobalValuesCore.USER_CONTEXT;
        var LOGIN_USER_WRAPPER = GlobalValuesCore.LOGIN_USER_WRAPPER;
        var userFeatureWrapperList = LOGIN_USER_WRAPPER.userFeatureWrapperList;
        if($filter('HasValueFilterCore')(userFeatureWrapperList)){
			alert('pending task');
		}
        var bookmark;
        $scope.menuPageTemplate = TemplatesConstantsCore.MENU_TEMPLATE;
		$scope.notificationTemplate = TemplatesConstantsCore.NOTIFICATION_TEMPLATE;
        self.contextUser = GlobalValuesCore.USER_CONTEXT;
        $rootScope.$on('updateuserprofile', function(ev, data) {
            self.contextUser = data;
            GlobalValuesCore.USER_CONTEXT = data;
            $scope.userProfileImage = context + $filter('HtmlDecodeFilterCore')(GlobalValuesCore.USER_CONTEXT.profileImageAttach.filePath);
        });
        $scope.userId = GlobalValuesCore.USER_CONTEXT.userid;
        if ($filter('HasValueFilterCore')(GlobalValuesCore.USER_CONTEXT.profileImageAttach)) {
            $scope.userProfileImage = context + $filter('HtmlDecodeFilterCore')(GlobalValuesCore.USER_CONTEXT.profileImageAttach.filePath);
        } else {
            $scope.userProfileImage = '../app/assets/img/user.jpg';
        }
       
       $scope.goToProfile = function(){
		   var username = GlobalValuesCore.USER_CONTEXT.username;
		   $state.go(StatesConstantsCore.profile, {username:username});
		};
       
       var originatorEv;
		$scope.openMenu = function($mdMenu, ev) {
		  originatorEv = ev;
		  $mdMenu.open(ev);
		};
		
		
    }
})();
