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


/**
 * 最长递增子序列的长度(只能用来计算长度，不能用来求解序列)
 * @param {number[]} nums 
 */
function lengthOfLIS(nums) {
	if(!nums.length){
		return 0;
	}
	const ans=[nums[0]]
	let j=0;
	for(let i=1;i<nums.length;i++){
		if(nums[i]>ans[j]){
			ans.push(nums[i]);
			j++;
		}else{
			const index=findFirstGtTargetIndex(ans,nums[i]);
			ans[index]=nums[i];
		}
	}
	return ans.length;
}

/**
 * dp解法
 * @param {number[]} nums 
 */
const lengthLIS=(nums)=>{
	//dp[i]表示以nums[i]结尾的最长递增子序列的长度
	const dp=new Array(nums.length).fill(1);
	let maxLen=1;
	for(let i=1;i<nums.length;i++){
		for(let j=0;j<i;j++){
			if(nums[i]>nums[j]){
				dp[i]=Math.max(dp[i],dp[j]+1);
			}
		}
		maxLen=Math.max(maxLen,dp[i])
	}
	return maxLen;
}

console.log(lengthLIS(arr));