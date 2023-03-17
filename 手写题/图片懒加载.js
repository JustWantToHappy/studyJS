/**
 * @desc 加载完的图片，从imglist中移除
 * @desc 图片全部加载完毕之后移除事件监听
 */

let imgList = [...document.querySelector("img")];
let length = imglist.length;

function handleImageLazyLoad() {
    let imgLoadingState = [];
    for (let i = 0; i < length; i++){
        let img = imgList[i];
        let rect = img.getBoundingClientRect();
        imgLoadingState.push(new Promise((resolve, reject) => {
            let proxyImage = new Image();
            proxyImage.src = img.getAttribute("data-src");
            proxyImage.onload = function () {
                if (rect.top >= 0 && rect.top - document.body.clientHeight < 0) {
                    img.src = img.getAttribute("data-src");
                    resolve("finished");
                }
            }
            proxyImage.onerror = function () {
                reject("failed");
            }
        }))
    }
}
Promise.all(imgList).then(res => {
    console.info(res);    
}).catch(err => {
}).finally(() => {
    document.removeEventListener("scroll", handleImageLazyLoad);
})
document.addEventListener("scroll", handleImageLazyLoad());