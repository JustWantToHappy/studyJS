let arr = [
  [2, 1],
  [3, [4, [5, [6]]]]
];
let brr = [...arr];
let crr = [...arr];
let drr = [...arr];
let err = [...arr];
let frr = [...arr];

//第一种方式:使用内置flat方法 
let arrFlat = arr.flat(Infinity);

//第二种方式，递归
let brrFlat = [];
const flatArr = (arr) => {
  for (let i = 0; i < arr?.length; i++) {
    if (Array.isArray(arr[i])) {
      flatArr(arr[i]);
    } else {
      brrFlat.push(arr[i]);
    }
  }
};
flatArr(arr);

//第三种方式,使用正则表达式使用逗号替换中括号
let crrStr = JSON.stringify(crr);
//将字符串中的中括号转为逗号
let crrStr1 = crrStr.replace(/(\[|\])/g, ",");
//提出字符串中的数字
let crrArray = crrStr.match(/\d+/g);
crrFlat = crrArray.map((str) => parseInt(str)); 

//第四种方式，使用toString()方法，toString()方法默认会去除中括号。
drrFlat = JSON.parse("[" + drr.toString() + "]").map((num) => parseInt(num));

//第五种方式,使用递归加上map
const flatErr = (err) => {
  if (Object.prototype.toString.call(err) !== "[object Array]") {
    return false;
  }
  return [].concat(
    ...err.map((num) => (Array.isArray(num) ? flatErr(num) : num))
  );
};
const errFlat = flatErr(err);
console.info("errFlat", errFlat);

//第六种方式，使用递归加上reduce
const flatFrr = (frr) => {
  if (Object.prototype.toString.call(frr) !== "[object Array]") {
    return false;
  }
  let frrFlat = frr.reduce((a, b) => {
    if (Array.isArray(b)) {
      let brr = flatFrr(b);
      a.push(...brr);
    } else {
      a.push(b);
    }
    return a;
  }, []);
  return frrFlat;
};
let frrFlat = flatFrr(frr);
console.info(frrFlat);
