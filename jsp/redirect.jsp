<%@ page import="java.io.*,java.util.*" %>
<%@ page import="com.inn.wedibuddy.utils.ConfigUtil" %>
<html>
<head>
<title>Page Redirection</title>
</head>
<body>
<center>
<h1>Page Redirection</h1>
</center>
<%
// New location to be redirected
String ctx =  "wedibuddy";
String site = new String(ctx+"/jsp/index.jsp");
response.setStatus(response.SC_MOVED_TEMPORARILY);
response.setHeader("Location", site); 
%>
</body>
</html>
