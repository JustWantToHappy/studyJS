function merge_sort(arr = [], left = 0, right = arr.length - 1) {
  if (left >= right) return;
  const mid = Math.floor((left + right) / 2);
  merge_sort(arr, left, mid);
  merge_sort(arr, mid + 1, right);
  const temps = Array(right - left + 1).fill(0);
  let p1 = left, p2 = mid + 1, index = 0;
  while (p1 <= mid && p2 <= right) temps[index++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
  while (p1 <= mid) temps[index++] = arr[p1++];
  while (p2 <= right) temps[index++] = arr[p2++];
  for (let i = 0; i < temps.length; i++) {
    arr[left + i] = temps[i];
  }
}

const arr = [3, 2, 1, 1, 4, 6, 5, 8, 2];
merge_sort(arr);
console.info(arr);
