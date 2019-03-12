// 装饰模式  不需要改变已有的接口，作用是给对象添加功能。
//不含装饰
class Man{
 constructor(def = 2,atk = 3,hp = 3){
 this.init(def,atk,hp);
 }

 init(def,atk,hp){
 this.def = def; // 防御值
 this.atk = atk; // 攻击力
 this.hp = hp; // 血量
 }
 toString(){
 return `防御力:$,攻击力:$,血量:$`;
 }
}

var tony = new Man();

console.log(`当前状态 ===> ${tony}`); 

// 输出：当前状态 ===> 防御力:2,攻击力:3,血量:3
// 创建 decorateArmour 方法，为man增加防御值——注意 decorateArmour 是装饰在方法init上的。
function decorateArmour(target, key, descriptor) {
 const method = descriptor.value;
 let moreDef = 100;
 let ret;
 descriptor.value = (...args)=>{
 args[0] += moreDef;
 ret = method.apply(target, args);
 return ret;
 }
 return descriptor;
}

class Man{
 constructor(def = 2,atk = 3,hp = 3){
 this.init(def,atk,hp);
 }

 @decorateArmour
 init(def,atk,hp){
 this.def = def; // 防御值
 this.atk = atk; // 攻击力
 this.hp = hp; // 血量
 }
 toString(){
 return `防御力:$,攻击力:$,血量:$`;
 }
}

var tony = new Man();

console.log(`当前状态 ===> ${tony}`);
// 输出：当前状态 ===> 防御力:102,攻击力:3,血量:3
