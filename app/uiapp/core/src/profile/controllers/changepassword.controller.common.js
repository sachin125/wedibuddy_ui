(function() {
  'use strict';
angular.module('app.core').controller('ChangePasswordControllerCore', ChangePasswordControllerCore);

ChangePasswordControllerCore.$inject= ['$scope', '$mdDialog', '$rootScope', '$filter', 'IndexServiceCore', 'UrlConstantsCommon', 'TemplatesConstantsCommon', 'Notification', '$state', 'MsgConstantsCommon', 'GlobalConstantsCore', 'GlobalValuesCore', 'UsermgmtServiceCommon','StatesConstantsCommon','$base64','locals'];

function ChangePasswordControllerCore($scope, $mdDialog, $rootScope, $filter, IndexServiceCore, UrlConstantsCommon, TemplatesConstantsCommon, Notification, $state, MsgConstantsCommon, GlobalConstantsCore, GlobalValuesCore, UsermgmtServiceCommon,StatesConstantsCommon,$base64,locals) {
	
	 $scope.cancel = function() {
        $mdDialog.cancel();
    };
    
    $scope.hasNullValue = function(pwd1, pwd2){
		if(pwd1.toLowerCase() === "null" && pwd2.toLowerCase() === "null"){
			return true;
		}
	};
    
    $scope.validatePassword = function(pwd) {
		$scope.invalidMsg=[];
        if ($filter("HasValueFilterCore")(pwd)) {
   console.log(pwd);
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
    
   $scope.invalidMsg = $filter("GetUniqueArrayFilterCore")($scope.invalidMsg); 
          
  }else{
    $scope.invalidFormName = false;
   }
    };

	$scope.changePassword = function(ev,pwdForm){
		if($filter('HasValueFilterCore')(pwdForm)){
			var passwordwrapper= {newpass : $base64.encode(pwdForm.newUserPassword),oldpass : $base64.encode(pwdForm.oldUserPassword)};
			UsermgmtServiceCommon.changePassword(passwordwrapper).then(function(response){
				if($filter('HasValueFilterCore')(response)){
						Notification.displayToast("success","Password changed successfully");
					}
					$mdDialog.hide();
				});
		}
	};
	$scope.changeUserPassword = function(ev,pwdForm){
		if($filter('HasValueFilterCore')(pwdForm)){
			UsermgmtServiceCommon.changeUserPassword($base64.encode(pwdForm.newUserPassword),locals.userid).then(function(response){
				if($filter('HasValueFilterCore')(response)){
						Notification.displayToast("success","Password Updated successfully");
					}
					$mdDialog.hide();
				});
		}
	};
}
})();
