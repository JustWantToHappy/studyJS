/**
 * @param {Array<any>} iterable
 * @param {Function} callbackFn 一个异步的任务，比如发送请求等
 * @param {number} size
 * @return {Promise}
 */
export default function mapAsyncLimit(iterable, callbackFn, size = Infinity) {
  const length = iterable.length;
  const results = new Array(length);
  let nextIndex = 0;
  let completedCount = 0;

  return new Promise((resolve, reject) => {
    if (length === 0) {
      resolve(results);
      return;
    }

    const runNext = () => {
      if (nextIndex >= length) return;
      const current = nextIndex++;

      Promise.resolve(callbackFn(iterable[current], current, iterable))
        .then((res) => {
          results[current] = res;
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          if (++completedCount === length) {
            resolve(results);
          } else {
            runNext();
          }
        });
    };

    for (let i = 0; i < Math.min(size, length); i++) {
      runNext();
    }
  });
}
