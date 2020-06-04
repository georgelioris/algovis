const sorting = {
  selectionSort: inputArr => {
    const array = [...inputArr];
    const data = { 0: { step: inputArr, pointer: 0 } };

    for (let i = 0; i < array.length; i += 1) {
      let minIndex = i;

      for (let j = i + 1; j < array.length; j += 1) {
        if (array[j] < array[minIndex]) minIndex = j;
      }

      if (minIndex !== i)
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      data[Object.keys(data).length] = {
        step: [...array],
        pointer: { i, j: minIndex }
      };
    }

    return data;
  },

  bubbleSort: inputArr => {
    const array = [...inputArr];
    const data = { 0: { step: inputArr, pointer: 0 } };
    let swapped = false;

    for (let i = 0; i < array.length; i += 1) {
      for (let j = 0; j < array.length - i; j += 1) {
        if (array[j + 1] < array[j]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          data[Object.keys(data).length] = {
            step: [...array],
            pointer: { i: j, j: j + 1 }
          };
          swapped = true;
        }
      }

      if (!swapped) return data;
    }

    return data;
  }
};

export default sorting;
