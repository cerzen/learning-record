// 防抖
// 考虑一个场景，有一个按钮点击会触发网络请求，但是我们并不希望每次点击都发起网络请求，而是当用户点击按钮一段时间后没有再次点击的情况才去发起网络请求，对于这种情况我们可以使用防抖。
// 下例，实现防抖

// func是用户传入需要防抖的函数
// wait是等待时间
const debounce = (func, wait = 50 ) =>{
	// 缓存一个定时器id
	let timer =0
	// 这里返回的函数是每次用户实际调用的防抖函数
	// 如果已经设定过定时器了就清空上一次的定时器
	// 开始一个新的定时器，延迟执行用户传入的方法
	return function(...args){
		if(timer) clearTimeout(timer)
			timer = setTimeout(() =>{
				func.apply(this.args)
			},wait)
	}
}
