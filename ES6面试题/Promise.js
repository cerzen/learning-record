// 1.promise的特点是什么？
// 2.promise的优缺点是什么？
// 3.什么是Promise链
// 4.Promise构造函数执行和then函数执行有什么区别？
/*
 Promsie  代表一种承诺，承诺在未来比有个确切的答复
 这个事件中有三个状态：
 1.等待中（pending）
 2.完成了（resolved）
 3.拒绝了（rejected）
 当状态从pending变为其他状态时将永远不可再改变状态
 */
// 例
new Promsie ((resolve,reject) =>{
	resolve('success')
	//无效 二选一
	reject('reject')
})
// 当在构造Promise 的时候，构造函数内部的代码是立即执行的
new Promsie((resolve,reject) => {
	console.log('new Promise')
	resolve('success')
} )
console.log('finish')
//输出结果  new Promise -->finsih
/*
Promise 实现了链式调用，即每次调用then之后返回的都是一个Promise，并且是全新的Promise，原因同样是因为状态不可变
如果在then中使用了return ，那么return的值会被Promise.resolve()包装
 */
Promise.resolve(1)
.then(res =>{
	console.log(res)//1
	return 2 //包装成Promise.resolve(2)
})
.then(res =>{
	console.log(2);// 2
})
// Promise可以很好地解决回调地狱的问题
// 缺点是无法取消Promise，错误需要通过回调函数捕获
