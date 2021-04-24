(function() {
    'use strict';
    angular.module('app.common').controller('WishController', WishController);
    WishController.$inject = [ '$translate','$scope', '$rootScope', 'StatesConstantsCommon', 'GlobalValuesCore', 'TemplatesConstantsCore', 'GlobalConstantsCore', '$filter', 'UrlConstantsCommon', '$timeout', '$state','breadcumb','WishServiceCommon','StatesConstantsCore'];

    function WishController($translate, $scope, $rootScope,StatesConstantsCommon, GlobalValuesCore, TemplatesConstantsCore, GlobalConstantsCore, $filter, UrlConstantsCommon, $timeout, $state,breadcumb,WishServiceCommon,StatesConstantsCore) {
        var self = this;
        $rootScope.breadcumb = breadcumb;
        var originatorEv;
        var currentUser = GlobalValuesCore.USER_CONTEXT;
        $scope.openTableMenu = function($mdOpenMenu, ev) {
		  originatorEv = ev;
		  $mdOpenMenu(ev);
		};
        
        $scope.viewProfile = function(user){
		   var username = user.username;
		   $state.go(StatesConstantsCore.profile, {username:username});
		};
        
        $scope.imagePath = '../app/assets/img/user.jpg';
        $scope.divShowHide={};
        $scope.divShowHide.family=false;
        $scope.divShowHide.personal=true;
		$scope.userAOWrapperList=[];
		$scope.userAOWrapperCount=0;

        $scope.search = function(){
			var url = UrlConstantsCommon.WISH_SEARCH_URL+"?_s=sourceuser.id=="+currentUser.id+"&ulimit=1000&llimit=0";
			WishServiceCommon.search(url).then(function(response) {
				console.log(response);
				$scope.userAOWrapperList=[];
				if ($filter('HasValueFilterCore')(response)) {
					$scope.userAOWrapperList = response;
				}
			},function(error) {
				//$scope.cancel();
			});
		};

        $scope.searchCount = function(){
			var url = UrlConstantsCommon.WISH_SEARCHCOUNT_URL+"?_s=sourceuser.id=="+currentUser.id;
			WishServiceCommon.search(url).then(function(response) {
				$scope.userAOWrapperCount=0;
				if ($filter('HasValueFilterCore')(response)) {
					$scope.userAOWrapperCount=response;
					$scope.search();
				}
			},function(error) {
				//$scope.cancel();
			});
		};

		$scope.searchCount();
		
		$scope.removeFromWish = function(userid,description){
			var promise = WishServiceCommon.deleteWish(userid,'Viewed',description);
			console.log('promise:: ',promise);
		};
        
    }
})();
