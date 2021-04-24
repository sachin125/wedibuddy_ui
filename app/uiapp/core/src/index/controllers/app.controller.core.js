(function() {
    'use strict';
    angular.module('app.core').controller('AppControllerCore', AppControllerCore);
    AppControllerCore.$inject = ['$mdSidenav', '$translate', '$mdMedia', '$location', '$document', '$mdUtil', '$mdBottomSheet', '$scope', '$rootScope', '$log', '$q', 'StatesConstantsCommon', 'IndexServiceCore', 'GlobalValuesCore', 'EventConstantsCore', 'TemplatesConstantsCore', 'GlobalConstantsCore', '$filter', 'UrlConstantsCommon', '$timeout', '$state','StatesConstantsCore'];

    function AppControllerCore($mdSidenav, $translate, $mdMedia, $location, $document, $mdUtil, $mdBottomSheet, $scope, $rootScope, $log, $q, StatesConstantsCommon, IndexServiceCore, GlobalValuesCore, EventConstantsCore, TemplatesConstantsCore, GlobalConstantsCore, $filter, UrlConstantsCommon, $timeout, $state,StatesConstantsCore) {
        var self = this;
        self.menus = [];
        self.menuToggle = menuToggle;
        self.changePreferenceDailog = changePreferenceDailog;
        
        self.adminmenus = [];
        self.isActive = siteNavActive;
        self.openSideNav = openSideNav;
        self.closeSideNav = closeSideNav;
        self.isOpen = false;
        self.openNav = openNav;
        self.logout = logout;
        self.upperToolbar = true;
        self.isFullScreen = false;
        self.fullScreenIcon = 'zmdi zmdi-fullscreen';
        self.toggleFullScreenForToolbarSideNav = toggleFullScreenForToolbarSideNav;
        self.toggleFullScreen = toggleFullScreen;
        self.is_admin_user = false;
        self.feedbackClicked = false;
        if (is_admin) {
            self.is_admin_user = true;
        }
        self.toggleNotificationsTab = toggleNotificationsTab;
        $rootScope.breadcumb = [] /*["Home"]*/ ;
        $scope.globalSearchBox = TemplatesConstantsCore.GLOBAL_SEARCH_BOX;
        $scope.setLang = function(langKey) {
            // You can change the language during runtime
            $translate.use(langKey);
        };
        $scope.$watch(function() {
            return $mdMedia('gt-md');
        }, function(open) {
            self.isOpen = open;
        });

        function menuToggle(menu) {
            if (menu.childrenhidden) {
                menu.childrenhidden = false;
            } else {
                menu.childrenhidden = true;
            }
        }
        $rootScope.$on("CloseSideNavBar", function() {
            closeSideNav();
        });
        $rootScope.$on("openSideNavBar", function() {
            openSideNav();
        });
        // *********************************
        // Internal methods
        // *********************************
        function siteNavActive(viewLocation) {
            return viewLocation.replace('#', '') === $location.path();
        }

        function openSideNav() {
            var pending = $mdBottomSheet.hide() || $q.when(true);
            pending.then(function() {
                self.isOpen = $mdMedia('gt-md');
                $mdSidenav('leftsidenav').open();
                $rootScope.$broadcast(EventConstantsCore.leftsidenavToggle);
            });
        }

        function closeSideNav() {
            var pending = $mdBottomSheet.hide() || $q.when(true);
            pending.then(function() {
                self.isOpen = false;
                $mdSidenav('leftsidenav').close();
                $rootScope.$broadcast(EventConstantsCore.leftsidenavToggle);
            });
        }

        function logout() {
            $rootScope.$broadcast('videoCallEndOnLogout', "");
            angular.element(document.getElementById('logoutform').submit());
        }

        function openNav(navID) {
            $mdUtil.debounce(function() {
                $mdSidenav(navID).toggle();
            }, 300)();
        }

        function toggleFullScreen() {
            self.isFullScreen = !self.isFullScreen;
            self.fullScreenIcon = self.isFullScreen ? 'zmdi zmdi-fullscreen-exit' : 'zmdi zmdi-fullscreen';
            // more info here: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
            var doc = $document[0];
            if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                if (doc.documentElement.requestFullscreen) {
                    doc.documentElement.requestFullscreen();
                } else if (doc.documentElement.msRequestFullscreen) {
                    doc.documentElement.msRequestFullscreen();
                } else if (doc.documentElement.mozRequestFullScreen) {
                    doc.documentElement.mozRequestFullScreen();
                } else if (doc.documentElement.webkitRequestFullscreen) {
                    doc.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (doc.exitFullscreen) {
                    doc.exitFullscreen();
                } else if (doc.msExitFullscreen) {
                    doc.msExitFullscreen();
                } else if (doc.mozCancelFullScreen) {
                    doc.mozCancelFullScreen();
                } else if (doc.webkitExitFullscreen) {
                    doc.webkitExitFullscreen();
                }
            }
        }
        $scope.globalQuerySearch = function(query) {
            var results;
            results = [];
            var fiqlQuery;
            if ($filter("HasValueFilterCore")(query)) {
                var n = query;
                query = query.trim();
                $scope.searchTextNew = query;
                $scope.searchType = "sites";
                var fiqlSolrQuery = UrlConstantsCommon.GET_GLOBAL_SOLR_SEARCH_URL + query;
                IndexServiceCore.sendPOSTRequest(fiqlSolrQuery, query).then(function(res) {
                    results = _.groupBy(res, "pojoName");
                    $scope.mathDataForSolr = res;
                    $scope.searchSite = "";
                });
            } else {
                $scope.message = "";
                results = [];
            }
            if (true) {
                var deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve(results);
                }, 2 * 500, false);
                return deferred.promise;
            } else {
                return results;
            }
        };

        function toggleNotificationsTab(tab) {
            $rootScope.$broadcast('switchNotificationTab', tab);
            self.openNav('notifications');
        }
        /*
         * function use for collaboration to open collaboration tab and 
         * run the searchComment function
         * */
        $scope.toggleNotificationsTabForCollaboration = function(tab) {
            $rootScope.$broadcast('switchNotificationTab', tab);
            self.openNav('notifications');
        };

        function changePreferenceDailog(ev) {
            IndexServiceCore.openModelDialog(ev, 'ChangePreferenceControllerCore', TemplatesConstantsCore.CHANGE_PREFERENCE_MODAL);
        }


        $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
            $scope.previousState = from.name;
            $scope.currentState = to.name;
            $scope.previousStateParams = fromParams;
            $scope.currentStateParams = toParams;
        });
        $scope.$on(EventConstantsCore.GO_TO_PREVIEVIOUS_STATE, function(ev, data) {
            $state.go($scope.previousState, $scope.previousStateParams);
        });
        /* detect esc key press event and broadcast */
        jQuery(document).on('keyup', function(evt) {
            if (evt.keyCode == 27) {
                $scope.$broadcast('ev:Esc_key_press', {});
            }
        });

        function toggleFullScreenForToolbarSideNav() {
            self.upperToolbar = !self.upperToolbar;
            self.isFullScreen = !self.isFullScreen;
            self.fullScreenIcon = self.isFullScreen ? 'zmdi zmdi-fullscreen-exit' : 'zmdi zmdi-fullscreen';
            // more info here: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
            var doc = $document[0];
            if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                closeSideNav();
                if (doc.documentElement.requestFullscreen) {
                    doc.documentElement.requestFullscreen();
                } else if (doc.documentElement.msRequestFullscreen) {
                    doc.documentElement.msRequestFullscreen();
                } else if (doc.documentElement.mozRequestFullScreen) {
                    doc.documentElement.mozRequestFullScreen();
                } else if (doc.documentElement.webkitRequestFullscreen) {
                    doc.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                openSideNav();
                if (doc.exitFullscreen) {
                    doc.exitFullscreen();
                } else if (doc.msExitFullscreen) {
                    doc.msExitFullscreen();
                } else if (doc.mozCancelFullScreen) {
                    doc.mozCancelFullScreen();
                } else if (doc.webkitExitFullscreen) {
                    doc.webkitExitFullscreen();
                }
            }
        }
    }
})();
