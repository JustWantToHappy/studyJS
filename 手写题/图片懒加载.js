/**
 * @desc 加载完的图片，从imglist中移除
 * @desc 图片全部加载完毕之后移除事件监听
 */

let imgList = [...document.querySelectorAll("img")];

//使用IIFE表达式，实现单例，也为了使代码更加优美
const handleImageLazyLoad = function () {
    const height = window.innerHeight || document.documentElement.clientHeight;
    let count = 0, length = imgList.length;

    return function () {
        let deletesImgs = [];
        for (let i = 0; i < imgList.length; i++) {
            let img = imgList[i];
            let realSrc = img.getAttribute("data-src");
            let rect = img.getBoundingClientRect();
            const { top, bottom } = rect;
            if (top >= 0 && top <= height) {
                img.src = realSrc;
                deletesImgs.push(i);
                count++;
                if (count === length) {
                    console.info("全部图片加载完毕...");
                    document.removeEventListener("scroll", handleImageLazyLoad);
                }
            }
        }
        //移出已经加载完毕或者加载失败的图片元素,目的是为了优化内存
        imgList = imgList.filter((_, index) => !deletesImgs.includes(index));
    }
}();

document.addEventListener("scroll", handleImageLazyLoad);