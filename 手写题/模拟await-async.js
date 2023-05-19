/**
 * 
 * @param {Function} generatorFn 
 * @desc 使用Generator和Promise的方式实现异步函数
 * @desc generatorToAsync函数是将Generator和Promise结合起来实现async/await的核心部分
 * @desc aync-await最常见于浏览器发送请求的时候
 * @desc Async/Await就是一个自执行的generate函数,利用generate的特性将异步的代码写成同步的形式
 * 
 */
async function demo() {
    const result1 = await Promise.resolve(1);
    console.info(result1);
    const result2 = await Promise.resolve(2);
    console.info(result2);
    const result3 = await Promise.resolve(3);
    console.info(result3);
}
demo();
//模拟实现上面的操作
function generatorToAsync(generatorFn) {
    return function () {
        /**
         * gen是一个迭代器对象
         * 为什么要使用生成器函数来模拟实现?
         * 
         */
        const gen = generatorFn.apply(this, arguments);
        //返回Promise的原因:因为async函数会返回一个Promise对象
        return new Promise((resolve, reject) => {
            /**
             * 
             * @param {} key 
             * @param {可选参数,调用next()方法时传递的参数} arg 
             * @desc step的作用就是依次执行"Generator"中的代码
             * @desc 每次执行完一段代码都会调用next()方法
             */
            function step(key,arg) {
                let generatorResult;
                try {
                    //执行一次迭代对象的next方法,返回一个对象{value:"xxx",done:boolean}
                    generatorResult = gen[key](arg);
                } catch (err) {
                    //如果key是throw，则执行gen[key](arg)就会捕获异常，执行到这里，表示结束
                    reject(err);
                    return;
                }
                const { value, done } = generatorResult;
                //迭代过程中顺序完成
                if (done) {
                    resolve(value);
                } else {
                    /**
                     * 这里非常关键，实现原理就是微任务中嵌套微任务
                     * 这就可以保证await后面的的代码永远比await处的代码后执行
                     */
                    Promise.resolve(value).then(val => step("next", val), err => step("throw", err));
                }
            }
            step("next");
        });
    }
}
/**
 * @desc {这里的*可以看做async,这里的yield可以看做是await}
 */
const testAsync = generatorToAsync(function* () {
    let result1 = yield Promise.resolve(1);
    //只有下一个yield处的代码被调用时，这里才会执行。
    console.info(result1);
    let result2 = yield Promise.resolve(2);
    console.info(result2);
    let result3 = yield Promise.resolve(3);
    console.info(result3);
});
testAsync();
