如果你需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用keep-alive组件包裹需要保存的组件。

对于keep-alive组件来说，它拥有两个独有的生命周期钩子函数，分别为activated和deactivated。用keep-alive包裹的租价在企鹅黄时不会进行销毁，
而是缓存到内存中并执行deactivated钩子函数，命中缓存渲染后会执行actived钩子函数。

### activated keep-alive 组件激活时调用,该钩子在服务器端渲染期间不被调用。

### deactivated keep-alive 组件停用时调用。该钩子在服务器端渲染期间不被调用。
