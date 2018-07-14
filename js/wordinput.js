function makeImage(str, width, fontfa) {
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