export function swap(input, leftIndex, rightIndex) {
  const items = input;
  [items[leftIndex], items[rightIndex]] = [items[rightIndex], items[leftIndex]];
}

export function partition(items, left, right) {
  const pivot = items[Math.floor((right + left) / 2)]; // middle element
  let i = left; // left pointer
  let j = right; // right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i += 1;
    }
    while (items[j] > pivot) {
      j -= 1;
    }
    if (i <= j) {
      swap(items, i, j); // sawpping two elements
      i += 1;
      j -= 1;
    }
  }
  return i;
}
