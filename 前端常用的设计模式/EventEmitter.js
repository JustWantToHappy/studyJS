/**
 * @desc 简单模拟实现nodejs的EventEmitter模块
 */
class EventEmitter {
  //存储事件对应的回调函数,events:{[key:string]:Function[]}
  events = {}

  on(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName].push(callback)
    } else {
      this.events[eventName] = [callback]
    }
  }

  emit(eventName, data) {
    this.events[eventName]?.forEach(callback => callback(data))
  }

  off(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter(fn => fn !== callback)
  }

  once(eventName, callback) {
    const onceCallback = data => {
      callback(data)
      this.off(eventName, onceCallback)
    }
    this.on(eventName, onceCallback)
  }
}

const eventEmitter = new EventEmitter()

eventEmitter.on('join', (data) => {
  console.info(`${data}来啦`)
})

eventEmitter.emit('join', '马大师')
