(function() {
    'use strict';
    angular.module('app.common').controller('NotificationPanelControllerCommon', ['$rootScope', '$scope', '$http', '$mdSidenav', '$state', 'Notification', '$window', '$timeout', 'GlobalConstantsCore', '$filter', '$sce', '$mdDialog', 'HomeServiceCore', 'UrlConstantsCommon', '$mdUtil', '$mdMedia', 'GlobalValuesCore', 'TemplatesConstantsCommon', NotificationPanelControllerCommon]); /* @ngInject */
    function NotificationPanelControllerCommon($rootScope, $scope, $http, $mdSidenav, $state, UsermgmtServiceCommon, Notification, $window, $timeout, GlobalConstantsCore, $filter, $sce, $mdDialog, HomeServiceCore, UrlConstantsCommon, $mdUtil, $mdMedia, GlobalValuesCore, StatesConstantsFtr, TemplatesConstantsCommon) {
        var vm = this;
        vm.close = close;
        vm.currentTab = 0;
        $scope.clearPreviousData = function() {
            $rootScope.$emit('clearPreviousFiles');
        };
        vm.currentConnectedUser = {};
        $scope.currentUserRoleList = [];
       
        $scope.$on('switchNotificationTab', function($event, tab) {
            vm.currentTab = tab;
        });

        function close() {
            $mdSidenav('notifications').close();
        }        
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        $scope.isOnCurrentTab = true;
        //~ angular.element($window).bind('focus', function() {
            //~ $scope.isOnCurrentTab = true;
        //~ }).bind('blur', function() {
            //~ $scope.isOnCurrentTab = false;
        //~ });
        $scope.showNotification = function(message) {
            if (!$scope.isOnCurrentTab) {}
        };
    }
})();
