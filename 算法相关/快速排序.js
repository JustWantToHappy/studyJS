let arr = [1, 0, -1, 1, 3, 5, 4, 6];
//传统快排
function quickSort1(arr=[]) {
    let left = 0, right = arr.length - 1;
    let brr = [...arr];
    const quick_sort = (left,right,brr) => {
        let low = left, high = right;
        if (low < high) {
            let key = brr[low];
            while (low < high) {
                while (low < high && brr[high] > key) {
                    high--;
                }
                if (low < high) {
                    brr[low] = brr[high];
                    low+=1
                }
                while (low < high && brr[low] <= key) {
                    low += 1;
                }
                if (low < high) {
                    brr[high] = brr[low];
                    high-=1
                }
            }
            brr[low] = key;
            quick_sort(left,low-1,brr);
            quick_sort(low + 1, right,brr);
        }
    }
    quick_sort(left, right, brr);
    return brr;
}
//结合js的api使用的快排，优点就是代码量少
function quickSort2(arr=[]) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivot = arr.length >> 1;
    let left = [], right = [];
    let key = arr[pivot];
    for (let i = 0; i < arr.length; i++){
        if (i !== pivot&&arr[i]<key) {
            left.push(arr[i]);
        } else if (i !== pivot && arr[i] >= key) {
            right.push(arr[i]);
        }
    }
    return quickSort2(left).concat(arr[pivot],quickSort2(right));//中间的分割点合并的时候不能够落下(arr[pivot])
}
console.info(quickSort1(arr))
console.info(quickSort2([...arr]));