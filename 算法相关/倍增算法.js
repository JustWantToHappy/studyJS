//题目来源：https://leetcode.cn/problems/kth-ancestor-of-a-tree-node/?envType=problem-list-v2&envId=design

//这个题常规写法是记录所有节点跳1,2,3,4,5...的步数，但是这样会内存溢出
/**
 * @param {number} n
 * @param {number[]} parent
 */
var TreeAncestor = function(n, parent) {
    this.parent = parent;
    this.maxLevel = Math.floor(Math.log2(n)) + 1;
		//up[i][j]表示从节点i向上走2^j步的节点
    this.up = Array.from({ length: n }, () => Array(this.maxLevel).fill(-1));
		//初始化节点i跳2^0(1)步的节点为parent[i]
    for (let i = 0; i < n; i++) {
        this.up[i][0] = parent[i];
    }
		//填充up数组，记录从i跳1,2,4,8,...步的后对应的节点
		/**
		 * 从 i 出发跳 2^j 步
    ⬇️ 拆解成两段跳：
		先从 i 跳 2^(j-1) 步 → 到达节点 A = up[i][j - 1]
		再从 A 再跳 2^(j-1) 步 → 到达最终节点 up[A][j - 1]

		 */
    for (let j = 1; j < this.maxLevel; j++) {
        for (let i = 0; i < n; i++) {
            if (this.up[i][j - 1] !== -1) {
                this.up[i][j] = this.up[this.up[i][j - 1]][j - 1];
            }
        }
    }
};

/** 
 * @param {number} node 
 * @param {number} k
 * @return {number}
 */
TreeAncestor.prototype.getKthAncestor = function(node, k) {
	result=-1
	for(let j=0;j<=16;j++){
		//跳j步的条件，比如：k等于7，j=0的时候，也就是跳1步，k&1为真，当k等于8的时候，为False
		if(k&(1<<j)){
			result=this.up[node][j]
			if(reuslt==-1){
				return -1
			}
		}
	}
	return result
};

/** 
 * Your TreeAncestor object will be instantiated and called as such:
 * var obj = new TreeAncestor(n, parent)
 * var param_1 = obj.getKthAncestor(node,k)
 */