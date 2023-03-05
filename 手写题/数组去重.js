//es5的去重方法,很妙
let array=[1,1,1,2,2,3,3]
array = array.filter((ele, index, arr) => arr.indexOf(ele) === index);
console.info(array)
//es6的去重
let brr=[2,1,1,1,3,3,4,4]
brr=[...new Set(brr)]
console.info(brr)