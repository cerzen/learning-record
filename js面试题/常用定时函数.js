/*常用的定时器函数有setTimeout、setInterval、requestAnimationFrame*/
// setTimeout因为JS是单线程执行的原因，如果前面的代码影响了性能，就会导致setTimeout不会按期执行。当可以通过代码修正setTimeout，从而是定时器相对准确
	let period = 60*1000*60*2
	let startTime = new Date().getTime()
	let count = 0
	let end = new Date().getTime() + period
	let interval =1000
	let currentInterval = interval

	function loop(){
		count++
		// 代码执行所消耗的时间
		let offset = new Date().getTime() - (startTime + count*interval);
		let diff = end - new Date().getTime()
		let h = Math.floor(diff/(60*1000*60))
		let hdiff = diff %	(60*1000*60)
		let m=Math.floor(hdiff/(60-1000))
		let mdiff = hdiff %(60*1000)
		let s 	=	mdiff/(1000)
		let sCeil	=	Math.ceil(s)
		let sFloor	=	Math.floor(s)
		// 得到下一次循环所消耗的时间
		currentInterval	=	interval -offset
		console.log('时'+h,'分'+m,'毫秒'+s,'秒向上取整'+sCeil,'代码执行时间：'+offset)
		setTimeout(loop,currentInterval)
	}

	/*setInterval,其实这个函数作用和setTimeout基本一致，只是该函数是每隔一段时间执行一次回调函数，通常来说不建议使用setInterval.第一，它和setTimeout一样，不能保证
		在预期的时间执行任务。第二，它存在执行累积的问题 如下代码*/
	function demo(){
		setInterval(function(){
			console.log(2)
		},1000)
		sleep(2000)
	}
	demo()

	// 以上代码在浏览器环境中，如果定时器执行过程中出现耗时操作，多个函数会在耗时操作结束以后同时执行，这样可能会带来性能的问题。
	// 如果你有循环定时器的需求，其实完全可以通过requestAnimationFrame来实现
	function setInterval(callback,interval){
		let timer
		const now = Date.now
		let startTime =now()
		let endTime = startTime
		const loop =	()	=>{
			timer = window.requestAnimationFrame(loop)
			emdTime = now()
			if( endTime	- startTime >= interval){
				startTime = endTime =now()
				callback(timer)
			}
		}
		timer = window,requestAnimationFrame(loop)
		return timer
	}

	let a= 0
	setInterval(timer =>{
		console.log(1)
		a++
		if(a===3) cancelAnimationFrame(timer)
	},1000)

	/*首先 requestAnimationFrame 自带函数节流功能，基本可以保证在16.6毫秒内只执行一次（不掉帧的情况下），并且该函数的延时效果是精确的，没有其他定时器时间不准
	的问题，也可以通过该函数来实现setTimeout。*/

