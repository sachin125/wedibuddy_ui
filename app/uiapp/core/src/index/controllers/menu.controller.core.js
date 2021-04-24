(function() {
    'use strict';
    angular.module('app.core').controller('MenuController', MenuController);
    MenuController.$inject = ['$scope', 'menuService', 'GlobalValuesCore', '$filter', '$state', '$timeout'];

    function MenuController($scope, menuService, GlobalValuesCore, $filter, $state, $timeout) {
        var self = this;
        menuService.loadmenu().then(function(menus) {
            console.log("menu", menus);
            self.menus = [].concat(menus);
            GlobalValuesCore.menus = self.menus;
            if ($filter('HasValueFilterCore')(self.menus[0]) && ($scope.$currentStateName == 'dashboard.home' || $scope.$currentStateName == self.menus[0].href)){
				 $state.go(self.menus[0].href);
			}else if ($filter('HasValueFilterCore')(self.menus[0]) && $filter('HasValueFilterCore')(self.menus[0].childrens) && $filter('HasValueFilterCore')(self.menus[0].childrens[0])){
				 $state.go(self.menus[0].childrens[0].href);
			}else if ($filter('HasValueFilterCore')(self.menus[0]) && $filter('HasValueFilterCore')(self.menus[0].childrens) && $filter('HasValueFilterCore')(self.menus[0].childrens[0].childrens[0])){
				 $state.go(self.menus[0].childrens[0].childrens[0].href);
			}else if ($filter('HasValueFilterCore')(self.menus[0]) && $filter('HasValueFilterCore')(self.menus[0].childrens) && $filter('HasValueFilterCore')(self.menus[0].childrens[0].childrens[0].childrens[0])){ 	$state.go(self.menus[0].childrens[0].childrens[0].childrens[0].href);
			}
            $timeout(function() {
                (function($) {
                    if (jQuery('#menu')) {
                        jQuery('#menu').metisMenu({
                            toggle: false // disable the auto collapse. Default: true.
                        });
                    }
                    if (jQuery("#menuList")) {
                        jQuery("#menuList").mCustomScrollbar({
                            theme: "dark",
                            autoHideScrollbar: true
                        });
                    }
                    console.log("menusss", menus);
                })(jQuery);
            });
        });
    }
})();
