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

/**
 * @desc 使用JSON对象的stringify和parse实现深拷贝
 * @desc 使用JSON.stringify和JSON.parse的方法来实现深拷贝有如下缺点:
 * 1. 无法处理特殊的对象类型：函数，RegExp，Date等
 * 2. 原型链上的属性和方法会丢失
 * 3. 循环引用问题，如果对象中存在循环引用，使用JSON.stringify()就会抛出错误
 * 4. 性能问题,JSON.stringify和JSON.parse在处理大型对象的时候性能会很低
 */
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
 *  children:[]
 * }
 * obj.children.push(obj)
 * const newObj=deepClone(obj);//需要解决循环依赖问题

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

/**
 * 
 * @param {any} target 
 * @param {Map} map 解决循环依赖导致的无限递归问题
 * @returns 
 */
function DFSdeepClone(target, map = new WeakMap()) {
    if (map.get(target)) return target;
    //获取当前值的构造函数，获取到它的类型
    let constructor = target.constructor;
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
        return new constructor(target);
    }
    let type = getType(target);
    if (type === "Array" || type === "Object") {
        map.set(target, true);
        const cloneTarget = Array.isArray(target) ? [] : {};
        for (let prop in target) {
            //遍历自身属性，不关心原型链上的属性
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = DFSdeepClone(target[prop], map);
            }
        }
        return cloneTarget;
    } else if (type === "Function") {
        return eval("(" + target.toString() + ")");
    } else {
        return target;
    }
}

const originObj = { name: "dfsdfs", age: { dsfsdf: 2423, sdfds: [1, 2, 3] } };
console.info(dfs_deep_copy(originObj), dfs_deep_copy(originObj) === originObj)

//深拷贝bfs完全版本
function BFSDeepColone(target) {
    let queue = [target];
    let copyObj = {};
    let copy_queue = [copyObj];
    let map = new WeakMap();//用来解决循环依赖问题
    while (queue.length > 0) {
        const currentObj = queue.shift();
        let copy = copy_queue.shift();
        let type = getType(currentObj);
        if (type === "Object" || type === "Array") {
            for (let prop in currentObj) {
                let value = currentObj[prop];
                let type = getType(value);
                if (type === "Object" || type === "Array") {
                    //如果触发循环依赖
                    if (map.get(value)) {
                        copy[prop] = value;
                        map.set(copy, true);
                    } else {
                        copy[prop] = type === "Array" ? [] : {};
                        queue.push(value);
                        copy_queue.push(copy[prop]);
                    }
                } else if (type === "Function") {
                    copy[prop] = eval("(" + value.toString() + ")");
                } else {
                    copy[prop] = value;
                }
            }
        } else if (type === "Function") {
            copyObj = eval("(" + currentObj.toString() + ")");
        } else {
            copyObj = currentObj;
        }
    }
    return copyObj;
}
console.info(BFSDeepColone(originObj), BFSDeepColone([1, { name: "sb" }]))

