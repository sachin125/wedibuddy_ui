//For Forgot Password
(function() {

  'use strict';
   
  loginApp.controller('ForgotPasswordController', ['$location', '$log', '$q','$scope', '$http', ForgotPasswordController]);
  /**
   * Application Controller for the App
   * @param $scope
   * @param $mdSidenav
   * @constructor
   */
  function ForgotPasswordController($location, $log, $q, $scope, $http) {
    var self = this;

	$scope.backToLogin = function ( ) {
			$location.url("/login");
			};
		
	$scope.submitForm = function(isValid) {
		if(isValid){
			var url = context + "/rest/unauthorize/forgetPassword/";
			url+="?username="+$scope.forgotpassword.username;
			
			$scope.loginErrorMsg = "Wait...";
			$http.post(url,"")
			.then(function(response){
					
					$scope.loginErrorMsg = "Reset password email has been sent successfully to your registered email.";
				},function(errResponse){
					$scope.loginErrorMsg = "Try again!";
				});
		}
		return false;
	};	
  }
})();
