Object.is = function (x, y) {
	if (x === y) {
		//如果x=-0,y=+0,则1/x=-Infinit,1/y=+Infinity
		return x !== 0 || 1 / x === 1 / y;
	}
	//判断NaN===NaN
	return x !== x && y !== y;
}