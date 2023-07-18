/**
 * 注意事项：防抖节流不建议使用箭头函数，因为返回的函数需要访问外部的变量或对象，
 * 而箭头函数的 this 绑定是固定的、无法更改的，可能导致 this 绑定不正确。
 */


//防抖
const debouce_easy = function (fn, delay) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, Array.prototype.slice.call(arguments, 0));
        }, delay);
    }
}
/**
 * 防抖高级写法
 * 支持以下功能:
 * 支持函数立即执行
 * 函数可能有返回值
 * 支持取消功能
 * @param {Function} fn - 要进行防抖的函数
 * @param {number} delay - 防抖时长
 * @param {boolean} immediate  - 是否开启立即执行
 */
const debouce_advanced = function (fn, delay, immediate = false) {
    var timer = result = null;
    var debouced = function () {
        const that = this, args = Array.from(arguments);
        if (timer) clearTimeout(timer);
        if (immediate) {
            //只有当timer是null的时候才会立即执行
            var callNow = !timer;
            if (callNow) result = fn.apply(that, args);
            //已经执行过了，让timer不为null
            timer = setTimeout(() => {
                timer = null;//当delay过去之后，设置timer为null
            }, delay);
        } else {
            timer = setTimeout(() => {
                result = fn.apply(that, args);
            }, delay);
        }
        return result;
    }
    debouced.cancle = function () {
        clearTimeout(timer);
        timer = null;
    }
    return debouced;
}
/**
 * @desc 节流的多种写法
 * @returns 
 */

//第一种写法:使用标志变量
const throttle_flag = function (fn, delay) {
    let flag = false;
    let throttleFunc = function () {
        let that = this;
        let args = Array.from(arguments);
        if (flag) {
            return;
        }
        flag = true;
        setTimeout(() => {
            flag = false;
            fn.apply(that, args);
        }, delay);
    }
    return throttleFunc;
}
//第二种：使用定时器
const throttle_timer = function (fn, delay) {
    let timer = null;
    let throttltFunc = function () {
        let args = Array.from(arguments), that = this;
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            fn.apply(that, args);
            timer = null;
        }, delay);
    }
    return throttltFunc;
}
//第三种方式:使用时间戳
const throttle_timestamp = function (fn, delay) {
    let start = null;
    let throttleFunc = function () {
        let that = this, args = Array.from(arguments);
        if (typeof start === 'number' && Date.now() - start < delay) {
            return;
        }
        start = Date.now();
        setTimeout(() => {
            fn.apply(that, args);
        }, delay);
    }
    return throttleFunc;
}
