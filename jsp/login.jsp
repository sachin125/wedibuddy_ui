<!DOCTYPE html>
<%@ taglib prefix='c' uri='http://java.sun.com/jstl/core_rt' %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page import="com.inn.wedibuddy.utils.ConfigUtil" %>

<%
	String locale=request.getParameter("locale");
	String CaptchaValid=request.getParameter("url");
	if(locale==null){
		session.setAttribute("locale","en");	
	}
	else{
		session.setAttribute("locale",locale);
	}
	String ctx = "/wedibuddy";
	String sessionId = null;
	if(session!=null){
		sessionId = session.getId();
	}
	System.out.println("sessionId:: "+sessionId);
%>
<script>
    var RecaptchaOptions = {
        theme: 'white'
    };
</script>

<script type="text/javascript">
    var retUser = "<c:out value="$ {param.userid}"/>";
    var attemptsLeft = "<c:out value="$ {param.attempts_left}"/>";
    var isErrorExists = "<c:out value="$ {not empty param.login_error}"/>";
    var errorType = "<c:out value="$ {param.login_error}"/>";
    var title = '<%=ctx%>';
    var passphrase = '<%= sessionId %>';
	var projectDir = '<%=ctx%>' + '/';
	var context = '<%=ctx%>';
	var count;
    console.log("passphrase:: "+passphrase+" context: "+context);
    var appModuleName = 'loginApp';
</script>

<c:if test="<%=locale!=null%>">
    <fmt:setLocale value="<%=locale%>" scope="session" />
</c:if>
<html lang="en" ng-app="loginApp" ng-controller="LoginController">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Wedibuddy</title>
    <link rel="apple-touch-icon" sizes="57x57" href="../app/assets/img/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="../app/assets/img/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="../app/assets/img/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="../app/assets/img/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="../app/assets/img/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="../app/assets/img/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="../app/assets/img/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="../app/assets/img/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../app/assets/img/favicon/apple-icon-180x180.png">
    <!--
    <link rel="icon" type="image/png" sizes="192x192" href="../app/assets/img/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../app/assets/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="../app/assets/img/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../app/assets/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="../app/assets/img/favicon/manifest.json">
-->
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="../app/assets/image/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic" />
   <link rel="stylesheet" href="../app/assets/css/login.css" />
    <link rel="stylesheet" href="../app/assets/js/angular-material/angular-material.min.css" />
    <link rel="stylesheet" href="../app/assets/fonts/material-design-iconic-font/dist/css/material-design-iconic-font.css" />
	<link rel="stylesheet" href="../app/assets/css/landing-page.css" />

    <style type="text/css">
        /*** Hide when Angular is not yet loaded and initialized */

        [ng\:cloak],
        [ng-cloak],
        [data-ng-cloak],
        [x-ng-cloak],
        .ng-cloak,
        .x-ng-cloak {
            display: none !important;
        }
    </style>
    <script src="../app/assets/js/angular/angular.js"></script>
    <script src="../app/assets/js/angular-animate/angular-animate.min.js"></script>
    <script src="../app/assets/js/angular-aria/angular-aria.min.js"></script>
    <script src="../app/assets/js/angular-messages/angular-messages.min.js"></script>
<!--
    <script src="../app/assets/js/angular-material/angular-material.js"></script>
-->
    <script src="../app/assets/js/angular-material/angular-material.min.js"></script>
    <script src="../app/assets/js/angular-base64/angular-base64.min.js"></script>
    <script src="../app/assets/js/angular-translate/angular-translate.min.js"></script>
    <script src="../app/assets/js/angular-cookies/angular-cookies.min.js"></script>
    <script src="../app/assets/js/angular-route/angular-route.min.js"></script>
    <script src="../app/assets/js/jquery/dist/jquery.min.js"></script>
    <script src="../app/assets/js/aes.js"></script>
    <script src="../app/assets/js/pbkdf2.js"></script>
    <script src="../app/assets/js/browser.js"></script>

	
	<script src="../app/uiapp/security/controllers/loginApp.outdex.js"></script>
	<script src="../app/uiapp/security/controllers/login.controller.outdex.js"></script>
	
<!--
    <script src="../app/uiapp/security/controllers/login.controller.core.js"></script>
-->

    <script src="../app/uiapp/security/constants/templates.constants.outdex.js"></script>
	<script src="../app/uiapp/security/constants/url.constants.outdex.js"></script>
    <script src="../app/uiapp/security/services/login.service.outdex.js"></script>
    <script src="../app/uiapp/security/filters/filters.outdex.js"></script>
    <script src="../app/uiapp/security/services/notification.service.outdex.js"></script>    
    <!--
    <script src="../app/uiapp/security/controllers/resetpassword.controller.core.js"></script>
-->

</head>

<body>
    <div ng-cloak>
        <md-content>
            <md-toolbar class="md-md-tall"  >
                <div class="" layout="row" >
                    <div flex="60" style="padding-left: 10%;">
                        <label style="font-size: 200%;">Wedibuddy</label>
                    </div>
                    <div flex="40">

                    </div>
                </div>
            </md-toolbar>
        </md-content>
    </div>
    <div layout="row">
        <div flex="60" style="padding:10%;color:#3f51b5;">
            <label style="font-size: 400%;font-style: italic;">Wedibuddy</label>
            <label style="font-style: italic;">Life is beautiful.</label>
        </div>
        <md-content flex="40" >
            <md-tabs md-selected="data.selectedIndex" class="height_800" md-border-bottom>
                <md-tab id="tab1">
                    <md-tab-label>Login</md-tab-label>
                    <md-tab-body>
						 <h1>Login to your Account</h1>
                        <form name="login" id="htmlForm" ng-submit="validateLoginFormEncrypt($event,username_onscreen,password_onscreen);" action="{{action}}" method='post'>
                            <div class="md-padding">
							<input type="text" name="iv" ng-model="iv" autocomplete="off" style="display:none;" />
							<input type="text" name="salt" ng-model="salt" autocomplete="off" style="display:none;" />
							<input type="text" placeholder="Username" autocomplete="off" ng-model='j_username' name='username' style="display:none;" id="j_username">
							<input type="password" placeholder="Password" autocomplete="off" ng-model='j_password' style="display:none;" name='password' id="j_password">
                                <div flex="100">
                                    <md-input-container class="md-block" flex>
                                        <label>Username</label>
                                        <input ng-model="username_onscreen" id="j_username_onscreen" type="text" ng-focus="focusEventTriggered($event)" ng-blur="blurEventTriggered($event)">
                                    </md-input-container>
                                </div>
                                <div flex="100">
                                    <md-input-container class="md-block" flex>
                                        <label>Password</label>
                                        <input autocomplete="new-password" ng-model="password_onscreen" id='j_password_onscreen' type="password">
                                    </md-input-container>
                                </div>
                                <div>
                                    <span flex></span>
                                    <md-button type="submit" id="Login_button" class="md-raised md-primary"><label>Login</label></md-button>
                                </div>
                            </div>
                        </form>
                    </md-tab-body>
                </md-tab>
                <md-tab id="tab2" >
                    <md-tab-label>Sign Up</md-tab-label>
                    <md-tab-body >
                        <h1>Create a new Account</h1>
                        <div class="md-padding">
                            <form name="signupForm" action="#" method="post" novalidate> 
                                <div layout="row" layout-align="space-between start">
                                    <md-input-container class="md-block" flex="50">
                                        <label>Firstname</label>
                                        <input ng-model="signupUser.firstname" name="firstname" ng-required="true">
<!--
                                        <div ng-show="signupForm.$submitted || signupForm.firstname.$touched">
										  <div ng-show="signupForm.firstname.$error.required" style="color:red;">Firstname is required</div>
										</div>
-->
                                    </md-input-container>
                                    <md-input-container class="md-block" flex="50">
                                        <label>Lastname</label>
                                        <input ng-model="signupUser.lastname" name="lastname" ng-required="true">
<!--
                                         <div ng-show="signupForm.$submitted || signupForm.lastname.$touched">
										  <div ng-show="signupForm.lastname.$error.required" style="color:red;">Lastname is required</div>
										</div>
-->
                                    </md-input-container>
                                </div>
                                <div layout="row" layout-align="space-between start">
                                    <md-input-container class="md-block" flex>
                                        <label>Email</label>
                                        <input ng-model="signupUser.username" name="username" type="text" ng-required="true" autocomplete="off">
<!--
                                         <div ng-show="signupForm.$submitted || signupForm.email.$touched">
											<div ng-show="signupForm.email.$error.required" style="color:red;">Email is required</div>
										</div>
-->
                                    </md-input-container>
                                    <md-input-container class="md-block" flex="50">
                                        <label>Mobile number</label>
                                        <input ng-model="signupUser.contactno" id="contactno" ng-required="true">
<!--
                                        <div ng-show="signupForm.$submitted || signupForm.contactno.$touched">
											<div ng-show="signupForm.contactno.$error.required" style="color:red;">Mobile number is required</div>
										</div>
-->
                                    </md-input-container>
                                </div>
                                <div layout="row" layout-align="space-between start">
                                    <md-input-container class="md-block" flex="50">
                                        <label>New password</label>
                                        <input ng-model="signupUser.checkSum" name="password" type="password" ng-required="true" autocomplete="new-password">
<!--
                                        <div ng-show="signupForm.$submitted || signupForm.password.$touched">
											<div ng-show="signupForm.password.$error.required" style="color:red;">Password is required</div>
										</div>
-->
                                    </md-input-container>
                                    <md-input-container flex="50">
										<label>Cast</label>
										<md-select ng-model="signupUser.domainId" name="domains" ng-required="true">
										  <md-option ng-repeat="domain in domains" value="{{domain.id}}">
											{{domain.name}}
										  </md-option>
										</md-select>
									  </md-input-container>
                                </div>
                                <div layout="row" layout-align="space-between start" flex>
                                    <md-datepicker ng-model="signupUser.dob" id="dob" md-placeholder="Birthday" flex="50" ng-required="true"></md-datepicker>                                     
                                    <md-input-container class="md-block" flex="50">
                                        <md-radio-group ng-model="signupUser.gender" ng-required="true" id="gender" name="gender" layout="row" layout-align="start center">
                                            <md-radio-button value="Male" class="md-primary">Male</md-radio-button>
                                            <md-radio-button value="Female" class="md-primary"> Female </md-radio-button>
                                        </md-radio-group>
                                    </md-input-container>                                     
                                </div>
                                <div layout="row" layout-align="space-between start">
                                    <md-button flex="30" class="md-raised md-primary" data-ng-click="userRegistration($event);" >Sign up</md-button>
<!--
                                    ng-disabled="signupForm.$invalid"
-->
                                </div>
                        </div>
                        </form>
                    </md-tab-body>
                </md-tab>
                 <md-tab id="tab3">
                    <md-tab-label>Forgot Password</md-tab-label>
                    <md-tab-body>
						 <h1>Forgot Passwordt</h1>
                        <form name="forgotForm" id="forgotForm"  action="#">
                            <div class="md-padding">
								<div flex="100">
                                    <md-input-container class="md-block" flex>
                                        <label>Username</label>
                                        <input ng-model="forgetUser.username" type="text">
                                    </md-input-container>
                                </div>
                                <div>
                                    <span flex></span>
                                    <md-button type="submit" id="Login_button" class="md-raised md-primary" ng-click="forgetChecksum()"><label>Submit</label></md-button>
                                </div>
                            </div>
                        </form>
                    </md-tab-body>
                </md-tab>
             </md-tabs>  
        </md-content>
    </div>

	<md-divider></md-divider>
<!--Footer start-->
    <div style="text-align: center;    color: #3f51b5;">
        Weddibuddy @ 2019
    </div>
<!--Footer end-->




</body>

</html>
