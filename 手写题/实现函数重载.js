/**
 * @param {object} obj 
 * @param {string} fnName
 * @param {Function} fn
 * @description 实现函数重载，这种方式实现的缺陷就是必须定义一个对象
 */
function addMethod(obj, fnName, fn) {
	const old = obj[fnName];
	obj[fnName] = function (...args) {
		//只有找到参数长度一致的情况下才调用
		if (args.length === fn.length) {
			return fn.apply(this, args);
		} else if (typeof old === "function") {
			//如下相当于长度不一致的情况，相当于递归，调用old保存的函数，这样形成了一个链条，因为old保存了除了最后一次addMethod的所有函数
			return old.apply(this, args);
		}
	}
}
const obj = {}

addMethod(obj, 'getUsers', (a) => {
	console.info("1个参数", a)
});
addMethod(obj, 'getUsers', () => {
	console.info("没有参数")
});
addMethod(obj, 'getUsers', (a, b) => {
	console.info("两个参数", a, b)
});
obj.getUsers(1);
obj.getUsers();
obj.getUsers(1, 2);
