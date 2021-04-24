(function() {
  'use strict';

  angular.module('app.core')
  .service('MapServiceCore', MapServiceCore);
	
	MapServiceCore.$inject = ['leafletData','$timeout'];
  
  function MapServiceCore(leafletData,$timeout) {
	
	var service = {
	
		calculateHeight : calculateHeight,
		invalidateMapSize : invalidateMapSize,
		checkPointInsidePolygon : checkPointInsidePolygon,
	};
	return service;
	

	function calculateHeight(id) 
	{
		var innerHeight= window.innerHeight;
	    var newHeight = innerHeight - 200;
		jQuery('#'+id).css('height', newHeight + 'px');
		return innerHeight;
	}

	function invalidateMapSize(id)
	{
		leafletData.getMap(id).then(function(id)
									{
										$timeout(function()
												{ 
													id.invalidateSize();
												});
									}, 300);
	}

	/* This function checks that a particular point exists inside the polygon or not */
    function checkPointInsidePolygon(point, vs) {
	    var x = point[0], y = point[1];

	    var inside = false;
	    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
	        var xi = vs[i][0], yi = vs[i][1];
	        var xj = vs[j][0], yj = vs[j][1];

	        var intersect = ((yi > y) != (yj > y))&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
	        if (intersect) inside = !inside;
	    }

	    return inside;
	}
  }

})();
