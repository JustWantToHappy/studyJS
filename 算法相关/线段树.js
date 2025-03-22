/**
 * 模拟实现线段树,长度设置为4n
 */
class SegmentTire {
  constructor(arr = []) {
    this.arr = arr;
    this.n = arr.length;
    this.tree = Array(arr.length * 4).fill(0);
    //lazy标记
    this.lazy = Array(arr.length * 4).fill(0);
  }
  /**
 * 
 * @param {线段起始点} left 
 * @param {线段终止点} right 
 * @param {从那个端点开始构建线段树} index 
 * @desc 构建线段树
 */
  build(left = 0, right = this.n - 1, index = 0) {
    const { arr, tree } = this;
    if (left === right) {
      tree[index] = arr[left];
      return;
    }
    let mid = Math.floor((left + right) >> 1);
    this.build(left, mid, 2 * index + 1);
    this.build(mid + 1, right, 2 * index + 2);
    tree[index] = tree[2 * index + 1] + tree[2 * index + 2];
  }
  /**
   * 
   * @param {要查询的区间的左端点} l 
   * @param {要查询的区间的右端点} r 
   * @param {当前区间的左端点} left 
   * @param {当前区间右端点} right 
   * @param {this.tree[index]表示当前区间之和} index 
   * @returns 当前区间和
   */
  search(l = 0, r = this.n - 1, left = 0, right = this.n - 1, index = 0) {
    const {tree,lazy } = this;
    //如果要查询的区间已经覆盖了当前的区间，直接返回当前区间和
    if (l <= left && r >= right) {
      return tree[index];
    } else if (left === right) {
      return 0;
    }
    let mid = Math.floor((left + right) >> 1);
    /**
     * 下传清除操作
     * 如果当前区间没有被完全包含，则下传lazy标记，并清除原来的lazy标记
     * 作用就是避免修改时候重复的计算，让计算在查询的时候就完成
     * 
     */
    if (lazy[index]) {
     tree[2 * index + 1] += (mid - left + 1) * lazy[index];
     tree[2 * index + 2] += (right - mid) * lazy[index];
     lazy[2 * index + 1] += lazy[index];
     lazy[2 * index + 2] += lazy[index];
     lazy[index] = 0;
   }
    return this.search(l, r, left, mid, 2 * index + 1) + this.search(l, r, mid + 1, right, 2 * index + 2);
  }

  modifyInterval(l, r, change, left = 0, right = this.n - 1, index = 0) {
    const { tree, lazy } = this;
    if (l <= left && right <= r) {
      tree[index] += (right - left + 1) * change;
      lazy[index] += change;
      return;
    } else if (left === right) {
      //防止left===right时候造成的无限递归
      return;
    }
    let mid = Math.floor((left + right) >> 1);
    if (left <= mid) this.modifyInterval(l, r, change, left, mid, 2 * index + 1);
    if (mid < right) this.modifyInterval(l, r, change, mid + 1, right, 2 * index + 2);
    tree[index] = tree[index * 2 + 1] + tree[index * 2 + 2];
  }
}

const segmentTire = new SegmentTire([2, 3, 1, 4, 5, 1, 6]);
segmentTire.build();
console.info(segmentTire.tree,'hhh')
segmentTire.modifyInterval(3, 5, 1);
console.info(segmentTire.tree)
segmentTire.modifyInterval(3, 5, 2);
console.info(segmentTire.tree)
console.info(segmentTire.search(3,4))
console.info(segmentTire.tree)

let sb=new SegmentTire([9,-8])
sb.build();
console.info(sb.tree)
