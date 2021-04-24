(function(){
    'use strict';
    angular.module('app.core').controller('GlobalSearchControllerCore', GlobalSearchControllerCore);
    GlobalSearchControllerCore.$inject =['$scope', '$rootScope', '$log', '$q', 'IndexServiceCore', 'StatesConstantsCommon', 'UrlConstantsCommon', 
       '$filter', '$timeout', '$state'];
    
    function GlobalSearchControllerCore($scope, $rootScope, $log, $q, IndexServiceCore, StatesConstantsCommon, 
       UrlConstantsCommon, $filter, $timeout, $state){
        var self = this;
        $scope.filter = {};
        $scope.filter.showSearch = true;
        /* main search start *//* main search start */
        
        $scope.querySearch = function(query){
            var results;
            results =[];
            var fiqlQuery;
            if ($filter("HasValueFilterCore")(query)){
                var n = query;
                query = query.trim();
                $scope.searchTextNew = query;

                $scope.searchType = "sites";

                var fiqlSolrQuery = UrlConstantsCommon.GET_GLOBAL_SOLR_SEARCH_URL + query;

                IndexServiceCore.sendPOSTRequest(fiqlSolrQuery, query).then(function(res){
             
                    results = res;
                    $scope.mathDataForSolr = res;
                    $scope.searchSite = "";
                });
            }
            else {
                $scope.message = "";
                results =[];
            }
            if (true){
                var deferred = $q.defer();
                $timeout(function(){
                    deferred.resolve(results);
                }, 2 * 200, false);
                return deferred.promise;
            }
            else {
                return results;
            }
        };
        
        $scope.searchTextChange = function(text){
       
            var regex = new RegExp('(^[a-zA-Z0-9_-]+$)');
            var res = regex.test(text);
         
            if ( ! res){
                  // jQuery("#input-0").val("");
                this.searchText = text.substring(0, text.length - 1);
            }
        };
        $scope.lastRequestId = 0;
        
        $scope.getMatches = function(searchTest){
            var deferred = $q.defer();
            $scope.lastRequestId++;
            var thisRequestId = $scope.lastRequestId;
            $timeout(function(){
                $scope.querySearch(searchTest);
            }, 500);
            $timeout(function(){
                  // if this was not the most recent call made,
                   // don't resolve the deferred
                if (thisRequestId !== $scope.lastRequestId){
                    return;
                }
                var states = $scope.mathDataForSolr;
           
                $scope.groups = _.groupBy(states, "pojoName");
                states =[];
              
                var countryName = "";
                angular.forEach($scope.groups, function(item, key){
                  
                    for (var i = 0;i < item.length;i++){
                        if (i === 0){
                            states.push({"id": item[i].id, "isFirst": true, "pojoName": item[i].pojoName, "matchedString": ""});
                            states.push({"id": item[i].id, "isFirst": false, "pojoName": item[i].pojoName, "matchedString": item[i].matchedString});
                        }
                        else {
                            states.push({"id": item[i].id, "isFirst": false, "pojoName": item[i].pojoName, 
                               "matchedString": item[i].matchedString});
                        }
                    }
                });
             
                deferred.resolve(states);
            }, 1000);
            return deferred.promise;
        };
        
        $scope.openListItem = function(item, ev){
            $state.go(StatesConstantsCommon.ticketsDetails, {ticketid: item.id});
        };
        
        $scope.selectedItemDetailsOpen = function(item, ev){
            if ($filter("HasValueFilterCore")(item)){
                if (item.pojoName == ("Ticket")){
                    $state.go(StatesConstantsCommon.ticketsDetails, {ticketid: item.id});
                }
                else if (item.pojoName == ("CmChangeRequest")){
                    localStorage.setItem('ccrID', item.id);
                    $state.go(StatesConstantsCommon.ccrViewList);
                }
                else if (item.pojoName == ("Cmnebaudit")){
                    localStorage.setItem('refrenceSapIdFilter', item.id);
                    $state.go(StatesConstantsCommon.configurationOfGlobalGolden);
                }
                else if (item.pojoName == ("Maintenance")){
                    $state.go(StatesConstantsCommon.MAINTENANCE_DETAILS, {id: item.id});
                }
                else if (item.pojoName == ("Maintenancewo")){
                    $state.go(StatesConstantsCommon.MAINTENANCE_WORKORDER_DETAILS, {id: item.id});
                }
                else if (item.pojoName == ("IMEI")){
                    $state.go(StatesConstantsCommon.IMEI_TABS, {id: item.id});
                }
                else if (item.pojoName == ("Users")){
                    $state.go(StatesConstantsCommon.USER_MANAGEMENT_EDIT_USER, {userid: item.id, flag: false});
                }
                else if (item.pojoName == ("KCC")){
                    $state.go('dashboard.knowledgeCenterDetails', {category: category});
                }
                else if (item.pojoName == ("Document")){
                    var url = UrlConstantsCommon.SEARCH_DOCUMENT_URL + "?_s=id==" + item.id + 
                       "&ulimit=1000&orderBy=id&orderType=asc&llimit=0";
                    var promise = IndexServiceCore.sendGETRequest(url);
               
                    promise.then(function(response){
                   
                        if ($filter('HasValueFilterCore')(response)){
                            var documentObject = {};
                            documentObject = response[0];
                            var subFolderItem = documentObject.siteSubFolder;
                            $rootScope.projectEntityObject = documentObject.projectEntity;
                            $state.go("dashboard.document", {subFolderItem: subFolderItem});
                        }
                    });
                }
            }
        };
        
        $scope.closeFilter = function(){
            $scope.filter.show = false;
        };
        
        $scope.clearFilter = function(){
            $scope.filter.show = true; //jQuery("#input-0").val("");
            this.searchText = "";
        };
    }
})();
