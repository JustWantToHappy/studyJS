class PivotSort {
  constructor(arr) {
    this.arr = arr;
    this.init();
  }
  init() {
    this.buckets = Array.from(new Array(10), () => []);
  }
  addToBucket(index, n, arr) {
    if (n <= 0) {
      return;
    }
    for (let i = 0; i < this.arr.length; i++) {
      const digit = Math.floor(arr[i] / Math.pow(10, index - 1)) % 10;
      //每个bucket最好使用链表形式的队列
      const queue = this.buckets[digit];
      if (!queue) {
        this.buckets[digit] = [arr[i]];
      } else {
        queue.push(arr[i]);
      }
    }
  }

  sort(index = 1, n = String(Math.max(this.arr)).length, arr = this.arr) {
    if (index > n) {
      return arr;
    }
    this.addToBucket(index, n, arr);
    //将桶中的节点依次poll
    const brr = this.buckets.reduce((acc, cur) => {
      if (cur !== null) {
        return acc.concat(cur);
      }
      return acc;
    }, []);
    //清桶
    this.buckets = this.buckets.map(() => null);
    return this.sort(index + 1, n, brr);
  }
}

console.log(new PivotSort([455, 678, 8, 34, 111, 455]).sort());