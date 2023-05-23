/**
 * 
 * @param {Object} obj 
 * @desc 将对象属性展开
 */
const flattern = (obj) => {
    let newObj = {};

    const getType = (obj) => Object.prototype.toString.call(obj).slice(8, -1);
    const isNumber = (num) => getType(num) === "Number";

    function handleTypes(path = [], obj, key) {
        let keyType = typeof key;
        let valueType = typeof obj[key];
        let value = obj[key];
        let type = getType(obj[key]);
        if (keyType === "number" && valueType === "number") {
            let newKey = path.join(".");
            newObj[newKey] = value;
            return true;
        } else if (keyType === "string" && type !== "Array" && type !== "Object") {
            let newKey = path.join(".");
            newObj[newKey] = value;
            return true;
        }
        return false;
    }

    function flat(obj, path = []) {
        let objType = getType(obj);
        if (["Array", "Object"].includes(objType)) {
            for (let key in obj) {
                if (!obj.hasOwnProperty(key)) {
                    continue;
                }
                let type = getType(obj[key]);
                let isnum = isNumber(key);
                if (objType === "Array") {
                    let arrPath = path.pop();
                    arrPath += `[${key}]`;
                    path.push(arrPath);
                } else {
                    path.push(key);
                }
                !handleTypes(path, obj, key) && flat(obj[key], path);
                path.pop();
            }
        } else {
            return false;
        }
    }
    flat(obj);
    return newObj;
}

let myobj = { name: "hhh", age: 12, list: [1, [2, [3, 4]]], func() { }, info: { gender: "男", time: Date.now } };
console.info(flattern(myobj));


