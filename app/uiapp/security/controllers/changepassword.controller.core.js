//For Change Password
var changePasswordApp = angular.module(appModuleName, ['ngMaterial', 'ngResource', 'ngRoute', 'ngMessages','base64']).config(function($mdThemingProvider, $mdIconProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('light-blue')
    .dark();
});

(function() {

  'use strict';
   var BASE_URL = context+"/rest";
   
    angular.module(appModuleName)
  .controller('changePasswordController', changePasswordController);
  
  changePasswordController.$inject = ['$scope', '$http','$base64','$filter','$window','LoginServiceOutdex'];  
  /**
   * Application Controller for the App
   * @param $scope
   * @param $mdSidenav
   * @constructor
   */
  function changePasswordController($scope, $http,$base64,$filter,$window,LoginServiceOutdex) {
    //var self = this;
      $scope.validatePassword = function(newPasswordForm) {
		$scope.invalidMsg=[];
		var newpassword=angular.element(document.querySelector('#changePasswordLinkForm #newPasswordForm')).val();
		if (newpassword!==null && newpassword!==undefined && newpassword!=='') {
		var pwd=newpassword;
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
		$scope.invalidMsg = _.uniq($scope.invalidMsg);  
	}else{
		$scope.invalidFormName = false;
	}
   };
   
   
   $scope.fieldChange = function(confirmpasswordForm) {
		$scope.invalidFormName2=false;
		$scope.invalidMsg2=[];
		var newpassword=angular.element(document.querySelector('#changePasswordLinkForm #newPasswordForm')).val();
		var confirmpassword=angular.element(document.querySelector('#changePasswordLinkForm #confirmpasswordForm')).val();
		if (newpassword!==null && newpassword!==undefined && newpassword!=='') {
		}else{
			$scope.invalidMsg2.push({type : "required",msg:"Please enter valid new password first",valid : false});
			$scope.invalidFormName2=true;
		}
		if (confirmpassword!==null && confirmpassword!==undefined && confirmpassword!=='') {
		}else{
			$scope.invalidMsg2.push({type : "required",msg:"Please enter valid confirm password",valid : false});
			$scope.invalidFormName2=true;
		}
        if (newpassword==confirmpassword){
			$scope.invalidMsg2.push({type : "number",msg:"",valid : true});
			$scope.invalidFormName2=false;
		}else{
			$scope.invalidFormName2 = true;
            $scope.invalidMsg2.push({type : "required",msg:"Password does not match",valid : true});
		}
   };
    
   
	$scope.sendChangePassword= function(frm){
		if(frm.$invalid){
			angular.forEach(frm.$error.required,function(val){
					val.$setTouched();
					val.$setDirty();
				});
		}else{
			var newpassword=angular.element(document.querySelector('#changePasswordLinkForm #newPasswordForm')).val();
			var confirmpassword=angular.element(document.querySelector('#changePasswordLinkForm #confirmpasswordForm')).val();			
			//~ var salt = CryptoJS.lib.WordArray.random(128/8);
			//~ var iv = CryptoJS.lib.WordArray.random(128/8);
			//~ $scope.iv = iv;
			//~ $scope.salt = salt;
			alert(newpassword+"     "+confirmpassword);
			console.log('newpassword   '+newpassword);
			console.log('confirmpassword:   '+confirmpassword);
			newpassword=$base64.encode(newpassword);
			confirmpassword=$base64.encode(confirmpassword);
			console.log('newpassword   '+newpassword);
			console.log('confirmpassword:   '+confirmpassword);
			angular.element(document.querySelector('#htmlFormNew #newPassword')).val(newpassword);
			angular.element(document.querySelector('#htmlFormNew #confirmpassword')).val(confirmpassword);
          //  document.forms.htmlFormNew.submit();
            
            var url=BASE_URL+"/unauthorize/changePassword/";
            var passwordResetWrapper={};
            passwordResetWrapper.userid = userId;
            passwordResetWrapper.password = newpassword;
            passwordResetWrapper.confirmPassword = confirmpassword;
            passwordResetWrapper.token = activation;
			console.log('passwordResetWrapper: ',passwordResetWrapper);
			var promise = LoginServiceOutdex.sendPOSTRequest(url,passwordResetWrapper);
			promise.then(function(res) {
					alert("Change successful");
					//$window.location.href = 'index.jsp';
//					$window.location.href = 'login.jsp';
			});	
		}
	};
  }
})();
