//去除数组中重复元素的4种方法
Array.prototype.method1 = function(){
	var arr = [];
	for(var i=0;i<this.length;i++){
		if(arr.indexOf(this[i]) == -1){//使用indexOf()方法可返回数组中某个指定元素的位置，通过这个方法往arr中加入元素
			arr.push(this[i]);//如果数组中不存在该元素则往里添加 从而达到去重的效果
		}
	}
	return arr;
}


Array.prototype.method2=function(){
	var h={}; //定义一个hash表
	var arr=[];//定义一个临时数组

	for(var i = 0; i < this.length; i++){//循环遍历当前数组
		//对元素进行判断，看是否已经存在表中，如果存在则跳过，否则存入临时数组
		if(!h[this[i]]){
			//存入hash表
			h[this[i]] = true;
			//把当前数组元素存入临时数组中
			arr.push(this[i]);
		}
	}
	return arr;
}

Array.prototype.method3 = function(){
	// 直接定义结果数组
	var arr=[];
	arr[0]=this[0];
	for(var i = 1;i < this.length; i++){//从数组第二项开始循环遍历此数组
     //对元素进行判断；
     //如果数组当前元素在此数组中一次出现的位置不是i
     //那么我们可以判断第	i项元素是重复的，否则直接存入结果数组
     if(this.indexOf(this[i])== i){
     	arr.push(this[i]);
     }
	}
	 return arr;
}

Array.prototype.method4 = function(){
	// 将数组进行排序
	this.sort();
	// 定义结果数组
	var arr=[];
	arr[0]=this[0];
	for(var i = 1; i<this.length;i++){//从数组第二项开始循环遍历数组
		//判断相邻两个元素是否相等，如果相等说明数据重复，否则将元素写入结果数组
		if(this[i] !== arr[arr.length -1]){
			arr.push(this[i]);
		}
	}
	return arr;
}
console.log([1,1,3,4,9,5,6,3,3].method4())//js 调用方法是要加（） 区别于属性的调用  没加（）返回function
