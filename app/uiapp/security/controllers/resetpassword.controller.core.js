// For Reset Password
(function() {

  'use strict';

  loginApp.controller('ResetPasswordController', ['$location', '$log', '$q','$scope','$http','$base64','$mdToast', '$filter',ResetPasswordController]);
  /**
   * Application Controller for the App
   * @param $scope
   * @param $mdSidenav
   * @constructor
   */
  function ResetPasswordController($location, $log, $q, $scope,$http,$base64,$mdToast,$filter) {
    var self = this;
    var userId="";
    var activation="";
    if ( $location.search().hasOwnProperty( 'id' ) &&   $location.search().hasOwnProperty( 'activationCode' )) {
     userId = $location.search().id;
     activation = $location.search().activationCode;
    }
    
	$scope.submitForm = function(isValid) {
		if(isValid){
		if($scope.newpassword_onscreen==$scope.confirmpassword_onscreen){
			if(!$scope.invalidFormName){
		var newpassword=$base64.encode($scope.newpassword_onscreen);
			var url = context + "/rest/unauthorize/resetPasswordForm/";
			url+="?userid="+userId+"&password="+newpassword+"&activation="+activation;
			//$scope.resetErrorMsg = "Wait...";
			$http.post(url,"")
			.then(function(response){
				  
				    if(response.status === 200){
						if(response.data.status=="success"){
							$location.url("/login");
							$scope.showSimpleToast("Password Changed Successfully",'success-toast');
							return false;
						}
						else if(response.data.status=="failure"){
							$scope.showSimpleToast("There is a problem in reset password",'error-toast');
							return false;
						}else{
					$scope.showSimpleToast(response.data.status,'error-toast');
				    }
					}
						
				},function(errResponse){
					$scope.resetErrorMsg = "Try again!";
				});
	}
	}else{
		 $scope.resetErrorMsg = "Password and confirm password should match";
	}
}
	};
	
	var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

    
     $scope.showSimpleToast = function(msg,theme) {
    
  $scope.toastPosition = angular.extend({},last);
  var pinTo = $scope.getToastPosition();
   $mdToast.show(
      $mdToast.simple()
        .textContent(msg)
        .position(pinTo )
        .theme(theme)
        .hideDelay(3000)
    );

  };
  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };
  
    function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }
  
 $scope.validatePassword = function(isValid) {
		$scope.invalidMsg=[];
     if (isValid) {
	var pwd=$scope.newpassword_onscreen;
   
            if (!pwd.match(/[0-9]/) ){
    $scope.invalidFormName = true;
                $scope.invalidMsg.push({type : "number",msg:"Atleast one number is required",valid : true});
   }else{
     $scope.invalidMsg.push({type : "number",msg:"Atleast one number is required",valid : false});
    }
   if(!pwd.match(/[\[\]\/\\~!_:@#.'$`%^&?(){}+_-]/))
   {
    $scope.invalidFormName = true;
                $scope.invalidMsg.push({type : "special",msg:"Atleast one special character is required",valid : true});
   }else{
    $scope.invalidMsg.push({type : "special",msg:"Atleast one special character is required",valid : false});
    }
   if(!pwd.match(/[A-Z]/))
   {
    $scope.invalidFormName = true;
                $scope.invalidMsg.push({type:"upper",msg: "Atleast one Uppercase letter is required",valid : true});
   }else {
    $scope.invalidMsg.push({type:"upper",msg: "Atleast one Uppercase letter is required",valid : false});
    }
   if(!pwd.match(/[a-z]/))
   {
    $scope.invalidFormName = true;
                $scope.invalidMsg.push({type: "lower",msg : "Atleast one Lowercase character is required",valid : true});
   }else {
    $scope.invalidMsg.push({type: "lower",msg : "Atleast one Lowercase character is required",valid : false});
    }
   if(pwd.length<8) {
                $scope.invalidFormName = true;
                $scope.invalidMsg.push({type:"length",msg: "Atleast 8 character is required",valid : true});
            }else {
    $scope.invalidMsg.push({type:"length",msg: "Atleast 8 character is required",valid : false});
    }
    if(pwd.match(/[0-9]/) && pwd.match(/[_.@]/) && pwd.match(/[A-Z]/) && pwd.match(/[a-z]/) && pwd.length>=8){
    $scope.invalidFormName = false;
    }
     //$scope.invalidMsg = $filter("GetUniqueArrayFilterCore")($scope.invalidMsg); 
          
  }else{ 
    $scope.invalidFormName = false;
   }
    }; 
  
}

})();
