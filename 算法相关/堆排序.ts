/**
 * 构建-大顶堆
 */
class Heap{
	heap:number[];
	constructor(heap:number[]){
			this.heap=heap;
			this.buildMaxHeap();
	}   


	private buildMaxHeap(){
		const lastNotLeafIndex=Math.floor(this.heap.length/2-1);
		for(let i=lastNotLeafIndex;i>=0;i--){
		 this.sinkDown(i);	
		}
	}

	private getParentIndex(index:number){
			return Math.floor((index-1)/2);
	}

	private getLeftChildrenIndex(index:number){
		return 2*index+1;
	}
	
	private getRightChildrenIndex(index:number){
		return 2*index+2;
	}

	private swap(left:number,right:number){
		const temp=this.heap[left];
		this.heap[left]=this.heap[right];
		this.heap[right]=temp;
	}
	/**
	 * 上浮操作-针对于较大值
	 */
	private siftUp(index:number){
		let parentIndex=this.getParentIndex(index);
		const arr=this.heap;
		while(index>0&&arr[parentIndex]<arr[index]){
			this.swap(index,parentIndex);
			index=parentIndex;
			parentIndex=this.getParentIndex(parentIndex);
		}
	}

	/**
	 * 下浮操作-针对于较小值
	 */
	private sinkDown(index:number){
		const leftIndex=this.getLeftChildrenIndex(index);
		const rightIndex=this.getRightChildrenIndex(index);
		const n=this.heap.length,arr=this.heap;
		//判断是否存在左右节点
		if(leftIndex<n&&arr[leftIndex]>arr[index]){
			this.swap(index,leftIndex);
			this.sinkDown(leftIndex);
		}
		if(rightIndex<n&&arr[rightIndex]>arr[index]){
			this.swap(index,rightIndex);
			this.sinkDown(rightIndex);
		}
	}

	insert(x:number){
		this.heap.push(x);
		this.siftUp(this.heap.length-1);
	}

	remove(x:number){
		const lastIndex=this.heap.length-1;
		const index=this.heap.findIndex(item=>item===x);
		if(index===-1){
			return false;
		}
		this.swap(index,lastIndex);
		this.heap.pop();
		const parentIndex=this.getParentIndex(index);
		//判断是上浮还是下沉操作
		if(this.heap[index]>parentIndex){
			this.siftUp(index);
		}else{
			this.sinkDown(index);
		}
		return true;
	}

	top(){
		return this.heap[0]
	}
}
