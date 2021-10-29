(function() {
    'use strict';
    angular.module('app.core').service('menuService', MenuService);
    MenuService.$inject = ['$q', '$translate', 'StatesConstantsCommon','StatesConstantsCore','$filter', '$rootScope', 'IndexServiceCore','GlobalConstantsCommon','GlobalValuesCore'];
    /**
     * Menu DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function MenuService($q, $translate, StatesConstantsCommon,StatesConstantsCore, $filter, $rootScope, IndexServiceCore, GlobalConstantsCommon,GlobalValuesCore) {
		//alert(5);
        var menu = [];
        var administration = "";
        
        var homeTab = {
            name: 'Home',
            icon: 'zmdi zmdi-home',
            href : StatesConstantsCore.HOME_VIEW
        };
        
        var dashboardHomeTab = {
            name: 'Dashboard',
            icon: 'zmdi zmdi-dashboard',
            href : StatesConstantsCommon.DASHBOARD_COMMON_STATE
        };
        
        var UserTab = {
            name: 'Girls/Boys',
            icon: 'zmdi zmdi-male-female',
            href : StatesConstantsCommon.GIRLSBOYS_STATE
        };
        
        var MyWish = {
            name: 'My Wish',
            icon: 'zmdi zmdi-eye',
            href : StatesConstantsCommon.MYWISH_STATE
        };
        
        var MyWish = {
            name: 'My Wish',
            icon: 'zmdi zmdi-eye',
            href : StatesConstantsCommon.MYWISH_STATE
        };
        
        var AboutCast = {
            name: 'About the cast',
            icon: 'zmdi zmdi-group-work',
            href : StatesConstantsCommon.ABOUTCAST
        };
        
        var AddAnotherUserTab = {
            name: 'Add User',
            icon: 'zmdi zmdi-male-female',
            href : StatesConstantsCommon.ADDUSER_STATE
        };
        
        var profileTab = {
            name: 'Profile',
            icon: 'zmdi zmdi-male-female',
            href : StatesConstantsCore.PROFILE
        };
        
        var photographerTab = {
            name: 'Photographer',
            icon: 'zmdi zmdi-male-female',
            href : StatesConstantsCommon.PHOTOGRAPHER
        };


        /*******************************************Administration Tab END************************************************/

        menu.push(homeTab);
        menu.push(dashboardHomeTab);
        menu.push(UserTab);
        menu.push(MyWish);
        //menu.push(AboutCast);
       // menu.push(AddAnotherUserTab);
        menu.push(profileTab);
       // menu.push(photographerTab);

      /********** funtion to show menu option for all admin****************/
		function showAdministration() {
            if (is_admin) {
                $rootScope.showAdministrationPanel = true;
                return $rootScope.showAdministrationPanel;
            }
        }

        // Promise-based API
        return {
            // function to show all menu option available
            loadmenu: function() {
                // Simulate async nature of real remote calls
                var deferred = $q.defer();
                setTimeout(function() {
                    deferred.resolve(menu);
                }, 1000);
                return deferred.promise;
            },
            // function to load menu for admin
            loadadminmenu: function() {
             
            }
        };
}})();
