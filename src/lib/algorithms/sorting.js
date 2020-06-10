import { swap } from '../helpers';

const sorting = {
  selectionSort: inputArr => {
    const array = [...inputArr];
    const data = {};

    for (let i = 0; i < array.length; i += 1) {
      let minIndex = i;

      for (let j = i + 1; j < array.length; j += 1) {
        if (array[j] < array[minIndex]) minIndex = j;
      }

      if (minIndex !== i) {
        const step = [...array];
        swap(array, i, minIndex);
        data[Object.keys(data).length] = {
          step,
          pointer: { i, j: minIndex }
        };
      }
    }

    data[Object.keys(data).length] = { step: array, pointer: null };

    return data;
  },

  bubbleSort: inputArr => {
    const array = [...inputArr];
    const data = {};
    let swapped = false;

    for (let i = 0; i < array.length; i += 1) {
      for (let j = 0; j < array.length - i; j += 1) {
        if (array[j + 1] < array[j]) {
          const step = [...array];
          swap(array, j, j + 1);
          data[Object.keys(data).length] = {
            step,
            pointer: { i: j, j: j + 1 }
          };
          swapped = true;
        }
      }

      if (!swapped) return data;
    }

    data[Object.keys(data).length] = { step: array, pointer: null };

    return data;
  },

  insertionSort: inputArr => {
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
  }
};

export default sorting;
