(function() {
'use strict';

angular.module('app.core')
.directive("inputDecodeDirCore", inputDecodeDirCore)
	
.directive('scrollDirCore', scrollDirCore)
	
.directive('lightgallery',lightgallery)
	
.directive('number', number)

.directive('numberDecimal', numberDecimal)

.directive("stringToNumberDirCore", stringToNumberDirCore)

.directive('ngCkeditor', ngCkeditor)
	
.directive('compile', compile)
    
.directive('allowPatternDirCore',allowPatternDirCore)

.directive('setHeight', setHeight)

.directive('setHeightInner', setHeightInner)

.directive('setHeightAggrid',setHeightAggrid)

.directive('maxHeight', maxHeight)

.directive('minHeight', minHeight)

.directive('modalHeight', modalHeight)

.directive('setWorkflowHeight', setWorkflowHeight)

.directive('regexPatternDirCore',regexPatternDirCore)	

.directive('clickAndWait',clickAndWait)

.directive('loading',loading)

;

regexPatternDirCore.$inject = ['$timeout'];
function inputDecodeDirCore(){
	   return {
		  require: 'ngModel',
		  link: function(scope, element, attrs, ngModelController) {
			ngModelController.$parsers.push(function(data) {
			  //convert data from view format to model format
			  return angular.element('<div />').html(data).text(); //converted
			});
		
			ngModelController.$formatters.push(function(data) {
			  //convert data from model format to view format
			  return angular.element('<div />').html(data).text(); //converted
			});
		  }
		};
}

scrollDirCore.$inject = ['$timeout'];
	function scrollDirCore($timeout) {
		
		return {
			restrict: 'A',
			link: function(scope, element, attr) {
				scope.$watchCollection(attr.scroll, function(newVal) {
					$timeout(function() {
						element[0].scrollTop = element[0].scrollHeight;
					});
				});
			}
		};
	}

function lightgallery() {
	  return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			
		  if (scope.$last) {
			// ng-repeat is completed
			element.parent().lightGallery();
		  }
		}
	  };
	}	

function number() {
		return {
		  require: 'ngModel',
		  restrict: 'A',
		  link: function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function(inputValue) {
				var regex=/[^0-9]/gi;
				var cleanInputValue = inputValue.replace(regex, '');
				if (cleanInputValue != inputValue) {
				   modelCtrl.$setViewValue(cleanInputValue);
				   modelCtrl.$render();
				}
				return cleanInputValue;
			});
		  }
		};
	}

function numberDecimal() {
		return {
		  require: 'ngModel',
		  restrict: 'A',
		  link: function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function(inputValue) {
				var regex=/[^0-9\.\-]/gi;
				var cleanInputValue = inputValue.replace(regex, '');
				if (cleanInputValue != inputValue) {
				   modelCtrl.$setViewValue(cleanInputValue);
				   modelCtrl.$render();
				}
				return cleanInputValue;
			});
		  }
		};
	}

function stringToNumberDirCore(){
   return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {
		  ngModel.$parsers.push(function(value) {
			return '' + value;
		  });
		  ngModel.$formatters.push(function(value) {
			return parseFloat(value, 10);
		  });
		}
	};
}
	

  function ngCkeditor() {
    return {
        require: '?ngModel',
        link: function (scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0]);
            if (!ngModel) return;
            ck.on('instanceReady', function () {
                ck.setData(ngModel.$viewValue);
            });
            function updateModel() {
                scope.$apply(function () {
                ngModel.$setViewValue(ck.getData());
            });
        }
        ck.on('change', updateModel);
        ck.on('key', updateModel);
        ck.on('dataReady', updateModel);

        ngModel.$render = function (value) {
            ck.setData(ngModel.$viewValue);
        };
    }
};
}


compile.$inject = ['$compile'];
function compile($compile) {

    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          // watch the 'compile' expression for changes
          return scope.$eval(attrs.compile);
        },
        function(value) {
          // when the 'compile' expression changes
          // assign it into the current DOM
          element.html(value);

          // compile the new DOM and link it to the current
          // scope.
          // NOTE: we only compile .childNodes so that
          // we don't get into infinite loop compiling ourselves
          $compile(element.contents())(scope);
        }
    );
  };
}	

function allowPatternDirCore() {
	return {
		restrict: "A",
		scope: {
          pattern: '=allowPatternDirCore'
        },
		compile: function(tElement, tAttrs) {
			return function(scope, element, attrs) {
        // I handle key events
      
				element.bind("keypress", function(event) {
					var keyCode = event.which || event.keyCode; // I safely get the keyCode pressed from the event.
					var keyCodeChar = String.fromCharCode(keyCode); // I determine the char from the keyCode.
          
          // If the keyCode char does not match the allowed Regex Pattern, then don't allow the input into the field.
					if (!keyCodeChar.match(new RegExp(scope.pattern, "i")) && keyCode!=8 && keyCode!=9) {
						event.preventDefault();
						return false;
					}
          
				});
			};
		}
	};
}

setHeight.$inject = ['$window','$timeout','$filter'];
function setHeight($window,$timeout,$filter){
   return{
    scope: {
        isChipShow: '@',
        isDivShow:'=',
        heightCorrection:'='
      },
    link: function(scope, element, attrs){
		 function calculateHeight() {
			 var iframeHeight = window.innerHeight;
             var newHeight = iframeHeight - 270;
             
           if(attrs.isChipShow === "true") {
			   newHeight  = newHeight-64;
		   }
		    if(scope.isDivShow=== true) {
			  newHeight  = newHeight-165;
		   }
		   if($filter('HasValueFilterCore')(scope.heightCorrection)){
				newHeight  = newHeight+(scope.heightCorrection);
			}
           element.css('height', newHeight + 'px');
        }
           attrs.$observe('isChipShow', function(isChipShow) {
                if(isChipShow === "true"){
					calculateHeight();
				}else{
					 $timeout(function(){
					   calculateHeight();
					 },500);
					}
         });
         scope.$watch('isDivShow', function(newValues, oldValues) {
			   if(scope.isDivShow === true){
				calculateHeight();
			}else{
			  $timeout(function(){
				calculateHeight();
			  },500);
			 }
		   });
          jQuery(window).resize(function() {
               calculateHeight();
           });
          calculateHeight();
        angular.element(document).ready(function () {
        $timeout(function(){
           calculateHeight();
         },200);
    });
    }
  };
}


setHeightInner.$inject = ['$window','$timeout'];
function setHeightInner($window,$timeout){
   return{
    scope: {
        isChipShow: '@',
      },
    link: function(scope, element, attrs){
         function calculateHeight() {
			 var iframeHeight = window.innerHeight;
             var newHeight = iframeHeight - 316;
           if(attrs.isChipShow === "true") {
			   newHeight  = newHeight-64;
		   }
           element.css('height', newHeight + 'px');
        }
        attrs.$observe('isChipShow', function(isChipShow) {
                if(isChipShow === "true"){
					calculateHeight();
				}else{
					 $timeout(function(){
					   calculateHeight();
					 },500);
					}   
         });
          jQuery(window).resize(function() {
               calculateHeight();
           });
          calculateHeight();
        angular.element(document).ready(function () {
        $timeout(function(){
           calculateHeight();
         },200);
    });
    }
  };
}
setHeightAggrid.$inject = ['$window','$timeout','$filter'];
function setHeightAggrid($window,$timeout,$filter){
   return{
    scope: {
        isChipShow: '@',
        isDivShow:'=',
      },
    link: function(scope, element, attrs){
         function calculateHeight() {
			 var iframeHeight = window.innerHeight;
             var newHeight = iframeHeight - 210;
             
           if(attrs.isChipShow === "true") {
			   newHeight  = newHeight-64;
		   }
		    if(scope.isDivShow=== true) {
			  newHeight  = newHeight-165;
		   }
           element.css('height', newHeight + 'px');
        }
           attrs.$observe('isChipShow', function(isChipShow) {
                if(isChipShow === "true"){
					calculateHeight();
				}else{
					 $timeout(function(){
					   calculateHeight();
					 },1000);
					}
         });
         scope.$watch('isDivShow', function(newValues, oldValues) {
			   if(scope.isDivShow === true){
				calculateHeight();
			}else{
			  $timeout(function(){
				calculateHeight();
			  },500);
			 }
		   });
          jQuery(window).resize(function() {
					  calculateHeight();
              			  $timeout(function(){
						if($filter("HasValueFilterCore")(scope.$parent.gridOptions))
						{
								if($filter("HasValueFilterCore")(scope.$parent.gridOptions.api))
								{
									scope.$parent.gridOptions.api.sizeColumnsToFit();
								}
						}
			  },800);
           });
          calculateHeight();
        angular.element(document).ready(function () {
        $timeout(function(){
           calculateHeight();
         },200);
    });
    }
  };
}



maxHeight.$inject = ['$window'];  
function maxHeight($window){
  
  return{
	
    link: function(scope, element, attrs){
        
        element.css('maxHeight', $window.innerHeight-attrs.maxHeight);
    }
  };
}

minHeight.$inject = ['$window'];
function minHeight($window){
  
  return{
    link: function(scope, element, attrs){
        element.css('minHeight', $window.innerHeight-attrs.minHeight);
    }
  };
}

modalHeight.$inject = ['$window'];
function modalHeight($window){
  
  return{
    link: function(scope, element, attrs){
        element.css('maxHeight', $window.innerHeight-380);
    }
  };
}

setWorkflowHeight.$inject = ['$window'];
function setWorkflowHeight($window){
  
  return{
    link: function(scope, element, attrs){
      var setworkflowHeight = $window.innerHeight-209;
      element.css('height', setworkflowHeight);  
    }
  };
}

function regexPatternDirCore($timeout) {
return {
		restrict: "A",
		 require: "ngModel",
		compile: function(tElement, tAttrs) {
			return function(scope, element, attrs,ngModel) {
        // I handle key events
      var str = '';
				element.bind("keypress", function(event) {
					var keyCode = event.which || event.keyCode; // I safely get the keyCode pressed from the event.
					var keyCodeChar = String.fromCharCode(keyCode); // I determine the char from the keyCode.
					
					/**************************************/
					var eLength = element[0].value.length;
                    if(eLength===0) {
                      if(keyCode==32) {
                        event.preventDefault();
                        return false;
                      }
                    }
					if(eLength>=1) {
                      if(keyCode==32) {
                        if(element[0].value.charCodeAt(eLength-1)==32){
                          event.preventDefault();
                          return false;
                        }
                      }
                    }
                    if ([0, 8, 9].indexOf(keyCode) !== -1) return;
                    str=angular.element(element).val()+keyCodeChar;
					/**************************************/
          
          // If the keyCode char does not match the allowed Regex Pattern, then don't allow the input into the field.
					if (!str.match(new RegExp(attrs.regexPatternDirCore, "i")) && keyCode!=8 && keyCode!=9) {
						event.preventDefault();
						return false;
					}
          
				});
				element.bind("paste", function(event) {
				str=event.originalEvent.clipboardData.getData('Text');
                 var setstr = '';
				
					/**************************************/
          // If the str does not match the allowed Regex Pattern, then don't allow the input into the field.
					for (var i = 0, len = str.length; i < len; i++) {
						if (str[i].match(new RegExp(attrs.regexPatternDirCore, "i"))) {
							setstr+=str[i];
						}
					}
					$timeout(function(){
					ngModel.$setViewValue(ngModel.$modelValue.replace(str,setstr));
					ngModel.$render();
					},50);
				});
			};
		}
	};
}


function clickAndWait()
{
	return {
    restrict: 'A',
    scope: {
      asyncAction: '&clickAndWait'
    },
    link: function link(scope, element) {
      element.bind('click', function () {
        element.prop('disabled', true);
        scope.$apply(function () {
          scope.asyncAction().finally(function () {
            element.prop('disabled', false);
          });
        });
      });
    }
  };
}
/* fn to show loading bar globaly */
function loading(){
  return{
		restrict: 'E',
		scope:{
			promise : '=',
		},
		template : '<div layout="row" class="overlay" layout-sm="column" layout-align="space-around" ng-show="isLoadingDataShow"><img src="../app/assets/img/circularbar.gif" alt="center option" width="65px" height="65px"/></div>',
    link: function(scope, element, attrs){
			scope.isLoadingDataShow = true;
      scope.$watch('promise.$$state.value',function(newVal,oldVal){
				 if(newVal !== oldVal)
					 {
						 scope.isLoadingDataShow = !scope.isLoadingDataShow;
					 }
			});
    }
  };
}	
})();


