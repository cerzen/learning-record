如果通过下标方式修改数组数据或者给对象新增属性并不会触发组件的重新渲染，因为Object.defineProperty不能拦截到这些操作，更准确的来说，
对于数组而言，大部分操作都是拦截不到的，只是Vue内部通过重写函数的方式解决了这个问题。

对于第一个问题，Vue提供了一个API解决

```

export function set(target: Array<any> | Object, key:any, val:any) :any{
  //判断是否为 数组且下标是否有效
  if(Array.isArray(target)&& isValidArrayIndex(key)){
    //调用 splice 函数触发派发更新
    //该函数已被重写
    target.length = Math.max(target.length,key)
    target.splice(key,1,val)
    return val
  }
  //判断key是否已经存在
  if(key in target && !(key in Object.prototype)){
    target[key] = val
    return val
  }
  
  const ob = (target:any).__ob__
  //如果对象不是响应式对象，就赋值返回
  if(!ob){
    target[key] =val
    return val
  }
  //进行双向绑定
  defineReactive(ob.value,key.val)
  //手动派发更新
  ob.dep.notify()
  return val
}

对于数组而言，Vue内部重写了以下函数实现派发更新

//获得数组原形

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
//重写以下函数

const methodsToPatch =[
 'push',
 'pop',
 'shift',
 'unshift',
 'splice',
 'sort',
 'reverse'
]
methodsToPath.forEach(function (method){
  //缓存原生函数
  const original = arrayProto[method]
  //重写函数
  def(arrayMethods,method,function mutator (...args){
    //先调用原生函数获得结果
    const result = original.apply(this,args)
    const ob = this.__ob__
    let inserted
    //调用以下几个函数时，监听新数据
    switch(method){
      case 'push':
      case 'unshif':
        inserted =arg
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if(inserted) ob.observeArray(inserted)
    //手动派发更新
    ob.dep.notify()
    return result
  })
})

```
