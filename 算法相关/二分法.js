const arr=[4,5,1,2,7,3,6,9]

/**
 * 找到第一个大于等于target的索引
 * @param {number[]} arr 
 * @param {number} target 
 */
const findFirstGtTargetIndex=(arr,target)=>{
	let left=0,right=arr.length;
	while(left<right){
		const mid=left+Math.floor((right-left)/2);
		if(arr[mid]<target){
			left=mid+1;
		}else{
			right=mid;
		}
	}
	return left;
}