
<fmt:bundle basename="message">
	<script>
	// represents array of messages for tab titles
    var tabKeys = {
        "tab.usermgmt":"<fmt:message key='tab.usermgmt'/>",
		"tab.reports":"<fmt:message key='tab.reports'/>",
		"tab.subtab.userlist":"<fmt:message key='tab.subtab.userlist'/>",
		"tab.subtab.create":"<fmt:message key='tab.subtab.create'/>",
		"tab.subtab.search":"<fmt:message key='tab.subtab.search'/>",
		"createtab.tabset.view":"<fmt:message key='createtab.tabset.view'/>",
		"createtab.tabset.edit":"<fmt:message key='createtab.tabset.edit'/>",
		"searchtab.tabset.view":"<fmt:message key='searchtab.tabset.view'/>",
		"searchtab.tabset.edit":"<fmt:message key='searchtab.tabset.edit'/>"
    };
    // represents list of labels for different screens 
    var labels = {
        "label.search":"<fmt:message key='label.search'/>",
       	"label.username":"<fmt:message key='label.username'/>",
        "label.password":"<fmt:message key='label.password'/>",
		"label.welcome":"<fmt:message key='label.welcome'/>",	
		"label.themes":"<fmt:message key='label.themes'/>",
		"label.lcoale":"<fmt:message key='label.lcoale'/>",
		"section.login.label":"<fmt:message key='section.login.label'/>"
	};
    
    // represents section labels.
    var sections ={
		"createtab.section.label.addInfo":"<fmt:message key='createtab.section.label.addInfo'/>",
		"searchtab.section.label.searchInfo":"<fmt:message key='searchtab.section.label.searchInfo'/>"		
	};

    // represents button labels.
    var buttons = {
        "button.logout":"<fmt:message key='button.logout'/>",
		"createtab.button.add":"<fmt:message key='createtab.button.add'/>",
		"createtab.button.cancel_Close":"<fmt:message key='createtab.button.cancel_Close'/>",	
		"createtab.section.button.create":"<fmt:message key='createtab.section.button.create'/>",
		"createtab.section.button.reset":"<fmt:message key='createtab.section.button.reset'/>",
		"createtab.tabset.edit.button.update":"<fmt:message key='createtab.tabset.edit.button.update'/>",
		"searchtab.section.button.search":"<fmt:message key='searchtab.section.button.search'/>",
		"searchtab.section.button.reset":"<fmt:message key='searchtab.section.button.reset'/>",
		"searchtab.tabset.edit.button.update":"<fmt:message key='searchtab.tabset.edit.button.update'/>"
	}; 	
	
var index_address="<fmt:message key='index_address'/>";
var address_breadcrumb="<fmt:message key='address_breadcrumb'/>";
var view_address_page_breadcrumbs="<fmt:message key='view_address_page_breadcrumbs'/>";
var edit_address_page_breadcrumbs="<fmt:message key='edit_address_page_breadcrumbs'/>";
var add_address_page_breadcrumbs="<fmt:message key='add_address_page_breadcrumbs'/>";
 	var address_success_create="<fmt:message key='address_success_create'/>";
	var address_success_update="<fmt:message key='address_success_update'/>";
	var address_success_delete="<fmt:message key='address_success_delete'/>";
 	var comment_add_success_message="<fmt:message key='comment_add_success_message'/>";
	var comment_add_failure_message="<fmt:message key='comment_add_failure_message'/>";
	var comment_add_blank_message="<fmt:message key='comment_add_blank_message'/>";
	
	var comment_delete_success_message="<fmt:message key='comment_delete_success_message'/>";
	var comment_delete_failure_message="<fmt:message key='comment_delete_failure_message'/>";
	
	var fileattachment_add_success_message="<fmt:message key='fileattachment_add_success_message'/>";
	var fileattachment_delete_success_message="<fmt:message key='fileattachment_delete_success_message'/>";
	
	var logout_failure_message="<fmt:message key='logout_failure_message'/>";
	var access_failure_message="<fmt:message key='access_failure_message'/>";

	var imageupload_success_message="<fmt:message key='imageupload_success_message'/>";
	var imageupload_failure_message="<fmt:message key='imageupload_failure_message'/>";	
	
	var audit_placeholder_username="<fmt:message key='audit_placeholder_username'/>";
	var audit_label_username="<fmt:message key='audit_label_username'/>";
	var audit_label_action="<fmt:message key='audit_label_action'/>";
	var audit_label_result="<fmt:message key='audit_label_result'/>";
	var audit_label_time="<fmt:message key='audit_label_time'/>";
	var audit_thead_user="<fmt:message key='audit_thead_user'/>";
	var audit_thead_action="<fmt:message key='audit_thead_action'/>";
	var audit_thead_parameter="<fmt:message key='audit_thead_parameter'/>";
	var audit_thead_date="<fmt:message key='audit_thead_date'/>";
	var audit_thead_result="<fmt:message key='audit_thead_result'/>";
	var audit_button_search="<fmt:message key='audit_button_search'/>";

	
	var settings_label_smtpport="<fmt:message key='settings_label_smtpport'/>";
	var settings_label_hostname="<fmt:message key='settings_label_hostname'/>";
	var settings_label_username="<fmt:message key='settings_label_username'/>";
	var settings_label_password="<fmt:message key='settings_label_password'/>";
	var settings_label_paggingdefault="<fmt:message key='settings_label_paggingdefault'/>";
	

	var profile_h1_userProfilePage="<fmt:message key='profile_h1_userProfilePage'/>";
	var profile_a_changeProfilePic="<fmt:message key='profile_a_changeProfilePic'/>";
	var profile_a_changePassword="<fmt:message key='profile_a_changePassword'/>";
	var profile_div_username="<fmt:message key='profile_div_username'/>";
	var profile_div_email="<fmt:message key='profile_div_email'/>";
	var profile_div_firstname="<fmt:message key='profile_div_firstname'/>";
	var profile_div_lastname="<fmt:message key='profile_div_lastname'/>";
	var profile_div_Country="<fmt:message key='profile_div_Country'/>";
	var profile_div_city="<fmt:message key='profile_div_city'/>";
	var profile_div_state="<fmt:message key='profile_div_state'/>";
	var profile_button_save="<fmt:message key='profile_button_save'/>";
	var profile_update_successMsg="<fmt:message key='profile_update_successMsg'/>";
	var profile_div_telephone="<fmt:message key='profile_div_telephone'/>";
	var profile_ChangeAddress="<fmt:message key='profile_ChangeAddress'/>";
	

	var user_placeholder_username="<fmt:message key='user_placeholder_username'/>";
	var user_placeholder_firstname="<fmt:message key='user_placeholder_firstname'/>";
	var user_placeholder_email="<fmt:message key='user_placeholder_email'/>";
	var user_placeholder_password="<fmt:message key='user_placeholder_password'/>";
	var user_placeholder_lastname="<fmt:message key='user_placeholder_lastname'/>";
	var user_placeholder_mobile="<fmt:message key='user_placeholder_mobile'/>";
	var user_placeholder_city="<fmt:message key='user_placeholder_city'/>";
	var user_placeholder_country="<fmt:message key='user_placeholder_country'/>";
	var user_placeholder_state="<fmt:message key='user_placeholder_state'/>";
	var user_placeholder_pincode="<fmt:message key='user_placeholder_pincode'/>";
	var user_button_search="<fmt:message key='user_button_search'/>";
	var user_thead_username="<fmt:message key='user_thead_username'/>";
	var user_thead_firstname="<fmt:message key='user_thead_firstname'/>";
	var user_thead_city="<fmt:message key='user_thead_city'/>";
	var user_thead_telephone="<fmt:message key='user_thead_telephone'/>";
	var user_thead_email="<fmt:message key='user_thead_email'/>";
	var user_thead_locked="<fmt:message key='user_thead_locked'/>";
	var user_thead_enabled="<fmt:message key='user_thead_enabled'/>";
	var user_thead_action="<fmt:message key='user_thead_action'/>";
	var user_label_username="<fmt:message key='user_label_username'/>";
	var user_label_firstname="<fmt:message key='user_label_firstname'/>";
	var user_label_email="<fmt:message key='user_label_email'/>";
	var user_label_password="<fmt:message key='user_label_password'/>";
	var user_label_lastname="<fmt:message key='user_label_lastname'/>";
	var user_label_mobile="<fmt:message key='user_label_mobile'/>";
	var user_label_city="<fmt:message key='user_label_city'/>";
	var user_label_country="<fmt:message key='user_label_country'/>";
	var user_label_state="<fmt:message key='user_label_state'/>";
	var user_label_pincode="<fmt:message key='user_label_pincode'/>";
	var user_button_create="<fmt:message key='user_button_create'/>";
	var user_label_address="<fmt:message key='user_label_address'/>";
	
	var user_button_reset="<fmt:message key='user_button_reset'/>";
	var user_span_select="<fmt:message key='user_span_select'/>";
	var user_button_update="<fmt:message key='user_button_update'/>";
	var user_role_thead_rolename="<fmt:message key='user_role_thead_rolename'/>";
	var user_role_thead_description="<fmt:message key='user_role_thead_description'/>";
	var user_success_createMsg="<fmt:message key='user_success_createMsg'/>";
	var user_success_updateMsg="<fmt:message key='user_success_updateMsg'/>";
	var user_success_enableMsg="<fmt:message key='user_success_enableMsg'/>";
	var user_success_disableMsg="<fmt:message key='user_success_disableMsg'/>";
	var user_success_lockedMsg="<fmt:message key='user_success_lockedMsg'/>";
	var user_success_roleupdateMsg="<fmt:message key='user_success_roleupdateMsg'/>";
	var user_error_roleupdateMsg="<fmt:message key='user_error_roleupdateMsg'/>";
	var user_update_alertMsg="<fmt:message key='user_update_alertMsg'/>";
	var user_username_checkMsg="<fmt:message key='user_username_checkMsg'/>";
	var user_email_alertMsg="<fmt:message key='user_email_alertMsg'/>";
	
	var roles_placeholder_role="<fmt:message key='roles_placeholder_role'/>";
	var roles_button_search="<fmt:message key='roles_button_search'/>";
	var roles_tbody_thead_permission="<fmt:message key='roles_tbody_thead_permission'/>";
	var roles_tbody_thead_description="<fmt:message key='roles_tbody_thead_description'/>";
	var roles_thead_rolename="<fmt:message key='roles_thead_rolename'/>";
	var roles_thead_description="<fmt:message key='roles_thead_description'/>";
	var roles_label_rolename="<fmt:message key='roles_label_rolename'/>";
	var roles_label_description="<fmt:message key='roles_label_description'/>";
	var roles_permission_thead_permissionname="<fmt:message key='roles_permission_thead_permissionname'/>";
	var roles_permission_thead_description="<fmt:message key='roles_permission_thead_description'/>";
	var roles_button_create="<fmt:message key='roles_button_create'/>";
	var roles_button_reset="<fmt:message key='roles_button_reset'/>";
	var roles_span_select="<fmt:message key='roles_span_select'/>";
	var roles_button_update="<fmt:message key='roles_button_update'/>";
	var roles_success_createMsg="<fmt:message key='roles_success_createMsg'/>";
	var roles_validation_createMsg="<fmt:message key='roles_validation_createMsg'/>";
	var roles_success_updatePermissionMsg="<fmt:message key='roles_button_update'/>";

	var permissions_placeholder_permission="<fmt:message key='permissions_placeholder_permission'/>";
	var permissions_placeholder_description="<fmt:message key='permissions_placeholder_description'/>";
	var permissions_button_search="<fmt:message key='permissions_button_search'/>";
	var permissions_thead_permission="<fmt:message key='permissions_thead_permission'/>";
	var permissions_thead_description="<fmt:message key='permissions_thead_description'/>";
	var permissions_label_rolename="<fmt:message key='permissions_label_rolename'/>";
	var permissions_label_description="<fmt:message key='permissions_label_description'/>";
	var permissions_button_create="<fmt:message key='permissions_button_create'/>";
	var permissions_button_reset="<fmt:message key='permissions_button_reset'/>";
	var permissions_button_update="<fmt:message key='permissions_button_update'/>";
	var permissions_success_createMsg="<fmt:message key='permissions_success_createMsg'/>";
	var permissions_success_updateMsg="<fmt:message key='permissions_success_updateMsg'/>";

	var reports_span_heading="<fmt:message key='reports_span_heading'/>";
	var reports_h4_view="<fmt:message key='reports_h4_view'/>";

	var notifications_thead_message="<fmt:message key='notifications_thead_message'/>";
	var notifications_thead_type="<fmt:message key='notifications_thead_type'/>";
	var notifications_thead_username="<fmt:message key='notifications_thead_username'/>";
	
var emailnotifications_thead_subject="<fmt:message key='emailnotifications_thead_subject'/>";
	var emailnotifications_thead_sentby="<fmt:message key='emailnotifications_thead_sentby'/>";
	var emailnotifications_thead_createdtime="<fmt:message key='emailnotifications_thead_createdtime'/>";

var index_Seeallnotifications="<fmt:message key='index_Seeallnotifications'/>";
var index_logout="<fmt:message key='index_logout'/>";
var index_li_home="<fmt:message key='index_li_home'/>";
var index_profile="<fmt:message key='index_profile'/>";
var index_settings="<fmt:message key='index_settings'/>";
var index_language_selectlanguage="<fmt:message key='index_language_selectlanguage'/>";
var index_tab_usermanagement="<fmt:message key='index_tab_usermanagement'/>";
var index_tab_users="<fmt:message key='index_tab_users'/>";
var index_tab_roles="<fmt:message key='index_tab_roles'/>";
var index_tab_permissions="<fmt:message key='index_tab_permissions'/>";
var index_language_english="<fmt:message key='index_language_english'/>";
var index_language_french="<fmt:message key='index_language_french'/>";
var index_language_spanish="<fmt:message key='index_language_spanish'/>";

var index_home="<fmt:message key='index_home'/>";


var permission_breadcrumb="<fmt:message key='permission_breadcrumb'/>";
var audit_breadcrumb="<fmt:message key='audit_breadcrumb'/>";
var chart_SpanHeading="<fmt:message key='chart_SpanHeading'/>";
var role_breadcrumb="<fmt:message key='role_breadcrumb'/>";
var user_breadcrumb="<fmt:message key='user_breadcrumb'/>";
var profile_breadcrumb="<fmt:message key='profile_breadcrumb'/>";
var report_breadcrumb="<fmt:message key='report_breadcrumb'/>";
var setting_breadcrumb="<fmt:message key='setting_breadcrumb'/>";

var index_appname="<fmt:message key='index_appname'/>";
var index_chooseskin="<fmt:message key='index_chooseskin'/>";
var index_notifications="<fmt:message key='index_notifications'/>";
var index_emails="<fmt:message key='index_emails'/>";
var  index_Seeallnotifications="<fmt:message key='index_Seeallnotifications'/>";
var index_Seeallemails="<fmt:message key='index_Seeallemails'/>";
var pagination_prev="<fmt:message key='pagination_prev'/>";
var pagination_next="<fmt:message key='pagination_next'/>";
var pagination_totalRecords="<fmt:message key='pagination_totalRecords'/>";
var pagination_showing="<fmt:message key='pagination_showing'/>";
var pagination_to="<fmt:message key='pagination_to'/>";
var pagination_entries="<fmt:message key='pagination_entries'/>";
var emailnotification_breadcrumb="<fmt:message key='emailnotification_breadcrumb'/>";
var notification_breadcrumb="<fmt:message key='notification_breadcrumb'/>";
var user_UpdateUsersRole="<fmt:message key='user_UpdateUsersRole'/>";
var user_ResetPassword="<fmt:message key='user_ResetPassword'/>";
var user_modaldisable="<fmt:message key='user_modaldisable'/>";
var user_modalenable="<fmt:message key='user_modalenable'/>";
var settings_domain_creator_label="<fmt:message key='settings_domain_creator_label'/>";


var Address_thead_modifiedTime="<fmt:message key='Address_thead_modifiedTime'/>";
var Address_thead_createdTime="<fmt:message key='Address_thead_createdTime'/>";
var Address_thead_creator="<fmt:message key='Address_thead_creator'/>";
var Address_thead_lastModifier="<fmt:message key='Address_thead_lastModifier'/>";
var Address_thead_sortby="<fmt:message key='Address_thead_sortby'/>";
var Address_viewdetail="<fmt:message key='Address_viewdetail'/>";
var Address_addAddress="<fmt:message key='Address_addAddress'/>";
var Address_formCreate="<fmt:message key='Address_formCreate'/>";
var Address_formReset="<fmt:message key='Address_formReset'/>";
var Address_formUpdate="<fmt:message key='Address_formUpdate'/>";
var Address_formCancel="<fmt:message key='Address_formCancel'/>";
var Address_formEdit="<fmt:message key='Address_formEdit'/>";
var Address_head_history="<fmt:message key='Address_head_history'/>";
var Address_head_Activities="<fmt:message key='Address_head_Activities'/>";
var Address_task_tab="<fmt:message key='Address_task_tab'/>";
var Address_comment_tab="<fmt:message key='Address_comment_tab'/>";
var AddressNoCommentstoshow="<fmt:message key='AddressNoCommentstoshow'/>";
var AddressNoAttachmentstoshow="<fmt:message key='AddressNoAttachmentstoshow'/>";
var Addresscreateformheader="<fmt:message key='Addresscreateformheader'/>";
var Addresseditformheader="<fmt:message key='Addresseditformheader'/>";
var AddresstheadAction="<fmt:message key='AddresstheadAction'/>";
var AddressDeleteTextName="<fmt:message key='AddressDeleteTextName'/>";
var AddressDeleteTextHeader="<fmt:message key='AddressDeleteTextHeader'/>";
var AddressDelete_option_ok_text="<fmt:message key='AddressDelete_option_ok_text'/>";
var AddressDelete_option_cancel_text="<fmt:message key='AddressDelete_option_cancel_text'/>";
 var Address_creator_quick_filter="<fmt:message key='Address_creator_quick_filter'/>";
var Address_lastModifier_quick_filter="<fmt:message key='Address_lastModifier_quick_filter'/>";
var Address_modifiedTime_quick_filter="<fmt:message key='Address_modifiedTime_quick_filter'/>";
var Address_createdTime_quick_filter="<fmt:message key='Address_createdTime_quick_filter'/>";



var  Address_lable_pincode="<fmt:message key='Address_lable_pincode'/>";
var  Address_lable_longitude="<fmt:message key='Address_lable_longitude'/>";
var  Address_lable_state="<fmt:message key='Address_lable_state'/>";
var  Address_lable_city="<fmt:message key='Address_lable_city'/>";
var  Address_lable_street="<fmt:message key='Address_lable_street'/>";
var  Address_lable_addressLine1="<fmt:message key='Address_lable_addressLine1'/>";
var  Address_lable_latitude="<fmt:message key='Address_lable_latitude'/>";
var  Address_lable_country="<fmt:message key='Address_lable_country'/>";
var  Address_lable_addressLine2="<fmt:message key='Address_lable_addressLine2'/>";
var  Address_lable_id="<fmt:message key='Address_lable_id'/>";
var  Address_lable_landmark="<fmt:message key='Address_lable_landmark'/>";
 var Address_thead_pincode="<fmt:message key='Address_thead_pincode'/>";
 var Address_pincode_quick_filter="<fmt:message key='Address_pincode_quick_filter'/>";
 
   
	 var Address_thead_longitude="<fmt:message key='Address_thead_longitude'/>";
 var Address_longitude_quick_filter="<fmt:message key='Address_longitude_quick_filter'/>";
 
   
	 var Address_thead_state="<fmt:message key='Address_thead_state'/>";
 var Address_state_quick_filter="<fmt:message key='Address_state_quick_filter'/>";
 
   
	 var Address_thead_city="<fmt:message key='Address_thead_city'/>";
 var Address_city_quick_filter="<fmt:message key='Address_city_quick_filter'/>";
 
   
	 var Address_thead_street="<fmt:message key='Address_thead_street'/>";
 var Address_street_quick_filter="<fmt:message key='Address_street_quick_filter'/>";
 
   
	 var Address_thead_addressLine1="<fmt:message key='Address_thead_addressLine1'/>";
 var Address_addressLine1_quick_filter="<fmt:message key='Address_addressLine1_quick_filter'/>";
 
   
	 var Address_thead_latitude="<fmt:message key='Address_thead_latitude'/>";
 var Address_latitude_quick_filter="<fmt:message key='Address_latitude_quick_filter'/>";
 
   
	 var Address_thead_country="<fmt:message key='Address_thead_country'/>";
 var Address_country_quick_filter="<fmt:message key='Address_country_quick_filter'/>";
 
   
	 var Address_thead_addressLine2="<fmt:message key='Address_thead_addressLine2'/>";
 var Address_addressLine2_quick_filter="<fmt:message key='Address_addressLine2_quick_filter'/>";
 
   
	 var Address_thead_id="<fmt:message key='Address_thead_id'/>";
 var Address_id_quick_filter="<fmt:message key='Address_id_quick_filter'/>";
 
   
	 var Address_thead_landmark="<fmt:message key='Address_thead_landmark'/>";
 var Address_landmark_quick_filter="<fmt:message key='Address_landmark_quick_filter'/>";
 
   
		 function getMessage(type, key, defaultVal)
	    {
	        if(type == 'tabtitles')
	        {
	            if(tabKeys[key] != null)
	                return tabKeys[key];
	        }
	        else if(type == 'button')
	        {
	            if(buttons[key] != null)
	                return buttons[key];
	        }
	        else if(type == 'section')
	        {
	            if(sections[key] != null)
	                return sections[key];
	        }
	        else if(type == 'control')
	        {
	            if(controls[key] != null)
	                return controls[key];
	        }
	        else if(type == 'label')
	        {
	            if(labels[key] != null)
	                return labels[key];
	        }
	        else if(type == 'message')
	        {
	            if(messages[key] != null)
	                return messages[key];
	        }

	        // if the type is not configured then return the default value.
	        // otherwise return the key itself.
	        if(defaultVal != null && defaultVal != 'undefined')
	            return defaultVal;
	        else
	            return key;

	    }
	    
	    
	    
	    
	    
	    
	    
	    
	    
	   
var user_label_personal_information="<fmt:message key='user_label_personal_information'/>";
var assign_roles_label="<fmt:message key='assign_roles_label'/>";
var edit_button_label="<fmt:message key='edit_button_label'/>";
var reset_button_label="<fmt:message key='reset_button_label'/>";
var create_button_label="<fmt:message key='create_button_label'/>";
var cancel_button_label="<fmt:message key='cancel_button_label'/>";
var save_button_label="<fmt:message key='save_button_label'/>";
var add_user_button_label="<fmt:message key='add_user_button_label'/>";
var enable_button_label="<fmt:message key='enable_button_label'/>";
var disable_button_label="<fmt:message key='disable_button_label'/>";
var user_label_street="<fmt:message key='user_label_street'/>";
var user_label_latitude="<fmt:message key='user_label_latitude'/>";
var user_label_address1="<fmt:message key='user_label_address1'/>";
var user_label_address2="<fmt:message key='user_label_address2'/>";
var user_label_landmark="<fmt:message key='user_label_landmark'/>";
var user_label_longitude="<fmt:message key='user_label_longitude'/>";

var user_placeholder_street="<fmt:message key='user_placeholder_street'/>";
var user_placeholder_latitude="<fmt:message key='user_placeholder_latitude'/>";
var user_placeholder_longitude="<fmt:message key='user_placeholder_longitude'/>";
var user_placeholder_landmark="<fmt:message key='user_placeholder_landmark'/>";
var user_placeholder_addressline1="<fmt:message key='user_placeholder_addressline1'/>";
var user_placeholder_addressline2="<fmt:message key='user_placeholder_addressline2'/>";
	    
var settings_smtp_label="<fmt:message key='settings_smtp_label'/>";
var settings_miscellaneous_label="<fmt:message key='settings_miscellaneous_label'/>";
var settings_sox_label="<fmt:message key='settings_sox_label'/>";
var settings_domain_label="<fmt:message key='settings_domain_label'/>";
var sox_config_expiry_label="<fmt:message key='sox_config_expiry_label'/>";
var sox_config_expiryinteval_label="<fmt:message key='sox_config_expiryinteval_label'/>";
var sox_config_maxattemps_label="<fmt:message key='sox_config_maxattemps_label'/>";
var settings_domain_label="<fmt:message key='settings_domain_label'/>";
var domain_create_domainName_label="<fmt:message key='domain_create_domainName_label'/>";
var domain_create_adminUserName_label="<fmt:message key='domain_create_adminUserName_label'/>";
var domain_create_adminPassword_label="<fmt:message key='domain_create_adminPassword_label'/>";
var domain_create_primaryEmail_label="<fmt:message key='domain_create_primaryEmail_label'/>";
var domain_create_domainDescription_label="<fmt:message key='domain_create_domainDescription_label'/>";	    
var audit_chart_label="<fmt:message key='audit_chart_label'/>";    

var add_permissions_label="<fmt:message key='add_permissions_label'/>";
var add_permission_btn="<fmt:message key='add_permission_btn'/>";
var search_permission_name_txt="<fmt:message key='search_permission_name_txt'/>";
var search_permission_description_txt="<fmt:message key='search_permission_description_txt'/>";
var searchPermissionBtn="<fmt:message key='searchPermissionBtn'/>";
var view_permission_header="<fmt:message key='view_permission_header'/>";
var view_permission_id="<fmt:message key='view_permission_id'/>";
var view_permission_name="<fmt:message key='view_permission_name'/>";
var view_permission_description="<fmt:message key='view_permission_description'/>";
var edit_permission_header="<fmt:message key='edit_permission_header'/>";
var role_name_lbl="<fmt:message key='role_name_lbl'/>";
	var role_view_lbl="<fmt:message key='role_view_lbl'/>";
	var role_add_lbl="<fmt:message key='role_add_lbl'/>";
	var role_edit_lbl="<fmt:message key='role_edit_lbl'/>";
	var role_delete_lbl="<fmt:message key='role_delete_lbl'/>";
	
	var Dashboard_name_lbl="<fmt:message key='Dashboard_name_lbl'/>";
	var Dashboard_allow_lbl="<fmt:message key='Dashboard_allow_lbl'/>";
	var viewrole_header="<fmt:message key='viewrole_header'/>";
	var dashboard_widgetname="<fmt:message key='dashboard_widgetname'/>";
	var Index_searchInput="<fmt:message key='Index_searchInput'/>";
	
	var viewrole_id_lbl="<fmt:message key='viewrole_id_lbl'/>";
	var viewrole_name_lbl="<fmt:message key='viewrole_name_lbl'/>";
	var viewrole_description_lbl="<fmt:message key='viewrole_description_lbl'/>";
	
	var edit_role_header="<fmt:message key='edit_role_header'/>";
	var viewrole_description_lbl="<fmt:message key='viewrole_description_lbl'/>";
	var edit_addfeature_lbl="<fmt:message key='edit_addfeature_lbl'/>";
	var editAddress_profile="<fmt:message key='editAddress_profile'/>";
	    

	
	var roles_thead_action="<fmt:message key='roles_thead_action'/>";
	var add_role_header="<fmt:message key='add_role_header'/>";
	var add_feature_lbl="<fmt:message key='add_feature_lbl'/>";
	var dashboard_widgets_lbl="<fmt:message key='dashboard_widgets_lbl'/>";
	var add_role_btn="<fmt:message key='add_role_btn'/>";
	var permissions_thead_action="<fmt:message key='permissions_thead_action'/>";
	var domain_list_label="<fmt:message key='domain_list_label'/>";
	var domainView_domainName_label="<fmt:message key='domainView_domainName_label'/>";
	var domainView_remarks_label="<fmt:message key='domainView_remarks_label'/>";
	var domainView_action_label="<fmt:message key='domainView_action_label'/>";
	
	
	var profile_Changelanguage="<fmt:message key='profile_Changelanguage'/>";
	var profile_edit_label="<fmt:message key='profile_edit_label'/>";
	var profile_Modallanguage="<fmt:message key='profile_Modallanguage'/>";
	var select_language_label="<fmt:message key='select_language_label'/>";
	var change_language_save_button_label="<fmt:message key='change_language_save_button_label'/>";
	var change_old_password_label="<fmt:message key='change_old_password_label'/>";
	var change_new_password_label="<fmt:message key='change_new_password_label'/>";
	var change_confirm_password_label="<fmt:message key='change_confirm_password_label'/>";
	var change_password_button_label="<fmt:message key='change_password_button_label'/>";
	var profile_pic_note_label="<fmt:message key='profile_pic_note_label'/>";
	var search_role_txt="<fmt:message key='search_role_txt'/>";
	var add_user_header="<fmt:message key='add_user_header'/>";
	var pagination_page_txt="<fmt:message key='pagination_page_txt'/>";
	var add_permission_reset="<fmt:message key='add_permission_reset'/>";
	var edit_permission_cancel="<fmt:message key='edit_permission_cancel'/>";
	var add_role_reset="<fmt:message key='add_role_reset'/>";
	var edit_role_cancel="<fmt:message key='edit_role_cancel'/>";
	var reports_h4_Header="<fmt:message key='reports_h4_Header'/>";
	     
	var address_tab_li_a="<fmt:message key='address_tab_li_a'/>";
 	         	var dashboard_tab_li_a="<fmt:message key='dashboard_tab_li_a'/>";
	var notifications_tab_li_a="<fmt:message key='notifications_tab_li_a'/>";
	var emailnotifications_tab_li_a="<fmt:message key='emailnotifications_tab_li_a'/>";
	var worklist_tab_li_a="<fmt:message key='worklist_tab_li_a'/>";
	var audit_tab_li_a="<fmt:message key='audit_tab_li_a'/>";
	var report_tab_li_a="<fmt:message key='report_tab_li_a'/>";
	var profile_tab_li_a="<fmt:message key='profile_tab_li_a'/>";
	var settings_tab_li_a="<fmt:message key='settings_tab_li_a'/>";
	var analytics_tab_li_a="<fmt:message key='analytics_tab_li_a'/>";
	var user_tab_li_a="<fmt:message key='user_tab_li_a'/>";
	var permission_tab_li_a="<fmt:message key='permission_tab_li_a'/>";
	var resources_tab_li_a="<fmt:message key='resources_tab_li_a'/>";
	var role_tab_li_a="<fmt:message key='role_tab_li_a'/>";
	var search_role_description_txt="<fmt:message key='search_role_description_txt'/>";
	var index_Analytics="<fmt:message key='index_Analytics'/>";
var index_analytics_charts="<fmt:message key='index_analytics_charts'/>";
var index_analytics_reports="<fmt:message key='index_analytics_reports'/>";
var index_administration="<fmt:message key='index_administration'/>";
var index_administration_audit="<fmt:message key='index_administration_audit'/>";
var home_label="<fmt:message key='home_label'/>";
	
var searchRoleBtn="<fmt:message key='searchRoleBtn'/>";
	
	var dashboard_header_users_map="<fmt:message key='dashboard_header_users_map'/>";
var dashboard_header_map_type="<fmt:message key='dashboard_header_map_type'/>";
var dashboard_header_map_country="<fmt:message key='dashboard_header_map_country'/>";
var dashboard_header_recent_activity="<fmt:message key='dashboard_header_recent_activity'/>";

var TOTAL_COUNT_TEXT_VAR="<fmt:message key='total_Count_Text_Var_Text'/>";
var user_label_createdTime="<fmt:message key='user_label_createdTime'/>";
var user_label_modifiedTime="<fmt:message key='user_label_modifiedTime'/>";
var add_user_breadcrumb="<fmt:message key='add_user_breadcrumb'/>";
var edit_user_breadcrumb="<fmt:message key='edit_user_breadcrumb'/>";
var view_user_breadcrumb="<fmt:message key='view_user_breadcrumb'/>";
var error_in_retriving_entities="<fmt:message key='error_in_retriving_entities'/>";
var delete_dialog_are_you_sure_text="<fmt:message key='delete_dialog_are_you_sure_text'/>";
var delete_dialog_record_text="<fmt:message key='delete_dialog_record_text'/>";
var fileupload_select_box_option_text="<fmt:message key='fileupload_select_box_option_text'/>";
var fileupload_Drop_option_text="<fmt:message key='fileupload_Drop_option_text'/>";
var fileupload_Drag_option_text="<fmt:message key='fileupload_Drag_option_text'/>";
var fileuploads_header_text="<fmt:message key='fileuploads_header_text'/>";
var Comment_header_text="<fmt:message key='Comment_header_text'/>";
var fileuploads_view_header_text="<fmt:message key='fileuploads_view_header_text'/>";
var configurations_saved_successfully="<fmt:message key='configurations_saved_successfully'/>";
var user_update_role_modal_header="<fmt:message key='user_update_role_modal_header'/>";
var Comment_textarea_placeholder_text="<fmt:message key='Comment_textarea_placeholder_text'/>";
var Comment_viewmodal_header_text="<fmt:message key='Comment_viewmodal_header_text'/>";
var Comment_post_button="<fmt:message key='Comment_post_button'/>";
	var fileuploads_button_text="<fmt:message key='fileuploads_button_text'/>";

var Resource_ok_lbl="<fmt:message key='Resource_ok_lbl'/>";
var Resource_cancel_lbl="<fmt:message key='Resource_cancel_lbl'/>";
var Resource_deleted_items_lbl="<fmt:message key='Resource_deleted_items_lbl'/>";
var Resource_folder_upload_lbl="<fmt:message key='Resource_folder_upload_lbl'/>";
var Resource_view_previous_lbl="<fmt:message key='Resource_view_previous_lbl'/>";
var Resource_create_folder_lbl="<fmt:message key='Resource_create_folder_lbl'/>";
var Resource_folder_name_lbl="<fmt:message key='Resource_folder_name_lbl'/>";
var Resource_folder_create_lbl="<fmt:message key='Resource_folder_create_lbl'/>";
var resource_revision_dialog_header="<fmt:message key='resource_revision_dialog_header'/>";
var Resource_revision_note_lbl="<fmt:message key='Resource_revision_note_lbl'/>";
var folder_edit_dialog_header="<fmt:message key='folder_edit_dialog_header'/>";
var Resource_folder_edit_folder_name_lbl="<fmt:message key='Resource_folder_edit_folder_name_lbl'/>";
var resource_edit_dialog_header="<fmt:message key='resource_edit_dialog_header'/>";
var Resource_edit_resource_name_lbl="<fmt:message key='Resource_edit_resource_name_lbl'/>";
var resource_restore_dialog_header="<fmt:message key='resource_restore_dialog_header'/>";
var Resource_restore_sure_lbl="<fmt:message key='Resource_restore_sure_lbl'/>";
var folder_restore_dialog_header="<fmt:message key='folder_restore_dialog_header'/>";
var Resource_folder_restore_sure_lbl="<fmt:message key='Resource_folder_restore_sure_lbl'/>";
var resource_delete_permanently_dialog_header="<fmt:message key='resource_delete_permanently_dialog_header'/>";
var Resource_delete_permanently_sure_lbl="<fmt:message key='Resource_delete_permanently_sure_lbl'/>";
var resource_delete_dialog_header="<fmt:message key='resource_delete_dialog_header'/>";
var Resource_delete_sure_lbl="<fmt:message key='Resource_delete_sure_lbl'/>";
var folder_permanently_delete_dialog_header="<fmt:message key='folder_permanently_delete_dialog_header'/>";
var Resource_folder_permanently_delete_sure_lbl="<fmt:message key='Resource_folder_permanently_delete_sure_lbl'/>";
var Resource_folder_delete_h4_sure_lbl="<fmt:message key='Resource_folder_delete_h4_sure_lbl'/>";
var folder_delete_dialog_header="<fmt:message key='folder_delete_dialog_header'/>";
var Resource_folder_delete_sure_lbl="<fmt:message key='Resource_folder_delete_sure_lbl'/>";
var Resource_upload_dialog_header="<fmt:message key='Resource_upload_dialog_header'/>";
var lock_unlock_dialog_header="<fmt:message key='lock_unlock_dialog_header'/>";
var Resource_confirm_unlock_file_lbl="<fmt:message key='Resource_confirm_unlock_file_lbl'/>";
var Resource_confirm_lock_file_lbl="<fmt:message key='Resource_confirm_lock_file_lbl'/>";
var Resource_lockunlock_confirm_lbl="<fmt:message key='Resource_lockunlock_confirm_lbl'/>";
var Resource_lock_sure_lbl="<fmt:message key='Resource_lock_sure_lbl'/>";
var Resource_upload_folder_lbl="<fmt:message key='Resource_upload_folder_lbl'/>";
var Resource_upload_file_lbl="<fmt:message key='Resource_upload_file_lbl'/>";
var Resource_upload_new_folder_lbl="<fmt:message key='Resource_upload_new_folder_lbl'/>";
var Resource_upload_deleted_items_lbl="<fmt:message key='Resource_upload_deleted_items_lbl'/>";
var Resource_folder_upload_drag_lbl="<fmt:message key='Resource_folder_upload_drag_lbl'/>";
var webkitBtn="<fmt:message key='webkitBtn'/>";
var webkitcancelBtn="<fmt:message key='webkitcancelBtn'/>";
var resource_triggerUpload_lbl="<fmt:message key='resource_triggerUpload'/>";
var Resource_share_form_lbl="<fmt:message key='Resource_share_form_lbl'/>";
var Resource_share_allow_share_lbl="<fmt:message key='Resource_share_allow_share_lbl'/>";
var Resource_share_allow_delete_lbl="<fmt:message key='Resource_share_allow_delete_lbl'/>";
var Resource_share_allow_add_resource_lbl="<fmt:message key='Resource_share_allow_add_resource_lbl'/>";
var Resource_share_allow_delete_resource_lbl="<fmt:message key='Resource_share_allow_delete_resource_lbl'/>";
var Resource_share_lbl="<fmt:message key='Resource_share_lbl'/>";
var Resource_shared_users_lbl="<fmt:message key='Resource_shared_users_lbl'/>";	
var Resource_title_name_lbl="<fmt:message key='Resource_title_name_lbl'/>";	
var Resource_title_creator_lbl="<fmt:message key='Resource_title_creator_lbl'/>";	
var Resource_title_shared_to_lbl="<fmt:message key='Resource_title_shared_to_lbl'/>";	
var Resource_title_type_lbl="<fmt:message key='Resource_title_type_lbl'/>";	
var Resource_title_size_lbl="<fmt:message key='Resource_title_size_lbl'/>";	
var Resource_title_last_modified_time_lbl="<fmt:message key='Resource_title_last_modified_time_lbl'/>";	
var Resource_title_created_time_lbl="<fmt:message key='Resource_title_created_time_lbl'/>";	
var Resource_title_action_lbl="<fmt:message key='Resource_title_action_lbl'/>";	
var Resource_title_id_lbl="<fmt:message key='Resource_title_id_lbl'/>";

	</script>
</fmt:bundle>

