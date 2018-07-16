
/**
 * this method is using canvas to make text to image
 * reference to http://www.codeweblog.com/%E5%88%A9%E7%94%A8canvas%E6%8A%8A%E4%B8%80%E6%AE%B5%E6%96%87%E5%AD%97%E7%94%9F%E6%88%90%E4%B8%BA%E5%9B%BE%E7%89%87/
 * @author 龚成柱
 * @method makeImage
 * @param str{String} the string of text
 * @param width{int} the width of the image
 * @param fontfa{String} the font-family of text
 * */
function makeImage(str, width, fontfa, color) {
	width = width || 450;
	height = 450;
	fontfa = fontfa || "Microsoft YaHei";
	var canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = 450;
	var ctx = canvas.getContext("2d");

	var strLenght = str.length;

	var start = 0,
		startX = 10,
		startY = 50,
		hasLine = true,
		lines = 1;

	while(hasLine) {
		while(startX < (width - 17)) {
			var chart = str.substring(start, start + 1).split(" ");
			chart = unique(chart).join("");
			if(/^[a-zA-Z\d]$/.test(chart)) {
				startX = startX + 24;
			} else if(!chart) {
				startX = startX + 18;
			} else if(/^[,\.;'\?!:`~&-_\/\\]$/.test(chart)) {
				startX = startX + 18;
			} else {
				startX = startX + 40;
			}
			start++;
			if(start > strLenght) {
				hasLine = false;
				break;
			}
		}
		startX = 10;
		startY = startY + 40;
		lines++;
	}
	canvas.height = (lines + 1) * 20;

	start = 0;
	startX = 10;
	startY = 50;
	hasLine = true;
	while(hasLine) {
		while(startX < (width - 17)) {
			var chart = str.substring(start, start + 1).split(" ");
			chart = unique(chart).join("");
			ctx.fillStyle = color;
			ctx.font = "40px " + fontfa;
			ctx.fillText(chart, startX, startY);

			if(/^[a-zA-Z\d]$/.test(chart)) {
				startX = startX + 24;
			} else if(!chart) {
				startX = startX + 18;
			} else if(/^[,\.;'\?!:`~&-_\/\\]$/.test(chart)) {
				startX = startX + 18;
			} else {
				startX = startX + 40;
			}

			start++;
			if(start > strLenght) {
				hasLine = false;
				break;
			}
		}
		startX = 10;
		startY = startY + 40;
	}
	var dataurl = canvas.toDataURL('image/png');

	return dataurl;

	function unique(data) {
		data = data || [];
		var a = {};
		for(var i = 0; i < data.length; i++) {
			var v = data[i];
			if(typeof(a[v]) == 'undefined') {
				a[v] = 1;
			}
		};
		data.length = 0;
		for(var i in a) {
			data[data.length] = i;
		}
		return data;
	}
}