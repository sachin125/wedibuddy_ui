(function() {
  'use strict';
angular.module('app.core').controller('UploadUserProfileImageControllerCore', UploadUserProfileImageControllerCore);
UploadUserProfileImageControllerCore.$inject=['$scope','$rootScope', '$mdDialog', '$log', '$q','IndexServiceCore','UrlConstantsCore','Notification','$filter','GlobalConstantsCore','GlobalValuesCore'];
function UploadUserProfileImageControllerCore($scope, $rootScope, $mdDialog, $log, $q, IndexServiceCore, UrlConstantsCore, Notification,$filter,GlobalConstantsCore,GlobalValuesCore) {
	var apkAdminDetailId='';
    var self = this;
    $scope.message = '';
    $scope.errorMsgs = '';
	var user={
		id:2
		};
     //============== DRAG & DROP =============
    // source for drag&drop: http://www.webappers.com/2011/09/28/drag-drop-file-upload-with-html5-javascript/
    var dropbox;
     addEventListener('load', loadPage, false);
	
    setTimeout(function () {
      loadPage();
    }, 1000);
    $scope.files = '';
      $scope.myFile = '';
      $scope.disable=false;
      $scope.disabled=true;
      $scope.counter = 0;
	$scope.downloadImportSampleForIssueBulkUpload = function()
	{
		window.open(UrlConstantsCore.ISSUE_BULK_UPLOAD_IMPORT_SAMPLE,"_self");
	};
    // init event handlers
    function dragEnterLeave(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      $scope.$apply(function() {
        $scope.dropText = 'Drop files here...';
        $scope.dropClass = '';
      });
    }

    function loadPage() {
      dropbox = document.getElementById("dropbox");
     dropbox.addEventListener("dragenter", dragEnterLeave, false);
      dropbox.addEventListener("dragleave", dragEnterLeave, false);
      dropbox.addEventListener("dragover", function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var clazz = 'not-available';
        var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0;
        $scope.$apply(function() {
          $scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!';
          $scope.dropClass = ok ? 'over' : 'not-available';
        });
      }, false);

      dropbox.addEventListener("drop", function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        $scope.$apply(function() {
          $scope.dropText = 'Drop files here...';
          $scope.dropClass = '';
        });
        var files = evt.dataTransfer.files;
        if (files.length > 0) {
          $scope.$apply(function() {
            $scope.files = [];
            for (var i = 0; i < files.length; i++) {
              $scope.files.push(files[i]);
            }
          });
        }
      }, false);

    }
  //============== DRAG & DROP =============

 // function to set upload file and to check filesize,fileformat and file lenght.//
    $scope.setFiles = function(fileArray) {
      if($filter("HasValueFilterCore")(fileArray)) {
        if(fileArray.length >1 )
        {
			$scope.message = "Only one file can be uploaded";
			$scope.files = [];
		}        
        else
        {
			$scope.files = [];
			for (var i = 0; i < fileArray.length; i++) {
			var elementSize =(fileArray[i].size/1024/1024);
			var fileName = fileArray[i].name;
			var ext = fileName.split('.').pop().toLowerCase();
            var supportedTypeArray = ['png','jpg','jpeg'];
            var isSupported = false;
            for(var k=0; k<supportedTypeArray.length; k++){
				if(supportedTypeArray[k]==ext){
					isSupported = true;
					break;
				}
			}
            if(!isSupported) 
            {
                $scope.files = '';
                $scope.message = "File Format is not Supported";
            }
           else if(fileName.length>50)
            {
                $scope.files = '';
                $scope.message = "File Name is Too Long";
            } 
            else 
            {
                $scope.message='';
                if($scope.counter>=1)
                {
					$scope.total = '';
					$scope.message = "You can add one file at a time.";
					$scope.disabled = true;
                }
                else
                {
                   $scope.files.push(fileArray[i]);
                }
//                
             }              
        }
      $scope.progressVisible = false;
      }
      
      }
       else {
          $scope.files='';
      }
    };
    $scope.uploadFile = function() {
      var fd = new FormData();
      for (var i in $scope.files) {
        fd.append("uploadedFile", $scope.files[i]);
      }
      var xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", uploadProgress, false);
      xhr.addEventListener("load", uploadComplete, false);
      xhr.addEventListener("error", uploadFailed, false);
      xhr.addEventListener("abort", uploadCanceled, false);
      xhr.open("POST", UrlConstantsCore.UPLOAD_USER_PROFILE_IMAGE_URL+"/"+GlobalValuesCore.USER_CONTEXT.userid);
      $scope.progressVisible = true;
      xhr.send(fd);
    };
    function uploadProgress(evt) {
      $scope.$apply(function() {
        if (evt.lengthComputable) {
          $scope.progress = Math.round(evt.loaded * 100 / evt.total);
        } else {
          $scope.progress = 'unable to compute';
        }
      });
    }

    function uploadComplete(evt) {
      /* This event is raised when the server send back a response */
      //$scope(evt.target.responseText)
    }

    function uploadFailed(evt) {
    //  alert("There was an error attempting to upload the file.");
    }

    function uploadCanceled(evt) {
      $scope.$apply(function() {
        $scope.progressVisible = false;
      });
    //  alert("The upload has been canceled by the user or the browser dropped the connection.");
    }

    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    // function to upload file
    $scope.uploadAttachment = function(files) {
      var xhr = new XMLHttpRequest();
      
      
      $scope.counter++;
      if($scope.counter>1)
      {	
		  $scope.disabled=true;	  
		  return;
	   }
	  $scope.disabled = false;
      xhr.upload.addEventListener("progress", uploadProgress, false);
      xhr.addEventListener("load", uploadComplete, false);
      xhr.addEventListener("error", uploadFailed, false);
      xhr.addEventListener("abort", uploadCanceled, false);
      $scope.progressVisible = true;
      $scope.progress = 0;
      
      var uploadAttach = UrlConstantsCore.UPLOAD_USER_PROFILE_IMAGE_URL+"/"+GlobalValuesCore.USER_CONTEXT.userid+'?filename='+files[0].name;
      IndexServiceCore.uploadFileToUrl(files[0],uploadAttach)
      .then(function(response){
		    Notification.displayToast(GlobalConstantsCore.TAOST_TYPE_SUCCESS,'Profile image uploaded successfully');
		    console.dir(response);
		    	$rootScope.$emit('updateuserprofile',response.data);
		     $mdDialog.hide();
			$scope.isError = true;
		    $scope.total = _.last(response.excpmesg);
		   $scope.errorMsgs = _.without(response.excpmesg,_.last(response.excpmesg)); 
		  },function(errResponse){
			  Notification.displayToast(GlobalConstantsCore.TAOST_TYPE_ERROR,'Error while uploading');
		 });
      
    };
    // function to remove selected file
    $scope.remove =function(event) {
      $scope.files = '';
      $scope.myFile = '';
      //$scope.showBulkUploadIssues(event);
      };
  }
})();
