(function()
   {'use strict';
    angular.module('app.common').directive('fileModel',['$parse', function($parse)
       {return  {restrict: 'A', link: function(scope, element, attrs)
           {var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function()
               {scope.$apply(function()
                   {modelSetter(scope, element[0].files[0]);
                   });
               });
           }
       };
       }]).directive('timeAgo',['timeAgo', 'nowTime', function(timeAgo, nowTime)
       {return  {scope: 
        {fromTime: '@', format: '@' }, restrict: 'EA', link: function(scope, elem)
           {var fromTime = timeAgo.parse(scope.fromTime);
            scope.$watch(function()
               {return nowTime() - fromTime;
               }, function(value)
               {angular.element(elem).text(timeAgo.inWords(value, fromTime, scope.format));
               });
           }
       };
       }]).directive('allowPattern', function()
       {return  {restrict: "A", compile: function(tElement, tAttrs)
           {return function(scope, element, attrs)
               {// I handle key events
               element.bind("keypress", function(event)
                   {var keyCode = event.which || event.keyCode; // I safely get the keyCode pressed from the event.
                    var keyCodeChar = String.fromCharCode(keyCode); // I determine the char from the keyCode.
                      // If the keyCode char does not match the allowed Regex Pattern, then don't allow the input into the field.
                    if ( ! keyCodeChar.match(new RegExp(attrs.allowPattern, "i")))
                       {event.preventDefault();
                        return false;
                       }
                   });
               };
           }
       };
       }).directive("limitTo",[function()
       {return  {restrict: "A", link: function(scope, elem, attrs)
           {var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function(e)
               {if (this.value.length == limit) e.preventDefault();
               });
           }
       };
       }]).directive('ngMin',['$filter', function($filter)
       {return  {restrict: 'A', require: 'ngModel', link: function(scope, elem, attr, ctrl)
           {scope.$watch(attr.ngMin, function()
               {ctrl.$setViewValue(ctrl.$viewValue);
               });
           
            var minValidator = function(value)
               {//var min = scope.$eval(attr.ngMin) || 0;
               var min = attr.ngMin;
                if ($filter("HasValueFilterCore")(value) && value < min)
                   {ctrl.$setValidity('ngMin', false);
                    ctrl.$setTouched();
                    return undefined;
                   }
                else 
                   {ctrl.$setValidity('ngMin', true);
                    return value;
                   }
               };
            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
           }
       };
       }]).directive('ngMax',['$filter', function($filter)
       {return  {restrict: 'A', require: 'ngModel', link: function(scope, elem, attr, ctrl)
           {scope.$watch(attr.ngMax, function()
               {ctrl.$setViewValue(ctrl.$viewValue);
               });
           
            var maxValidator = function(value)
               {//var min = scope.$eval(attr.ngMax) || 0;
               value = parseInt(value);
                var max = parseInt(attr.ngMax);
                if ($filter("HasValueFilterCore")(value) && value > max)
                   {ctrl.$setValidity('ngMax', false);
                    ctrl.$setTouched();
                    return undefined;
                   }
                else 
                   {ctrl.$setValidity('ngMax', true);
                    return value;
                   }
               };
            ctrl.$parsers.push(maxValidator);
            ctrl.$formatters.push(maxValidator);
           }
       };
       }]).directive('currencyInputcont', function(){
		var splice = function(string, idx, rem, s) {
		  return (string.slice(0, idx) + s + string.slice(idx + Math.abs(rem)));
		};
		return {
			  restrict: 'A',
			  replace: true,
			  require: "ngModel",
				  link: function(scope, element, attr ,ngModel) {
					 element.bind('keyup', function() {
					  var data = ngModel.$viewValue;
					  //clearing left side zeros
					  while (data.charAt(0) === '0') {
						data = data.substr(1);
					  }

					  data = data.replace(/[^\d.\',']/g, '');

					  var point = data.indexOf('.');
					  if (point >= 0) {
						data = data.slice(0, point + 3);
					  }

					  var decimalSplit = data.split('.');
					  var intPart = decimalSplit[0];
					  var decPart = decimalSplit[1];

					  intPart = intPart.replace(/[^\d]/g, '');
					  if (intPart.length > 3) {
						var intDiv = Math.floor(intPart.length / 3);
						while (intDiv > 0) {
						  var lastComma = intPart.indexOf(',');
						  if (lastComma < 0) {
							lastComma = intPart.length;
						  }

						  if (lastComma - 3 > 0) {
							intPart = splice(intPart, lastComma - 3, 0, ',');
						  }
						  intDiv--;
						}
					  }

					  if (decPart === undefined) {
						decPart = '';
					  }
					  else {
						decPart = '.' + decPart;
					  }
					  var res = intPart + decPart;
					  scope.$apply(function() {
						ngModel.$setViewValue(res);
						ngModel.$render();
					  });
					});
				  }
    };
  }).directive("outsideClick", ['$document', '$parse', function($document, $parse) {
		  return {
			link: function($scope, $element, $attributes) {
			 
			  var scopeExpression = $attributes.outsideClick,
				onDocumentClick = function(event) {
				  // check for flag
				  if(!$scope.closeFlag) {
					$scope.closeFlag = true;
					return;
				  }
				  
				  
				  var parent = event.target;

				  while (parent && parent !== $element[0]) {
					parent = parent.parentNode;
				  }

					 /* error coming in emf because of this */
					 
				  //~ if (!parent) {
					//~ $scope.$apply(scopeExpression);
				  //~ }
				};

			  $document.on("click", onDocumentClick);

			  $element.on('$destroy', function() {
				$document.off("click", onDocumentClick);
			  });
			}
		  };
		}]);
   })();
