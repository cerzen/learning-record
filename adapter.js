// 适配器模式
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
