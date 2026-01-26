/**
 * @param {Array} iterable
 * @return {Promise}
 */
export default function promiseAny(iterable) {
  return new Promise((resolve, reject) => {
    const errors = []
    let rejectedCount = 0
    const total = iterable.length

    if (total === 0) {
      reject(new AggregateError([], 'All promises were rejected'))
      return
    }

    Array.from(iterable).forEach((item, index) => {
      Promise.resolve(item)
        .then(resolve) // 只要一个成功，立刻 resolve
        .catch(err => {
          errors[index] = err
          rejectedCount++

          if (rejectedCount === total) {
            reject(new AggregateError(errors, 'All promises were rejected'))
          }
        })
    })
  })
}