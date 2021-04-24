
angular.module('app.core').controller('errorFormControllerCore', ['$scope', '$mdDialog', 'Notification', '$rootScope', '$filter','$state', function errorFormControllerCore($scope, $mdDialog, Notification, $rootScope, $filter,$state) {
	 
	   $scope.GoBackonMenuPage = function(){
		  $state.go($rootScope.$beforeErrorStateName, {}, {reload: $rootScope.$beforeErrorStateName});		
		};
	
	}]);
