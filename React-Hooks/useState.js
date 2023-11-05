/**
 * useState的工作可以分成两个部分：
 * 1.通过一些途径产生更新,更新会造成组件render(mount或者update)
 * 2.组件render时，useState返回的值是最新的结果
 */

let isMount = true;
function useState(initState) {
	/**
	 * workInProgressHook表示当前正在执行的hook
	 * 如果是mount新建一个hook，同时将hook接入到fiber对应的hook链表中
	 * 如果是update则将从hook链表中取出对应的hook(即workInProgressHook)
	 * 最后移动workInProgressHook指针
	 */
	if (isMount) {
		
		isMount = false;
	} else {

	}
	//通过hook.queue.pending环状链表循环计算state,并将state赋值给hook.baseState
}