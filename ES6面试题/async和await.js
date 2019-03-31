// 1.async 及await的特点
// 2.async及await的优缺点
// 3.await原理
// 函数加上async，则该函数就会返回一个Promise
async function test(){
	return "1"
}
console.log(test())//Promise{<resolve >:"1"}
/*
async 就是将函数返回值使用 Promise.resolve()包裹了下，和then 中处理返回值一样，并且await只能配套async使用
 */
async function test(){
	let value = await sleep()
}
/*
async 和await 可以说是异步终极解决方案了，相比直接使用Promise来说，优势在与处理then的调用链，能够更清晰准确的写出代码，
毕竟写一大堆then的行为不太优雅，同时也能解决回调地狱的问题.
缺点：await 将异步代码改造成同步代码，如果多个异步代码没有依赖性却使用了await将会导致性能上的降低
 */
async function test(){
	// 以下代码没有依赖性的话，完全可以使用Promise.all的方式
	// 如果有依赖性的话，其实就相当于解决回调地狱的例子
	await fetch(url)
	await fetch(url1)
	await fetch(url2)
}
// 使用await的例子
let a = 0
let b = async () =>{
	a = a + await 10
	console.log('2',a)// ->'2' 10
}
b()
a++
console.log('1',a) // -> '1' 1
 //上例的运行
 /*
 首先函数b先执行，在执行到 await之前 变量a还是0，因为 await内部是想了generator，generator会保留堆栈中的东西，所以这是 a = 0被保存下来
 以为await是异步操作，后来的表达式不返回Promise的话，就会包装成Promise.rsolve(返回值),然后会去执行函数外的同步代码
 同步代码执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时 a = 0 +10
 总的来说 其实就是 await 就是 generator加上Promise的语法糖，且内部实现了自动执行generator。
  */
