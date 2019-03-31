// Generator是什么？
// 在异步编程中，还有一种常用的解决方案，Generator生成器函数。
// 它也是一个状态机，内部拥有值及相关的状态，生成器返回一个迭代器lterator对象，
// 我们可以通过这个迭代器，手动地遍历相关的值、状态、保证正确的执行顺序.
function *foo(x){
	let y = 2 *(yield(x+1))
	let z = yield(y/3)
	return (x+y+z)
}
let it = foo(5)
console.log(it.next()) // =>{value: 6, done:false}
console.log(it.next(12)) // =>{value: 8 ,done:false}
console.log(it.next(13)) //=>{value: 42,done:true}
// 上例的运行如下
/*
首先Generator函数调用和普通函数不同，它会返回一个迭代器
当执行第一次next是时，传参会被忽略，并且函数暂停在yield(x+1)处，所以返回 5+1=6
当执行第二次next时，传入的参数等于上一个yield的返回值，如果你不传参，yield永远返回undefined。此时let y= 2*12,所以第二个参数等于2*12/3=8
当执行第三次next时，传入的参数会传递给z，所以z= 13，x = 5, y=24,相加等于 42
 */
/*
Generator 函数一般会配合co库区使用。
 */
// Generator 函数解决回调地狱的问题
function *fetch(){
	yield ajax(url,() =>{})
	yield ajax(url,() =>{})
	yield ajax(url2,()=>{})
}
let it=fetch()
let result1=it.next()
let result2 = it.next()
let result3 = it.next()
