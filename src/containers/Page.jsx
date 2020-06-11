import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Controls from '../components/Controls';
import DataContainer from '../components/DataContainer';

const Page = ({
  play,
  pause,
  playing,
  speed,
  handleSpeedChange,
  sorting,
  setSortingMethod,
  index,
  data,
  values
}) => (
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
      <div>{`Iteration: ${index.current}`}</div>
    </div>
    <div
      className="row d-flex justify-content-center"
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
    <DataContainer {...values} />
  </div>
);

export default Page;

Page.propTypes = {
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  speed: PropTypes.shape({ current: PropTypes.number }).isRequired,
  handleSpeedChange: PropTypes.func.isRequired,
  setSortingMethod: PropTypes.func.isRequired,
  sorting: PropTypes.objectOf(PropTypes.func).isRequired,
  index: PropTypes.shape({ current: PropTypes.number }).isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  values: PropTypes.shape({
    step: PropTypes.arrayOf(PropTypes.number).isRequired,
    pointer: PropTypes.shape({
      i: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(null)]),
      j: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(null)])
    })
  }).isRequired
};
