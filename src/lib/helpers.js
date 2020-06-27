export function swap(input, leftIndex, rightIndex) {
  [input[leftIndex], input[rightIndex]] = [input[rightIndex], input[leftIndex]];
}

export function partition(input, left, right, data) {
  const pivot = input[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;
  while (i <= j) {
    const step = [...input];
    data[Object.keys(data).length] = { step, pointer: { i, j } };
    while (input[i] < pivot) {
      i += 1;
      data[Object.keys(data).length] = { step, pointer: { i, j } };
    }
    while (input[j] > pivot) {
      j -= 1;
      data[Object.keys(data).length] = { step, pointer: { i, j } };
    }
    if (i <= j) {
      swap(input, i, j);
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
    const step = [...array];
    if (left[0] < right[0]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
      swap(array, leftIndex, rightIndex);
    }
    data[Object.keys(data).length] = {
      step,
      pointer: { i: leftIndex, j: rightIndex }
    };
  }

  return sorted.concat(left.slice().concat(right.slice()));
}

export function shuffle(array) {
  const input = [...array];
  for (let i = input.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [input[i], input[j]] = [input[j], input[i]];
  }
  return input;
}

export const formatValues = (initNums) => ({
  step: initNums,
  pointer: { i: null, j: null }
});

export const nums = (size) => Array(...Array(size)).map((_, i) => i + 1);
