//模拟new的实现
function toNew(fn,...args) {
    //返回一个对象，并将这个对象的原型指向fn的原型
    let fnPrototype = Object.create(fn.prototype);
    //改变fn的this指向为刚刚创建的对象
    const result = fn.apply(fnPrototype, ...args);
    //如果fn的构造函数中返回了一个对象
    return typeof result === "obejct" ? result : fnPrototype;
}


