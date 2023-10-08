//instanceof作用:检验函数的prototype是否出现在实例对象的原型链上
function myInstanceof(obj, fn) {
    //边界条件
    if (obj === null || obj === undefined || fn === null || fn === undefined) return false;
    //let objPrototype = Object.getPrototypeOf(obj);
    let objPrototype = obj.__proto__;
    let fnPrototype = fn.prototype;
    while (objPrototype !== null && fnPrototype !== objPrototype) {
        //objPrototype = Object.getPrototypeOf(objPrototype);
        objPrototype = objPrototype.__proto__;
    }
    return !objPrototype === null 
}
console.info(myInstanceof([], Object));
console.info(myInstanceof([], Array));