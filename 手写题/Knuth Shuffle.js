/**
 * 
 * @param {Array} arr 
 * @desc 洗牌算法
 * @returns 
 */
const shuffle = (arr = []) => {
	let length = arr.length
	while (length > 0) {
		const randomIndex = Math.floor(length * Math.random());
		length -= 1;
		//const tmp = arr[length]
		//arr[length] = arr[randomIndex]
		//arr[randomIndex] = tmp
		//使用解构赋值的时候要加上分号，否则可能有些问题，具体原因不清楚
		[arr[length], arr[randomIndex]] = [arr[randomIndex], arr[length]];
	}
	return arr
}

console.info(shuffle([2, 1, 4, 5, 6, 8]))