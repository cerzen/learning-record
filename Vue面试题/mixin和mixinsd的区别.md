1.mixin 用于全局混入，会影响每个组件实例，通常插件都是这样做初始化的。

```
Vue.mixin({
    beforeCreate(){
      //...逻辑
      //这种方式会影响到每个组件的beforeCreate钩子函数
    }
})

```

虽然文档不建议我们在应用中直接使用mixin，但是如果不滥用的话也是很有帮助的，比如可以全局混入封装好的ajax或者一些工具函数等等。

2.mixins应该是我们最常用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过mixins混入代码，
比如上拉下拉加载数据这种逻辑等等。

另外需要注意的事mixins混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时候也会有选择的进行合并。
