(function() {
    'use strict';
    angular.module('app.core').config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider', 'StatesConstantsCore', 'TemplatesConstantsCore', 'UrlConstantsCore', 'GlobalValuesCore', 'GlobalConstantsCore', '$translateProvider'];

    function config($stateProvider, $urlRouterProvider, StatesConstantsCore, TemplatesConstantsCore, UrlConstantsCore, GlobalValuesCore, GlobalConstantsCore, $translateProvider) {
        // For any unmatched url, redirect to /dashboard
       // alert(3);
        $urlRouterProvider.otherwise("dashboard/home");
        $stateProvider.state(StatesConstantsCore.DASHBOARD, {
                url: "/dashboard",
                abstract: true,
                templateUrl: TemplatesConstantsCore.MAIN_CORE_HTML,
				controller: 'DashboardControllerCore as DBApp',
				 data: {
				  parent: 'Dashboard'
				},
                resolve: {
                    breadcumb: function() {
                        return ['Dashboard'];
                    },
                    getUserContext: function($http, $q, ServiceCore, $filter, IndexServiceCore, $translate) {
						var defer = $q.defer();
                        var url = UrlConstantsCore.USER_CONTEXT_URL;
                        $http.get(url).then(function(response) {
							console.log('getUserContext::: ',response);
                            if ($filter('HasValueFilterCore')(response.data)){
								var responsedata = response.data;
								var user = responsedata.userInContextWrapper;
								GlobalValuesCore.LOGIN_USER_WRAPPER = responsedata;
								GlobalValuesCore.USER_CONTEXT = user;
								console.log('GlobalValuesCore.USER_CONTEXT::: ',GlobalValuesCore.USER_CONTEXT);
								if($filter('HasValueFilterCore')(user.userConfig)) {
									if ($filter('HasValueFilterCore')(user.userConfig.userLanguage)) {
										$translate.use(user.userConfig.userLanguage);
									} else {
										$translate.use('en');
									}
									if ($filter('HasValueFilterCore')(user.userConfig.initialLimitPerPage)) {
										GlobalConstantsCore.INITIAL_LIMIT_PER_PAGE = user.userConfig.initialLimitPerPage;
									} else {
										GlobalConstantsCore.INITIAL_LIMIT_PER_PAGE = 10;
									}
									if ($filter('HasValueFilterCore')(user.userConfig.timeRegion)) {
										GlobalConstantsCore.INITIAL_TIME_ZONE = user.userConfig.timeRegion;
									} else {
										GlobalConstantsCore.INITIAL_TIME_ZONE = "Asia/Kolkata";
									}
									if ($filter('HasValueFilterCore')(user.userConfig.dateFormat)) {
										GlobalConstantsCore.USERCONFIG_DATE_FORMAT = $filter("getDateFormatByNameFilterCore")(user.userConfig.dateFormat);
									} else {
										GlobalConstantsCore.USERCONFIG_DATE_FORMAT = "MM-DD-YYYY";
									}
                                }
							}
                            defer.resolve(response);
                        }, function(errResponse) {
                            defer.reject(errResponse);
                        });
                        return defer.promise;
                    },
                    //~ getAllRoles: function($http, $q) {
						//~ var defer = $q.defer();
                        //~ var url = UrlConstantsCore.GET_ALL_ROLES_URL;
                        //~ $http.get(url).then(function(response) {
							//~ console.log('getAllRoles::: ',response);
                            //~ GlobalValuesCore.ALL_ROLES = response.data;
                            //~ defer.resolve(response);
                        //~ }, function(errResponse) {
                            //~ defer.reject(errResponse);
                        //~ });
                        //~ return defer.promise;
                    //~ },
                    //~ getUserRoleInContext: function($http, $q) {
                        //~ var defer = $q.defer();
                        //~ var url = UrlConstantsCore.USER_ROLE_IN_CONTEXT_URL;
                        //~ $http.get(url).then(function(response) {
							//~ console.log('getUserRoleInContext::: ',response);
                            //~ GlobalValuesCore.CURRENT_ROLE_DETAIL = response.data;
                            //~ defer.resolve(response);
                        //~ }, function(errResponse) {
                            //~ defer.reject(errResponse);
                        //~ });
                        //~ return defer.promise;
                    //~ }
                }
            })
            //Don't use this routing
           .state('dashboard.home', {
        url: "/home",
        templateUrl: "../app/uiapp/core/src/index/views/index.core.html",
        controller: 'DashboardControllerCore as ctrl',
        data: {
          parent: 'Dashboard'
        },
        resolve: {
          breadcumb: function() {
            return ['Dashboard'];
          }
        }
      }) 
       .state(StatesConstantsCore.pageNotFound, {
        url: "/pageNotFound",
        templateUrl: TemplatesConstantsCore.ERROR_404_HTML,
         controller: 'errorFormControllerCore'
      })
      .state(StatesConstantsCore.InternalServerError, {
        url: "/internalserverError",
        templateUrl: TemplatesConstantsCore.ERROR_500_HTML,
          controller: 'errorFormControllerCore'
      })
      .state(StatesConstantsCore.HOME_VIEW, {
        url: "/home_view",
        templateUrl: TemplatesConstantsCore.HOME_VIEW_TEMPLATE,
        controller: 'HomeControllerCore',
        activetab: StatesConstantsCore.HOME_VIEW,
          data: {
          parent: StatesConstantsCore.HOME_VIEW,
        },
        resolve: {
		  breadcumb: function() {
			return ['HOme_view'];
		  }
        }
        }).state(StatesConstantsCore.PROFILE, {
        url: "/profile",
        templateUrl: TemplatesConstantsCore.PROFILE_CORE_HTML,
        controller: 'ProfileControllerCore',
        activetab: StatesConstantsCore.PROFILE,
          data: {
          parent: StatesConstantsCore.PROFILE,
        },
        resolve: {
			DataById: function ($stateParams,UrlConstantsCore,IndexServiceCore){
				var username = 'sachingupta125@gmail.com';//GlobalValuesCore.USER_CONTEXT.username;
				//~ if($filter('HasValueFilterCore')($stateParams.username)){
					//~ username=$stateParams.username;
				//~ }
				var url = UrlConstantsCore.USER_PROFILE_URL+"/"+username;
				console.log('StatesConstantsCore.PROFILE url: ',url);
				var promise = IndexServiceCore.sendGETRequest(url);
				return promise;
			},
		  breadcumb: function() {
			return ['Profile'];
		  }
        }
      })
      .state(StatesConstantsCore.editProfile, {
        url: "/editprofile/:username",
        templateUrl: TemplatesConstantsCore.EDIT_PROFILE_CORE_HTML,
        controller: 'ProfileControllerCore',
        activetab: StatesConstantsCore.PROFILE,
        data: {
          parent: StatesConstantsCore.PROFILE,
        },
        resolve: {
			DataById: function ($stateParams,UrlConstantsCore,IndexServiceCore){
				var url = UrlConstantsCore.USER_PROFILE_URL+"/"+$stateParams.username;
				var promise = IndexServiceCore.sendGETRequest(url);
				return promise;
			},
		  breadcumb: function() {
			return ['Profile'];
		  }
        }
      })  
            
           
            
        $translateProvider.useStaticFilesLoader({
            prefix: '../app/assets/l10n/',
            suffix: '.json'
        });
    }
})();
