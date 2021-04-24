<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<SCRIPT>
	var is_admin=false;    
	<sec:authorize access="hasAuthority('PERMISSION_Admin')">
		is_admin = true; 
	</sec:authorize>


</SCRIPT>
