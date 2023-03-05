//防抖
const debouce = function (fn,delay) {
    let timer = null;
    return function () {
        let args = arguments;
        let that = this;
        if (timer) {
            clearTimeout(timer);
        }
        timer=setTimeout(() => {
            fn.apply(that, args);
        }, delay);
    }
}
/**
 * @desc 节流的多种写法
 * @returns 
 */

//第一种写法:使用标志变量
const throttle_flag = function (fn,delay) {
    let flag = false;
    let throttleFunc = function () {
        let that = this;
        let args = arguments;
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
const throttle_timer = function (fn,delay) {
    let timer = null;
    let throttltFunc = function () {
        let args = arguments, that = this;
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
    let start = Date.now();
    let throttleFunc = function () {
        let that = this, args = arguments;
        if (Date.now()- start < delay) {
            return;
        }
        start = Date.now();
        setTimeout(() => {
            fn.apply(that, args);
        }, delay);
    }
    return throttleFunc;
}