import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import Page from './containers/Page';
import sorting from './lib/algorithms/sorting';
import { nums, shuffle, formatValues } from './lib/helpers';

function App() {
  const [data, setData] = useState({});
  const [sampleSize, setSamplesSize] = useState(100);
  const [unsortedNums, setUnsortedNums] = useState(shuffle(nums(sampleSize)));
  const [values, setValues] = useState(formatValues(unsortedNums));
  const [sortingMethod, setSortingMethod] = useState(Object.keys(sorting)[0]);
  const [playing, setPlaying] = useState(false);
  const lastIndex = Object.keys(data).length - 1;
  const index = useRef(0);
  const speed = useRef(200);
  const paused = useRef(false);
  const memoData = useMemo(() => sorting[sortingMethod](unsortedNums), [
    sortingMethod,
    unsortedNums
  ]);

  useEffect(() => {
    paused.current = true;
    index.current = 0;
    setValues(formatValues(unsortedNums));
    setData(memoData);
  }, [sortingMethod, unsortedNums, memoData]);

  useEffect(() => {
    setUnsortedNums(shuffle(nums(sampleSize)));
  }, [sampleSize]);

  function shuffleNumbers() {
    if (!playing) {
      index.current = 0;
      setUnsortedNums(shuffle(unsortedNums));
    }
  }

  function handleIndexChange(value) {
    if (!Number.isNaN(value)) {
      if (value < 0 || value > lastIndex) {
        index.current = lastIndex;
      } else index.current = value;
      setValues(data[index.current]);
    }
  }

  function handleSpeedChange(val) {
    speed.current = Number(val);
  }

  function pause() {
    paused.current = true;
  }

  function play() {
    paused.current = false;
    if (index.current === lastIndex) index.current = 0;
    if (!playing && lastIndex) {
      setPlaying(true);
      const looping = setInterval(() => {
        if (index.current >= lastIndex || paused.current) {
          setPlaying(false);
          clearInterval(looping);
        } else {
          index.current += 1;
          setValues(data[index.current]);
        }
      }, speed.current);
    }
  }

  return (
    <Page
      props={{
        play,
        pause,
        playing,
        shuffleNumbers,
        speed,
        handleSpeedChange,
        sorting,
        setSortingMethod,
        data,
        sampleSize,
        setSamplesSize,
        index,
        handleIndexChange,
        values
      }}
    />
  );
}

export default App;
