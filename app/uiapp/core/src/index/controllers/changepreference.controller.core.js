
(function() {

  'use strict';

  angular.module('app.core')
  .controller('ChangePreferenceControllerCore', ChangePreferenceControllerCore);
  
  ChangePreferenceControllerCore.$inject = ['GlobalValuesCore','$mdDialog','ChangePreferenceServiceCore','$scope','GlobalConstantsCore','$filter','Notification','$window'];
  
  function ChangePreferenceControllerCore(GlobalValuesCore,$mdDialog,ChangePreferenceServiceCore,$scope,GlobalConstantsCore,$filter,Notification,$window) {
    var self = this;
	
    $scope.limitPerPageList = GlobalConstantsCore.ROW_LIMIT_PER_PAGE;
  $scope.initialLimitPerPage = GlobalConstantsCore.INITIAL_LIMIT_PER_PAGE;
  $scope.dateFormatList = GlobalConstantsCore.DATE_FORMAT;
  $scope.dateFormat = GlobalValuesCore.USER_CONTEXT.userConfig.dateFormat ? GlobalValuesCore.USER_CONTEXT.userConfig.dateFormat : GlobalConstantsCore.INITIAL_DATE_FORMAT;
    $scope.userid = GlobalValuesCore.USER_CONTEXT.userid;        
	$scope.timeZoneList = GlobalConstantsCore.TIME_ZONE_LIST;
	$scope.timeZone = $filter('HtmlDecodeFilterCore')(GlobalConstantsCore.INITIAL_TIME_ZONE);
	
  	 $scope.cancel = function(){
			   $mdDialog.hide();
           };
           
	 $scope.changePreferenceForUser = function(){
			   var jsonObjForUserConfig={};
			   jsonObjForUserConfig.userid = {};
			   jsonObjForUserConfig.userid.userid = $scope.userid;
			  
			   if($filter("HasValueFilterCore")($scope.initialLimitPerPage)){
					jsonObjForUserConfig.initialLimitPerPage = $scope.initialLimitPerPage;
				   }
				   
				  if($filter("HasValueFilterCore")($scope.dateFormat)){
					jsonObjForUserConfig.dateFormat = $scope.dateFormat;
								
				   }
			
			   if($filter("HasValueFilterCore")($scope.userid) && ($filter("HasValueFilterCore")(jsonObjForUserConfig.timeRegion) || $filter("HasValueFilterCore")(jsonObjForUserConfig.initialLimitPerPage)) || $filter("HasValueFilterCore")(jsonObjForUserConfig.dateFormat)){ 
				   ChangePreferenceServiceCore.changePreferenceForUser(jsonObjForUserConfig).then(function(response){
						GlobalConstantsCore.INITIAL_LIMIT_PER_PAGE = response.initialLimitPerPage;
						GlobalConstantsCore.INITIAL_DATE_FORMAT = response.dateFormat;
					//	GlobalConstantsCore.INITIAL_TIME_ZONE = response.timeRegion;
						
						Notification.displayToast("success", "Changed Preferences Successfully");
						$mdDialog.hide();
						window.setTimeout(function (){
							$window.location.href = 'index.jsp';
							
						},180);
						
						
					},function(error){
						console.dir("Error :- "+error);
					});
				}	
				
		   };
		   
	
  }

	
  
})();
