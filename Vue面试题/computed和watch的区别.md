computed是计算属性，依赖其他属性计算值，并且computed的值有缓存，只有当计算值变化才返回内容。

watch监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。

所以一般来说需要依赖别的属性来动态获得值的时候可以使用computed，对于监听到值的变化需要做一些复杂业务逻辑的情况可以使用watch。

另外computed 和watch 还都支持对象的写法，这种方式比较少见

```vm.#watch('obj',{
    //深度遍历
    deep:true,
    //立即触发
    immediate:true,
    //执行的函数
    handler:function(val,oldVal){}
})

var vm=new Vue({
    data:{a:1},
    computed:{
      aPlus:{
      //this.aPlus 时触发
      get:function(){
        return this.a+1
      },
      //this.aPlus=1 时触发
      set:function(){
         this.a= v-1
        }
      }
    }
})

```
