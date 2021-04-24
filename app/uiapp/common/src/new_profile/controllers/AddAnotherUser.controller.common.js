(function() {
  'use strict';
angular.module('app.common').controller('AddProfileControllerCommon', AddProfileControllerCommon);
AddProfileControllerCommon.$inject= ['$scope', '$mdDialog', '$rootScope', '$filter', 'IndexServiceCore', 'UrlConstantsCommon', 'TemplatesConstantsCommon', 'Notification', '$state', 'MsgConstantsCommon', 'GlobalConstantsCore', 'GlobalValuesCore','StatesConstantsCommon','StatesConstantsCore','UserServiceCore'];

function AddProfileControllerCommon($scope, $mdDialog, $rootScope, $filter, IndexServiceCore, UrlConstantsCommon, TemplatesConstantsCommon, Notification, $state, MsgConstantsCommon, GlobalConstantsCore, GlobalValuesCore, StatesConstantsCommon,StatesConstantsCore,UserServiceCore) {
    
    $rootScope.breadcumb = ["Add Another user"];
	
	$scope.createUser = function(){
		var userJson = $scope.user;
		var promise = UserServiceCore.createUser(userJson);
	};
	
}
})();
