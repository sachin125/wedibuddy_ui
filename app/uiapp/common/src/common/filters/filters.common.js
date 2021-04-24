(function() {
'use strict';


angular.module('app.common')
	.filter("GetLabelForSelectFilterCommon",['$filter',function($filter){
	   return function(formObject,param){
		var componentArray = JSON.parse($filter("HtmlDecodeFilterCore")(formObject.formJson)).components;
		var x=0;
		var value = '';
			if($filter("HasValueFilterCore")(componentArray))
				{
					angular.forEach(componentArray,function(object)	{
						
						if(($filter("HasValueFilterCore")(object.data)) && ($filter("HasValueFilterCore")(object.data.values)))
						{
							var valueArray = object.data.values;
							angular.forEach(valueArray,function(valueObj)	{
									if(valueObj.value == param)
									{
										x++;
										param = valueObj.label;
										value = valueObj.label;
									}
									
								});
						}
						if(x==1)
						 return value;
						
					});
				}
		return param;
	};
	}])
	.filter("GetSourceFromComponentFilterCommon",['$filter',function($filter){
	   return function(componentArray,flag)	{
			if(flag){
			sourceArray = [];
		}
		angular.forEach(componentArray,function(componentObject)	{
			if($filter("HasValueFilterCore")(componentObject.components)){
				$filter("GetSourceFromComponentFilterCommon")(componentObject.components,false);
			}else{
				if(angular.isObject(componentObject)){
					if(sourceArray.indexOf(componentObject.source)<=-1)
					{
						sourceArray.push(componentObject.source);
					}
				}	
			}
			});
		return sourceArray;
		};
	}])
	.filter("CheckPropertiesTabConditionFilterCommon",['$filter',function($filter){
	   return function(componentObj,parentSourceName,draggedSourceArray){
		  
		if (!$filter("HasValueFilterCore")(componentObj.source))
		{
			return false;
		}
		if(componentObj.source == parentSourceName)	{
				return false;
			}	
			return true;
	   };
	}])
	.filter("FormatInPojVariableStringUnderscoreFilterCommon",['$filter',function($filter){
	   return function(value){
			var rankName=[];
			
			if(value.indexOf("_")>-1){
				rankName = value.split("_");
				var str = "";
				var size = rankName.length;
				for (var i = 0; i < rankName.length; i++)
				{
					var fc = '';
					if(i===0){
						fc=	rankName[i].charAt(0).toLowerCase();	
					str += fc + rankName[i].substr(1, rankName[i].length - 1).toLowerCase();
						}else{
					fc=	rankName[i].charAt(0).toUpperCase();	
					str += fc + rankName[i].substr(1, rankName[i].length - 1).toLowerCase();
					}
				}
				return str;
			}
			return value;
	   };
	}])
	.filter('ThemeClassFilterCommon',function(){
       return function(value){
		   
            switch(value)  
            {
                case 'primary' : return 'primary';
                case 'warning' : return 'warn';
                case 'success' : return 'success';
                 case 'info' : return 'info';
                case 'danger' : return 'danger';
                case 'default' : return 'default';
                default: return value;
            }
       };
    })
    .filter('FormatStatusForMaterialFilterCommon',function(){
       return function(value){
            switch(value)  
            {
                case 'New' : return 'New';
                case 'Pending' : return 'Pending for Baseline';
                case 'BaseLine' : return 'Baseline';
                case 'Completed' : return 'Requisition';
                case 'Requisition' : return 'Requisition';
                case 'Deployed' : return 'Deployed';
                default: return value;
            }
       };
    })
     .filter('TitleCaseFilterCommon', function() {
    return function(input) {
      input = input || '';
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
  })
  .filter("GetDaysFromDateFilterCommon", ['$filter',function($filter){
	   return function(value){
		 var date2 = new Date();
		var date1 = new Date(value);
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());   
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		
			var daysAgo = null;
			if(diffDays < 31)
				daysAgo = diffDays + " Days Ago";
			else
				daysAgo = $filter("ConvertTimeStamp2DateFilterCore")(value);
			return daysAgo;
	   };
    }]).filter("GetDaysFromDateFilterCommonForFbb", ['$filter',function($filter){
	   return function(value){
		 var date2 = new Date();
		var date1 = new Date(value);
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());   
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		
			var daysAgo = null;
			if(diffDays < 31)
				daysAgo = diffDays + " Days Ago";
			else
				daysAgo = $filter("DateTimeFormatForDD-MMM-YYFilterCore")(value);
			return daysAgo;
	   };
    }]).filter("Historytimestamp2dateFilterCommon", ['$filter',function($filter){
	   return function(value){
		var dateAg;
	   var myDate = $filter("ConvertTimeStamp2DateFilterCore")(value);
					 var dateFormat = '';
					var dayToShow=$filter("MDFormatFilterCore")(myDate);
					 if(dayToShow=='Today') {
						var a = moment(new Date());
						var b = moment(new Date(value));//now
						var s=a.diff(b, 'seconds');
						var m=a.diff(b, 'minutes') ;// 44700
						var h=a.diff(b, 'hours') ;// 745
					    var time="";
					    if(s<0){
							dateFormat= "O Second";
						}else if(s<60){
							if(s==1){
								dateFormat= s +" Second Ago";
							}else{
								dateFormat= s +" Seconds Ago";
							}
						}else if(m<60){
							if(m==1){
								dateFormat= m +" Minute Ago";
							}else{
								dateFormat= m +" Minutes Ago";
							}
							
						}else{
							if(h==1){
								dateFormat= h +" Hour Ago";
							}else{
								dateFormat= h +" Hours Ago";
							}
							
						}
					} else if(dayToShow=='Yesterday'){
						dateFormat=dayToShow;
					}else{
						 dateFormat = $filter("ConvertTimeStamp2DateFilterCore")(value);
						 }
			return dateFormat;
	   };
    }])
    .filter("Collaborationtimestamp2dateFilterCommon", ['$filter',function($filter){
		return function(value){
			var dateAg;
			var myDate = $filter("ConvertTimeStamp2DateFilterCore")(value);
			var dateFormat = '';
			var dayToShow=$filter("MDFormatFilterCore")(myDate);
			if(dayToShow=='Today') {
				var a = moment(new Date());
				var b = moment(new Date(value));//now
				var s=a.diff(b, 'seconds');
				var m=a.diff(b, 'minutes') ;// 44700
				var h=a.diff(b, 'hours') ;// 745
				var time="";
				if(s<=0){
					dateFormat= "1s";
				}else if(s<60){
					if(s==1){
						dateFormat= s +"s";
					}else{
						dateFormat= s +"s";
					}
				}else if(m<60){
					if(m==1){
						dateFormat= m +"m";
					}else{
						dateFormat= m +"m";
					}
				}else{
					if(h==1){
						dateFormat= h +"h";
					}else{
						dateFormat= h +"h";
					}
				}
			} else if(dayToShow=='Yesterday'){
				dateFormat=dayToShow;
			}else{
					var date = new Date(value);
					var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
					dateFormat = monthNames[date.getMonth()] + " " + date.getDate();
			}
			return dateFormat;
		};
    }])
   .filter("ReplaceRoleNameFilterCommon", ['$filter',function($filter){
	   return function(value){
		  
		if ($filter("HasValueFilterCore")(value) && value=="Technical Admin Small Cell")
		{
			return "Technical Admin";
		}
		else
		{
			return value;
		}
		  return value; 
	   };
	}])
	 .filter("FormatProjectionStatusFilterCommon",['$filter',function(){
       return function(value){
            switch(value)  
            {
                case 'pending' : return 'Pending';
                case 'released' : return 'Received';
                case 'cancelled' : return 'Cancelled';
                case 'New' : return 'Yet to Serve';
                case 'Partially_Completed' : return 'Partially Served';
                case 'Completed' : return 'Fully Served';
                case 'Non-Traceable' : return 'Loose Materials';
                default: return value;
            }
       };
    }])
    .filter("isEmptyDataForCurrentOwnerFilterCommon",['$filter', function($filter){
	   return function(value){
		if ($filter('HasValueFilterCore')(value))
		{
			var name = '';
			if($filter('HasValueFilterCore')(value.firstname))
			{
				name = value.firstname;
			}
			if(($filter('HasValueFilterCore')(value.lastname)) && ($filter('HasValueFilterCore')(name)))
			{
				name += " " +value.lastname;
			}
			if($filter('HasValueFilterCore')(name))
			{
				return name;
			}
			else
			{
				return '--';
			}
		}
		else
		{
			return '--';
		} 
	   };
	}])
	
.filter("dayFilterShortName",['$filter',function($filter){
       return function(weekDays)
	   {
			
			var tempDays = '';
			if ($filter('HasValueFilterCore')(weekDays))
			{
				if(angular.isString(weekDays))
			   {
				  weekDays = weekDays.split(',');
			   }
			  
			angular.forEach(weekDays,function(day) {
				if(day == 'Sunday') 
					tempDays += 'S, ';
				else if(day == 'Monday') 
					tempDays += 'M, ';
				else if(day == 'Tuesday') 
					tempDays += 'T, ';  
				else if(day == 'Wednesday') 
					tempDays += 'W, ';
				else if(day == 'Thursday') 
					tempDays += 'T, ';
				else if(day == 'Friday') 
					tempDays += 'F, ';
				else if(day == 'Saturday') 
					tempDays += 'S, ';
				});
			}
			if(tempDays.length>0)
			{
				tempDays = tempDays.substring(0, tempDays.length - 2);
			}
	   
	   return tempDays;
   };
}])
.filter("dayFilterFullName",['$filter',function($filter){
       return function(value){
		   //console.log("value========="+value);
		   var days;
		   var tempDays = '';
		   if ($filter('HasValueFilterCore')(value))
		   {
				if(angular.isString(value))
				{
					value = value.split(",");
				}
			 		   
		   for(var i=0;i<value.length;i++){
			days = value[i];
			//console.log("days========="+value[i]);
           
                if(days == 'Sunday') 
                tempDays += 'Sunday, ';
                else if(days == 'Monday') 
                tempDays += 'Monday, ';
				else if(days == 'Tuesday') 
                tempDays += 'Tuesday, ';  
				else if(days == 'Wednesday') 
                tempDays += 'Wednesday, ';
                else if(days == 'Thursday') 
                tempDays += 'Thursday, ';
				else if(days == 'Friday') 
                tempDays += 'Friday, ';
				else if(days == 'Saturday') 
                tempDays += 'Saturday, ';
      }
   }
    if(tempDays.length>0){
		tempDays = tempDays.substring(0, tempDays.length - 2);
	   }
	   //console.log("tempDays========="+tempDays);
	   return tempDays;
   };
}])
	.filter("removeHTMLTags",['$filter', function($filter) {
	    return function(text) {
		return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
	   };
	}])
	.filter("RemoveOwnNameFromSourceArrayFilterCommon",['$filter', function($filter) {
	    return  function(componentObj,sourceArray)	{
			var newSourceArray = [];
			angular.forEach(sourceArray,function(source)	{
					if(source != componentObj.source)	{
						newSourceArray.push(source);
					}				
				});	
			return newSourceArray;
		};
	}])
	
	.filter("CircularJSONFilterCommon", ['$filter',function($filter){
	   return function(censor){
			var i = 0;
			return function(key, value) {
				if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) {
				  return '[Circular]'; 
				}
				if(i >= 29){ 
				   return '[Unknown]';
				}
				++i; 
				return value;
			};
	   };
    }])
    .filter('GetFileTypeFilterCommon', function(){
		   	return function(filename) {
			var result = '';
			var re = /(?:\.([^.]+))?$/;
            var ext = re.exec(filename)[1];
            var extArr = new Array("doc", "file", "folder", "folder-full", "jpeg", "jpg", "pdf", "png", "ppt", "svg", "xls", "xlsx", "kml");
            if (extArr.indexOf(ext) != - 1)
               {
				   result =  ext;
               }
            else 
               {
				   result =  "file";
               }
            return result;
           };
	}).filter('GetFileSizeFilterCommon', function()
       {return function(bytes, decimals)
           {if (bytes === 0) return '0 Byte';
            var k = 1000; // or 1024 for binary
            var dm = decimals + 1 || 3;
            var sizes =['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
           };
       });
	
})();

