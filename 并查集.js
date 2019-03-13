// 并查集
/*是一种特殊的树结构，用于处理一些不交集的合并及查询问题。该结构中每个节点都有一个父节点，
如果只有当前一个节点，那么该节点的父节点指向自己
这个结构中有两个重要的操作，分别是：
Find：确定元素属于哪一个子集。它可以被用来确定两个元素是否属于同一子集。
Union：将两个子集合并成同一个集合*/
class DisjoinSet{
	// 初始化样本
	constructor(count){
		// 初始化时，每个节点的父节点都是自己
		this.parent = new Array(count)
		// 用于记录树的深度，优化搜索复杂度
		this.rank =new Array(count)
		for(let i = 0 ; i < count ; i++){
			this.parent[i] = i
			this.rank[i] = 1
		}
	}
	find(p){
		// 寻找当前节点的父节点是否为自己，不是的话表示还没有找到
		// 开始进行路劲压缩优化
		// 假设当前父节点为A
		// 将当前节点挂载到A节点的父节点上，达到压缩深度的目的
		while (p != this.parent[p]){
			this.parent[p] = this.parent[this.parent[p]]
			p = this.parent[p]
		}
		return p
	}
	isConnected(p,q){
		return this.find(p) === this.find(q)
	}
	// 合并
	union(p,q){
		// 找到两个数字的父节点
		let i = this.find(p)
		let j = this.find(q)
		if(i === j) return
		// 判断两颗树的深度，深度小的加到深度达的树下面、
		// 如果两棵树深度相等，那就无所谓相加了
		if( this.rank[i] < this.rank[j]){
			this.parent[i] = j
		}else if(this.rank[i] > this.rank[j]){
			this.parent[j] = i
		}else{
			this.parent[i]= j
			this.rank += 1
		}
	}
}
