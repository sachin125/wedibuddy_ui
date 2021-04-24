<!DOCTYPE HTML>
<%@ taglib prefix='c' uri='http://java.sun.com/jstl/core_rt'%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
   String str = session.getId();  
     String ctx = request.getContextPath();
%>
<html ng-app="changePasswordApp">
<HEAD>

<script> var count;</script>
<script>var passphrase = '<%= str %>'</script>
<script>var PasswordStrength="medium"</script>
<script>
	var context = "<%=request.getContextPath()%>";
	var appModuleName = 'changePasswordApp';
	var logoutUrl = context + "/<c:url value='j_spring_security_logout' />";

	function getParam(name)
	{
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( window.location.href );
		if( results == null )
			return "";
		else
			return results[1];
	}

	function sendPassword() {
		var newpassword = $("#changePasswordLinkForm #newPasswordForm").val();
		var confirmpassword = $("#changePasswordLinkForm #confirmpasswordForm").val();

		if($('#changePasswordLinkForm').validationEngine('validate')){
			document.forms['htmlFormNew'].elements['newPassword'].value = newpassword;
			document.forms['htmlFormNew'].elements['confirmpassword'].value = confirmpassword;
			validateChangePasswordFormEncrypt();
			document.forms['htmlFormNew'].submit();
		}
	}

	var userId = getParam("id");
	var activation = getParam("activationCode");
	var action = "<c:out value="${param.scenario}" />";
	var errorParam = "<c:out value="${param.error_messages}" />" ;
	var errorMsgs = errorParam;
</script>
<link rel="shortcut icon" href="../app/assets/img/favicon2.ico">
<link rel="stylesheet" href="../app/assets/js/ngToast/ngToast.min.css" type="text/css" />
<link rel="stylesheet" href="../app/assets/js/bootstrap/dist/css/bootstrap.min.css" type="text/css" />
<link rel="stylesheet" href="../app/assets/css/app.css" type="text/css" />
<link rel="stylesheet" href="../app/assets/js/angular-material/angular-material.min.css" />	 
	 
<script src="../app/assets/js/angular/angular.js"></script>	
<script src="../app/assets/js/angular-animate/angular-animate.min.js"></script>
<script src="../app/assets/js/angular-aria/angular-aria.min.js"></script>
<script src="../app/assets/js/angular-material/angular-material.js"></script>
<script src="../app/assets/js/angular-base64/angular-base64.min.js"></script>
<script src="../app/assets/js/angular-messages/angular-messages.js"></script>
<script src="../app/assets/js/angular-resource/angular-resource.js"></script>
<script src="../app/assets/js/aes.js"></script>
<script src="../app/assets/js/pbkdf2.js"></script>	
<script src="../app/assets/js/angular-route/angular-route.js"></script>
<script src="../app/assets/js/angular-ui-router/release/angular-ui-router.js"></script> 
<script src="../app/assets/js/jcs-auto-validate.js"></script>
<script src="../app/assets/js/underscore/underscore-min.js"></script>
			
	<!--[if IE 7]>
	<![endif]-->
	<!--page specific plugin styles-->
	<!--fonts-->
<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300"/>
<script type="text/javascript" src="../app/uiapp/security/controllers/changepassword.controller.core.js"></script>
<script src="../app/uiapp/security/services/login.service.outdex.js"></script>
<script src="../app/uiapp/security/filters/filters.outdex.js"></script>

</HEAD>
<body class="login-layout">
    <div class="app app-header-fixed" ng-controller="changePasswordController">
        <div class="container w-xxl w-auto-xs">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <a href class="navbar-brand block m-t h1">
                    <div class="h1">wedibuddy</div>
                </a>
                <div class="m-b-lg">
                    <div class="wrapper text-center Login_Sign">
                        <strong class="h4">Please change your password since you are logging in for the first time</strong>
                    </div>
                    <div class="text-danger wrapper text-center" ng-show="authError">
                    </div>
                    <div class="list-group list-group-sm Login_InputFrom">
                        <p id='reset_error' class="bigger-110 login-white red"></p>
                        <form id='htmlFormNew' action='j_security_pwd_update_check' method='post'>
                            <input type='hidden' id="newPassword" ng-model="newPassword" autocomplete="off" name='newPassword' />
                            <input type='hidden' id="confirmpassword" ng-model="confirmpassword" autocomplete="off" name='confirmpassword' />
                            <!--For Encryption of Username and password this fields are required-->
                            <input type="text" class="form-control" ng-model="iv" name="iv" id="iv" autocomplete="off" style="display:none;" />
                            <input type="text" class="form-control" ng-model="salt" name="salt" id="salt" autocomplete="off" style="display:none;" />
                        </form>
                        <form id="changePasswordLinkForm" name="changePasswordLinkForm" autocomplete="off" class="form-validation" role="form">
                        <div class="list-group-item">
                            <input autocomplete="off" id="newPasswordForm" ng-model="newPasswordForm" name="newPasswordForm" type="password" ng-focus="focusEventTriggered($event)" ng-blur="blurEventTriggered($event)" placeholder="New password" class="form-control no-border" required ng-change="validatePassword(newPasswordForm)" maxlength="15" />
                        </div>
                        <div ng-show="invalidFormName" class="custom-password chng-psd">
                            <span style="font-size: 10px; color:green;" ng-class="{'green-password': !message.valid,'red-password': message.valid,}" ng-repeat="message in invalidMsg">
                                <i style="color:green;  font-size: 13px;height: 14px;" class="fa" ng-class="{'fa-check-circle-o green-password': !message.valid,'zmdi-close-circle red-password': message.valid,}"></i>
                                {{message.msg}}<br>
                            </span>
                        </div>
                        <div class="list-group-item">
                            <input autocomplete="off" id="confirmpasswordForm" ng-model="confirmpasswordForm" name="confirmpasswordForm" type="password" ng-focus="focusEventTriggered($event)" ng-blur="blurEventTriggered($event)" placeholder="Confirm password" class="form-control no-border" ng-required="true" ng-change="fieldChange(confirmpasswordForm)">
                        </div>
                        <div ng-show="invalidFormName2" class="custom-password chng-psd">
								<span style="font-size: 10px; color:green;" ng-class="{'green-password': !message.valid,'red-password': message.valid,}" ng-repeat="message in invalidMsg2">
									<i style="color:green;  font-size: 13px;height: 14px;" class="fa" ng-class="{'fa-check-circle-o green-password': !message.valid,'zmdi-close-circle red-password': message.valid,}"></i>
									{{message.msg}}<br>
								</span>
							</div>
                        <button type="submit" ng-click="sendChangePassword(changePasswordLinkForm)" class="btn btn-lg btn-primary btn-block" ng-disabled="changePasswordLinkForm.$invalid ||invalidFormName || invalidFormName2">Change Password</button>
                        <div class="line line-dashed"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        if ("ontouchend" in document) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>" + "<" + "/script>");
    </script>
</body>

</html>
