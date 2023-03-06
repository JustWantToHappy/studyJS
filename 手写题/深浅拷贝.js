const obj = { name: "sb", age: 10, info: {gender:"男"} };

//浅拷贝
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
console.log(shallowCopy(obj)===obj,shallowCopy(obj).info === obj.info) //false,true
//简易版
const deepCopy = function (obj) {
    if (typeof obj !== "object") {
        return;
    }
    let deepObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            deepObj[key] = (typeof obj[key] === "object" )? deepCopy(obj[key]) : obj[key];
        }
    }
    return deepObj;
}
console.log(deepCopy(obj) === obj, deepCopy(obj).info === obj.info) //false,false





