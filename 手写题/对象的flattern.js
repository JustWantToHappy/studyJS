/**
 * 
 * @param {Object} obj 
 * @desc 将对象属性展开
 */
const flattern = (obj) => {
    let newObj = {};

    const getType = (obj) => Object.prototype.toString.call(obj).slice(8, -1);

    function handleTypes(path = [], obj, key) {
        let value = obj[key];
        let type = getType(obj[key]);
			 if ( type !== "Array" && type !== "Object") {
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
                if (objType === "Array") {
                    path.push(`[${key}]`);
                } else {
                    path.push(key);
                }
								//处理的obj[key]已经是原始类型，无需再处理了
								const isEnd=handleTypes(path, obj, key);
								if(isEnd){
									path.pop();
								}else{
									flat(obj[key], path)
								}
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


