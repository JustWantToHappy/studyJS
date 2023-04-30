const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(f) {
    //初始时promise的状态是PENDING
    this.state = PENDING;
    /**
     * 当state是fulfilled时，result作为value看待，比如链式调用中then的第一个回调的参数
     * 当state是rejected时，result作为reason看待，比如链式调用中then的第二个回调的参数
     */
    this.result = null;
    this.callbacks = []; //promise的原型方法必须按照顺序执行

    //状态迁移函数，它只会在state为pending时，进行状态迁移
    const transition = (promise, state, result) => {
        if (promise?.state !== PENDING) return;
        promise.state = state;
        promise.result = result;
    };
    //对promise.resolve进行特殊处理
    const resolvePromise = (promise, result, resolve, reject) => {
        // promise.resolve时候，resolve参数不能够是自身，会报错
        if (result === promise) {
            let reason = new TypeError("Can not fulfill promise with itself");
            return reject(reason); 
        }

        let isPromise = Object.prototype.toString.call(promise) === '[object Promise]';
        //如果resolve的是一个promise，则直接使用这个promise的state和result
        if (isPromise) {
            return result.then(resolve, reject);
        }
        //如果resolve的是一个thenable对象，thenable对象定义:类似promise对象
        let isThenable = typeof result === "object" || typeof result === "function";

        if (isThenable) {
            try {
                //如果这个thenable对象具有then方法属性
                let then = result.then;
                if (Object.prototype.toString.call(then) === "[object Function]") {
                    return new Promise(then.call(result)).then(resolve, reject);
                }
            } catch (err) {
                reject(err);
            }
        }
        //不满足以上所有情况:
        resolve(value);

    }

    let onFulfilled = value => transition(this, FULFILLED, value);
    let onRejected = value => transition(this, REJECTED, value);

    let ignore = false; //保证resolve,reject只有一次调用作用
    let resolve = (value) => {
        if (ignore) return;
        ignore = true;
        //对resolve的参数进行特殊处理
        resolvePromise(this, value, onFulfilled, onRejected);
    };
    let reject = (value) => {
        if (ignore) return;
        ignore = true;
        onRejected(value);
    };
    //为什么要try-catch，因为Promise构造函数必须接受的是一个函数
    try {
        f(resolve, reject);
    } catch (err) {
        reject(err);
    }
}

const handleCallback = (callback, state, result) => {
    const { onFulfilled, onRejected, resolve, reject } = callback;
    let isFunction =
        Object.prototype.toString.call(onFulfilled) === "[object Function]";
    try {
        if (state === FULFILLED) {
            isFunction ? resolve(onFulfilled(result)) : resolve(result);
        } else if (state === REJECTED) {
            isFunction ? resolve(onRejected(result)) : reject(result);
        }
    } catch (err) {
        reject(err);
    }
};
//onFulfilled接收参数是value,onRejected接收参数是reason
Promise.prototype.then = function (onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
        let callback = { onFulfilled, onRejected, resolve, reject };
        if (this.state === PENDING) {
            this.callbacks.push(callback);
        } else {
            setTimeout(() => {
                handleCallback(callback, this.state, this.result);
            }, 0);
        }
    });
};

Promise.prototype.catch = function (onFuifilled, onRejected) {
    return new Promise((resolve, reject) => {
        
    });
}
