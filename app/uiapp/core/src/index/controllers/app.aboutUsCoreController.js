
(function() {

  'use strict';

  angular.module('app.core')
  .controller('AppAboutUsControllerCore', AppAboutUsControllerCore);
  
  AppAboutUsControllerCore.$inject = ['menuService','UrlConstantsCore', 'GlobalConstantsCore','AboutUsServiceCore','$mdSidenav','$filter' ,'$translate', '$mdMedia', '$location', '$document', '$mdUtil', '$mdBottomSheet', '$scope', '$rootScope', '$log', '$q','StatesConstantsCommon' ,'IndexServiceCore','MyTaskServiceFtr','GlobalValuesCore' , '$timeout'];
  
  function AppAboutUsControllerCore(menuService,UrlConstantsCore,GlobalConstantsCore,AboutUsServiceCore, $mdSidenav,$filter, $translate, $mdMedia, $location, $document, $mdUtil, $mdBottomSheet, $scope, $rootScope, $log, $q,StatesConstantsCommon, IndexServiceCore,MyTaskServiceFtr,GlobalValuesCore,$timeout) {
    var self = this;
    $scope.noVersion=false;
   $rootScope.breadcumb = ["About"];
 /************************************************************************************************************************************/
    
    
     
     
     /*************************get web information *************************************************/
    
	$scope.getWebApkObjectList = function()
       {
		   AboutUsServiceCore.getWebApkObjectListservice($scope.query.limit, $scope.query.page, $scope.query.orderBy).then(function(response)
           {
			   
			   if($filter('HasValueFilterCore')(response)) {
            $scope.getWebModuleList = response[0];
            console.log("$scope.getWebModuleList");
             console.log($scope.getWebModuleList);
          }
          else{
			  $scope.noVersion=true;
		  }
            
           }, function(error)
           {Notification.displayToast(GlobalConstantsCore.TAOST_TYPE_ERROR, 'Error in get web details list!');
            
           });
       };
		 
      
     /*************************get web information end here ****************************************/
     $scope.query = {
      filter: '',
      limit: '10',
      order: '-modifiedTime', 
      page: 1
    };
    
   $scope.getAllApkReleaseNoteFeature = function(fiql){
		
		AboutUsServiceCore.getAllApkReleaseNoteFeature($scope.query.limit, $scope.query.page, $scope.query.orderBy, fiql).then(
			function(response) {
				$scope.getAllApkReleaseNoteFeatureObj = response[0];
				
			   if($filter('HasValueFilterCore')($scope.getAllApkReleaseNoteFeatureObj)) {
				   
				   $scope.releaseidfordownloadpdf = $scope.getAllApkReleaseNoteFeatureObj.id;


			}
			},
			function(error) {
				Notification.displayToast(GlobalConstantsCore.TAOST_TYPE_ERROR,'Error in getting about details list!');
			
			});
	   };
   
    
    //~ downloadPdfForWebversion(releaseidfordownloadpdf)
     $scope.downloadPdfForWebversion = function(releaseidfordownloadpdf){
			//var releaseid = apkReleaseNoteDetailPageList.id;
			window.open(UrlConstantsCore.DOWNLOAD_APK_RELEASEPDF + "/" + releaseidfordownloadpdf);
			};
jQuery(window).resize(function() {
      $scope.calculateHeight();
      
   });
     $scope.calculateHeight = function() {
  
      $scope.iframeHeight = window.innerHeight;
      var newHeight = $scope.iframeHeight-88;
     
      jQuery('#aboutus').css('height', newHeight + 'px');
   };
   
    angular.element(document).ready(function () {
  $timeout(function(){
     $scope.calculateHeight();
   },200);
       
    });


     /************************************************************************************************************************************/
$scope.getAllApkReleaseNoteFeature();
$scope.getWebApkObjectList();
  }

  
})();
