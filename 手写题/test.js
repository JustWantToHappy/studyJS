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


const em = new EventEmitter();
let currentFn;
let obId = 1;

const autorun = (fn) => {
	currentFn = fn;
	fn();
	currentFn = null;
};

const observable = (obj) => {
	// 用 Symbol 当 key；这样就不会被枚举到，仅用于值的存储；
	const data = Symbol('data');
	obj[data] = JSON.parse(JSON.stringify(obj));

	Object.keys(obj).forEach(key => {
		if (typeof obj[key] === 'object') {
			observable(obj[key]);
		} else {
			// 每个 key 都生成唯一的 channel ID
			const id = String(obId++);
			Object.defineProperty(obj, key, {
				get: function () {
					if (currentFn) {
						em.on(id, currentFn);
					}
					return obj[data][key];
				},
				set: function (v) {
					// 值不变时不触发
					if (obj[data][key] !== v) {
						obj[data][key] = v;
						em.emit(id);
					}
				}
			});
		}
	});
	return obj;
};


const store = observable({ a: 1, b: { c: 1 } });

autorun(() => {
	if (store.a === 2) {
		console.log(store.b.c);
	}
});

store.a = 2
store.b.c = 5;
store.b.c = 6;