// 外观模式 提供了一个接口 ，隐藏了内部的逻辑，更方便外部调用 如实现一个兼容多种浏览器的添加事件方法
function addEvent(elm,evType,fn,useCapture){
	if(elm.addEventListener){
		elm.addEventListener(evType,fn,useCapture)
		return true
	}else if(elm.attachEvent){
		var r= elm.attachEvent("on"+evType,fn)
		return r
	}else{
		elm["on"+evType] = fn
	}
}
