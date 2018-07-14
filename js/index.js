//////定义上传方法函数
var id="1";
var path;
var pathindex = 0;
var pathArray = new Array();

/**
 * this method is use to add image to the div of index.html
 * @method PreviewImage
 * @param imgFile{String} the src of img which need to be added into the canvas
 * @author 韩国彪
 */
function PreviewImage(imgFile) { 
    var pattern = /(\.*.jpg$)|(\.*.png$)|(\.*.jpeg$)|(\.*.gif$)|(\.*.bmp$)/;      
    if(!pattern.test(imgFile.value)) { 
      alert("系统仅支持jpg/jpeg/png/gif/bmp格式的照片！");  
      imgFile.focus(); 
    }else{
       //定义图片路径 
       //var path;
       //添加显示图片的HTML元素
       //判断浏览器类型
       if(document.all){ 
       //兼容IE
        imgFile.select(); 
        path = document.selection.createRange().text;

        document.getElementById(id).innerHTML=""; 
        document.getElementById(id).style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")";//使用滤镜效果 
       }else{
        //兼容其他浏览器 
        for(var i=0; i< imgFile.files.length; i++){
        	pathindex+=1;
            id += 1;
            $(".img-cont").append("<div><div id='"+id+"'><img src='' /></div><a class='hide delete-btn'>删除</a><a id = "+"'"+pathindex+"'" + "class='hide add-btn'>添加</a></div>");
            path = URL.createObjectURL(imgFile.files[i]);
            document.getElementById(id).innerHTML = "<img src='"+path+"' width='100' height='80' />";
            pathArray[pathindex] = path;
        }
       }
       //重置表单
       resetForm(imgFile);

    } 
}



/**
 * this function is used to do Fast sorting of image
 * @method Quicktypeset
 * @param
 * @author 韩国彪
 */
function Quicktypeset(){
	var typeid = 1;
	if(pathArray.length<13){
		alert("至少需要12张图片");
		return false;
	}
	for (;typeid<=12;typeid++){
		var img = document.createElement("img");
        imgcount++;
        var x = "imgtest"+typeid+"and" +imgcount;
        img.src = pathArray[typeid];
        img.setAttribute("id",x);
        
        
        if(img.complete){
        	img.width = img.width/4;
        	img.height = img.height/4;
        }

        var divid = "content"+parseInt((typeid+1)/2);
        //alert(divid);

        document.getElementById('myFrame'+divid).contentWindow.document.body.appendChild(img);
        document.getElementById('myFrame'+divid).contentWindow.clicke(x);
//      img.prototype.left = 800;
//      img.prototype.TOP = 800;
	}
}
/**
 * this function is to reset the form of images to add the same iamge
 * @method resetForm
 * @param imgFile{String} this is the src path of image
 * @author 韩国彪
 * */
//重置表单,允许用户连续添加相同的图片
function resetForm(imgFile){
  $(imgFile).parent()[0].reset();
}

var imgcount = 1

/**
 * this method is used to control the visiblity of some button
 * and function of add and remove image to the canvas
 * @author 邓泽生
 * */
//控制"按钮"显示与隐藏
$(".img-cont").off("mouseenter","div").on("mouseenter","div",function(){
    var that=this;
    var dom=$(that).children("a");
    dom.removeClass("hide");
    //为点击事件解绑，防止重复执行
    var dom1 = $(that).children("a:first");
    dom1.off("click");
    dom1.on("click",function(){
    	//删除当前图片
    	pathindex--;
    	pathArray.splice($(that).children("div").attr("id").length-1,1);
     	dom1.parent().remove();
     });

    var dom2 = $(that).children("a:last");
    dom2.off("click");
    dom2.on("click",function(){
        var img = document.createElement("img");
        imgcount++;
        var x = "imgtest"+this.id+"and" +imgcount;
        img.src = pathArray[this.id];
        img.setAttribute("id",x);
        
        
        if(img.complete){
        	img.width = img.width/4;
        	img.height = img.height/4;
        }

        var divid = $('#content').attr('class');
        //alert(divid);

        document.getElementById('myFrame'+divid).contentWindow.document.body.appendChild(img);
        document.getElementById('myFrame'+divid).contentWindow.clicke(x);
    });
}).off("mouseleave","div").on("mouseleave","div",function(){
    var that=this;
    $(that).children("a").addClass("hide");
})
/**
 * this method is used to clear the photobook
 * @method clear
 * @author 邓泽生
 * */
function clear(){
	//alert("清空开始");
	var divid = $('#content').attr('class');
	//alert(divid);
	document.getElementById('myFrame'+divid).contentWindow.removeImg();
	//alert("清空完成");
}
   


/*$(".li_3").children("img").first().dblclick(function(){
	alert("图片被点击了");
})*/
/**
 * this method is used to add the decoration to the photobook
 * @author 邓泽生
 * */
//用jquery遍历每个元素然后添加对应的点击方法
var imgArray = jQuery(".li_3");
jQuery.each(imgArray, function(){
 	//alert(jQuery(this).find("img").attr("src"));
 	var decTemp = jQuery(this).find("img");
 	jQuery(this).find("img").dblclick(function(){
 		//alert(decTemp.attr("src"));
 		var img = document.createElement("img");
        imgcount++;
        var x = "dec" + "count" + imgcount;
        img.src = decTemp.attr("src");
        img.setAttribute("id",x);
        img.setAttribute("width",799/10);
        img.setAttribute("height",832/10);

        var divid = $('#content').attr('class');
        //alert(divid);

        document.getElementById('myFrame'+divid).contentWindow.document.body.appendChild(img);
        document.getElementById('myFrame'+divid).contentWindow.clicke(x);
 	})
});

/**
 * this method is used to add wordImg into canvas
 * @method wordImageAdd
 * @param src{String} the src is the src of image 
 * @author 邓泽生
 * */
function wordImageAdd(src){
        var img = document.createElement("img");
        imgcount++;
        var x = "wordtest"+ "and" +imgcount;
        img.src = src;
        img.setAttribute("id",x);
        //解决部分图片未加载完成就导入canvas以至于长宽都是0的问题
		img.onload = function(){
	        var divid = $('#content').attr('class');
	        //alert(divid);
	        img.onload = null;//解决不同浏览器之间的兼容问题
	
	        document.getElementById('myFrame'+divid).contentWindow.document.body.appendChild(img);
	        document.getElementById('myFrame'+divid).contentWindow.clicke(x);
       }
}
