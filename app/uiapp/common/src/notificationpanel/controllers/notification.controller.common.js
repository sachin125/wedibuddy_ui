(function() {
    'use strict';
    angular.module('app.common').controller('NotificationControllerCommon', NotificationControllerCommon);
    NotificationControllerCommon.$inject = [
        '$scope',
        '$rootScope',
        '$log',
        '$q',
        '$http',
        '$timeout',
        '$filter',
        'GlobalValuesCore',
        '$interval',
        'IndexServiceCore',
        'UrlConstantsCommon',
        'Notification',
        'GlobalConstantsCore',
        'TemplatesConstantsCommon',
        '$mdMedia',
        '$mdDialog',
        'StatesConstantsCommon',
        '$state',
        'ServiceCore'
    ];

    function NotificationControllerCommon($scope, $rootScope, $log, $q, $http, $timeout, $filter, GlobalValuesCore, $interval, IndexServiceCore, UrlConstantsCommon,Notification,GlobalConstantsCore,TemplatesConstantsCommon,$mdMedia,$mdDialog,StatesConstantsCommon,$state,ServiceCore) {
        $scope.ngshowvalue = false;
        $scope.ngshowvalueForCollab = false;
        $scope.ngshowvalueForProject = false;
        $scope.ngshowvalueForSite = false;
        $rootScope.ngValue = false;
        $scope.totalNotificationCount = 0;
        $rootScope.isClickedOnbutton = false;
        $scope.hideNotificationDiv = function() {
			if($rootScope.isClickedOnbutton){
				$rootScope.ngValue = true;
				$rootScope.isClickedOnbutton = false;
			}else{
				$rootScope.ngValue = false;
			}
		};
        $scope.getNotificationCount = function() {
            $scope.totalNotificationCount = 0;
        };
        $scope.getNotificationCount();
        $scope.ngprogressvalue = true;

        $scope.cancelNotificationDailog = function(){
			$mdDialog.hide();
		};
         
    }
}());
