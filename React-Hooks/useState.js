/**
 * useState的工作可以分成两个部分：
 * 1.通过一些途径产生更新,更新会造成组件render(mount或者update)
 * 2.组件render时，useState返回的值是最新的结果
 * 如下是useState的伪代码
 */

let isMount = true;
function schedule() {
	//更新前将workInProgressHook重置为fiber保存的第一个hook
	workInProgressHook = fiber.memorizedState;
	//触发组件render
	fiber.stateNode();
	//组件首次render为mount,以后再触发的更新为update
	isMount = false;
}
function dispatchAction(queue, action) {
	//创建update
	const update = {
		action,
		next: null
	}
	//始终将最新的update对象放入到queue.pending单向环状链表的第一个
	if (queue.pending === null) {
		update.next = update;
	} else {
		update.next = queue.pending.next;
		queue.pending.next = update;
	}
	queue.pending = update;
	//模拟React开始调度更新
	schedule();
}
function useState(initState) {
	let hook;
	/**
	 * workInProgressHook表示当前正在执行的hook
	 * 如果是mount新建一个hook，同时将hook接入到fiber对应的hook链表中
	 * 如果是update则将从hook链表中取出对应的hook(即workInProgressHook)
	 * 最后移动workInProgressHook指针
	 */
	if (isMount) {
		//mount时需要生成hook对象
		hook = {
			queue: {
				pending: null
			},
			memorizedState: initState,
			next: null,
		}
		//将hook插入到fiber.memorizedState链表尾部
		if (!fiber.memorizedState) {
			fiber.memorizedState = hook;
		} else {
			workInProgressHook.next = hook;
		}
		//移动workInProgressHook指正
		workInProgressHook = hook;
	} else {
		//update时从workInProgressHook中取出对应的hook
		hook = workInProgressHook;
		workInProgressHook = workInProgressHook.next;
	}

	//根据queue.pending中保存的update计算state
	let baseState = hook.memorizedState;
	if (hook.queue.pending) {
		let firstUpdate = hook.queue.pending.next;
		do {
			const action = firstUpdate.action;
			baseState = action(baseState);
			firstUpdate = firstUpdate.next;
		} while (firstUpdate !== hook.queue.pending.next)
	}
	hook.memorizedState = baseState;
	//通过hook.queue.pending环状链表循环计算state,并将state赋值给hook.baseState
	return [baseState, dispatchAction.bind(null, hook.queue)]
}

