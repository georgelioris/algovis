import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Controls from '../components/Controls';
import DataContainer from '../components/DataContainer';
import Iteration from '../components/Iteration';

const Page = ({ props: { index, data, values }, props }) => (
  <div className="container">
    <div className="row d-flex justify-content-center">
      <Controls {...props} />
    </div>
    <div className="row d-flex justify-content-center" />

    <Iteration {...props} />
    <div
      className="row d-flex justify-content-center"
      style={{
        padding: 'inherit',
        maxWidth: '37.5rem',
        width: 'inehrit',
        margin: '0 auto'
      }}
    >
      <ProgressBar
        style={{ height: '7px' }}
        now={Math.round((index.current * 100) / (Object.keys(data).length - 1))}
      />
    </div>
    <DataContainer {...values} />
  </div>
);

export default Page;

Page.propTypes = {
  props: PropTypes.shape({
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    playing: PropTypes.bool.isRequired,
    shuffleNumbers: PropTypes.func.isRequired,
    speed: PropTypes.shape({ current: PropTypes.number }).isRequired,
    handleSpeedChange: PropTypes.func.isRequired,
    setSortingMethod: PropTypes.func.isRequired,
    sorting: PropTypes.objectOf(PropTypes.func).isRequired,
    index: PropTypes.shape({ current: PropTypes.number }).isRequired,
    data: PropTypes.objectOf(PropTypes.object).isRequired,
    values: PropTypes.shape({
      step: PropTypes.arrayOf(PropTypes.number).isRequired,
      pointer: PropTypes.shape({
        i: PropTypes.number,
        j: PropTypes.number
      })
    })
  })
};
Page.defaultProps = {
  props: {
    values: {
      pointer: {
        i: null,
        j: null
      }
    }
  }
};
