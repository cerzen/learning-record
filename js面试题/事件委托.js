// 事件委托（Delegate Event）的原理以及优缺点
// 委托（代理）是那些被绑定到父级元素的事件，但是只有当满足一定条件时才会被调用。这是靠事件的冒泡机制来实现的
// 优点是：
// 1.减少事件注册，节省内存。比如，在table上代理所有td的click事件。在ul上代理所有li的click事件
// 2.简化了dom节点更新时，响应事件的更新。比如：不用在新添加的li上绑定click事件。当删除某个li时，不用解绑上面的click事件
// 缺点：
// 1.事件委托基于冒泡，对于不冒泡的事件不支持。
// 2.层级过多，冒泡过程中，可能会被某层阻止掉。
// 3.理论上委托会导致浏览器频繁调用处理函数，即使可能不需要处理。所以建议就近委托。比如在table上代理td，而不是在document上代理td
// 4.把所有事件都用代理就可能出现事件误判。比如，在document中代理了所有button的click事件，另外的人在引用js时，可能不知道，造成单击button触发了两个click事件
// 事件委托demo 单击button元素会冒泡到UL.toolbar元素，使用了e.target来定位到当前点击的button。
var toolbar = document.querySelector(".toolbar");
toolbar.addEventListener("click",function(e){
	var button = e.target;
	if(!button.classList.containts("active")){
		button.classList.add("active");
	}
	else{
		button.classList.remove("active")
	}
})
// 原生js实现事件代理,并兼容浏览器
function delegateEvent(interfaceEle,selector,type,fn){
	if(interfaceEle.addEventListener){
		interfaceEle.addEventListener(type,eventfn);
	}else{
		interfaceEle.attachEvent("on"+type,eventfn);
	}

	function eventfn(e){
		var e= e||window.event;
		var target = e.target || e.srcElement;
		// 如果目标元素与选择器匹配则执行函数
		if(matchSelector(target,selector){
			if(fn){
				// 将fn内部的this指向target（在此之前this都是指向绑定事件的元素即interfaceEle）
				fn.call(target,e)
			}
		})
	}
}
// 比较函数：判断事件的作用目标是否与选择器匹配；匹配则返回true
function matchSelector(ele,selector){
	// 如果选择器为ID
	if(selector.charAt(0) === "#"){
		return ele.id === selector.slice(1);//slice（1）返回从索引1开始的所有元素
	}
	// charAt(0),返回索引为0 的字符
	// slice(a,b),从已有的数组或字符串返回从索引a处开始，截取到索引b处之前的子数组或子字符串
	// 如果选择器为class
	if(selector.charAt(0) === "."){
		return (" " + ele.className + " ").indexOf(" " + selector.slice(1) + " ") != -1;
	}
	// 如果选择器为tagName
	return ele.tagName.toLowerCase() === selector.toLowerCase();
}
// toLowerCase()将字符串转换成小写
// 调用
var odiv = document.getElementById('oDiv');
delegateEvent(odiv,"a",click,function(){
	alert("1");
})
