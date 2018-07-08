//////定义上传方法函数
var id="1";
var path;
var pathindex = 0;
var pathArray = new Array();
function PreviewImage(imgFile) { 
    var pattern = /(\.*.jpg$)|(\.*.png$)|(\.*.jpeg$)|(\.*.gif$)|(\.*.bmp$)/;      
    if(!pattern.test(imgFile.value)) { 
      alert("系统仅支持jpg/jpeg/png/gif/bmp格式的照片！");  
      imgFile.focus(); 
    }else{
       //定义图片路径 
       //var path;
       //添加显示图片的HTML元素
       id += 1;
       pathindex+=1;
       $(".img-cont").append("<div><div id='"+id+"'><img src='' /></div><a class='hide delete-btn'>删除</a><a id = "+"'"+pathindex+"'" + "class='hide add-btn'>添加</a></div>");

       //判断浏览器类型
       if(document.all){ 
       //兼容IE
        imgFile.select(); 
        path = document.selection.createRange().text;

        document.getElementById(id).innerHTML=""; 
        document.getElementById(id).style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")";//使用滤镜效果 
       }else{
        //兼容其他浏览器 
        path = URL.createObjectURL(imgFile.files[0]);
        document.getElementById(id).innerHTML = "<img src='"+path+"' width='100' height='80' />";
       }
       //重置表单
       resetForm(imgFile);
       pathArray[pathindex] = path;
    } 
}



//重置表单,允许用户连续添加相同的图片
function resetForm(imgFile){
  $(imgFile).parent()[0].reset();
}

var imgcount = 1
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

        var divid = $('#content').attr('class');
        //alert(divid);

        document.getElementById('myFrame'+divid).contentWindow.document.body.appendChild(img);
        document.getElementById('myFrame'+divid).contentWindow.clicke(x);
    });
}).off("mouseleave","div").on("mouseleave","div",function(){
    var that=this;
    $(that).children("a").addClass("hide");
})

-function clear(){
	//alert("清空开始");
	var divid = $('#content').attr('class');
	document.getElementById('myFrame'+divid).contentWindow.removeImg();
	//alert("清空完成");
}
 
   


/*$(".li_3").children("img").first().dblclick(function(){
	alert("图片被点击了");
})*/


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
   
