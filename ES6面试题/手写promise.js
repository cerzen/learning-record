/*简易promise*/
const PENDING	=	'pending'
const RESOLVED	=	'resolved'
const REJECTED	=	'rejected'

function MyPromise(fn){
	const that	=	this
	this.state	=	PENDING
	this.value	=	null
	this.resolvedCallbacks	=	[]
	this.rejectedCallbacks	=	[]
	//待完善resolve 和reject (a)
	// 待完善执行fn函数
}

/*实现过程
	1.创建了三个常量用于表示状态，对于经常使用的一些值都应该通过常量来管理，便于开发及后期维护
	2.在函数体内部首先创建了常量that，因为代码可能会异步执行，用于获取正确的this对象
	3.一开始promise的状态应该是pending
	4.value变量用于保存resolve或者reject中传入的值
	5.resolvedCallbacks和rejectedCallbacks用于保存then中的回调，因为当执行完promise时状态可能是等待中，这时应该把then中的回调保存起来用于状态改变时使用*/
//(a) 完善resolve和reject函数，添加在MyPromise函数体内部
function resolve(value){
	if(that.state	===	PENDING){
		that.state	=	RESOLVED
		that.value	=	value
		that.resolvedCallbacks.map(cb	=>	cb(that.value))
	}
}

function reject(value){
	if(that.state	===	PENDING){
		that.state	=	REJECTED
		that.value	=	value
		tha.rejectedCallbacks.map(cb	=>	cb(that.value))
	}
}
/*实现解析
	1.首先两个函数都得判断当前状态是否为等待中，因为规范规定只有等待态才可以改变状态
	2.将当前状态更改为对应状态，并且将传入的值赋值给value
	3.遍历回调数组并执行*/
/*完成上述两个函数后 为Promise中传入函数*/
try{
	fn(resolve,reject)
}catch(e){
	reject(e)
}
/*解析
	1.传入的参数并且之前两个函数当做参数传进去
	2.要注意的问题是，可能执行函数过程中会遇到错误，需要捕获错误并且执行reject函数*/

/*复杂的then函数的实现*/
MyPromise.prototype.then	=	function(onFulfilled,onRejected){
	const that	=	this
	onFulfilled	=	typeof	onFulfilled	===	'function'	?	onFulfilled	:	v	=>	v
	onRejected	=	
	typeof onRejected	===	'function'
		?	onRejected
		:	r	=>	{
				throw r
		}
	if(that.state	===	PENDING){
		that.resolvedCallbacks.push(onFulfilled)
		that.rejectedCallbacks.push(onRejected)
	}
	if(that.state	===	RESOLVED){
		onFulfilled(that.value)
	}
	if(that.state	===	REJECTED){
		onRejected(that.value)
	}
}
/*解析
	1.首先判断两个参数是否为函数类型，因为两个参数是可选参数
	2.当参数不是函数类型时，需要创建一个函数赋值给对应的参数，同时实现透传，如下列代码*/

	// 该代码目前杂简单版会报错
	// 只是作为一个透传的例子
	Promise.resolve(4).then().then((vale)	=>	console.log(value))
	/*3.接下来就是一系列判断状态的逻辑，当状态不是等待态时，就去执行相对应的函数。如果状态是等待态的话，就往回调函数中push函数，比如如下代码就会进入等待态的逻辑*/
	new	MyPromise((resolve,reject)	=>	{
		setTimeout(()	=>	{
			resolve(1)
		},0)
	}).then(value	=>	{
		console.log(value)
	})
/*实现一个符合Promise/A+规范的Promise*/
// 先改造resolve和reject函数
function resolve(value){
	if(value instanceof MyPromise){
		return value.then(resolve,reject)
	}
	setTimeout(()	=>	{
		if(that.state	===	PENDING){
			that.state	=	RESOLVED
			that.value	=	value
			that.resolvedCallbacks.map(cb	=>	cb(that.value))
		}
	},0)
}

function reject(value){
	setTimeout(()	=>	{
		if(that.state	===	PENDING){
			that.state	=	REJECTED
			that.value	=	value
			tha.rejectedCallbacks.map(cb	=>	cb(that.value))
		}	
	},0)
}

/*解析
	1.对于resolve函数来说，首先需要判断传入的值是否为Promise类型
	2.为了保存函数执行顺序，需要将两个函数体代码使用setTimeout包裹起来
	*/
/*继续改造then函数中的代码，首先我们需要新增一个变量promise2，因为每个then函数都需要返回一个新的Promise对象，改变量用于保存新的返回对象，然后我们先来改造判断等待态的逻辑*/
if(that.state	===	PENDING){
	return (promise2	=	new	MyPromise((resolve,reject)	=>	{
		that.resolvedCallbacks.push(()	=>	{
			try{
				const x	=	onFulfilled(that.value)
				resolutionProcedure(promise2,x,resolve,reject)
			}catch	(r)	{
				reject(r)
			}
		})
		that.rejectedCallbacks.push(()	=>	{
			try{
				const x	=	onRejected(that.value)
				resolutionProcedure(promise2,x,resolve,reject)
			}catch(r){
				reject(r)
			}
		})
	}))
}
/*解析
	1.首先返回了一个新的Promise对象，并在Promise中传入一个函数
	2.函数的基本逻辑还是和之前一样，往回调数组中push函数
	3.同样，在执行函数的过程中可能会遇到错误，所以使用了try...catch包裹
	4.规范规定，执行onFulfilled或者onRejected函数时会返回一个x，并且执行Promise解决过程，这是为了不同的Promise都可以兼容使用，比如JQuery的Promise能兼容ES…… 的promise*/
//改造执行态的逻辑
if(that.state	===	RESOLVED){
	return (promise2	= new MyPromise((resolve,reject)	=>	{
		setTimeout(()	=>	{
			try{
				const	x	=	onFulfilled(that.value)
				resolutionProcedure(promise2,x,resolve,reject)
			}catch	(reason){
				reject(reason)
			}
		})
	}))
} 
/*解析
	与判断等待态的逻辑基本一致*/
//兼容多种Promise的resolutionProced函数、
function resolutionProcedure(promise2,x,resolve,reject){
	if(promise2	===	x){
		return	reject(new	TypeError('Error'))
	}
} 

/*解析  首先规定了，不能与promise2相等，这样会发生循环引用的问题，如下列代码*/
let p =	new	MyPromise((resolve,reject)	=>	{
	resolve(1)
})

let	p1	=	p.then(value	=>	{
	return p1
})

// 然后需要判断x的类型
if(x instanceof MyPromise){
	x.then(function(value){
		resolutionProcedure(promise2,value,resolve,reject)
	},reject)
}
/*这里的代码时完全按照规范实现的。如果x为Promise的话，需要判断以下几个情况：
	1.如果x处于等待态，Promise需保持为等待态直至x被执行或拒绝
	2.如果x处于其他状态，则用相同的值处理Promise*/
let called	=	false
if(x	!=null	&&	(typeof	x	===	'object'	||	typeof	x	==='function')){
	try{
		let then	=	x.then
		if(typeof then	===	'function'){
			then.call(
				x,
				y	=>{
					if(called) return
						called = true
					resolutionProcedure(promise2,y,resolve,reject)
				},
				e =>{
					if(called) return
						called = true
					reject(e)
				})
		}else{
			resolve(x)
		}
	}catch(e){
		if(called) return
			called = true
		reject(e)
	}
}else{
	resolve(x)
}
/*解析
	1.创建一个变量called用于判断是否已经调用过函数
	2.判断x是否为对象或者函数，如果都不是的话，讲x传入resolve中
	3.如果x是对象或者函数的话，先把x.then赋值给then,然后判断then的类型，如果不是函数类型的话，就讲x传入resolve中
	4.如果then是函数类型的话，就将x作为函数的作用域this调用值，并且传递两个回调函数作为参数，第一个叫做resolvePromise，第二个参数叫做rejectPromise，两个回调函数都需要判断是否已经执行过函数，然后进行相应的逻辑
	5.以上代码在执行过程中如果抛错了，将错误传入reject函数中*/
