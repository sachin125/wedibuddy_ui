(function() {
    'use strict';
    angular.module('app.common').controller('MyChoiceController', MyChoiceController);
    MyChoiceController.$inject = [ '$translate','$scope', '$rootScope', 'StatesConstantsCommon', 'HomeServiceCore', 'GlobalValuesCore', 'TemplatesConstantsCore', 'GlobalConstantsCore', '$filter', 'UrlConstantsCommon', '$timeout', '$state','breadcumb'];

    function MyChoiceController($translate, $scope, $rootScope,StatesConstantsCommon, HomeServiceCore, GlobalValuesCore, TemplatesConstantsCore, GlobalConstantsCore, $filter, UrlConstantsCommon, $timeout, $state,breadcumb) {
        var self = this;
        $rootScope.breadcumb = breadcumb;
        
        
        
    }
})();
