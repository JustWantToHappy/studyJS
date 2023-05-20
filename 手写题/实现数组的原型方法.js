/**
 * 
 * @param {Function} callback 
 * @param {Object} thisArg 指定执行callback的时候的this指向
 * @desc Array.prototype.forEach方法的实现
 */
Array.prototype.forEach1 = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function");
  }

  let length = this.length >>> 0;
  let k = 0;
  while (k < length) {
    if (k in this) {
      callback.call(thisArg, this[k], k, this);
    }
    k++;
  }
}
/**
 * 
 * @param {Function} callback 
 * @param {Object} thisArg  
 * @returns {Array}
 * @desc Array.prototype.map方法的实现
 */
Array.prototype.map1 = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function");
  }

  let k = 0;
  let length = this.length >>> 0;
  let res = [];
  while (k < length) {
    if (k in this) {
      res.push(callback.call(thisArg, this[k], k, this));
    }
    k++;
  }
  return res;
}
/**
 * 
 * @param {Function} callback 
 * @param {Object} thisArg 
 * @returns Array
 * @desc Array.prototype.filter方法的实现
 */
Array.prototype.filter1 = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function");
  }
  let length = this.length >>> 0;
  let k = 0, res = [];
  while (k < length) {
    if (k in this && callback.call(thisArg, this[k], k, this)) res.push(this[k]);
    k++;
  }
  return res;
}

Array.prototype.reduce1 = function (callback, initialValue) {
  if (this === null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function");
  }
  let result = initialValue, k = 0;
  let length = this.length >>> 0;

  if (arguments.length > 1) {
    result = initialValue;
  } else if (arguments.length <= 1 && length > 0) {
    result = this[k];
    k++;
  } else {
    //空数组必须提供一个初始值
    throw new TypeError("Reduce of empty array with no initial value");
  }

  while (k < length) {
    result = callback(result, this[k], k);
    k++;
  }
  return result;
}

