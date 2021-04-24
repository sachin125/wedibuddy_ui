(function() {
'use strict';

var BASE_URL = context+"/rest";
angular.module('loginApp')
	.constant('UrlConstantsOutdex', {
		
		USER_REGISTRATION:BASE_URL+'/unauthorize/userRegistration',
		FORGET_CHECKSUM:BASE_URL+'/unauthorize/forgetCheckSum',

	});

})();

