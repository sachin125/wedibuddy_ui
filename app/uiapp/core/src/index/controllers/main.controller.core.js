(function(){
'use strict';

angular.module('app.core').controller('MainController', MainController);

    MainController.$inject = ['$window','$scope', '$filter','UrlConstantsCore','IndexServiceCore','$state','StatesConstantsCore'];

    function MainController($window,$scope, $filter,UrlConstantsCore,IndexServiceCore,$state,StatesConstantsCore) {
		
		$scope.logout = function() {
			var url=UrlConstantsCore.LOGOUT_URL;
			var promise = IndexServiceCore.sendPOSTRequest(url,'');
			promise.then(function(res) {
				$window.location.reload();
			});		
        };
        
        
        $scope.gotoProfile = function() {
			$state.go(StatesConstantsCore.PROFILE);
        };
        
        $scope.gotoChangePassword = function() {
			var URL = "../jsp/change_password.jsp";
			window.open( URL, "_blank" );
        };
        
	}
})();
