// 适配器模式 用来解决两个接口不兼容的情况，不需要改变已有的接口，通过包装一层的方式实现两个接口的正常协作
class Plug{
	getName(){
		return '插头'
	}
}

class Target{
	constructor(){
		this.plug = new Plug()
	}
	getName(){
		return this.plug.getName() + '适配器转二脚插头'
	}
}

let target = new Target()
console.log(target.getName()) /*插头 适配器转二脚插头*/
