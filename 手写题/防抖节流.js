/**
 * 注意事项：防抖节流不建议使用箭头函数，因为返回的函数需要访问外部的变量或对象，
 * 而箭头函数的 this 绑定是固定的、无法更改的，可能导致 this 绑定不正确。
 */


//防抖
const debouce_easy = function (fn, delay) {
    let timer = null;
    return function () {
        let args = arguments;
        let that = this;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(that, args);
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
        const that = this, args = arguments;
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
const throttle_timer = function (fn, delay) {
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
        if (Date.now() - start < delay) {
            return;
        }
        start = Date.now();
        setTimeout(() => {
            fn.apply(that, args);
        }, delay);
    }
    return throttleFunc;
}

/**
 * 高级节流函数
 * @desc 这个函数确实还是没有搞懂。。。
 * @param {Function} fn - 要进行节流的函数
 * @param {number} delay - 节流频率
 * @param {{leading:boolean,trailing:boolean}} options - leading表示可以立即执行一次
 * trailing表示结束调用的时候是否还要调用一次(也就是节流取消的时候)
 */
const throttle_advanced = function (fn, delay, options = { leading: true, trailing: true }) {
    var timer = result = context = args = null;
    var previousTime = 0;


    const { leading, trailing } = options;

    const throttled = function () {
        context = this;
        args = arguments;
        const currentTime = new Date().getTime();
        //表示第一次执行节流函数不立即执行，因为remaing=wait
        if (!previousTime && leading === false) previousTime = currentTime;
        const remaining = delay - (currentTime - previousTime);
        if (remaining <= 0) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            previousTime = currentTime;
            fn.apply(context, args);
            //避免内存泄漏，因为每次执行节流函数都会创建一个throttled函数
            if (!timer) context = args = null;
        } else if (!timer && trailing !== false) {
            timer = setTimeout(() => {
                previousTime = leading === false ? 0 : new Date().getTime();
                timer = null;
                fn.apply(context, args);
                if (!timer) context = args = null;
            }, remaining);
        }
    }
    /**
     * 这个函数并不是说使用之后，以后每次触发都不会有节流效果了，而是指的是如本次节流周期中，如果调用cancle
     * 就会重新开始下一轮节流
     */
    throttled.cancle = function () {
        clearTimeout(timer);//取消当前节流函数的定时器
        //重置计时器状态
        previousTime = 0;
        timer = null;
    }
    return throttled;
}