// Trie
// 前缀树或字典树，是一种有序树，用于保存关联数组，其中的键通常是字符串
// 作用之一方便搜索字符串
// 特点：根节点代表空字符串，每个节点都有N（假如搜索英文字符，就有26条）条链接，毎条链接代表一个字符
// 		节点不存储字符，只有路劲才存储，这点和其他树的结构不同
// 		从根节点开始到任意一个节点，将沿途经过的字符连接起来就是该节点对应的字符串
// 		举例 搜索英文字符
class TrieNode{
	constructor(){
		// 代表每个字符经过节点的次数
		this.path = 0
		// 代表到该节点的字符串有几个
		this.end = 0
		// 链接
		this.next = new Array(26).fill(null)
	}
}
class Trie{
	constructor(){
		// 根节点，代表空字符
		this.root = new TrieNode()
	}
	// 插入字符串
	insert(str){
		if(!str) return
		let node = this.root
		for(let i = 0; i<str.length;i++){
			// 获得字符先对应的索引
			let index = str[i].charCodeAt() - 'a'.charCodeAt()
			// 如果索引对应没有值，就创建
			if(!node.next[index]){
				node.next[index] = new TrieNode()
			}
			node.path +=1
			node = node.next[index]
		}
		node.end +=1
	}
	// 搜索字符串出现的次数
	search(str){
		if (!str) return
		let node = this.root
		for(let i = 0; i<str.length; i++){
			let index =str[i].charCodeAt() - 'a'.charCodeAt()
			// 如果索引对应没有值，代表没有需要搜索的字符串
			if(!node.next[index]){
				return 0
			}
			node = node.next[index]
		}
		return node.end
	}
	// 删除字符串
	delete(str){
		if(!this.search(str)) return
		let node =this.root
		for(let i = 0; i < str.length; i++){
			let index = str[i].charCodeAt() - 'a'.charCodeAt()
			// 如果索引对应的节点的Path为0，代表经过该节点的字符串只有一个，直接删除即可
			if(--node.next[index].path ==0){
				node.next[index] = null
				return
			}
			node = node.next[index]
		}
		node.end -=1
	}
}
