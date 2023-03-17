//instanceof作用:检验函数的prototype是否出现在实例对象的原型链上
function myInstanceof(obj,fn) {
    let objPrototype = Object.getPrototypeOf(obj);
    let fnPrototype = fn.prototype;
    while (objPrototype!==null&&fnPrototype !==objPrototype) {
        objPrototype = Object.getPrototypeOf(objPrototype);
    }
    return objPrototype === null ? false : true;
}

console.info(myInstanceof([],Object));
console.info(myInstanceof([], Array));

