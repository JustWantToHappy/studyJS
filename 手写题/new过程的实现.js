//模拟new的实现
function toNew(fn,...args) {
    let fnPrototype = Object.create(fn.prototype);
    const result = fn.apply(fnPrototype, ...args);
    return typeof result === "obejct" ? result : fnPrototype;
}


