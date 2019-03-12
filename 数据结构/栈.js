// 栈 是一种线性结构，在计算机中是相当常见的数据结构。 特点是只能在某一端添加或删除数据，遵循先进后出的原则
// 用数组方式实现
class Stack{
	constructor(){
		this.stack =[]
	}
	push(item){
		this.stack.push(item)
	}
	pop(){
		this.stack.pop()
	}
	peek(){
		return this.stack[this.getCount() - 1]
	}
	getCount(){
		return this.stack.length
	}
	isEmpty(){
		return this.getCount() === 0
	}
}
// LeetCode 序号20 Valid Parentheses 验证括号
// Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not
var isValid = function (s) {
	let map = {
		'(':-1,
		')': 1,
		'[':-2,
		']': 2,
		'{':-3,
		'}': 3
	}
	let stack = []
	for(let i = 0; i<s.length; i++){
		if(map[s[i]]<0){
			stack.push(s[i])
		}else{
			let last = stack.pop()
			if(map[last] + map[s[i]] !=0) return false
		}
	}
	if(stack.length>0) return false
		return true
}
