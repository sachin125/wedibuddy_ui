var loginApp = angular.module('loginApp', ['ngMaterial', 'ngRoute', 'ngMessages', 'base64']).config(function($mdThemingProvider, $mdIconProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('light-blue');
        //~ .primaryPalette('blue')
        //~ .accentPalette('light-blue')
        //~ .dark();
});

loginApp.config(function($routeProvider, $locationProvider) {
    $routeProvider

        .when('/login', {
            templateUrl: '../app/uiapp/security/views/login.core.html',

        })

        .when('/forgotpassword', {
            templateUrl: '../app/uiapp/security/views/forgotPassword.core.html',
            controller: 'ForgotPasswordController'
        })
        .when('/resetpassword', {
            templateUrl: '../app/uiapp/security/views/resetpassword.core.html',
            controller: 'ResetPasswordController'
        })
        //~ .when('/browserNotSupported', {
        //~ templateUrl: '../app/uiapp/security/views/browsernotsupported.core.html',
        //~ controller  : 'BrowserNotSupportedController'
        //~ })

        .otherwise({
            redirectTo: '/login'
        });
});

(function() {

    'use strict';

    loginApp.controller('BrowserNotSupportedController', ['$scope', BrowserNotSupportedController]);

    function BrowserNotSupportedController($scope) {}
})();
