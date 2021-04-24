(function() {
  'use strict';

  angular.module('app.core')
  .service('IndexServiceCore', IndexServiceCore);

	IndexServiceCore.$inject = ['$q', '$translate', '$resource', '$http','$filter', 'UrlConstantsCore', 'GlobalConstantsCore','$mdDialog','Notification','$rootScope','$state','$window','$base64'];

  function IndexServiceCore($q, $translate, $resource, $http,$filter, UrlConstantsCore, GlobalConstantsCore,$mdDialog,Notification,$rootScope,$state,$window,$base64) {

	var service = {
        getCookieClosePortal: getCookieClosePortal,
        isAuthorize: isAuthorize,
        sendGETRequest : sendGETRequest,
        sendPOSTRequest : sendPOSTRequest,
        isSessionAvailable : isSessionAvailable,
        uploadFileToUrl : uploadFileToUrl,
        getPagingParam : getPagingParam,
        uploadFileWithDataToUrl : uploadFileWithDataToUrl,
        openModelDialog : openModelDialog,
        getPagingParamForMatManagement :getPagingParamForMatManagement,
        openToaster :openToaster,
		getfiqlParam : getfiqlParam ,
        formatAsDate : formatAsDate ,
        replaceLeadingWhiteSpace : replaceLeadingWhiteSpace,
        getCategories : getCategories,
        directToErrorPage : directToErrorPage,
        convertDateIntoYYYYMMDD : convertDateIntoYYYYMMDD,
        getCountryname : getCountryname,
        getAddressFromGoogleApi:getAddressFromGoogleApi,
        backToPreviousState : backToPreviousState,
        getBash64Encode:getBash64Encode,
        getBash64Decode:getBash64Decode
        
    };
    return service;

	function getBash64Encode(value){
		if($filter('HasValueFilterCore')(value)){
			return $base64.encode(value);
		}
    }
    
    function getBash64Decode(value){
		if($filter('HasValueFilterCore')(value)){
			return $base64.decode(value);
		}
    }
    
    function getCategories(data){
		var categories=[];


		if($filter('HasValueFilterCore')(data)){
			for(var i=0;i<data.length;i++){
				if($filter('HasValueFilterCore')(data[i].category))
				{
				 if(categories.indexOf(data[i].category) == -1)
					categories.push(data[i].category);
				}
				else if($filter('HasValueFilterCore')(data[i].site) && $filter('HasValueFilterCore')(data[i].site.category) && (categories.indexOf(data[i].site.category) == -1)){
					categories.push(data[i].site.category);
				}
			}
		}
		return categories;
    }
	
	function getAddressFromGoogleApi(text){
		var deferred = $q.defer();
		console.log("text--->",text);
		var url="https://maps.googleapis.com/maps/api/geocode/json?address="+text+"&sensor=false";
		 var req = {
					method: 'GET',
					url: url,
					  headers: {
					  Authorization: undefined,
					  Pragma: undefined,
					  'Cache-Control': undefined
					}
				};
		$http(req).success(function (res,status){
			deferred.resolve(res);
			return deferred.promise;
		}).error(function (data, status, headers, config) {
				   if($filter('statusCheckErrorPageHandlingFilterCore')(status)){
					   deferred.reject(status);
					   }
				  
				});
				return deferred.promise;
	 }	

    function getCookieClosePortal()
	{
		return CSRF_TOKEN;
    }

	function isAuthorize(rpcResponse)
	{
		if ($filter('HasValueFilterCore')(rpcResponse.responseText)) {
			var sessionString = rpcResponse.responseText.substring(0, 30);

			if (sessionString.indexOf("<!DOCTYPE HTML>") === 0) {

				window.location.href = context + "/jsp/login.jsp";
				return false;
			}
		}

        if (typeof rpcResponse == 'string' && rpcResponse.indexOf("This is login.jsp") >= 0) {

				window.location.href = context + "/jsp/login.jsp";
				return false;
			}
		try
		{
			var keys = _.keys(rpcResponse[0]);
			if(_.contains(keys,'errorMsg') || _.contains(keys,'userExcepMsg') || _.contains(keys,'errorCode')){
					return false;
					}else{
						return true;
					}
		 }
		catch (e)
		{}
		return true;
    }

	function directToErrorPage(status){
	        if(status=='404')
			$state.go("dashboard.pageNotFound", {}, {reload: 'dashboard.pageNotFound'});
			if(status=='500')
			$state.go("dashboard.InternalServerError", {}, {reload: 'dashboard.InternalServerError'});
        }

    function sendGETRequest(url) {
      	//	setCsrfCookie();
			        var deferred = $q.defer();
			        var req = {
                		method: 'GET',
                		url: url,
                        headers: {
                  			"CSRF_TOKEN": getCookieClosePortal(),
			   			}
            		};
						$http(req).success(function (res,status) {
							deferred.resolve(res);
            			}).error(function (res) {
							deferred.reject(status);
            			});

                return deferred.promise;
    }

    function sendPOSTRequest(url,data) {
     	//setCsrfCookie();
				var deferred = $q.defer();
				var errorMsg;
				var req = {
                method: 'POST',
                url: url,
                data: data,
                headers:
                {
				  "CSRF_TOKEN": getCookieClosePortal()
			   }
            };
            $http(req).success(function (res,status) {
							deferred.resolve(res);
            			}).error(function (res) {
							deferred.reject(status);
            			});
            return deferred.promise;
    }

    

    function isSessionAvailable(response){
		//console.log(response)
    }

	function uploadFileToUrl(file, uploadUrl){
			var defer = $q.defer();
			var fd = new FormData();
		   fd.append('filedata', file);
		   $http.post(uploadUrl, fd, {
			  headers: {
				  'Content-Type': undefined,
				  //"Token": Token,

				  //"X-File-Name":file.name,
					"X-Requested-With":"XMLHttpRequest"
				  }
		   }).then(function(response){
				defer.resolve(response);
			},function(errMsg){
				defer.reject(errMsg);
			});
            return defer.promise;
    }

    function getPagingParam(query)
  	{
  		var pageno = query.page;
  		var pagesize = query.limit;
  		var orderBy = query.order.trim();
  		var orderType;
      var fiqlCondStr = '';
  		if(orderBy.charAt(0) == "-"){
  			orderBy = orderBy.substring(1);
  			orderType = "desc";
  		}else{
  			orderType = "asc";
  		}


          var ll = (pageno - 1) * pagesize;
          var uu = pageno * pagesize;

          if(query.fiqlCond){
            fiqlCondStr = query.fiqlCond;
          }
          return "id=ge=0"+fiqlCondStr+"&orderBy="+orderBy+"&orderType="+orderType+"&ulimit="+ (uu-1) +"&llimit="+ ll +"&date="+new Date();
  		//return "id=ge=0&orderBy=modifiedTime&orderType=desc&ulimit="+ (uu-1) +"&llimit="+ ll +"&date="+new Date()
      }

	function uploadFileWithDataToUrl(file, uploadUrl,Data,docTags){
			//setCsrfCookie();
			var fd = new FormData();
        	fd.append('filedata', file);
        	fd.append('metadata', JSON.stringify(Data));
        	fd.append('docTags', JSON.stringify(docTags));
          return $http.post(uploadUrl, fd, {
              headers: {
					  			'Content-Type': undefined,
					  			//"Token": Token,
					  			"CSRF_TOKEN": getCookieClosePortal(),
					  			//"X-File-Name":file.name,
								"X-Requested-With":"XMLHttpRequest",
								//"Authorization":'Bearer ' + $rootScope.access_token
					  	}
          })
					.success(function(res){
				   	 	if(isAuthorize(res))
						{
							return res;
						}
						else
						{

							if($filter('HasValueFilterCore')(res[0].userExcepMsg))
							{
                                errorMsg = res[0].userExcepMsg;
							}
							else{
                                errorMsg = res[0].errorMsg;
							}
							Notification.displayToast("error",errorMsg);
                            return false;
						}
          })
          .error(function(error){
				return error;
          });
        }

		function openModelDialog(ev,controller,pageurl)
		{

		    $mdDialog.show({
				controller: controller,
				templateUrl: pageurl,
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true
            });
         }

	function getPagingParamForMatManagement  (query)
	{
		var pageno = query.page;
		var pagesize = query.limit;
		var orderBy = query.order.trim();
		var orderType;
		if(orderBy.charAt(0) == "-"){
			orderBy = orderBy.substring(1);
			orderType = "desc";
		}else{
			orderType = "asc";
		}


        var ll = (pageno - 1) * pagesize;
        var uu = pageno * pagesize;

        return "id=ge=0&orderBy="+orderBy+"&orderType="+orderType+"&ulimit="+ (uu-1) +"&llimit="+ ll +"&date="+new Date();
		//return "id=ge=0&orderBy=modifiedTime&orderType=desc&ulimit="+ (uu-1) +"&llimit="+ ll +"&date="+new Date()
	}

	function openToaster(type,msg,heading){
		msg=$filter('translate')(msg);
		if(type=="success"){
			toastr.success(msg,"");
		}
		else if(type=="info"){
			toastr.info(msg, "");
		}
		else if(type=="error"){
			toastr.error(msg, "");
		}
		else if(type=="warning"){
			toastr.warning(msg, "");
		}
	}

	function getfiqlParam(pagesize,pageno,orderby)
	{
			if(!$filter('HasValueFilterCore')(pagesize))
				pagesize=10;
			if(!$filter('HasValueFilterCore')(pageno))
				pageno=1;
			if($filter('HasValueFilterCore')(orderby)){
				orderby=orderby;
			}else{
				orderby='modifiedTime';
			}
			var llimit = (parseInt(pageno) - 1) * parseInt(pagesize);
            var ulimit = (pageno * pagesize)-1;
			return "ulimit="+ulimit+"&llimit="+llimit+"&orderBy="+orderby+"&orderType=desc";
	}

	function formatAsDate(dt, separator, showYear)
	{
		if ($filter('HasValueFilterCore')(dt))
		{
			if (!$filter('HasValueFilterCore')(separator))
				separator = "-";
			var newDate = new Date(dt);

			var date = newDate.getFullYear() + separator;
			var month = newDate.getMonth() + 1 + "";
			var day = newDate.getDate() + "";
			month = (month.length == 1 ? ("0" + month) : month);
			day = (day.length == 1 ? ("0" + day) : day);
			date += month + separator + day;
			return date;
		}
		else
			return "";
	}

	function replaceLeadingWhiteSpace()
	{
		jQuery("textarea").on("keypress", function(e) {
			if (e.which === 32 && !this.value.length)
			 e.preventDefault();
		});
		jQuery("input").on("keypress", function(e) {
		if (e.which === 32 && !this.value.length)
			e.preventDefault();
	});

	}

	function convertDateIntoYYYYMMDD (dueDate) {
			var date = new Date(dueDate),
            mnth = ("0" + (date.getMonth()+1)).slice(-2),
            day  = ("0" + date.getDate()).slice(-2);
         return [ date.getFullYear(), mnth, day ].join("-");
	}

	function getCountryname(workspace)
    {
		var country='';
		switch(workspace){
			case "VERIZON WIRELESS"	:	country	=	"USA";	break;
			case "WIRELESS EnodeB"	:	country	=	"USA";	break;
			case "WIRELINE P2B"	:	country	=	"USA";	break;
			case "Vantage"	:	country	=	"USA";	break;
			case "FTTX"	:	country	=	"USA";	break;
			case "BTS"	:	country	=	"INDIA";	break;
			case "Facebook"	:	country	=	"USA";	break;
			case "eNodeB"	:	country	=	"USA"; break;
			case "Microwave" : country = "India"; break;
			default	:	country	=	"USA";	break;
		}
		GlobalConstantsCore.COUNTRY_NAME	=	country;
		return GlobalConstantsCore.COUNTRY_NAME;
	}
	function backToPreviousState()
    {
        //$window.history.back();
        $state.go($rootScope.$previousStateName,$rootScope.$previousStateParam);
    }

  }

})();
