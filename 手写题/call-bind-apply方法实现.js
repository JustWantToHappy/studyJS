//call方法的实现
Function.prototype._call = function (context,...args) {
    context = typeof context !== "object" ? window : context;
    //避免原有属性被覆盖
    const key = Symbol();
    context[key] = this;
    const result = context[key](...args);
    delete context[key];
    return result;
}
//apply方法的实现
Function.prototype._apply = function (context,args) {
    context = typeof context !== "object" ? window : context;
    //避免原有属性被覆盖
    const key = Symbol();
    context[key] = this;
    const result = context[key](...args);
    delete context[key];
    return result;
}

// bind方法的实现
Function.prototype._bind = function (target) {
    let that = typeof window === "object" ? window : globalThis;
    //如果给bind函数指定的this指向为null或者undefined，则将this指向改为全局对象
    target = (typeof target) !== "object" ? that : target;
    let fn = this;
    let args1 = [].slice.call(arguments, 1);
    const bindClone = function () {
        let args2 = Array.prototype.slice.call(arguments);
        fn.call(this instanceof bindClone?fn:target,args1.concat(args2));
    }
    let Bar = function () { }
    Bar.prototype = fn.prototype;
    //为什么要将bindClone.prototype不直接指向fn.prototype呢
    //这是为了防止如果对bindClone.prototype直接修改，然后对fn.prototype造成影响
    bindClone.prototype = new Bar();
    return bindClone;
}
function test(a,b) {
    console.info(a, b,this.name);
}
test._bind({ name: "sb" },'a','b')();