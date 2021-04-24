(function() {
  'use strict';

  angular.module(appModuleName)
  .service('LoginServiceOutdex', LoginServiceOutdex);

	LoginServiceOutdex.$inject = [ '$http','$filter','$q'];

  function LoginServiceOutdex($http,$filter,$q) {

	var service = {
        sendGETRequest: sendGETRequest,
        sendPOSTRequest:sendPOSTRequest        
    };
    return service;

 function sendGETRequest(url) {
			        var deferred = $q.defer();
			        var req = {
                		method: 'GET',
                		url: url,
            		};
						$http(req).success(function (res,status) {
							deferred.resolve(res);
            			}).error(function (res) {
							deferred.reject(status);
            			});

                return deferred.promise;
    }

    function sendPOSTRequest(url,data) {
				var deferred = $q.defer();
				var errorMsg;
				var req = {
                method: 'POST',
                url: url,
                data: data,
            };
            $http(req).success(function (res,status) {
							deferred.resolve(res);
            			}).error(function (res) {
							deferred.reject(status);
            			});
            return deferred.promise;
    }

  }
})();
