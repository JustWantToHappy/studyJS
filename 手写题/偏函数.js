/**
 * 什么是偏函数?
 * 偏函数就是将一个n参的函数转化为固定x参的参数，剩余参数(n-x)将会在下一次调用的时候全部传入
 */

function partial(fn,...args) {
  function judge(...arg) {
    return fn(...args, ...arg);
  }
  return judge;
}

const sum = (a,b,c) => {
  return a + b + c;
}

const sumPartial = partial(sum, 1);
console.info(sumPartial(2,3))




