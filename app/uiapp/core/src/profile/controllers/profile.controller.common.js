(function() {
  'use strict';
angular.module('app.core').controller('ProfileControllerCore', ProfileControllerCore);
ProfileControllerCore.$inject= ['$scope', '$mdDialog', '$rootScope', '$filter', 'IndexServiceCore', 'UrlConstantsCore', 'TemplatesConstantsCommon', 'Notification', '$state', 'MsgConstantsCommon', 'GlobalConstantsCore', 'GlobalValuesCore','StatesConstantsCommon','DataById','StatesConstantsCore','UserServiceCore','Upload'];
function ProfileControllerCore($scope, $mdDialog, $rootScope, $filter, IndexServiceCore, UrlConstantsCore, TemplatesConstantsCommon, Notification, $state, MsgConstantsCommon, GlobalConstantsCore, GlobalValuesCore, StatesConstantsCommon,DataById,StatesConstantsCore,UserServiceCore,Upload) {
    
    $rootScope.breadcumb = ["Profile"];
    $scope.userWithAssociateObjectWrapper = DataById;
    console.log(' profile : $scope.userWithAssociateObjectWrapper: ',$scope.userWithAssociateObjectWrapper);
    
    $scope.educationLevelTypes = GlobalConstantsCore.EDUCATION_LEVEL;
    $scope.jobTypes = GlobalConstantsCore.JOBTYPE_LEVEL;
    $scope.relationshipTypes = GlobalConstantsCore.RELATIONSHIP_TYPES;
    $scope.dietTypes = GlobalConstantsCore.DIET_TYPES;
    $scope.deityTypes = GlobalConstantsCore.DEITY_TYPES;
    var deityTypesSize = $scope.deityTypes.length;
    $scope.goutraTypes = GlobalConstantsCore.GOUTRA_TYPES;
    var goutraTypesSize = $scope.goutraTypes.length;
    
    $scope.addEducationObj={};
    $scope.addWorkObj={};
   
    $scope.EducationInformationTabObj={};
    $scope.EducationInformationTabObj.addable=false;
    $scope.EducationInformationTabArray=[];
    
    $scope.WorkInformationTabObj={};
    $scope.WorkInformationTabObj.addable=false;
    $scope.WorkInformationTabArray=[];
    
    $scope.editfamily={};
    function updateEachVariable(){
		$scope.user = angular.copy($scope.userWithAssociateObjectWrapper.user);
		$scope.userProfile = angular.copy($scope.userWithAssociateObjectWrapper.userProfile);
		$scope.dpPath = angular.copy($scope.userProfile.dpPath);
		$scope.family = angular.copy($scope.userWithAssociateObjectWrapper.family);
		$scope.educationList = angular.copy($scope.userWithAssociateObjectWrapper.educations);
		$scope.education = angular.copy($scope.userWithAssociateObjectWrapper.education);
		$scope.workList = angular.copy($scope.userWithAssociateObjectWrapper.works);
		$scope.work = angular.copy($scope.userWithAssociateObjectWrapper.work);
		
	}
	updateEachVariable();
    $scope.files = [];
    
    $scope.editButtonVisible = false;
    var currentUser = GlobalValuesCore.USER_CONTEXT;
    
    $scope.editUserWithAssociateObjectWrapper = angular.copy($scope.userWithAssociateObjectWrapper);
    //~ $scope.editUserWithAssociateObjectWrapper.user = {}
    //~ $scope.editUserWithAssociateObjectWrapper.userProfile = {}
    //~ $scope.editUserWithAssociateObjectWrapper.work = {}
    //~ $scope.editUserWithAssociateObjectWrapper.education = {}
    
    
    function editableAsTrue(){
		$scope.IsAccountInformationEditable = true;
		$scope.IsPersonalInformationEditable = true;
		$scope.IsFamilyInformationEditable = true;
		$scope.IsEducationInformationEditable = true;
		$scope.IsWorkInformationEditable = true;
		$scope.IsUploadInformationEditable = true;
	}
	
	
	function editableAsFalse(){
		$scope.IsAccountInformationEditable = false;
		$scope.IsPersonalInformationEditable = false;
		$scope.IsFamilyInformationEditable = false;
		$scope.IsEducationInformationEditable = false;
		$scope.IsWorkInformationEditable = false;
		$scope.IsUploadInformationEditable = false;
	}
	
    //~ if($scope.user.id==currentUser.id){
		//~ $scope.editButtonVisible = true;
		//~ editableAsTrue();
	//~ }else{
		//~ editableAsFalse();		
	//~ }
    
    //~ $scope.goToEditProfile = function(){
	   //~ var username = $scope.user.username;
	   //~ $state.go(StatesConstantsCore.editProfile, {username:username});
	//~ };
	
	
	$scope.IsEditButtonClickedToggle = function(IsEditButtonClicked){
			IsEditButtonClicked = !IsEditButtonClicked;
			alert(IsEditButtonClicked);
			return IsEditButtonClicked;
	};
	
	$scope.goToViewProfile = function(){
	   var username = $scope.user.username;
	   $state.go(StatesConstantsCore.profile, {username:username});
	};
	
	$scope.addProfile = function(tab) {
		if(tab=='IsEducationInformationEditable'){
			$scope.IsEducationInformationAddable = true;
		}else if(tab=='IsWorkInformationEditable'){
			$scope.IsWorkInformationAddable = true;
		}
    };
	$scope.editProfile = function(tab) {
		editableAsFalse();
		if(tab=='IsAccountInformationEditable'){
			$scope.IsAccountInformationEditable = true;
		}else if(tab=='IsPersonalInformationEditable'){
			$scope.IsPersonalInformationEditable = true;
		}else if(tab=='IsFamilyInformationEditable'){
			$scope.editfamily = angular.copy($scope.family);
			$scope.IsFamilyInformationEditable = true;
		}else if(tab=='IsEducationInformationEditable'){
			$scope.IsEducationInformationEditable = true;
		}else if(tab=='IsWorkInformationEditable'){
			$scope.IsWorkInformationEditable = true;
		}
    };
	$scope.cancelEditProfile = function(tab) {
		if(tab=='IsAccountInformationEditable'){
			$scope.IsAccountInformationEditable = false;
		}else if(tab=='IsPersonalInformationEditable'){
			$scope.IsPersonalInformationEditable = false;
		}else if(tab=='IsFamilyInformationEditable'){
			$scope.IsFamilyInformationEditable = false;
			$scope.editfamily = $scope.family;
		}else if(tab=='IsEducationInformationEditable'){
			$scope.IsEducationInformationEditable = false;
			$scope.IsEducationInformationAddable = false;
		}else if(tab=='IsWorkInformationEditable'){
			$scope.IsWorkInformationEditable = false;
			$scope.IsWorkInformationAddable = false;
		}
    };
    		
    $scope.saveProfile = function(tab) {
		if(tab=='IsAccountInformationEditable'){
			updateUserAccountInfo();
			$scope.IsAccountInformationEditable = false;
		}else if(tab=='IsPersonalInformationEditable'){
			updateUserProfileInfo();
			$scope.IsPersonalInformationEditable = false;
		}else if(tab=='IsFamilyInformationEditable'){
			mergeFamilyInfo();
			$scope.IsFamilyInformationEditable = false;
		}
    };
    $scope.addNew = function(tab) {
		if(tab=='IsEducationInformationEditable'){
			$scope.IsEducationInformationAddable = false;
		}else if(tab=='IsWorkInformationEditable'){
			$scope.IsWorkInformationAddable = false;
		}
    };
    		
	function updateUserAccountInfo(){
		var json = $scope.editUserWithAssociateObjectWrapper.user;
		json.checksum =  IndexServiceCore.getBash64Encode(json.checksum);		
		var promise = UserServiceCore.updateUserAccountInfo(json);
	    promise.then(function(response) {
			if ($filter('HasValueFilterCore')(response)) {
				$scope.userWithAssociateObjectWrapper.user = response;
				updateEachVariable();
				Notification.displayToast("success", 'Successfully Data Updated');
			}
		},function(error) {
			//$scope.cancel();
		});
	}
	
	function updateUserProfileInfo(){
		var json = $scope.editUserWithAssociateObjectWrapper.userProfile;
		var promise = UserServiceCore.updateUserProfileInfo(json);
	    promise.then(function(response) {
			if ($filter('HasValueFilterCore')(response)) {
				$scope.userWithAssociateObjectWrapper.userProfile = response;
				$scope.userProfile = angular.copy($scope.userWithAssociateObjectWrapper.userProfile);
				Notification.displayToast("success", 'Successfully Data Updated');
			}
		},function(error) {
			//$scope.cancel();
		});
	}
	
	function mergePersonalInfo(){
		var editUserJson = $scope.editUserWithAssociateObjectWrapper;
		delete editUserJson.family;
		delete editUserJson.work;
		delete editUserJson.works;
		delete editUserJson.education;
		delete editUserJson.educations;
		var promise = UserServiceCore.mergePersonalInfo(editUserJson);
	    promise.then(function(response) {
			if ($filter('HasValueFilterCore')(response)) {
				Notification.displayToast("success", 'Successfully Data Updated');
			}
		},function(error) {
			//$scope.cancel();
		});
	};
	
	function mergeFamilyInfo(){
		var familyjson = $scope.editfamily;
		var promise = UserServiceCore.mergeFamilyInfo(familyjson);
	    promise.then(function(response) {
			if ($filter('HasValueFilterCore')(response)) {
				Notification.displayToast("success", 'Successfully Data Updated');
				$scope.userWithAssociateObjectWrapper.family = response;
				$scope.family = angular.copy($scope.userWithAssociateObjectWrapper.family);
			}
		},function(error) {
			//$scope.cancel();
		});
	};
	
	$scope.mergeEducationInfo = function(educationObj,index,IsEducationInformationEditableObj){
		var educationJson = educationObj;
		var promise = UserServiceCore.mergeEducationInfo(educationJson);
	    promise.then(function(response) {
			if ($filter('HasValueFilterCore')(response)) {
				Notification.displayToast("success", 'Successfully Data Updated');
				if(index!=null){
					$scope.educationList[index]=response;
					$scope.EducationInformationTabArray[index].editable=false;
				}else{
					$scope.educationList.push(response);
					$scope.EducationInformationTabObj.addable = false;
				}
				$scope.userWithAssociateObjectWrapper.educations = angular.copy($scope.educationList);				
			}
		},function(error) {
			//$scope.cancel();
		});
	};
		
	$scope.mergeWorkInfo = function(workObj,index,IsWorkInformationEditableObj){
		var workJson = workObj;
		var promise = UserServiceCore.mergeWorkInfo(workJson);
	    promise.then(function(response) {
			if ($filter('HasValueFilterCore')(response)) {
				Notification.displayToast("success", 'Successfully Data Updated');
				if(index!=null){
					$scope.workList[index]=response;
					$scope.WorkInformationTabArray[index].editable=false;
				}else{
					$scope.workList.push(response);
					$scope.WorkInformationTabObj.addable = false;
				}
				$scope.userWithAssociateObjectWrapper.works = angular.copy($scope.workList);				
			}
		},function(error) {
			//$scope.cancel();
		});
	};
	
	$scope.deleteEducation=function(educationObj,index,IsEducationInformationEditableObj){
		var educationJson = educationObj;
		var promise = UserServiceCore.deleteEducation(educationJson.id);
	    promise.then(function(response) {
			if ($filter('HasValueFilterCore')(response)) {
				Notification.displayToast("success", 'Successfully Data Updated');
				$scope.educationList.splice(index,1);
				$scope.userWithAssociateObjectWrapper.educations = angular.copy($scope.educationList);
			}
		},function(error) {
			//$scope.cancel();
		});
	};
	
	$scope.deleteWork=function(workObj,index,IsWorkInformationEditableObj){
		var workJson = workObj;
		var promise = UserServiceCore.deleteWork(workJson.id);
	    promise.then(function(response) {
			if ($filter('HasValueFilterCore')(response)) {
				Notification.displayToast("success", 'Successfully Data Updated');
				$scope.workList.splice(index,1);
				$scope.userWithAssociateObjectWrapper.works = angular.copy($scope.workList);
			}
		},function(error) {
			//$scope.cancel();
		});
	};
	
	$scope.cancelToEditEducationObjFromList =function(index){
		$scope.educationList[index] = angular.copy($scope.userWithAssociateObjectWrapper.educations[index]);
	};
	$scope.cancelToEditWorkObjFromList =function(index){
		$scope.workList[index] = angular.copy($scope.userWithAssociateObjectWrapper.works[index]);
	};

	
	function mergeDp() {
      if ($scope.uploadForm.$valid && $scope.files) {
        $scope.upload($scope.files);
      }
    };
    
     $scope.upload = function (files) {
		console.log('file ::: ',files);
        var url = UrlConstantsCore.USER_MERGE_DP_INFO_URL+'?&filename='+files[0].name;
        IndexServiceCore.uploadFileToUrl(files[0],).then(function(response){
			console.log(' fff '+response);
		},function(errResponse){
			  Notification.displayToast(GlobalConstantsCore.TAOST_TYPE_ERROR,'Error while uploading');
		 });
        //~ Upload.upload({
            //~ url: url,
            //~ filedata: {file: }
        //~ }).then(function (resp) {
            //~ console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        //~ }, function (resp) {
            //~ console.log('Error status: ' + resp.status);
        //~ }, function (evt) {
            //~ var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //~ console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        //~ });
    };
	
	$scope.setFiles = function(fileArray) {
		if($filter("HasValueFilterCore")(fileArray)) {
			if(fileArray.length >1 ){
				$scope.message = "Only one file can be uploaded";
				$scope.files = [];
			}else{
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
					if(!isSupported) {
						$scope.files = [];
						$scope.message = "File Format is not Supported";
					}else if(fileName.length>50){
						$scope.files = [];
						$scope.message = "File Name is Too Long";
					}else {
						$scope.files.push(fileArray[i]);
					}
				}
			}
		}else {
          $scope.files=[];
        }
	};
		
	$scope.todayDate = new Date();
	
	
	$scope.onChangeDeity = function(){
		for(var i=0;i<deityTypesSize;i++){
			var deityType = $scope.deityTypes[i];
			if($scope.editfamily.deity.id == deityType.id){
				$scope.editfamily.deity.name = deityType.name;
				break
			}
		}
	};
	
	$scope.onChangeGoutra = function(){
		for(var i=0;i<goutraTypesSize;i++){
			var goutraType = $scope.goutraTypes[i];
			if($scope.editfamily.goutra.id == goutraType.id){
				$scope.editfamily.goutra.name = goutraType.name;
				break
			}
		}
	};
	
	
}
})();
