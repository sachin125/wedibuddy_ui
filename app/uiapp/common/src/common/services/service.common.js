(function() {
  'use strict';

  angular.module('app.core')
  .service('ServiceCommon', ServiceCommon);
	
	ServiceCommon.$inject = ['$q', '$translate', '$resource', '$http','$filter', 'UrlConstantsCore', 'GlobalConstantsCore','$mdDialog','Notification'];
  
  function ServiceCommon($q, $translate, $resource, $http,$filter, UrlConstantsCore, GlobalConstantsCore,$mdDialog,Notification) {
	
	
  }})();
