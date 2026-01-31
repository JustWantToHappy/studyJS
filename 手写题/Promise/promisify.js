/**
 * 实现nodejs中utils.promisify函数，node回调风格转换为promise风格
 * @callback func
 * @returns Function
 */
function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      func.call(
        this,
        ...args,
        (err, value) => {
          if (err) {
            reject(err);
          } else {
            resolve(value);
          }
        }
      );
    });
  };
}
//function foo(url, options, callback) {
//  apiCall(url, options)
//    .then((data) => callback(null, data))
//    .catch((err) => callback(err));
//}

//const promisifiedFoo = promisify(foo);
//const data = await promisifiedFoo('example.com', { foo: 1 });
