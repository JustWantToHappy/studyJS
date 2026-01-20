/**
 * @param {Array<any>} iterable
 * @param {Function} callbackFn 一个异步的任务，比如发送请求等
 * @param {number} size
 *
 * @return {Promise}
 */
export default function mapAsyncLimit(iterable, callbackFn, size = Infinity) {
  const length = iterable.length;
  const results = new Array(length);
  let nextIndex = 0;  // 下一个要执行的任务索引
  let activeCount = 0; // 当前正在执行的任务数

  return new Promise((resolve, reject) => {
    if (length === 0) {
      resolve(results);
      return;
    }

    const runNext = () => {
      // 所有任务完成
      if (nextIndex >= length && activeCount === 0) {
        resolve(results);
        return;
      }

      while (activeCount < size && nextIndex < length) {
        const current = nextIndex++;
        activeCount++;

        // 执行异步函数
        Promise.resolve(callbackFn(iterable[current], current, iterable))
          .then((res) => {
            results[current] = res;
          })
          .catch((err) => {
            reject(err); // 如果需要，也可以改成 results[current] = err 继续执行
          })
          .finally(() => {
            activeCount--;
            runNext(); // 尝试执行下一个任务
          });
      }
    };

    runNext(); // 启动第一个批次
  });
}
