//判断是否为空对象
function checkNullObject(obj) {
    //Object.keys()不会遍历对象原型链上的属性
    return Object.keys(obj).length === 0;
}

//使用for-of遍历普通对象
let obj = {
    name: "sb", age: 24325, *[Symbol.iterator]() {
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                yield this[key];
            }
        }
    }
}
for (let value of obj) {
    console.info(value)
}