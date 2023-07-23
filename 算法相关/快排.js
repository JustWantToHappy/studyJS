function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;
  const pivot = arr[left];
  let low = left, high = right;
  while (low < high) {
    while (low < high && arr[high] > pivot) high--;
    if (low < high) {
      arr[low] = arr[high]
      low++;
    }
    while (low < high && arr[low] < pivot) low++;
    if (low < high) {
      arr[high] = arr[low];
      high--;
    }
  }
  arr[low] = pivot
  quickSort(arr, left, low - 1)
  quickSort(arr, low + 1, right)
}

const arr = [3, 2, 1, 1, 4, 6, 5, 8, 2];
quickSort(arr)
console.info(arr)
