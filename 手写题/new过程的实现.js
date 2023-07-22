//模拟new的实现
function toNew(fn,...args) {
    //返回一个对象，并将这个对象的原型指向fn的原型
    let fnPrototype = Object.create(fn.prototype);
    const result = fn.apply(fnPrototype, ...args);
    //如果fn的构造函数中返回了一个对象
    return typeof result === "obejct" ? result : fnPrototype;
}

