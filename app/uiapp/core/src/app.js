(function() {
    'use strict';
    angular.module('app', ['app.core', 'app.common']);
    angular.module('app').config(config);
    config.$inject = ['$mdThemingProvider', '$mdDateLocaleProvider', '$translateProvider', 'GlobalConstantsCore', '$logProvider'];

    function config($mdThemingProvider, $mdDateLocaleProvider, $translateProvider, GlobalConstantsCore, $logProvider) {
        $logProvider.debugEnabled(true);
        $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('light-blue');
	   // $mdThemingProvider.theme('defaultdark').primaryPalette('blue').accentPalette('light-blue').dark();
	   // $mdThemingProvider.theme('docs-dark', 'default').primaryPalette('yellow').dark();
        $translateProvider.preferredLanguage('en');
        $translateProvider.useCookieStorage();
      //  alert(1);
      
      $mdDateLocaleProvider.formatDate = function(date) {
      return date ? moment(date).format('L') : '';
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
      var m = moment(dateString, 'L', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
    };
      
    }
    
    angular.module('app').run(runConfig);
    runConfig.$inject = ['$rootScope', '$timeout', '$window', '$state', '$stateParams', '$http', '$q', '$location'];

    function runConfig($rootScope, $timeout, $window, $state, $stateParams, $http, $q, $location) {
        var location = $location.$$url;
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            jQuery("#ui-view").html("");
            jQuery(".page-loading").removeClass("hide");
        });
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            jQuery(".page-loading").addClass("hide");
            $rootScope.$currentStateData = toState.data;
            $rootScope.$currentStateName = toState.name;
            $rootScope.$previousStateName = fromState.name;
            $rootScope.$previousStateData = fromState.data;
            $rootScope.$previousStateParam = fromParams;
            $rootScope.currentactivetab = toState.data.parent;
            if ($rootScope.isClickedOnbutton) {
                $rootScope.isClickedOnbutton = false;
            } else {
                $rootScope.ngValue = false;
            }
            var page = angular.element($window);
        });
        //alert(2);
    }
})();
