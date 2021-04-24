(function() {
  'use strict';
 angular.module('loginApp').factory('Notification',['$mdToast','$filter',function($mdToast,$filter){
   var notification = {};
   var myToast;
   var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
    var toastPosition = angular.extend({},last);
    var getToastPosition = function() {
    sanitizePosition();
    return Object.keys(toastPosition)
      .filter(function(pos) { return toastPosition[pos]; })
      .join(' ');
    };
    function sanitizePosition() {
    var current = toastPosition;
    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;
    last = angular.extend({},current);
  }

    
    /******Common Toast Message for Three Types  (Success , Error , Warning)*******/
 /* notification.displayToast = function(type,message){
			$mdToast.show({
			template: '<md-toast class="md-toast ' + type + '">' + message + '</md-toast>',
			hideDelay: 2000,
			position: 'top right',
		});
    }*/    
    
     notification.closeToast = function() {
		$mdToast.hide();
    };
    
notification.displayToast = function(type,message,hideDelay){
		if(!$filter("HasValueFilterCore")(hideDelay)){
			hideDelay=3000;
		}
		if($filter("HasValueFilterCore")(myToast)){
			myToast.then(function(res){
				myToast=$mdToast.show({
			//template: '<md-toast class="md-toast ' + type + '">' + $filter('translate')(message) + '</md-toast>',
			template: '<md-toast class="md-toast ' + type + '">' + (message) + '</md-toast><span ng-click="closeToast()">X</span>',
			hideDelay: hideDelay,
			position: 'top right',
		});
				});
		}
		else{
			myToast=$mdToast.show({
			//template: '<md-toast class="md-toast ' + type + '">' + $filter('translate')(message) + '</md-toast>',
			template: '<md-toast class="md-toast ' + type + '">' + (message) + '</md-toast>',
			hideDelay: hideDelay,
			position: 'top right',
		});
		}
    };
	//~ notification.displayStickyToast=function(type,message){
		//~ toaster.pop(type,message);
	//~ };
    
     return notification;
}]);
})();
