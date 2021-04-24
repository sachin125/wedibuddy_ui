(function() {
   'use strict';
   
   
   angular.module('app.common')
   .config(config);

   config.$inject = ['$stateProvider', '$urlRouterProvider', 'StatesConstantsCommon', 'TemplatesConstantsCommon', 'UrlConstantsCommon'];


function config($stateProvider, $urlRouterProvider, StatesConstantsCommon, TemplatesConstantsCommon, UrlConstantsCommon) {

    $stateProvider
     //Test Don't use this routing
      .state('dashboard.test1', {
        url: "/home",
        templateUrl: "../app/uiapp/core/src/home/views/home.core.html",
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
      .state(StatesConstantsCommon.DASHBOARD_COMMON_STATE, {
        url: "/dashboardCommon",
        templateUrl: TemplatesConstantsCommon.DASHBOARD_COMMON_HTML,
        controller: 'DashoardControllerCommon as ctrl',
        activetab: StatesConstantsCommon.DASHBOARD_COMMON_STATE,
        data: {
          parent: StatesConstantsCommon.DASHBOARD_COMMON_STATE,
        },
        resolve: {
			breadcumb: function($stateParams) {
				return ['Home'];
			  }
			}
		})
	.state(StatesConstantsCommon.BRIDGEGROOM_STATE, {
        url: "/bridgegroom",
        templateUrl: TemplatesConstantsCommon.BRIDGE_GROOM_HTML,
        controller: 'BridgeGroomController as ctrl',
        activetab: StatesConstantsCommon.BRIDGEGROOM_STATE,
        data: {
          parent: StatesConstantsCommon.BRIDGEGROOM_STATE,
        },
        resolve: {
			breadcumb: function($stateParams) {
				return ['Bridge/Groom'];
			  }
			}
		})
		.state(StatesConstantsCommon.MYWISH_STATE, {
        url: "/wish",
        templateUrl: TemplatesConstantsCommon.WISH_LIST_HTML,
        controller: 'WishController as ctrl',
        activetab: StatesConstantsCommon.MYWISH_STATE,
        data: {
          parent: StatesConstantsCommon.MYWISH_STATE,
        },
        resolve: {
			breadcumb: function($stateParams) {
				return ['My Wish'];
			  }
			}
		})
		.state(StatesConstantsCommon.ABOUTCAST, {
        url: "/wish",
        templateUrl: TemplatesConstantsCommon.ABOUTCAST_HTML,
        controller: 'AboutCastControllerCommon as ctrl',
        activetab: StatesConstantsCommon.ABOUTCAST,
        data: {
          parent: StatesConstantsCommon.ABOUTCAST,
        },
        resolve: {
			breadcumb: function($stateParams) {
				return ['About Cast'];
			  }
			}
		})
		.state(StatesConstantsCommon.ADDUSER_STATE, {
        url: "/addUser",
        templateUrl: TemplatesConstantsCommon.ADD_ANOTHER_USER_HTML,
        controller: 'AddProfileControllerCommon as ctrl',
        activetab: StatesConstantsCommon.ADDUSER_STATE,
        data: {
          parent: StatesConstantsCommon.ADDUSER_STATE,
        },
        resolve: {
			breadcumb: function($stateParams) {
				return ['Add User'];
			  }
			}
		})
		.state(StatesConstantsCommon.PHOTOGRAPHER, {
        url: "/addUser",
        templateUrl: TemplatesConstantsCommon.PHOTOGRAPHER_LIST_HTML,
        controller: 'PhotographerControllerCommon as ctrl',
        activetab: StatesConstantsCommon.PHOTOGRAPHER,
        data: {
          parent: StatesConstantsCommon.PHOTOGRAPHER,
        },
        resolve: {
			breadcumb: function($stateParams) {
				return ['Photographer'];
			  }
			}
		})
      ;
   
}})();
