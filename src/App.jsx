import React, { useEffect, useRef, useState, useMemo } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import DataBox from './components/DataBox';
import Controls from './components/Controls';
import sorting from './lib/algorithms/sorting';
import nums from './lib/nums';

const initValues = { step: nums, pointer: { i: null, j: null } };

function App() {
  const [data, setData] = useState({});
  const [values, setValues] = useState(initValues);
  const [sortingMethod, setSortingMethod] = useState(Object.keys(sorting)[0]);
  const [button, setButton] = useState(true);
  const index = useRef(0);
  const playing = useRef(false);
  const paused = useRef(false);
  const memoData = useMemo(() => sorting[sortingMethod](nums), [sortingMethod]);

  useEffect(() => {
    paused.current = true;
    index.current = 0;
    setValues(initValues);
    setButton(true);
    setData(memoData);
  }, [sortingMethod, memoData]);

  function pause() {
    playing.current = false;
    paused.current = true;
  }

  function play() {
    paused.current = false;
    setButton(false);
    if (index.current === Object.keys(data).length) index.current = 0;
    if (!playing.current && Object.keys(data).length) {
      playing.current = true;
      const looping = setInterval(() => {
        if (index.current >= Object.keys(data).length || paused.current) {
          playing.current = false;
          setButton(true);
          clearInterval(looping);
        } else {
          setValues(data[index.current]);
          index.current += 1;
        }
      }, 100);
    }
  }

  // useEffect(() => {
  //   console.log(Object.keys(data).length);
  // }, [data]);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <Controls {...{ button, play, pause }} />
      </div>
      <div className="row d-flex justify-content-center">
        <Form.Group>
          <Form.Control
            as="select"
            size="lg"
            onChange={e => setSortingMethod(e.target.value)}
          >
            {Object.keys(sorting).map((i, key) => (
              <option key={key}>{i}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </div>
      <div className="row  d-flex justify-content-center">
        <div>{index.current}</div>
      </div>
      <div className="row  d-flex justify-content-center">
        <ProgressBar
          now={Math.round((index.current * 100) / Object.keys(data).length)}
          animated={!button}
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
