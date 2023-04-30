/**
 * @desc 函数柯里化：就是将使用多个参数的函数转换成一系列使用一个参数的函数的技术
 */

//函数柯里化举例
const sums = (a) => {
  return function (b) {
    return function (c) {
      return a + b + c;
    }
  }
}
//调用
sums(1)(2)(3)

function sum(a, b, c) {
  return a + b + c;
}
//实现函数柯里化
function curry(fn) {
  let judeg = (...args) => {
    if (args.length === fn.length) return fn(...args);
    return (...arg) => judeg(...args, ...arg);
  }
  return judeg;
}
const carriedsum = curry(sum);
console.info(carriedsum(1)(2, 3));
console.info(carriedsum(1, 2)(3));
console.info(carriedsum(1, 2, 3));
