/**
 * 为什么需要区分浅深拷贝，这是因为浅拷贝只会复制对象的第一层属性，而没有复制嵌套中的属性，
 * 也就是说如果修改了浅拷贝对象的第二层或者更深层属性之后，原对象也会被影响。
 */

const obj = { name: "sb", age: 10, info: { gender: "男" } };
//浅拷贝的几种方式：
const shallowObj1 = { ...obj };
const shallowObj2 = Object.assign({}, obj);
//浅拷贝(自定义函数)
function shallowCopy(obj) {
    if (typeof obj !== "object") {
        return;
    }
    let shallowObj = Array.isArray(obj) ? [] : {};
    //因为使用in操作符遍历对象身上的属性，处理对象自有属性，同时还有对象原型上的属性都会被遍历
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            shallowObj[key] = obj[key];
        }
    }
    return shallowObj;
}

//使用JSON对象的stringify和parse实现深拷贝
const shallowObj3 = JSON.parse(JSON.stringify(obj));

//简易版深拷贝(dfs版本)，不考虑内置对象和函数
const dfs_deep_copy = function (obj) {
    if (typeof obj !== "object") {
        return;
    }
    let deepObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            deepObj[key] = (typeof obj[key] === "object") ? dfs_deep_copy(obj[key]) : obj[key];
        }
    }
    return deepObj;
}

/**
 * 预备知识:环状数据
 * const obj={
 *  name:"john",
 *  age:12,
 *  children:[]
 * };
 * obj.children.push(obj);
 * @desc 它的children属性应用了它自己，由于是递归复制，会一直追踪children属性，导致死循环。
 */

/**
 * 深拷贝需要解决的问题:
 * 考虑到内置对象比如RegExp、Date等对象以及函数以及解决循环依赖的问题
 */

const getType = (item) => {
    return Object.prototype.toString.call(item).slice(8, -1);
}

/**
 * 
 * @param {any} obj 
 * @param {any[]} visitedArr 用来存放已经访问过的对象以及他们的副本，避免环状结构的循环
 * @desc 深拷贝dfs完全版本
 * @returns 
 */
//~index等价交换index!==-1

const isObect = (target) => (typeof target === "object" || typeof target === "function") && target !== null;
function DFSdeepClone(target, map = new WeakMap()) {
    if (map.get(target)) return target;
    //获取当前值的构造函数，获取到它的类型
    let constructor = target.constructor;
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
        return new constructor(target);
    }

    if (isObect(target)) {
        map.set(target.true);
        const cloneTarget = Array.isArray(target) ? [] : {};
        for (let prop in target) {
            //遍历自身属性，不关心原型链上的属性
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = deepClone(target[prop], map);
            }
        }
        return cloneTarget;
    } else {
        return target;
    }
}


//深拷贝bfs完全版本



