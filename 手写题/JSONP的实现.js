/**
 * @desc jsonp请求，在跨域情况下可以使用json请求实现get请求的实现。
 * @param {url:string,params:Object,callbackName:string} param0 
 * @returns 
 */
const jsonp = ({ url, params = {}, callbackName }) => {
  let dataSrc = "";
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      dataSrc += `${key}=${params[key]}&`
    }
  }
  dataSrc += `callback=${callbackName}`;
  url = `${url}?${dataSrc}`;//完整的请求地址

  return new Promise((resolve, reject) => {
    const scriptElement = document.createElement("script");
    scriptElement.src = url;
    document.body.append(scriptElement);
    /**
     * 服务端会返回一个名称为callbackName的全局函数并且执行
     * 所以这里直接绑定到window对象上。
     */
    window[callbackName] = (data) => {
      resolve(data);
      document.removeChild(scriptElement);// 如果数据已经返回，则从页面中移出此script标签。
    };
  })
}

