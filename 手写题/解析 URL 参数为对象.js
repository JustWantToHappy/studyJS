function parseURLParams(url) {
    let reg = /[\?\&](.+)$/
    console.info(url.match(reg), 'test');
    let arr = url.match(reg)[1].split("&");
    let obj = new Object();
    arr?.forEach(str => {
        let [key, value] = str.split("=");
        let reg1 = /.+=.+$/
        //处理没有value的情况
        if (!reg1.test(str)) {
            obj[key] = true;
        } else {
            //需要对字符串进行解码，因为处理前的URL地址经过了给定格式的编码
            value = decodeURIComponent(value);
            //如果value可以转化为数字就将它转化为数字
            var numberReg = /\d+(\.\d+)?/;
            value = numberReg.test(value) ? parseFloat(value) : value;
            obj[key] = value;
        }
    })
    return obj;
}
console.info(parseURLParams("https://localhost:8080/url/?name=niuma&age=12.900&sb=dfsdf"));