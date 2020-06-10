export function swap(input, leftIndex, rightIndex) {
  [input[leftIndex], input[rightIndex]] = [input[rightIndex], input[leftIndex]];
}
export function partition(input, left, right, data) {
  const pivot = input[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;
  while (i <= j) {
    while (input[i] < pivot) {
      i += 1;
    }
    while (input[j] > pivot) {
      j -= 1;
    }
    if (i <= j) {
      const step = [...input];
      swap(input, i, j);
      data[Object.keys(data).length] = { step, pointer: { i, j } };
      i += 1;
      j -= 1;
    }
  }
  return i;
}
