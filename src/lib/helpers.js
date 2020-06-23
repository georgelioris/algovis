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

export function merge(left, right, data, array) {
  const sorted = [];
  while (left.length && right.length) {
    const leftIndex = array.indexOf(left[0]);
    const rightIndex = array.indexOf(right[0]);
    if (left[0] < right[0]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
      const step = [...array];
      swap(array, leftIndex, rightIndex);
      data[Object.keys(data).length] = {
        step,
        pointer: { i: leftIndex, j: rightIndex }
      };
    }
  }

  return sorted.concat(left.slice().concat(right.slice()));
}

export function shuffle(array) {
  const nums = [...array];
  for (let i = nums.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  return nums;
}

export const formatValues = (initNums) => ({
  step: initNums,
  pointer: { i: null, j: null }
});

export const nums = (size) => Array(...Array(size)).map((_, i) => i + 1);
