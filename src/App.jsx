import React, { useEffect, useMemo, useRef, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './App.css';
import Controls from './components/Controls';
import DataBox from './components/DataBox';
import sorting from './lib/algorithms/sorting';
import nums from './lib/nums';

const initValues = { step: nums, pointer: { i: null, j: null } };

function App() {
  const [data, setData] = useState({});
  const [values, setValues] = useState(initValues);
  const [sortingMethod, setSortingMethod] = useState(Object.keys(sorting)[0]);
  const [playing, setPlaying] = useState(false);
  const index = useRef(0);
  const speed = useRef(200);
  const paused = useRef(false);
  const memoData = useMemo(() => sorting[sortingMethod](nums), [sortingMethod]);

  useEffect(() => {
    paused.current = true;
    index.current = 0;
    setValues(initValues);
    setData(memoData);
  }, [sortingMethod, memoData]);

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

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <Controls
          {...{
            play,
            pause,
            playing,
            speed,
            handleSpeedChange,
            sorting,
            setSortingMethod
          }}
        />
      </div>
      <div className="row d-flex justify-content-center" />

      <div className="row  d-flex justify-content-center">
        <div>
          Iteration:
          {index.current}
        </div>
      </div>
      <div
        className="row  d-flex justify-content-center"
        style={{
          padding: 'inherit',
          maxWidth: 'inherit',
          width: 'inehrit'
        }}
      >
        <ProgressBar
          now={Math.round((index.current * 100) / Object.keys(data).length)}
          animated={playing}
        />
      </div>
      <div className="data-container">
        {values &&
          values.step.map((value, i) => (
            <DataBox
              key={value}
              value={value}
              pointer1={values.pointer && values.pointer.i === i}
              pointer2={values.pointer && values.pointer.j === i}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
