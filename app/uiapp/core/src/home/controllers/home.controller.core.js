(function() {
    'use strict';
    angular.module('app.core').controller('HomeControllerCore', HomeControllerCore);
    HomeControllerCore.$inject = [ '$translate','$scope', '$rootScope', 'StatesConstantsCommon', 'GlobalValuesCore', 'TemplatesConstantsCore', 'GlobalConstantsCore', '$filter', 'UrlConstantsCommon', '$timeout', '$state','breadcumb','StatesConstantsCore'];

    function HomeControllerCore($translate, $scope, $rootScope,StatesConstantsCommon, GlobalValuesCore, TemplatesConstantsCore, GlobalConstantsCore, $filter, UrlConstantsCommon, $timeout, $state,breadcumb,StatesConstantsCore) {
        var self = this;
        $rootScope.breadcumb = breadcumb;
        var originatorEv;
        var currentUser = GlobalValuesCore.USER_CONTEXT;
        $scope.openTableMenu = function($mdOpenMenu, ev) {
		  originatorEv = ev;
		  $mdOpenMenu(ev);
		};
        

        
    }
})();
