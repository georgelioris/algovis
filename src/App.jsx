import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import Page from './containers/Page';
import sorting from './lib/algorithms/sorting';
import { nums, shuffle, formatValues } from './lib/helpers';

function App() {
  const [data, setData] = useState({});
  const [unsortedNums, setUnsortedNums] = useState(shuffle(nums));
  const [values, setValues] = useState(formatValues(unsortedNums));
  const [sortingMethod, setSortingMethod] = useState(Object.keys(sorting)[0]);
  const [playing, setPlaying] = useState(false);
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

  function shuffleNumbers() {
    if (!playing) {
      index.current = 0;
      setUnsortedNums(shuffle(unsortedNums));
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
    if (index.current === Object.keys(data).length) index.current = 0;
    if (!playing && Object.keys(data).length) {
      setPlaying(true);
      const looping = setInterval(() => {
        if (index.current >= Object.keys(data).length || paused.current) {
          setPlaying(false);
          clearInterval(looping);
        } else {
          setValues(data[index.current]);
          index.current += 1;
        }
      }, speed.current);
    }
  }

  useEffect(() => {
    console.log(unsortedNums);
  }, [unsortedNums]);

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
        index,
        values
      }}
    />
  );
}

export default App;
