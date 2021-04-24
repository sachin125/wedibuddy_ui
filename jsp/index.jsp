<!DOCTYPE html>
<%@page import="com.inn.wedibuddy.utils.ConfigUtil"%>
<%@page import="com.inn.wedibuddy.security.authentication.CustomerInfo"%>
<%@page import="com.inn.wedibuddy.model.UserConfig"%>
<%@ include file="./permission.jsp"%>
<%
UserConfig userConfig;
String userLanguage;
String userDataFormat;
String userDateFormat;
String userTimeZone;
	
   String localeFromURL=request.getParameter("locale");
   String ExpiryDate="";
	String ctx = request.getContextPath();
	System.out.println("ctx::::::::::  "+ctx);
   
%>
<html data-ng-app="app" ng-strict-di lang="en" ng-controller="AppControllerCore as App">
  <head lang="en">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Wedibuddy</title>
    <script>
        var buildAppPath = "../"; //"../dist/"
    </script>
	<!-- inject:favicon -->
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
	<link rel="icon" type="image/png" sizes="192x192"  href="../app/assets/img/favicon/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="../app/assets/img/favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="../app/assets/img/favicon/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="../app/assets/img/favicon/favicon-16x16.png">
	<link rel="manifest" href="../app/assets/img/favicon/manifest.json">
-->

	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="../app/assets/img/favicon/ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff">

	<link rel="stylesheet" href="../app/assets/js/angular-material/angular-material.min.css"/>
	<link rel="stylesheet" href="../app/assets/js/md-chips-select/dist/md-chips-select.css"/>
	<link rel="stylesheet" href="../app/assets/fonts/material-design-icons-master/iconfont/material-icons.css"/>
	<link rel="stylesheet" href="../app/assets/fonts/material-design-iconic-font/dist/css/material-design-iconic-font.min.css"/>
	<link rel="stylesheet" href="../app/assets/js/angular-material-data-table/dist/md-data-table.min.css"/>
	<link rel="stylesheet" href="../app/assets/css/ag-grid-custom.css">
	<link rel="stylesheet" href="../app/assets/css/toaster.css" />
	<link rel="stylesheet" href="../app/assets/js/leaflet/dist/leaflet.css">
	<link rel="stylesheet" href="../app/assets/js/metisMenu/dist/metisMenu.min.css" />
	<link rel="stylesheet" href="../app/assets/js/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css" />
	<!-- I have changed CSS to make timepeeker blue-->
	<link rel="stylesheet" href="../app/assets/js/angular-material-datetimepicker/css/material-datetimepicker.min.css"/>
	<link rel="stylesheet" href="../app/assets/css/app.css">
	<link rel="stylesheet" href="../app/assets/css/dashboard.css">
<!--
	<link rel="stylesheet" href="../app/assets/css/custom.css">
-->
     <link rel="stylesheet" href="../app/assets/css/generic_style.css">
	<link rel="stylesheet" href="../app/assets/css/appresponsive.css">


	
	<script src="../app/assets/js/angular/angular.js"></script>
		<script src="../app/assets/js/angular-cookies/angular-cookies.js"></script>
	<script src="../app/assets/js/angular-material/angular-material.js"></script>
	<script src="../app/assets/js/jquery/dist/jquery.min.js"></script>
	<script src="../app/assets/js/jquery-ui/jquery-ui.min.js"></script>
	<script src="../app/assets/js/metisMenu/dist/metisMenu.min.js"></script>
	<script src="../app/assets/js/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js"></script>
<!--
	<script src="../app/assets/js/angular-cookies/angular-cookies.min.js"></script>
	<script src="../app/assets/js/angular-material/angular-material.min.js"></script>
-->
	<script src="../app/assets/js/leaflet/dist/leaflet.js"></script>
	<script src="../app/assets/js/underscore/underscore-min.js"></script>
	<script src="../app/assets/js/md-chips-select/dist/md-chips-select.min.js"></script>
	<script src="../app/assets/js/angular-material-data-table/dist/md-data-table.min.js"></script>
	<script src="../app/assets/js/angular-base64/angular-base64.min.js"></script>
	<script src="../app/assets/js/toaster.js"></script>
	<script src="../app/assets/js/angular-fixed-table-header/src/fixed-table-header.min.js"></script>
	<script src="../app/assets/js/ckeditor/ckeditor.js"></script>
	<script src="../app/assets/js/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js"></script>
	<script src="../app/assets/js/underscore/underscore-min.js"></script>
	<script src="../app/assets/js/angular-animate/angular-animate.js"></script>
	<script src="../app/assets/js/angular-aria/angular-aria.js"></script>
	<script src="../app/assets/js/angular-cookies/angular-cookies.js"></script>
	<script src="../app/assets/js/angular-messages/angular-messages.js"></script>
	<script src="../app/assets/js/angular-resource/angular-resource.js"></script>
	<script src="../app/assets/js/angular-sanitize/angular-sanitize.js"></script>
	<script src="../app/assets/js/angular-ui-router/release/angular-ui-router.js"></script> 
	<script src="../app/assets/js/angular-translate/angular-translate.js"></script>
	<script src="../app/assets/js/angular-translate-loader-static-files/angular-translate-loader-static-files.js"></script>
	<script src="../app/assets/js/angular-translate-storage-cookie/angular-translate-storage-cookie.js"></script>
	<script src="../app/assets/js/highcharts/highcharts.js"></script>
	<script src="../app/assets/js/browser.js"></script>
	<script src="../app/assets/js/angular-material-datetimepicker/js/angular-material-datetimepicker.min.js"></script>
	<script src="../app/assets/js/moment/min/moment.min.js"></script>
	<script src="../app/assets/js/angular-moment/angular-moment.min.js"></script>
	<script src="../app/assets/js/ng-file-upload/ng-file-upload-all.min.js"></script>
	<script src="../app/assets/js/angular-file-upload/dist/angular-file-upload.min.js"></script>
	
<script>
	var context = '<%=ctx%>';
	var CSRF_TOKEN = '<%=session.getAttribute("CSRF_TOKEN")%>';
	var expiry_date = '<%=ExpiryDate%>';
	var DEFAULT_PAGE_UPPERLIMIT=100;
	DEFAULT_PAGE_UPPERLIMIT="<%=ConfigUtil.getConfigProp(ConfigUtil.PAGING_VALUE)%>";
	DEFAULT_PAGE_UPPERLIMIT=eval(DEFAULT_PAGE_UPPERLIMIT);
	window.localStorage.clear();
	var contextBaseUrl=window.location.origin;

</script>


	<!------------------------------------------------ CORE Files start--------------------------------------------------------->
<script src="../app/uiapp/core/src/app.js"></script>
<script src="../app/uiapp/core/src/config.core.js"></script>
<script src="../app/uiapp/core/src/constants/url.constants.core.js"></script>
<script src="../app/uiapp/core/src/constants/states.constants.core.js"></script>
<script src="../app/uiapp/core/src/constants/templates.constants.core.js"></script>
<script src="../app/uiapp/core/src/constants/global.constants.core.js"></script>
<script src="../app/uiapp/core/src/constants/msg.constants.core.js"></script>
<script src="../app/uiapp/core/src/constants/event.constants.core.js"></script>
<script src="../app/uiapp/core/src/filters/filters.core.js"></script>
<script src="../app/uiapp/core/src/directives/directives.core.js"></script>
<script src="../app/uiapp/core/src/values/global.values.core.js"></script>
<script src="../app/uiapp/core/src/index/services/index.service.core.js"></script>
<script src="../app/uiapp/core/src/services/service.core.js"></script>
<script src="../app/uiapp/core/src/route.core.js"></script>
<script src="../app/uiapp/core/src/index/services/notification.service.core.js"></script>
<script src="../app/uiapp/core/src/index/controllers/error/errorform.controller.core.js"></script>
<script src="../app/uiapp/core/src/index/controllers/app.controller.core.js"></script>
<script src="../app/uiapp/core/src/index/controllers/menu.controller.core.js"></script>
<script src="../app/uiapp/core/src/index/controllers/main.controller.core.js"></script>
<script src="../app/uiapp/core/src/index/services/map.service.core.js"></script>
<script src="../app/uiapp/core/src/services/parser.service.core.js"></script>
<script src="../app/uiapp/core/src/index/controllers/dashboard.controller.core.js"></script>
<script src="../app/uiapp/core/src/menu.service.core.js"></script>
<script src="../app/uiapp/core/src/home/services/home.service.core.js"></script>
<script src="../app/uiapp/core/src/home/controllers/home.controller.core.js"></script>
<!----------------------------------------------------CORE Files end--------------------------------------------------------->
 <!---------------------------------------------------COMMON Files start------------------------------------------------->
<script src="../app/uiapp/common/src/common/services/service.common.js"></script>
<script src="../app/uiapp/common/src/common/config.common.js"></script>
<script src="../app/uiapp/common/src/common/route.common.js"></script>
<script src="../app/uiapp/common/src/common/filters/filters.common.js"></script>
<script src="../app/uiapp/common/src/common/constants/states.constants.common.js"></script>
<script src="../app/uiapp/common/src/common/constants/templates.constants.common.js"></script>
<script src="../app/uiapp/common/src/common/constants/url.constants.common.js"></script>
<script src="../app/uiapp/common/src/common/constants/event.constants.common.js"></script>
<script src="../app/uiapp/common/src/common/constants/global.constants.common.js"></script>
<script src="../app/uiapp/common/src/common/constants/msg.constants.common.js"></script>
<script src="../app/uiapp/common/src/common/directives/directives.common.js"></script> 
<script src="../app/uiapp/common/src/dashboard/controllers/dashboard.controller.common.js"></script> 
<script src="../app/uiapp/common/src/dashboard/services/dashboard.service.common.js"></script> 
<script src="../app/uiapp/common/src/notificationpanel/controllers/notification.controller.common.js"></script> 
<script src="../app/uiapp/common/src/notificationpanel/controllers/notificationpanel.controller.common.js"></script> 
<script src="../app/uiapp/common/src/Bridge_Groom/services/bridgeGroom.service.common.js"></script> 
<script src="../app/uiapp/common/src/Bridge_Groom/controllers/bridgeGroom.controller.common.js"></script> 
<script src="../app/uiapp/common/src/wish/services/wish.service.common.js"></script> 
<script src="../app/uiapp/common/src/wish/controllers/wish.controller.common.js"></script> 

<script src="../app/uiapp/core/src/profile/controllers/changepassword.controller.common.js"></script>
<script src="../app/uiapp/core/src/profile/controllers/profile.controller.common.js"></script>
<script src="../app/uiapp/core/src/profile/controllers/uploaduserprofileimage.controller.common.js"></script>
<script src="../app/uiapp/core/src/profile/services/user.service.core.js"></script>
<script src="../app/uiapp/common/src/new_profile/controllers/AddAnotherUser.controller.common.js"></script>
 <!---------------------------------------------------COMMON Files end------------------------------------------------->



</head>
<body ng-cloak id="body">
<div ui-view ></div>
<!--
    <div layout="column" layout-align="center center" flex class="loadingPage">
        <div>
            <img  src="../app/assets/img/logo-sidebar.png"  alt="App" />
        </div>
    </div>
-->

</body>
</html>
