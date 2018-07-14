/* 作者：陈毅
 * 描述：分页函数，点击图片后获取图片tag跳转显示相应content
 */
function switchTag(tag, content) {
	for(var i = 1; i < 7; i++) {
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
