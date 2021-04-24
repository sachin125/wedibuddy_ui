(function() {
    'use strict';
    angular.module('app.common').controller('BridgeGroomController', BridgeGroomController);
    BridgeGroomController.$inject = [ '$translate','$scope', '$rootScope', 'StatesConstantsCommon', 'GlobalValuesCore', 'TemplatesConstantsCore', 'GlobalConstantsCore', '$filter', 'UrlConstantsCommon', '$timeout', '$state','breadcumb','BridgeGroomServiceCommon','StatesConstantsCore','WishServiceCommon'];

    function BridgeGroomController($translate, $scope, $rootScope,StatesConstantsCommon, GlobalValuesCore, TemplatesConstantsCore, GlobalConstantsCore, $filter, UrlConstantsCommon, $timeout, $state,breadcumb,BridgeGroomServiceCommon,StatesConstantsCore,WishServiceCommon) {
        var self = this;
        $rootScope.breadcumb = breadcumb;
        var originatorEv;
        
        $scope.openTableMenu = function($mdOpenMenu, ev) {
		  originatorEv = ev;
		  $mdOpenMenu(ev);
		};
        
        console.log('GlobalValuesCore.USER_CONTEXT::: ',GlobalValuesCore.USER_CONTEXT);
        
        $scope.viewProfile = function(user){
		   var username = user.username;
		   $state.go(StatesConstantsCore.profile, {username:username});
		};
        
        $scope.imagePath = '../app/assets/img/user.jpg';
        $scope.userList=[];
		$scope.userAOWrapperList=[];
        $scope.userWrapper={};
        $scope.userWrapper = BridgeGroomServiceCommon.initiateUserWrapper();
         		
		$scope.filterUser = function(){
			var userWrapper = $scope.userWrapper;
			console.log('userWrapper:: ',$scope.userWrapper);
			BridgeGroomServiceCommon.filterUser(userWrapper).then(function(response) {
				console.log(response);
				$scope.userAOWrapperList=[];	
				if ($filter('HasValueFilterCore')(response)) {	
					$scope.userAOWrapperList = response;
				}
			},function(error) {
				//$scope.cancel();
			});
		};
        $scope.filterUser();
        
        $scope.addToWish = function(username,description){
			var promise = WishServiceCommon.addToWish(username,'Liked',description);
			console.log('promise:: ',promise);
		}
		
		$scope.deleteWish = function(wishId){
			var promise = WishServiceCommon.deleteWish(username);
			console.log('promise:: ',promise);
		}        
        
    }
})();
