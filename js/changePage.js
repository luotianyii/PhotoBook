function switchTag(tag, content) {
	//	alert(tag);
	//	alert(content);
	for(var i = 1; i < 6; i++) {
		if("tag" + i == tag) {
			document.getElementById(tag).getElementsByTagName("a")[0].className = "selectli" + i;
			document.getElementById(tag).getElementsByTagName("a")[0].getElementsByTagName("span")[0].className = "selectspan" + i;
		} else {
			document.getElementById("tag" + i).getElementsByTagName("a")[0].className = "";
			document.getElementById("tag" + i).getElementsByTagName("a")[0].getElementsByTagName("span")[0].className = "";
		}
		if("content" + i == content) {
			document.getElementById(content).className = "";
		} else {
			document.getElementById("content" + i).className = "hidecontent";
		}
		document.getElementById("content").className = content;
	}
}

var demobg = document.querySelector(".demo-bg");
var demotxt = document.querySelector(".demo-txt");

function openDialog() {
	demotxt.style.display = "block";
	demobg.style.display = "block";
}

function closeDialog() {
	demotxt.style.display = "none";
	demobg.style.display = "none";
}