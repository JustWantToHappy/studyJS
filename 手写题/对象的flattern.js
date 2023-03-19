/**
 * 
 * @param {Object} obj 
 * @desc 将对象属性展开
 */
const flattern = (obj) => {
    let newObj = {};
    function handleTypes(path = [], obj, key) {
        let keyType = typeof key;
        let valueType = typeof obj[key];
        let type = Object.prototype.toString.call(obj[key]);
        let value = obj[key];
        if (keyType === "number"&&valueType==="number") {
            let newKey = path.join(".");
            newObj[newKey] = value;
            return true;
        } else if (keyType === "string" &&type!=="[object Array]"&&type!=="[object Object]") {
            let newKey = path.join(".");
            newObj[newKey] = value;
            return true;
        }
        return false;
    }
    function flat(obj,path) {
        let type = Object.prototype.toString.call(obj);
        let flag1 = type === "[object Object]";
        let flag2 = type === "[object Array]";
        if (flag1||flag2) {
            for (let key in obj) {
                if (!obj.hasOwnProperty(key)) {
                    continue;
                }
                if (flag2) {
                    let top = path.pop();
                    top += "[" + key + "]";
                    path.push(top);
                } else {
                    path.push(key);
                }
                !handleTypes(path, obj,key) && flat(obj[key], path);
                path.pop();
            }
        }  else {    
            return false;
        }
    }
    flat(obj, []);
    return newObj;
}

let myobj = { name: "hhh", age: 12, list: [1, [2, [3, 4]]], func() { }, info: {gender:"男",time:Date.now} };
console.info(flattern(myobj));