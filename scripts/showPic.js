/*function showPic(whichpic){
	var source=whichpic.getAttribute("href");
	var text=whichpic.getAttribute("title");
	var placeholder=document.getElementById("placeholder");
	var description=document.getElementById("description");
	placeholder.setAttribute("src",source);
	description.firstChild.nodeValue=text;
}*/
//window.onload=prepareGallery();
//共享onlaod事件
function addLoadEvent(func){
	var oldonload=window.onload;
	if (typeof window.onload!="function") {
		window.onload=func;
	}else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if (parent.lastChild==targetElement) {
		parent.appendChild(newElement);
	}
	else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function preparePlaceHolder(){
	if (!document.createElement) {return false;}
	if (!document.createTextNode) {return false;}
	if (!document.getElementById) {return false;}
	if (!document.getElementById("imagegallery")) {return false;}
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/chuang.jpg");
	placeholder.setAttribute("alt","my image gallery");
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var desctext=document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var wrap=document.createElement("div");
	var gallery=document.getElementById("imagegallery");
	insertAfter(wrap,gallery);
	wrap.appendChild(placeholder);
	wrap.insertBefore(description,placeholder);
}

//平稳退化，分离javascript，向后兼容，性能考虑 
function prepareGallery(){
	//检查浏览器是否支持Dom方法
	if (!document.getElementsByTagName) {return false;}
	if (!document.getElementById) {return false;}
	if (!document.getElementById("imagegallery")) {return false;}
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for (var i = 0; i<links.length;i++){
		links[i].onclick=function(){
			return showPic(this)?false:true;
		}
	}
}

function showPic(whichpic){
	if (!document.getElementById("placeholder")) {return false;}
	var source=whichpic.getAttribute("href");
	var placeholder=document.getElementById("placeholder");
	//if (placeholder.nodeName!="IMG") {return false;}
	placeholder.setAttribute("src",source);
	if (document.getElementById("description")) {
		//var text=whichpic.getAttribute("title");
		var text=whichpic.getAttribute("title")?whichpic.getAttribute("title"):"";
		var description=document.getElementById("description");
		if (description.firstChild.nodeType==3) {
			description.firstChild.nodeValue=text;
		}
	}
	return true;
}

addLoadEvent(preparePlaceHolder);
addLoadEvent(prepareGallery);
