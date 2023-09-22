function throttle(fn, delay) {
  let prevTime = 0
  return function (...args) {
    let result;
    const curTime = new Date().getTime()
    if (curTime - prevTime > delay) {
      result = fn.call(this, ...args)
      prevTime = curTime;
    }
    return result;
  }
}