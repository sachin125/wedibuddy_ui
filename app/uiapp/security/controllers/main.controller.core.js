//main controller
(function() {

  'use strict';
   
  loginApp.controller('MainController', ['$location', '$log', '$q','$scope', MainController]);
  /**
   * Application Controller for the app App
   * @param $scope
   * @param $mdSidenav
   * @constructor
   */
  function MainController($location, $log, $q, $scope) {
    var self = this;
    
    $scope.go = function ( path ) {
	  $location.path( path );
	};
  }

})();
