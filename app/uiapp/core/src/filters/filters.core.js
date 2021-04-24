(function() {
'use strict';

angular.module('app.core')
	.filter('HasValueFilterCore',function(){
		return function(val) {
        return (val !== null && val !== 0 && val !== undefined && val != "undefined" && val != "null"   && (val !== "" || String(val) == "0") && val != "-Please select-" && val != "--" && ((angular.isArray(val) ? (val.length>0 ? true : false): true) ));//&& !isNaN(val) && val != "NaN"
        };
	})
	.filter('IsIntegerFilterCore',function(){
		return function (value)
	{
		var isNumber = /^\d+$/.test(value);
		return isNumber;
	};
	})
	.filter('AllRolesFilterCore',['$filter',function($filter) {
			return function (userRoleObj) {
            if ($filter("HasValueFilterCore")(userRoleObj)){
				var userRoleArray=[];
				for(var i=0;i<userRoleObj.length;i++)
				{
					 if(userRoleObj[i].role.workspace.workspaceName!='Issue_Tracker')
					 userRoleArray.push(userRoleObj[i]);
				}
				return userRoleArray;
            }
       	};
		
}])


.filter("GetImagePathForFormBuilderFilterCore",['$filter',function($filter){
	   return function(file){
		   var path="";
		   if($filter("HasValueFilterCore")(file) && $filter("HasValueFilterCore")(file.path) && $filter("HasValueFilterCore")(file.name)){
				var fileName=$filter('HtmlDecodeFilterCore')(file.name);
				var extenarray=fileName.split('.');
				var type=extenarray[extenarray.length-1];
				if($filter("uppercase")(type)=='JPG' || $filter("uppercase")(type)=='JPEG' || $filter("uppercase")(type)=='PNG'){
					path=$filter("HtmlDecodeFilterCore")(file.path);
				}
				else if($filter("uppercase")(type)=='XLSX'){
					path="/app/assets/img/extension/xlsx.png";
				}
				else if($filter("uppercase")(type)=='XLS'){
					path="/app/assets/img/extension/xls.png";
				}
				else if($filter("uppercase")(type)=='PDF'){
					path="/app/assets/img/extension/pdf.png";
				}
				else if($filter("uppercase")(type)=='DOC'){
					path="/app/assets/img/extension/doc.png";
				}
				else if($filter("uppercase")(type)=='DOCX'){
					path="/app/assets/img/extension/docx.png";
				}
				else{
					path="/app/assets/img/extension/file.png";
				}
				return path;
		}
	   };
	}])



	.filter('SetDecimalFilterCore',function(){
            return function(input, places){
                if (isNaN(input)) return input;
            // If we want 1 decimal place, we want to mult/div by 10
            // If we want 2 decimal places, we want to mult/div by 100, etc
            // So use the following to create that factor
            var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
            return Math.round(input * factor) / factor;
            };
        })

	
	.filter("getSiteInfoFilter",['$filter',function($filter){
	   return function(param,paramType){
		    param = $filter("HtmlDecodeFilterCore")(param);
			var splitParam = param.split("##");
			
			var resp="";
			if(paramType===0){
				resp = splitParam[0];
            }else if(paramType===1){
				resp = splitParam[1];
            }else if(paramType===2){
				resp = splitParam[2];
			}
			return resp;
			
	   };
	}])
/*this function is to get the yesterday's date*/
	.filter("GetNextDateFilterCore",['$filter',function($filter){
	   return function(date){
		var dateString = date;
		var actualDate = new Date(dateString);
		var newDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate());	
		return $filter("ConvertToSendFormatFordateFilterCore")(newDate);
	   };
	}])
/* this function is to get the before date from the passed days */
	.filter("GetBeforeDateFilterCore",['$filter',function($filter){
	   return function(days){
			var today = new Date();
			var todayTime = today.getTime();
			var one_day = 1000 * 60 * 60 * 24;
			var beforeTime = todayTime - (parseInt(days) * one_day);
			var beforeDate = new Date(beforeTime);
			return beforeDate;
	   };
	}])
/*this function is to get the current week start date*/
	.filter("GetCurrentWeekFilterCore",['$filter',function($filter){
	   return function(){
		   var curr = new Date();
		   var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
		   var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
		   return firstday;
	   };
	}])
/*this function is to get the last week start date*/
	.filter("GetLastWeekFilterCore",['$filter',function($filter){
	   return function(){
		   var curr = new Date();
		   var firstday = moment().subtract((7+curr.getDay()),'days').toDate();
		   var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
		   return firstday;
	   };
	}])
/*this function is to get the current month start date*/
	.filter("GetCurrentMonthFilterCore",['$filter',function($filter){
	   return function(){
		  var date = new Date();
		   var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		   return firstDay;
	   };
	}])
	/*this function is to get the current quarter start date*/
	.filter("GetCurrentQuarterFilterCore",['$filter',function($filter){
	   return function(){
		   var today = new Date();
		   var month = today.getMonth();
		   if (month === 0 || month == 1 || month == 2) return new Date(today.getFullYear(), 0, 1);
		   if (month == 3 || month == 4 || month == 5) return new Date(today.getFullYear(), 3, 1);
		   if (month == 6 || month == 7 || month == 8) return new Date(today.getFullYear(), 6, 1);
		   if (month == 9 || month == 10 || month == 11) return new Date(today.getFullYear(), 9, 1);
	   };
	}])
	.filter("GetCurrentQuarterNextToEndDateFilterCore",['$filter',function($filter){
	   return function(){
		   var today = new Date();
		   var month = today.getMonth();
		   if (month === 0 || month == 1 || month == 2)   return new Date(today.getFullYear(), 3, 1);
		   if (month == 3 || month == 4 || month == 5) return new Date(today.getFullYear(), 6, 1);
		   if (month == 6 || month == 7 || month == 8) return new Date(today.getFullYear(), 9, 1); 
		   if (month == 9 || month == 10 || month == 11) return new Date(today.getFullYear()+1, 0, 1);
	   };
	}])
	/*this function is to get the current year start date*/
	.filter("GetCurrentYearFilterCore",['$filter',function($filter){
	   return function(){
			var today = new Date();
			return new Date(today.getFullYear(), 0, 1);
	   };
	}])
 /* this function is to return the date based on the value selected */
	.filter("GetSearchDateValueFilterCore",['$filter',function($filter){
	   return function(value){
			var val = "";
			if (value == "Any_time")
				val = "";
			if (value == "0")
				val = new Date();
			if (value == "1")
				val = $filter("GetBeforeDateFilterCore")('1');
			if (value == "7")
				val = $filter("GetCurrentWeekFilterCore")();
			if (value == "14")
				val = $filter("GetLastWeekFilterCore")();
			if (value == "15")
				val = $filter("GetBeforeDateFilterCore")('15');
			if (value == "30")
				val = $filter("GetCurrentMonthFilterCore")();
			if (value == "60")
				val = $filter("GetLastMonthFilterCore")();
			if (value == "90")
				val = $filter("GetCurrentQuarterFilterCore")();
			if (value == "180")
				val = $filter("GetLastQuarterFilterCore")();
			if (value == "365")
				val = $filter("GetCurrentYearFilterCore")();
			if (value == "730")
				val = $filter("GetLastYearFilterCore")();
			if ($filter("HasValueFilterCore")(val))
			{
				return $filter("ConvertToSendFormatFordateFilterCore")(val);
			}
			else
				return "";
	   };
	}])
	/*this function is to check Leap year*/
	.filter("IsLeapYearFilterCore",['$filter',function($filter){
	   return function(year){
			var result; 
			if( (0 === year % 4) && (0 !== year % 100) || (0 === year % 400) ){
				result = true;
			}else{
				result= false;
			}
			return result;
	   };
	}])
	/*function to convert date inputs to sending Date format*/
	.filter("ConvertToSendFormatFordateFilterCore",['$filter',function($filter){
	   return function(dateObj){
			var currentDate = dateObj.getDate();
			var currentMonth = dateObj.getMonth() + 1;
			var currentYear = dateObj.getFullYear();

			var currentHour = dateObj.getHours();
			var currentMinute = dateObj.getMinutes();
			var currentSecond = dateObj.getSeconds();

			var dateToSend = currentYear + "-" + currentMonth + "-" + currentDate;
			return dateToSend;
	   };
	}])
	/*this function is to get the current week end date*/
	.filter("GetCurrentWeekEndDateFilterCore",['$filter',function($filter){
	   return function(){
			var curr = new Date();
			var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
			var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
			return $filter("ConvertToSendFormatFordateFilterCore")(lastday);
	   };
	}])
	/*this function is to get the current quarter end date*/
	.filter("GetCurrentQuarterEndDateFilterCore",['$filter',function($filter){
	   return function(){
			var today = new Date();
			var month = today.getMonth();
			if (month === 0 || month == 1 || month == 2) return new Date(today.getFullYear(), 2, 31);
			if (month == 3 || month == 4 || month == 5) return new Date(today.getFullYear(), 5, 30);
			if (month == 6 || month == 7 || month == 8) return new Date(today.getFullYear(), 8, 30);
			if (month == 9 || month == 10 || month == 11) return new Date(today.getFullYear(), 11, 31);
	   };
	}])
	/*this function is to get the current year end date*/
	.filter("GetCurrentYearEndDateFilterCore",['$filter',function($filter){
	   return function(){
			var today = new Date();
			return new Date(today.getFullYear(), 11, 31);
	   };
	}])
	/*this function is to get the current month end date*/
	.filter("GetCurrentMonthLastDateFilterCore",['$filter',function($filter){
	   return function(){
		   var date = new Date();
		   var lastDay ='';
			if(date.getMonth()===0){
				lastDay = new Date(date.getFullYear(), date.getMonth(), 31);
			}
			if(date.getMonth()==1){
				if($filter('IsLeapYearFilterCore')(date.getFullYear())){
					lastDay = new Date(date.getFullYear(), date.getMonth(), 29);
				}else{
					lastDay = new Date(date.getFullYear(), date.getMonth(), 28);
				}
			}
			if(date.getMonth()==2){
				lastDay = new Date(date.getFullYear(), date.getMonth(), 31);
			}
			if(date.getMonth()==3){
				lastDay = new Date(date.getFullYear(), date.getMonth(), 30);
			}
			if(date.getMonth()==4){
				lastDay = new Date(date.getFullYear(), date.getMonth(), 31);
			}
			if(date.getMonth()==5){
				lastDay = new Date(date.getFullYear(), date.getMonth(), 30);
			}
			if(date.getMonth()==6){
				lastDay = new Date(date.getFullYear(), date.getMonth(), 31);
			}
			if(date.getMonth()==7){
				lastDay = new Date(date.getFullYear(), date.getMonth(), 31);
			}
			if(date.getMonth()==8){
				lastDay = new Date(date.getFullYear(), date.getMonth(), 30);
			}
			if(date.getMonth()==9){
				lastDay = new Date(date.getFullYear(), date.getMonth(), 31);
			}
			if(date.getMonth()==10){
				lastDay = new Date(date.getFullYear(), date.getMonth(), 30);
			}
			if(date.getMonth()==11){
				lastDay = new Date(date.getFullYear(), date.getMonth(), 31);
			}
		   return $filter("ConvertToSendFormatFordateFilterCore")(lastDay);
	   };
	}])
	.filter("FormatInCamelStringFilterCore",['$filter',function($filter){
	   return function(value){
			var rankName = [];
			rankName = value.split(" ");
			var str = "";
			var size = rankName.length;
			for (var i = 0; i < rankName.length; i++)
			{
				var fc = rankName[i].charAt(0).toUpperCase();
				str += fc + rankName[i].substr(1, rankName[i].length - 1).toLowerCase() + " ";
			}
			return str.substr(0, str.length - 1);
	   };
	}])
	.filter("FormatInCamelStringUnderscoreFilterCore",['$filter',function($filter){
	   return function(value){
			var rankName = [];
			rankName = value.split("_");
			var str = "";
			var size = rankName.length;
			for (var i = 0; i < rankName.length; i++)
			{
				var fc = rankName[i].charAt(0).toUpperCase();
				str += fc + rankName[i].substr(1, rankName[i].length - 1).toLowerCase();
			}

			return str;
	   };
	}])
	
	.filter("HtmlDecodeFilterCore",['$filter',function($filter){
	   return function(value){
		  
		if ($filter("HasValueFilterCore")(value))
		{
			return angular.element('<div />').html(value).text();
		}
		else
		{
			return '';
		}
	   };
	}])
	.filter("HtmlDecodeFilterCoreHypen",['$filter',function($filter){
	   return function(value){
		  
		if ($filter("HasValueFilterCore")(value))
		{
			return angular.element('<div />').html(value).text();
		}
		else
		{
			return '--';
		}
	   };
	}])
	.filter("HtmlDecodeFilterCoreWithPrefixDot",['$filter',function($filter){
	   return function(value){
		  
		if ($filter("HasValueFilterCore")(value))
		{
			value = "../"+value;
			return angular.element('<div />').html(value).text();
		}
		else
		{
			return '';
		}
	   };
	  }])
	.filter("UniqueFilterCore",function(){
	 
  return function (items, filterOn) {
    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
})

.filter('capitalizeFilterCore', function() {
    return function(input, scope) {
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    };
})

.filter('capitalizeStringFilterCore', function() {
    return function(input, scope) {
        return input.toUpperCase();
    };
})

.filter('LowerCaseFilterCore', function() {
    return function(input, scope) {
        return input.toLowerCase();
    };
})


 .filter('IsObjectFilterCore',['$filter',function($filter){
	return function(value) {
		try{
			value = JSON.parse(value);
			if(angular.isObject(value)){
				if($filter('HasValueFilterCore')(value.addressComponents) || $filter('HasValueFilterCore')(value.address_components)){
					return value.formatted_address;
				}else {
					return value;
				}
			}else {
				return value;
			}
		}catch(e){
			return value;
		}
		return value;
		
	};
	}])
.filter('FormatStringEllipsisFilterCore',['$filter',function($filter){
		return function(value, length) {
			var val = "";		
			if ($filter('HasValueFilterCore')(value))
			{
				var len = value.length;				
				if (len > length)
				{
					var str = value.substring(0, length);
					val = str + "...";
				}
				else
					return value;
				return val;
			}
			else
				return "--";
		};
		}])
		
.filter('formateStatus',['$filter', function($filter){
       return function(value){
            switch(value)  
            {
                case 'Inprogress' : return 'In Progress';
                case 'New' : return 'New';
                case 'RFS' : return 'Ready for Survey';
                case 'pending' : return 'Pending';
                default: return value;
            }
       };
    }])
	
.filter('replaceUnderscoreFilterCore',['$filter', function ($filter) {
       	return function (input) {
            if($filter('HasValueFilterCore')(input)){
            	 return input.replace(/_/g, ' ');
            }
       	};
    
	}])
	.filter('replaceUnderscoreWithFilterCore',['$filter', function ($filter) {
       	return function (input,replaceWith) {
            if($filter('HasValueFilterCore')(input)){
            	 return input.replace(/_/g, replaceWith);
            }
       	};

	}])
	.filter('replaceSpaceWithFilterCore',['$filter', function ($filter) {
       	return function (input,replaceWith) {
            if($filter('HasValueFilterCore')(input)){
            	 return input.replace(/ /g, replaceWith);
            }
       	};

	}])
	.filter('substringStrByLastIndexFilterCore',['$filter',function($filter){
        return function(filePath) {
            filePath = $filter("HtmlDecodeFilterCore")(filePath);
			 filePath=filePath.substring(filePath.lastIndexOf("/")+1,filePath.length);
			 return filePath;
        };
   }])
   .filter('FormatRegionNameFilterCore',['$filter','GlobalConstantsCommon',function($filter,GlobalConstantsCommon){
        return function(regionName) {
            regionName = $filter("HtmlDecodeFilterCore")(regionName);
            switch(regionName)
            {
                case GlobalConstantsCommon.REGIONS_NAME.All.ACTUAL : return GlobalConstantsCommon.REGIONS_NAME.All.TOSHOW;
                case GlobalConstantsCommon.REGIONS_NAME.Northeast.ACTUAL : return GlobalConstantsCommon.REGIONS_NAME.Northeast.TOSHOW;
                case GlobalConstantsCommon.REGIONS_NAME.Midwest.ACTUAL : return GlobalConstantsCommon.REGIONS_NAME.Midwest.TOSHOW;
                case GlobalConstantsCommon.REGIONS_NAME.South.ACTUAL : return GlobalConstantsCommon.REGIONS_NAME.South.TOSHOW;
                case GlobalConstantsCommon.REGIONS_NAME.West.ACTUAL : return GlobalConstantsCommon.REGIONS_NAME.West.TOSHOW;
                default : return regionName;
                
            }
        };
   }])
	.filter('FormatRichTextValueFilterCore',['$filter',function($filter){
		return function(value) {
		
		value = $filter('ReplaceAllFilterCore')("\\", value, "\\\\");
		value = $filter('ReplaceAllFilterCore')("\"", value, "\\\"");
		return value;
		};
		}])
	.filter("ReplaceCharForFilterCore",['$filter',function($filter){
	   return function(value){
		value = $filter("ReplaceAllFilterCore")(")", value, "%29");
		value = $filter("ReplaceAllFilterCore")("(", value, "%28");
		value = $filter("ReplaceAllFilterCore")("/", value, "%2F");
		value = $filter("ReplaceAllFilterCore")("&", value, "%26");
		value = $filter("ReplaceAllFilterCore")("_", value, "%5F");
		return value;
	};
	}])
	.filter("ReplaceSpaceToUnderScoreFilterCore",['$filter',function($filter){
	   return function(value){
		var newValue = $filter("ReplaceAllFilterCore")(" ", value, "_");
		return newValue;
	};
	}])
	.filter('ReplaceAllFilterCore',['$filter',function($filter){
	return function(oldStrPattern, str, newStrPattern)
   {
	var temp = "";
	if (str !== null && oldStrPattern !== null)
	{
		var idx = str.indexOf(oldStrPattern);
		while (idx > -1)
		{
			temp += str.substr(0, idx);
			temp += newStrPattern;
			str = str.substr(idx + oldStrPattern.length, str.length);
			idx = str.indexOf(oldStrPattern);
		}
		temp += str;
	}
	return temp;
	};
	}])
	
	 .filter('TitleCaseFilterCore', ['$filter',function($filter){
    return function (input) {
        var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

        input = input.toLowerCase();
        return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
            if (index > 0 && index + match.length !== title.length &&
                match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLowerCase();
            }

            if (match.substr(1).search(/[A-Z]|\../) > -1) {
                return match;
            }

            return match.charAt(0).toUpperCase() + match.substr(1);
        });
    };
}])
	 .filter('Filesize', function () {
		return function (size) {
			if (isNaN(size))
				size = 0;
			if (size < 1024)
				return size + ' Bytes';
			size /= 1024;
			if (size < 1024)
				return size.toFixed(2) + ' KB';
			size /= 1024;
			if (size < 1024)
				return size.toFixed(2) + ' MB';
			size /= 1024;
			if (size < 1024)
				return size.toFixed(2) + ' GB';
			size /= 1024;
			return size.toFixed(2) + ' TB';
		};
	})
	.filter('GetLastWeekStartDateFilterCore',['$filter', function ($filter) {
			return function () {
				return moment(moment().subtract(1, 'weeks').startOf('isoWeek')).subtract(1,'days').format('YYYY-MM-DD');
			};
	}]).filter('GetLastWeekEndDateFilterCore',['$filter', function ($filter) {
			return function () {
				return moment(moment().subtract(1, 'weeks').endOf('isoWeek')).subtract(1,'days').format('YYYY-MM-DD');
			};
	}]).filter('GetLastMonthStartDateFilterCore',['$filter', function ($filter) {
			return function () {
				return moment().subtract(1,'months').startOf('month').format('YYYY-MM-DD');
			};
	}]).filter('GetLastMonthEndDateFilterCore',['$filter', function ($filter) {
			return function () {
				return moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD');
			};
	}]).filter('GetLastYearStartDateFilterCore',['$filter', function ($filter) {
			return function () {
				return moment().subtract(1,'years').startOf('years').format('YYYY-MM-DD');
			};
	}]).filter('GetLastYearEndDateFilterCore',['$filter', function ($filter) {
			return function () {
				return moment().subtract(1,'years').endOf('years').format('YYYY-MM-DD');
			};
	}]).filter('GetLastQuarterStartDateFilterCore',['$filter', function ($filter) {
			return function () {
				var d = new Date(),
				m = d.getMonth() - d.getMonth() % 3;
				var qtrDate=moment(new Date(d.getFullYear(), m, 1));
				var qtrStartDate=moment(qtrDate).subtract(3,'months').format('YYYY-MM-DD');
				return qtrStartDate;
			};
	}]).filter('GetLastQuarterEndDateFilterCore',['$filter', function ($filter) {
			return function () {
				var d = new Date(),
				m = d.getMonth() - d.getMonth() % 3;
				var qtrDate=moment(new Date(d.getFullYear(), m, 1));
				var qtrEndDate=moment(qtrDate).subtract(1,'days').format('YYYY-MM-DD');
				return qtrEndDate;
			};
	}]).filter('GetCurrentYearStartDateFilterCore',['$filter', function ($filter) {
			return function () {
				return moment().startOf('years').format('YYYY-MM-DD');
			};
	}]).filter('ConvertTimeStamp2DateFilterCore',['$filter', function ($filter) {
			return function (data, type, full)
{
	if (data !== null)
	{
		var date;
		if ($filter("IsIntegerFilterCore")(data))
			date = new Date(parseInt(data));
		else
			date = new Date(data);

		var str = date.toDateString();
		return str;
	}

	return "";
};
	}]).filter('GetCurrentDateFilterCore',['$filter', function ($filter) {
			return function () {
				var dateObj = new Date();
				return dateObj.getFullYear() + "-" + (((dateObj.getMonth() + 1) < 10) ? "0" : "") + (dateObj.getMonth() + 1) + "-" + ((dateObj.getDate() < 10) ? "0" : "") + dateObj.getDate();
			};
	}]).filter('regionFilterCore', function() {
		return function(input) {
		  if(input=="All"){
		  	return "All";
		  }
		  	return input;
		};
	 })
	.filter('MDFormatFilterCore', function() {
		return function (MMDD) {
    MMDD = new Date(MMDD);

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var strDate = "";

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);

    var tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    //

    if (today.getTime() == MMDD.getTime()) {
        strDate = "Today";
    } else if (yesterday.getTime() == MMDD.getTime()) {
        strDate = "Yesterday";
    } else if (tomorrow.getTime() == MMDD.getTime()) {
        strDate = "Tomorrow";
    } else {
        strDate = months[MMDD.getMonth()] + "-" + MMDD.getDate();
    }

    return strDate;
}
;
	 })
	 .filter('FormateWCBtnNameFilterCore',['$filter','GlobalConstantsCommon',function($filter,GlobalConstantsCommon){
        return function(taskName,callFor) {
            taskName = $filter("HtmlDecodeFilterCore")(taskName);
            if(callFor == 'View')
            {
                switch(taskName)
                {
                    case GlobalConstantsCommon.WIRE_CENTER_TASK_NAME.DETAIL_DESIGN.ACTUAL.toLowerCase() : return "View Ewop";
                    case GlobalConstantsCommon.WIRE_CENTER_TASK_NAME.PROVIDE_WIRECENTER_DOCUMENTS.ACTUAL.toLowerCase() : return "View";
                    default : return "View";
                    
                }
            }
            else
            {
                switch(taskName)
                {
                    case GlobalConstantsCommon.WIRE_CENTER_TASK_NAME.DETAIL_DESIGN.ACTUAL.toLowerCase() : return "Add EWOP";
                    case GlobalConstantsCommon.WIRE_CENTER_TASK_NAME.PROVIDE_WIRECENTER_DOCUMENTS.ACTUAL.toLowerCase() : return "Perform";
                    case GlobalConstantsCommon.WIRE_CENTER_TASK_NAME.EXECUTE_CHECKLIST.ACTUAL.toLowerCase() : return "Execute";
                    default : return "Perform";
                    
                }
            }
        };
   }])
   
    .filter('GetRandomNumberFilterCore', function() {
		return function(value) {
			
			return Math.floor((Math.random()*value)+1);
		};
	 })
    .filter('getFormattedDateFilterCore', ['$filter',function($filter) {
		return function(dt, separator, showYear) {
			if (!$filter("HasValueFilterCore")(separator))
			separator = "-";
		var day = dt.getDate();
		if (day < 10)
			day = "0" + day;
		var date = day + separator + $filter('getMonthNameFilterCore')(dt.getMonth());
		if (showYear)
		{
			var curYear = dt.getFullYear();
			date += separator + curYear.toString().slice(2);
		}
		return date;
		};
	 }]).
	 /* determine the monthname based on value */
	filter('getMonthNameFilterCore',['$filter',function($filter) {
	return function(monthNum) {
	var monthName = "Unknown";
	switch (monthNum)
	{
		case 0:
			monthName = "Jan";
			break;
		case 1:
			monthName = "Feb";
			break;
		case 2:
			monthName = "Mar";
			break;
		case 3:
			monthName = "Apr";
			break;
		case 4:
			monthName = "May";
			break;
		case 5:
			monthName = "Jun";
			break;
		case 6:
			monthName = "Jul";
			break;
		case 7:
			monthName = "Aug";
			break;
		case 8:
			monthName = "Sep";
			break;
		case 9:
			monthName = "Oct";
			break;
		case 10:
			monthName = "Nov";
			break;
		case 11:
			monthName = "Dec";
			break;
	}
	return monthName;
	};
}]).filter('formatDD_MM_YYYYToYYYY_MM_DDFilterCore',['$filter', function($filter) {
		return function(dt) {
			if ($filter("HasValueFilterCore")(dt))
			{
				var separator = "-";
				var split = dt.split("-");
				if (split[2].length == 4)
				{
					var date = split[0] + "";
					var month = split[1] + "";
					var day = split[2] + "";
					day += separator + month + separator + date;
					return day;
				}
				else
				{
					return dt;
				}

			}
			return "";
		};
	 }])
	 
	 
    .filter('formatAsDateFilterCore',['$filter', function($filter) {
		return function(dt, separator, showYear) {
			if ($filter('HasValueFilterCore')(dt))
	{
		if (!$filter('HasValueFilterCore')(separator))
			separator = "-";
		var newDate = new Date(dt);

		var month = newDate.getMonth() + 1 + "";
		var day = newDate.getDate() + "";
		var year = newDate.getFullYear();
		month = (month.length == 1 ? ("0" + month) : month);
		day = (day.length == 1 ? ("0" + day) : day);
		var date = day + separator + month + separator + year;

		return date;
	}
	else
		return "";
	};
	 }])
	 .filter("ReplaceBrToNewLineFilterCore",['$filter',function($filter){
	   return function(value){
		  
		if ($filter("HasValueFilterCore")(value))
		{
			return value.replace(/<br\s*\/?>/mg,"\n");
		}
		else
		{
			return '';
		}
	   };
	}])
	 .filter("GetUniqueArrayFilterCore",['$filter',function($filter){
	   return function(arr)
		{
			if (arr.length > 0)
				return _.uniq(arr);

			return arr;
		};
	}])
      /*fucntion check response status*/
	 .filter("statusCheckErrorPageHandlingFilterCore",['$filter',function($filter){
	   return function(status){
		      if(status === 0 ||status == 403 ||status == 302 ||status == 500 ||status == 404 ||status == 401)
				{
					return false;
				}
	
					return true;
		   
		      };
	}])
    .filter("FormatDD_MM_YYYYToYYYY_MM_DDFilterCore",['$filter',function($filter){
	   return function (dt)
		{
			if ($filter("HasValueFilterCore")(dt))
			{
				var separator = "-";
				var split = dt.split("-");
				if (split[2].length == 4)
				{
					var date = split[0] + "";
					var month = split[1] + "";
					var day = split[2] + "";
					day += separator + month + separator + date;
					return day;
				}
				else
				{
					return dt;
				}

			}
			return "";
		};
	}])

    .filter("FormatAsDD_MM_YYYYFilterCore",['$filter',function($filter){
	   return function (dt)
		{
			if ($filter("HasValueFilterCore")(dt))
			{
				var separator = "-";
				var newDate = new Date(dt);

				var date = newDate.getFullYear() + "";
				var month = newDate.getMonth() + 1 + "";
				var day = newDate.getDate() + "";
				day = (day.length == 1 ? ("0" + day) : day);
				month = (month.length == 1 ? ("0" + month) : month);
				day = (day.length == 1 ? ("0" + day) : day);
				day += separator + month + separator + date;

				return day;

			}
			return "";
		};
	}])
	.filter('SubStractOneDayFilterDay',['$filter',function($filter) {
		return function(d){
			  if($filter('HasValueFilterCore')(d))
			  {
				  return new Date(moment(d).subtract('days',1));
			  }else{
				  return '--';
			  }
			   
			};
	 }])
	.filter('checkMenuApplicable',['$filter','GlobalValuesCore',function($filter,GlobalValuesCore) {
		return function(nlpResponse){
			  if($filter('HasValueFilterCore')(nlpResponse.tab))
			  { 
				  var tab = nlpResponse.tab.replace(/-/g, " ");
				  return $filter("HasValueFilterCore")($filter("filter")(GlobalValuesCore.menus,{name:tab}));
			  }else{
				  return false;
			  }
			   
			};
	 }])
    .filter('DateTimeFormatFilterCore',['$filter',function($filter){
		return function (d) {
			var formatedDate = moment(d).format("DD-MMM-YYYY h:mm:ss");
			var realDate = new Date(d);

			//var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var strDate = "";
			
			var today = new Date();
			today.setHours(0, 0, 0, 0);

			var yesterday = new Date();
			yesterday.setHours(0, 0, 0, 0);
			yesterday.setDate(yesterday.getDate() - 1);

			var tomorrow = new Date();
			tomorrow.setHours(0, 0, 0, 0);
			tomorrow.setDate(tomorrow.getDate() + 1);
			
			if (today.getDate() == realDate.getDate()) {
				strDate = "Today";
			} else if (yesterday.getDate() == realDate.getDate()) {
				strDate = "Yesterday";
			} else if (tomorrow.getDate() == realDate.getDate()) {
				strDate = "Tomorrow";
			} else {
				strDate = $filter("PreferenceDateformatFilterCore")(d);
			}
			return strDate;
		};
	 }])
    .filter('DateTimeFormatOnlyDateFilterCore', function() {
		return function (d) {
			var formatedDate = moment(d).format("DD-MMM-YYYY h:mm:ss");
			//return moment(d).format("DD-MMM-YYYY h:mm:ss");
			var realDate = new Date(d);

			//var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var strDate = "";
			
			var today = new Date();
			today.setHours(0, 0, 0, 0);

			var yesterday = new Date();
			yesterday.setHours(0, 0, 0, 0);
			yesterday.setDate(yesterday.getDate() - 1);

			var tomorrow = new Date();
			tomorrow.setHours(0, 0, 0, 0);
			tomorrow.setDate(tomorrow.getDate() + 1);
		
			strDate = formatedDate;
			return strDate;
		};
	 }).filter('DateTimeFormatForDD-MMM-YYFilterCore', function() {
		return function (d) {
			var formatedDate = moment(d).format("DD-MMM-YY");
			return formatedDate;
		};
	 })
	 .filter('GroupByFilterCore', function() {
    return _.memoize(function(items, field) {
            return _.groupBy(items, field);
        }
    );
})
	 .filter('PreferenceDateformatFilterCore',['$filter','GlobalValuesCore',function($filter,GlobalValuesCore){
    return (function(value){
		var dateFormat=GlobalValuesCore.USER_CONTEXT.userConfig.dateFormat;
		if(dateFormat == 'ddMMyyyy_dash')
		{
		value=$filter("date")(value,'dd-MM-yyyy');
	}
	if(dateFormat == 'mmddyy_slash')
		{
		value=$filter("date")(value,'MM/dd/yy');
	}
	if(dateFormat == 'ddMMyy_slash')
		{
		value=$filter("date")(value,'dd/MM/yy');
	}
	if(dateFormat == 'mmddyyyy_slash')
		{
		value=$filter("date")(value,'MM/dd/yyyy');
	}
	if(dateFormat == 'yymmdd_slash')
		{
		value=$filter("date")(value,'yy/MM/dd');
	}
	if(dateFormat == 'yyyymmdd_dash')
		{
		value=$filter("date")(value,'yyyy-MM-dd');
	}
	if(dateFormat == 'mmddyyyy_dash')
		{
		value=$filter("date")(value,'MM-dd-yyyy');
	}
	if(dateFormat == 'ddMMMyy_dash')
		{
		value=$filter("date")(value,'dd-MMM-yy');
	}
            return value;
        }
    );
}]).filter("HandleUnderscoreInFiqlCore",['$filter',function($filter){
	   return function(fiql){
		   var result=fiql;
		if(fiql.includes('_s')){
			var startIndex=fiql.indexOf('_s');
			result=fiql.substring(0,(startIndex+2));
			fiql=fiql.substring(startIndex+2,(fiql.length));	
		}else{
			result="";
		}
		var isUnderscoreContains = fiql.includes("_");
		while (isUnderscoreContains) {
			fiql = fiql.replace("_", "\\_");
			var nextIndex=fiql.indexOf('\\_');
			result=result+fiql.substring(0,nextIndex+2);
			fiql=fiql.substring(nextIndex+2,(fiql.length));
			isUnderscoreContains = fiql.includes("_");
		}
		result=result+fiql;
		return result;
		 };   
	}]).filter('GetLastMonthFilterCore',['$filter', function ($filter) {
			return function () {
				return moment().subtract(1,'months').startOf('month').toDate();
			};
	}]).filter('GetLastQuarterFilterCore',['$filter', function ($filter) {
			return function () {
				var d = new Date(),
				m = d.getMonth() - d.getMonth() % 3;
				var qtrDate=moment(new Date(d.getFullYear(), m, 1));
				var qtrStartDate=moment(qtrDate).subtract(3,'months').toDate();
				return qtrStartDate;
			};
		}]).filter('GetLastYearFilterCore',['$filter', function ($filter) {
			return function () {
				return moment().subtract(1,'years').startOf('years').toDate();
			};
	}])
	/*this filter is to show image by exten type for uploded list*/
	.filter("GetImageByExtensionForFileUploadFilterCore",['$filter',function($filter){
	   return function(file){
		   var path="";
		   if($filter("HasValueFilterCore")(file) && $filter("HasValueFilterCore")(file.path) && $filter("HasValueFilterCore")(file.filename) && $filter("HasValueFilterCore")(file.extension)){
				var extenArray=file.extension.split('.');
				var exten=extenArray[extenArray.length-1];
				console.log("exten",exten);
				if($filter("uppercase")(exten)=='JPG' || $filter("uppercase")(exten)=='JPEG' || $filter("uppercase")(exten)=='PNG'){
					path=$filter("HtmlDecodeFilterCore")(file.path);
				}
				else if($filter("uppercase")(exten)=='XLSX'){
					path="/app/assets/img/extension/xlsx.png";
				}
				else if($filter("uppercase")(exten)=='XLS'){
					path="/app/assets/img/extension/xls.png";
				}
				else if($filter("uppercase")(exten)=='PDF'){
					path="/app/assets/img/extension/pdf.png";
				}
				else if($filter("uppercase")(exten)=='DOC'){
					path="/app/assets/img/extension/doc.png";
				}
				else if($filter("uppercase")(exten)=='DOCX'){
					path="/app/assets/img/extension/docx.png";
				}
				else{
					path="/app/assets/img/extension/file.png";
				}
				return path;
		}
	   };
	}])
	 .filter('PreferenceDateTimeformatFilterCore',['$filter','GlobalValuesCore',function($filter,GlobalValuesCore){
    return (function(value){
		var formatedDate ="";
		var dateFormat=GlobalValuesCore.USER_CONTEXT.userConfig.dateFormat;

		if(dateFormat == 'ddMMyyyy_dash')
		{
		value=moment(value).format("DD-MM-YYYY h:mm:ss");
	}
	if(dateFormat == 'mmddyy_slash')
		{
		value=moment(value).format("MM/DD/YY h:mm:ss");
	}
	if(dateFormat == 'ddMMyy_slash')
		{
		value=moment(value).format("DD/MM/YY h:mm:ss");
	}
	if(dateFormat == 'mmddyyyy_slash')
		{
		value=moment(value).format("MM/DD/YYYY h:mm:ss " );
	}
	if(dateFormat == 'yymmdd_slash')
		{
		value=moment(value).format("YY/MM/DD h:mm:ss");
	}
	if(dateFormat == 'yyyymmdd_dash')
		{
		value=moment(value).format("YYYY-MM-DD h:mm:ss");
	}
	if(dateFormat == 'mmddyyyy_dash')
		{
		value=moment(value).format("MM-DD-YYYY h:mm:ss");
	}
	if(dateFormat == 'ddMMMyy_dash')
		{
		value=moment(value).format("dd-MMM-yy h:mm:ss");
	
	}
            return value;
        }
    );
}])
	 .filter('getDateFormatByNameFilterCore',function(){
    return (function(dateFormat){
		
		if(dateFormat == 'ddMMyyyy_dash')
		{
			return "DD-MM-YYYY";
		}
		if(dateFormat == 'mmddyy_slash')
		{
			return "MM/DD/YY";
		}
	if(dateFormat == 'mmddyyyy_slash')
		{
			return "MM/DD/YYYY";
		}
	if(dateFormat == 'yymmdd_slash')
		{
			return "YY/MM/DD";
		}
	if(dateFormat == 'yyyymmdd_dash')
		{
		return "YYYY-MM-DD";
	}
	if(dateFormat == 'mmddyyyy_dash')
		{
		return "MM-DD-YYYY";
	}
	if(dateFormat == 'ddMMyy_slash')
		{
		return "DD/MM/YY";
	}
	if(dateFormat == 'ddMMMyy_dash')
		{
		return "DD-MMM-YY";
	}
	else{
		return "MM-DD-YYYY";
		}
          
        }
    );
})
.filter('getTitleFilterCore',['$filter', function ($filter) {
       	return function (input) {
			var returnVal="";
			var uppercase="";
            if($filter('HasValueFilterCore')(input)){
				returnVal = $filter("HtmlDecodeFilterCore")(input);
            	  returnVal = $filter("uppercase")(returnVal[0])+ returnVal.substring(1);
            	 return $filter("replaceUnderscoreFilterCore")(returnVal);
            }
       	};
    
	}])
	.filter('localDateTimeToLong',['$filter', function ($filter) {
       	return function (input) {
			if($filter('HasValueFilterCore')(input)){
				 var date = new Date(input.year,input.monthValue,input.dayOfMonth,input.hour,input.minute,input.second,input.nano);
				 return date.getTime();
            }
       	};
    
	}])
;

})();


