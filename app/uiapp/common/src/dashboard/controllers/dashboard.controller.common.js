(function() {

   angular.module('app.common').controller('DashoardControllerCommon', DashoardControllerCommon);
    DashoardControllerCommon.$inject = [ '$translate','$scope', '$rootScope', 'StatesConstantsCommon', 'GlobalValuesCore', 'TemplatesConstantsCore', 'GlobalConstantsCore', '$filter', 'UrlConstantsCommon', '$timeout', '$state','breadcumb','DashboardServiceCommon','StatesConstantsCore'];
    
	function DashoardControllerCommon($translate, $scope, $rootScope,StatesConstantsCommon, GlobalValuesCore, TemplatesConstantsCore, GlobalConstantsCore, $filter, UrlConstantsCommon, $timeout, $state,breadcumb,DashboardServiceCommon,StatesConstantsCore) {

    var self = this;
    $rootScope.breadcumb = breadcumb;
	var countByEducationLevelUsingGroupByDATA=null;
	var countByEducationCoursenameUsingGroupByDATA=null;
	
	function countByEducationLevelUsingGroupByCONTAINER(data){
		Highcharts.chart('countByEducationLevelUsingGroupByCONTAINER', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: 'Education Level wise chart'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
			},
			series: [{
				name: 'Brands',
				colorByPoint: true,
				data: data
			}]
		});		
		
	}

	function countByEducationCoursenameUsingGroupByCONTAINER(data){
		Highcharts.chart('countByEducationCoursenameUsingGroupByCONTAINER', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: 'Course wish Chart'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
			},
			series: [{
				name: 'Brands',
				colorByPoint: true,
				data: data
			}]
		});
	}

		$scope.countByEducationLevelUsingGroupBy = function(){
			DashboardServiceCommon.countByEducationLevelUsingGroupBy().then(function(response) {
				countByEducationLevelUsingGroupByDATA=null;
				if ($filter('HasValueFilterCore')(response)) {
					var countByEducationLevelUsingGroupByDATA = response;
					countByEducationLevelUsingGroupByCONTAINER(response);
				}
			},function(error) {
				//$scope.cancel();
			});
		};
		$scope.countByEducationCoursenameUsingGroupBy = function(){
			DashboardServiceCommon.countByEducationCoursenameUsingGroupBy().then(function(response) {
				countByEducationCoursenameUsingGroupByDATA=null;
				if ($filter('HasValueFilterCore')(response)) {
					//~ var data = {}
					//~ for(int i=0;i<response.length;i++){
						//~ data
					//~ }
					countByEducationCoursenameUsingGroupByCONTAINER(response);
				}
			},function(error) {
				//$scope.cancel();
			});
		};
		$scope.countByEducationLevelUsingGroupBy();
		$scope.countByEducationCoursenameUsingGroupBy();


  }
})();
