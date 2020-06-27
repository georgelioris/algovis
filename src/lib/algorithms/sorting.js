import { swap, partition, merge } from '../helpers';

const sorting = {
  bubbleSort: (inputArr) => {
    const array = [...inputArr];
    const data = {};
    let swapped = false;

    for (let i = 0; i < array.length; i += 1) {
      for (let j = 0; j < array.length - i; j += 1) {
        const step = [...array];
        if (array[j + 1] < array[j]) {
          swap(array, j, j + 1);
          swapped = true;
        }
        data[Object.keys(data).length] = {
          step,
          pointer: { i: j, j: j + 1 }
        };
      }

      if (!swapped) return data;
    }

    data[Object.keys(data).length] = { step: array, pointer: null };

    return data;
  },

  selectionSort: (inputArr) => {
    const array = [...inputArr];
    const data = {};

    for (let i = 0; i < array.length; i += 1) {
      const step = [...array];
      let minIndex = i;
      for (let j = i + 1; j < array.length; j += 1) {
        if (array[j] < array[minIndex]) minIndex = j;
        data[Object.keys(data).length] = {
          step,
          pointer: { i, j }
        };
      }
      if (minIndex !== i) {
        swap(array, i, minIndex);
      }
    }

    data[Object.keys(data).length] = { step: array, pointer: null };

    return data;
  },

  insertionSort: (inputArr) => {
    const array = [...inputArr];
    const data = {};

    for (let i = 0; i < array.length; i += 1) {
      let currentIndex = i;

      while (
        array[currentIndex - 1] !== undefined &&
        array[currentIndex] < array[currentIndex - 1]
      ) {
        const step = [...array];
        swap(array, currentIndex, currentIndex - 1);
        data[Object.keys(data).length] = {
          step,
          pointer: { i: currentIndex, j: currentIndex - 1 }
        };

        currentIndex -= 1;
      }
    }

    data[Object.keys(data).length] = { step: array, pointer: null };

    return data;
  },

  quickSort: (inputArr) => {
    const array = [...inputArr];
    const data = {};

    function sort(input, left, right) {
      let index;
      if (input.length > 1) {
        index = partition(input, left, right, data);
      }
      if (left < index - 1) {
        sort(input, left, index - 1);
      }
      if (index < right) {
        sort(input, index, right);
      }
      return input;
    }

    const sortedArray = sort(array, 0, array.length - 1);
    data[Object.keys(data).length] = { step: sortedArray, pointer: null };

    return data;
  },

  mergeSort: (inputArr) => {
    const array = [...inputArr];
    const data = {};

    function sort(input) {
      if (input.length <= 1) return input;

      const middle = Math.floor(input.length / 2);
      const left = input.slice(0, middle);
      const right = input.slice(middle);

      return merge(sort(left), sort(right), data, array);
    }

    const sortedArray = sort(array);
    data[Object.keys(data).length] = { step: sortedArray, pointer: null };

    return data;
  }
};

export default sorting;
