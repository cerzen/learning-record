// 节流
// 考虑一个场景，滚动事件中会触发网络请求。但是我们并不希望用户在滚动过程中一直发出请求，而是隔一段时间发起一次，对于这种情况我们可以使用节流
// 实现节流的例子

// func是用户传入需要节流的函数
// wait是等待时间
const throttle = (func,wait= 50) =>{
	// 上次执行该函数的时间
	let lastTime = 0
	return function(...args){
		// 当前shijian
		let now = +new Date()
		// 当前时间和上一次执行函数时间对比
		// 如果差值大于设置的等待时间就执行函数
		if(now - lastTime >wait){
			lastTime =now
			func.apply(this,args)
		}
	}
}

setInterval(
	throttle(() =>{
		console.log(1)
	},500),
	1
	)
