class Promise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }
    this.initValue()
    this.initBind()
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }
  initValue() {
    this.value = null//终值
    this.reason = null//拒因
    this.state = Promise.PENDING//状态
    this.onFulfilledCallbacks = []//成功回调
    this.onRejectedCallbacks = []//失败回调
  }
  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }
  resolve(value) {
    if (this.state === Promise.PENDING) {
      this.state = Promise.FULFILLED
      this.value = value
      this.onFulfilledCallbacks.forEach(fn => fn(this.value))
    }
  }
  reject(reason) {
    if (this.state === Promise.PENDING) {
      this.state = Promise.REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach(fn => fn(this.reason))
    }
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function (value) {
        return value
      }
    }
    if (typeof onRejected !== 'function') {
      onRejected = function (reason) {
        throw reason
      }
    }
    if (this.state === Promise.FULFILLED) {
      setTimeout(() => {
        onFulfilled(this.value)
      });
    } else if (this.state === Promise.REJECTED) {
      setTimeout(() => {
        onRejected(this.reason)
      });
    } else {
      this.onFulfilledCallbacks.push(value => {
        setTimeout(() => {
          onFulfilled(value)
        });
      })
      this.onRejectedCallbacks.push(reason => {
        setTimeout(() => {
          onRejected(reason)
        });
      })
    }
  }
}

Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'rejected'


module.exports = Promise