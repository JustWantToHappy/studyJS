/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(iterable) {		//第一点：输入的是一个可迭代对象
	//第二个点：返回的是一个promise
  return new Promise((resolve,reject)=>{
    const arr=Array.from(iterable);
    let count=0;
		//第三点：需要使用一个数组记录每一个promise的fulfilled结果
    const results=Array.from({length:arr.length});
    if(!arr.length){
      resolve(results);
    }
    for(let i=0;i<arr.length;i++){
      Promise.resolve(arr[i]).then(res=>{
        results[i]=res;
        count++;
				//第四点：只有所有的promise的状态都是fulfilled，返回的Promise才是fulfilled
        if(count===arr.length){
          resolve(results);
        }
				//第五点：只要有一个promise的状态是rejected，返回的Promise就是rejected
      }).catch(reject)
    }
  })
}