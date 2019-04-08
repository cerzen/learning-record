1. call()、apply()可以看做是某个对象的方法，通过调用方法的形式来间接调用函数。bind()就是将某个函数绑定到某个对象上。（javascript权威指南）

2.apply、call的作用就是：让函数在某个指定的对象下执行。

```
var obj = {x:1}

function foo(){console.log(this.x)}

foo.call(obj)//打印结果：1

```

3.call()和apply（）的第一个参数相同，就是指定的对象。这个对象就是该函数的执行上下文。

4.call()和apply（）的区别就在于，两者之间的参数。

call（）在第一个参数之后的 后续所有参数就是传入该参数的值。apply（）只有两个参数，第一个是对象，第二个是数组，这个数组就是该函数的参数


```
var obj = {};

function foo(a,b,c){
  console.log(b)
}

foo.call(obj,1,2,3) //打印结果：2

```

```

var obj ={};

function foo(a,b,c){
  console.log(b)
}

foo.apply(obj,[1,2,3]) //打印结果：2；
```

5.bind（）方法和前两者不同在于：bind（）方法会返回执行上下文，被改变的函数而不会立即执行，而前两者是直接执行该函数，他的参数和call（）相同。

6.三个方法的作用都是改变函数的执行上下文 （this指向）

