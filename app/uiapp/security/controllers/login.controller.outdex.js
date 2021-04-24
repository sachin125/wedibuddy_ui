(function() {
    'use strict';
    
    angular.module('loginApp')
  .controller('LoginController', LoginController);
  
	LoginController.$inject = ['$location', '$log', '$q', '$scope', '$rootScope', '$timeout', '$http', '$route', '$window','$filter','$mdToast','$base64','LoginServiceOutdex','UrlConstantsOutdex','Notification'];
    
    /**
     * Application Controller for the App
     * @param $scope
     * @param $mdSidenav
     * @constructor
     */
    function LoginController($location, $log, $q, $scope, $rootScope, $timeout, $http, $route, $window,$filter,$mdToast,$base64,LoginServiceOutdex,UrlConstantsOutdex,Notification) {
        var self = this;
        var loginErrorObj = $location.search();
        $scope.isForgotPassword = false;
        //var capchaError = $location.search().capchaError;
        if (hasValue($location.search().capchaError)) {
            $scope.isForgotPassword = true;
            $scope.captchaErrorMsg = "Invalid Captcha. Please try again";
        }
		
		$scope.domains=[
			{id:1,name:"Dashora Samaj"},
			{id:2,name:"Agrawal Samaj"},
			{id:3,name:"Jain Samaj"},
		];
		
		$scope.userRegistration = function(ev){
			var signupUser = $scope.signupUser;
			//~ var salt = CryptoJS.lib.WordArray.random(128 / 8);
            //~ var iv = CryptoJS.lib.WordArray.random(128 / 8);
            //~ console.log('salt::  '+salt+" iv:: "+iv);
            //~ var key128Bits100Iterations = CryptoJS.PBKDF2(passphrase, salt, {
                //~ keySize: 128 / 32,
                //~ iterations: 100
            //~ });
            //~ var encryptedUsername = CryptoJS.AES.encrypt(signupUser.username, key128Bits100Iterations, {
                //~ iv: iv,
                //~ mode: CryptoJS.mode.CBC,
                //~ padding: CryptoJS.pad.Pkcs7
            //~ });
            //~ var encryptedChecksum = CryptoJS.AES.encrypt(signupUser.checkSum, key128Bits100Iterations, {
                //~ iv: iv,
                //~ mode: CryptoJS.mode.CBC,
                //~ padding: CryptoJS.pad.Pkcs7
            //~ });
            var checkSum = signupUser.checkSum;
            signupUser.checkSum=$base64.encode(checkSum);
			var url=UrlConstantsOutdex.USER_REGISTRATION;
			var promise = LoginServiceOutdex.sendPOSTRequest(url,signupUser);
			promise.then(function(res) {
				if ($filter('HasValueFilterCore')(res) && res.status=='success') {
					Notification.displayToast("success", "A verification mail has been sent to you emailid",0);
					//$scope.signupUser = {};
				} else {
					Notification.displayToast("error", res,0);
				}
			});
		};
		
        var IS_FORGOT_PWD_BUTTON_ENABLE = true;
        if (IS_FORGOT_PWD_BUTTON_ENABLE == 'true') {
            $scope.IS_FORGOT_PWD_BUTTON_ENABLE = true;
        } else {
            $scope.IS_FORGOT_PWD_BUTTON_ENABLE = false;
        }

        $scope.forgotPassword = function() {
            $scope.isForgotPassword = true;
        };


        $scope.backToLogin = function() {
            $scope.isForgotPassword = false;
            $scope.captchaMsg = "";
            $scope.captchaErrorMsg = "";
        };

		$scope.forgetUser = {};
		$scope.forgetChecksum=function(){
			var username_onscreen = $scope.forgetUser.username;
			var url = UrlConstantsOutdex.FORGET_CHECKSUM+"/?username=" + username_onscreen;
			var promise = LoginServiceOutdex.sendPOSTRequest(url,"");
			promise.then(function(res) {
				if ($filter('HasValueFilterCore')(res)) {
					Notification.displayToast("success", res.excpmesg,0);
					$scope.signupUser = {};
				} else {
					Notification.displayToast("error", res,0);
				}
			});
		};


        $scope.forgotFormSubmit = function(isValid) {

            var resVal = angular.element(document.getElementById('recaptcha_response_field')).val();
            var chalangeVal = angular.element(document.getElementById('recaptcha_challenge_field')).val();
            var captchaResult = "";
            var username_onscreen = $scope.username_onscreen;
            if (isValid) {
                if (hasValue(resVal)) {

                    var url = context + "/rest/unauthorize/ValidCaptcha/";
                    url += "?resVal=" + resVal + "&chalangeVal=" + chalangeVal;

                    $http.post(url, "")
                        .then(function(response) {
                            captchaResult = response.data.status;
                            if (captchaResult == "valid") {
                                var url = context + "/rest/unauthorize/forgetCheckSum/";
                                url += "?username=" + username_onscreen;

                                $http.post(url, "")
                                    .then(function(response) {
                                        if (response.data.status == "Error") {
                                            $scope.captchaMsg = "Please enter valid username";
                                            return false;
                                        }
                                        $scope.captchaMsg = "Reset password email has been sent successfully.";
                                        $scope.captchaErrorMsg = "";
                                    }, function(errResponse) {
                                        $scope.captchaMsg = "Try again!";
                                    });

                            } else {

                                $window.location.reload();
                                $location.url("/login?capchaError=1");
                            }

                        });

                } else {
                    $scope.captchaErrorMsg = "Captcha is Required";
                }
            }
        };

        function showLoginErrorMsg(loginError) {
            switch (loginError) {
                case 1:
                    $scope.loginErrorMsg = "Invalid Credentials";
                    break;

                case 2:
                    $scope.loginErrorMsg = "Account is locked";
                    break;

                case 3:
                    $scope.loginErrorMsg = "User does not exist";
                    break;

                case 4:
                    $scope.loginErrorMsg = "Unauthorized User";
                    break;

                case 5:
                    $scope.loginErrorMsg = "Customer does not exist";
                    break;

                default:
                    $scope.loginErrorMsg = "";
            }
        }

        showLoginErrorMsg(parseInt(loginErrorObj.login_error));

        $scope.isExplorer9 = false;

        function initialisePlaceholdersForExplorer() {
            var i = angular.element(document.querySelector('#j_username'));
            var j = angular.element(document.querySelector('#j_password'));
            var k = angular.element(document.querySelector('#username'));

            if (i.val() === '' || i.val() == i.attr('placeholder')) {
                i.addClass('placeholder').val(i.attr('placeholder'));
            }
            if (j.val() === '' || j.val() == j.attr('placeholder')) {
                if (j.attr('type') == 'password') {
                    j.addClass('password');
                    j.attr('type', 'text');
                }
                j.addClass('placeholder').val(j.attr('placeholder'));
            }
            if (k.val() === '' || k.val() == k.attr('placeholder')) {
                k.addClass('placeholder').val(k.attr('placeholder'));
            }
        }

        $scope.validateLoginFormEncrypt = validateLoginFormEncrypt;
        // function to validate login form and encrypt field
        function validateLoginFormEncrypt(ev, username, checksum) {
			console.log('username:: ',username+'   checksum::: '+checksum);
            //var username = $scope.username_onscreen;
            //var checksum = $scope.password_onscreen;
            if (hasValue(username) && hasValue(checksum)) {
                var usernameLowerCase = username.toLowerCase();
                convertAndSubmitLoginform(usernameLowerCase, checksum);
            } else {
                angular.element(document.querySelector("#login_error")).html("<font color='red'>Both fields are mandatory.</font>");
                event.preventDefault();
                return false;
            }

        }
        // function called on submit login form
        function convertAndSubmitLoginform(username, checksum) {

            var salt = CryptoJS.lib.WordArray.random(128 / 8);
            var iv = CryptoJS.lib.WordArray.random(128 / 8);
            console.log('salt::  '+salt+" iv:: "+iv);
            var key128Bits100Iterations = CryptoJS.PBKDF2(passphrase, salt, {
                keySize: 128 / 32,
                iterations: 100
            });
            var encryptedUsername = CryptoJS.AES.encrypt(username, key128Bits100Iterations, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            var encryptedChecksum = CryptoJS.AES.encrypt(checksum, key128Bits100Iterations, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            $scope.j_password = encryptedChecksum;
            $scope.j_username = encryptedUsername;
            $scope.iv = iv;
            $scope.salt = salt;
			console.log("sachin::  "+$scope.j_password+"    "+$scope.j_username+"    "+$scope.iv+"   "+$scope.salt);
            angular.element(document.querySelector('#j_password')).attr('type', 'password');
            angular.element(document.querySelector('#j_username')).attr('type', 'password');
            if (hasValue(username) && hasValue(encryptedChecksum)) {
                loginButtonClick(username, encryptedChecksum);
            }
        }
        //function to get access token if user is vaild
        function loginButtonClick(username, encryptedChecksum) {

			//$scope.action = context + "/login";
            $scope.action = "/login";
            console.log('loginButtonClick::  ',context+" $scope.action: "+$scope.action);
            document.forms.htmlForm.submit();

        }

        function hasValue(val) {
            return (val !== null && val !== undefined && val != "NaN" && val != "null" && val != "undefined" && (val !== "" || String(val) == "0") && val != "-Please select-" && val != "--");
        }


        $scope.defaultLoginPageCall = defaultLoginPageCall;
        // function for default Login Page Call
        function defaultLoginPageCall() {
            var error = '';
            //var error = getErrorMessage(errorType);

            if (hasValue(error)) {
                document.getElementById("login_error").innerHTML = error;
                angular.element(document.querySelector('#logoimagediv')).css('display', 'none');
                angular.element(document.querySelector('#logoimage')).removeClass("spinner-icon");
                angular.element(document.querySelector('#logoimage')).attr("src", "../images/losgo-small.png");
            }
            angular.element(document.querySelector('#or-div')).css("display", "none");
            angular.element(document.querySelector('#ordiv')).css("display", "none");
            if (BrowserDetect.browser == "Explorer")
                angular.element(document.querySelector('#confirm_span')).css("margin-top", "-11%");
            if (BrowserDetect.browser == "Chrome")
                angular.element(document.querySelector('#confirm_span')).css("margin-top", "-4%");
            if (BrowserDetect.browser == "Firefox")
                angular.element(document.querySelector('#confirm_span')).css("margin-top", "-11%");

            var version = navigator.appVersion.split(';')[1];
            if (hasValue(version)) {
                if ((version.indexOf("MSIE 9.0") > -1)) {
                    var input = document.createElement("input");
                    if (('placeholder' in input) === false) {
                        $scope.isExplorer9 = true;
                        initialisePlaceholdersForExplorer();
                    }
                }
            }
        }

        function focusEventTriggered($event) {

            if ($scope.isExplorer9 === true) {
                var i = angular.element($event.srcElement);
                if (i.val() == i.attr('placeholder')) {
                    i.val('').removeClass('placeholder');
                    if (i.hasClass('password')) {
                        i.removeClass('password');
                        i.attr('type', 'password');
                    }
                }
            }
        }

        function blurEventTriggered($event) {

            if ($scope.isExplorer9 === true) {
                var j = angular.element($event.srcElement);
                if (j.val() === '' || j.val() == j.attr('placeholder')) {
                    if (j.attr('type') == 'password') {
                        j.addClass('password');
                        j.attr('type', 'text');
                    }
                    j.addClass('placeholder').val(j.attr('placeholder'));
                }
            }
        }

        // function to get Error Messages
        function getErrorMessage(error_type) {
            if (error_type == 1) {
                return "<font color=\"red\">Invalid credentials, please try again</font>";
            } else if (error_type == 2) {
                return "<font color=\"red\">Your account is locked, please contact administrator.</font>";
            } else if (error_type == 3) {
                return "<font color=\"red\">Invalid credentials, please try again</font>";
            } else if (error_type == 4) {
                return "<font color=\"red\">Your account is disabled, please contact administrator.</font>";
            } else if (error_type == 5) {
                return "<font color=\"red\">Your account is blocked, please contact administrator.</font>";
            }
            return "";
        }
        $timeout(function() {
            $scope.defaultLoginPageCall();
        }, 500);

        var browser = BrowserDetect.browser;
        var version = BrowserDetect.version;

        if (document.documentMode || /Edge/.test(navigator.userAgent)) {
            browser = 'edge';
        }

        //~ if((browser == "Chrome" && version <45) || (browser == "Firefox" && version <46) || (browser == "Safari" && version <9) || (browser == "Internet-Explorer" && version <10))
        //~ {
        //	$location.url("/browserNotSupported");
        //}
    }

})();


(function() {

    'use strict';

    loginApp.controller('BrowserNotSupportedController', ['$scope', BrowserNotSupportedController]);

    function BrowserNotSupportedController($scope) {}
})();
