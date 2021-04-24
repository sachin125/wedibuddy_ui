(function() {
'use strict';

angular.module('app.core')
	.constant('MsgConstantsCore', {
	
		FILE_UPLOADED_SUCCESSFULLY : 'File uploaded successfully',
		ERROR_IN_UPDATE :  "Error in updating data, Please try again",
		ERROR_IN_CREATE :  "Error in submitting data, Please try again",
		ERROR_IN_GET :  "Error in retriving data, Please try again",
		ERROR_IN_DELETE :  "Error in deleting data, Please try again",
		FOOTER_MSG_FETCHING_DATA:'Data being fetched... Please wait...',
        FOOTER_MSG_NO_DATA_FOUND:'No Data Found',		
        FOOTER_MSG_SORRY:"Sorry, we didn't find anything",	
        FOOTER_MSG_NO_TICKET:"You Have No Tickets.",	
        FOOTER_MSG_ISSUE_ENJOY_DAY:"Please enjoy your day!",	
        	
});

})();
