(function() {
  'use strict';

  angular.module('app.core')
  .service('ParserServiceCore', ParserServiceCore);
	
	ParserServiceCore.$inject = ['$q', '$translate', '$resource', '$http','$filter', 'UrlConstantsCore', 'GlobalConstantsCore','$mdDialog','Notification','$rootScope','$state','$window'];
  
  function ParserServiceCore($q, $translate, $resource, $http,$filter, UrlConstantsCore, GlobalConstantsCore,$mdDialog,Notification,$rootScope,$state,$window) {
	var service = {
		parseXml:parseXml,
		xml2json:xml2json,
		};
	return service;
	

		function parseXml (xml) {
			var dom = null;
			if ($window.DOMParser) {
				try { 
				dom = (new DOMParser()).parseFromString(xml, "text/xml"); 
				} 
				catch (e) { dom = null; }
			}
			else if ($window.ActiveXObject) {
				try {
				dom = new ActiveXObject('Microsoft.XMLDOM');
				dom.async = false;
				if (!dom.loadXML(xml)) 
				Notification.displayToast(GlobalConstantsCore.TAOST_TYPE_ERROR,dom.parseError.reason + dom.parseError.srcText);
				} 
				catch (e) { dom = null; }
			}
			else
			Notification.displayToast(GlobalConstantsCore.TAOST_TYPE_ERROR,"cannot parse xml string!");
			return dom;
		}

	function xml2json(xml, tab) {
		var X = {
		toObj: function(xml) {
			var o = {};
			if (xml.nodeType==1) {  
				if (xml.attributes.length)   
				for (var i=0; i<xml.attributes.length; i++)
				o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
				if (xml.firstChild) { // element has child nodes ..
				var textChild=0, cdataChild=0, hasElementChild=false;
				for (var n=xml.firstChild; n; n=n.nextSibling) {
					if (n.nodeType==1) hasElementChild = true;
					else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; 
					else if (n.nodeType==4) cdataChild++; // cdata section node
				}
				if (hasElementChild) {
					if (textChild < 2 && cdataChild < 2) { 
						X.removeWhite(xml);
						for (var p=xml.firstChild; p; p=p.nextSibling) {
						if (p.nodeType == 3)  // text node
						o["#text"] = X.escape(p.nodeValue);
						else if (p.nodeType == 4)  // cdata node
						o["#cdata"] = X.escape(n.nodeValue);
						else if (o[p.nodeName]) {  
						if (o[p.nodeName] instanceof Array)
						o[p.nodeName][o[p.nodeName].length] = X.toObj(p);
						else
						o[p.nodeName] = [o[p.nodeName], X.toObj(p)];
						}
						else  
						o[p.nodeName] = X.toObj(p);
						}
					}
					else { 
					if (!xml.attributes.length)
					o = X.escape(X.innerXml(xml));
					else
					o["#text"] = X.escape(X.innerXml(xml));
					}
				}
				else if (textChild) { // pure text
				if (!xml.attributes.length)
				o = X.escape(X.innerXml(xml));
				else
				o["#text"] = X.escape(X.innerXml(xml));
				}
				else if (cdataChild) { // cdata
				if (cdataChild > 1)
				o = X.escape(X.innerXml(xml));
				else
				for (var np=xml.firstChild; np; np=np.nextSibling)
				o["#cdata"] = X.escape(np.nodeValue);
				}
				}
				if (!xml.attributes.length && !xml.firstChild) o = null;
			}
			else if (xml.nodeType==9) { // document.node
			o = X.toObj(xml.documentElement);
			}
			else
			//alert("unhandled node type: " + xml.nodeType);
			return o;
		},
		toJson: function(o, name, ind) {
			var json = name ? ("\""+name+"\"") : "";
			if (o instanceof Array) {
				for (var i=0,n=o.length; i<n; i++)
				o[i] = X.toJson(o[i], "", ind+"\t");
				json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
			}
			else if (o === null)
			json += (name&&":") + "null";
			else if (typeof(o) == "object") {
				var arr = [];
				for (var m in o)
				arr[arr.length] = X.toJson(o[m], m, ind+"\t");
				json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
			}
			else if (typeof(o) == "string")
			json += (name&&":") + "\"" + o.toString() + "\"";
			else
			json += (name&&":") + o.toString();
			return json;
		},
		innerXml: function(node) {
			var s = "";
			if ("innerHTML" in node)
			s = node.innerHTML;
			else {
				var asXml = function(n) {
					var s = "";
					if (n.nodeType == 1) {
						s += "<" + n.nodeName;
						for (var i=0; i<n.attributes.length;i++)
						s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
						if (n.firstChild) {
							s += ">";
							for (var c=n.firstChild; c; c=c.nextSibling)
							s += asXml(c);
							s += "</"+n.nodeName+">";
						}
						else
						s += "/>";
					}
					else if (n.nodeType == 3)
					s += n.nodeValue;
					else if (n.nodeType == 4)
					s += "<![CDATA[" + n.nodeValue + "]]>";
					return s;
				};
				for (var c=node.firstChild; c; c=c.nextSibling)
				s += asXml(c);
			}
			return s;
		},
		escape: function(txt) {
			return txt.replace(/[\\]/g, "\\\\")
			.replace(/[\"]/g, '\\"')
			.replace(/[\n]/g, '\\n')
			.replace(/[\r]/g, '\\r');
		},
		removeWhite: function(e) {
				e.normalize();
				for (var n = e.firstChild; n; ) {
					if (n.nodeType == 3) { 
						if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
							var nxt = n.nextSibling;
							e.removeChild(n);
							n = nxt;
						}
					else
					n = n.nextSibling;
					}
					else if (n.nodeType == 1) {  
						X.removeWhite(n);
						n = n.nextSibling;
					}
					else                     
					n = n.nextSibling;
				}
				return e;
			}
		};
		if (xml.nodeType == 9) 
		xml = xml.documentElement;
		var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
		return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
	}
	
}

})();	
