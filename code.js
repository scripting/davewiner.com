function collapseEverything (theOutline, belowLevel) {
	function doCollapse (theNode, level) {
		if (theNode.subs !== undefined) {
			theNode.collapse = getBoolean (level > belowLevel);
			theNode.subs.forEach (function (sub) {
				doCollapse (sub, level + 1);
				});
			}
		}
	doCollapse (theOutline.opml.body, 0);
	}
function boldTopLevel (theOutline) {
	const theBody = theOutline.opml.body;
	if (theBody.subs !== undefined) {
		for (var i = 0; i < theBody.subs.length; i++) {
			theBody.subs [i].text = "<span class=\"spLevel1Head\">" + theBody.subs [i].text + "</span>";
			}
		}
	}
function readHttpFile (url, callback, timeoutInMilliseconds) { //5/27/14 by DW
	if (timeoutInMilliseconds === undefined) {
		timeoutInMilliseconds = 30000;
		}
	var jxhr = $.ajax ({  
		url: url,
		dataType: "text" , 
		timeout: timeoutInMilliseconds 
		}) 
	.success (function (data, status) { 
		callback (data);
		}) 
	.error (function (status) { 
		console.log ("readHttpFile: url == " + url + ", error == " + jsonStringify (status));
		callback (undefined);
		});
	}
function startup () {
	console.log ("startup");
	readHttpFile ("davewiner.opml", function (opmltext) {
		var theOutline = opml.parse (opmltext);
		collapseEverything (theOutline, 0);
		boldTopLevel (theOutline);
		
		var urlPermalink = window.location.href;
		var permalinkString = "#";
		
		$("#idOutlineDisplayer").html (renderOutlineBrowser (theOutline.opml.body, false, urlPermalink, permalinkString, true));
		$("#idOutlineTitle").html ("Who is Dave Winer?");
		
		if (localStorage.expandCollapseState !== undefined) {
			applyExpansionState (localStorage.expandCollapseState)
			}
		outlineBrowserData.expandCollapseCallback = function (idnum) {
			localStorage.expandCollapseState = getExpansionState ();
			}
		});
	}

