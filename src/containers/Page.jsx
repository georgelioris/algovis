import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Controls from '../components/Controls';
import DataContainer from '../components/DataContainer';
import Iteration from '../components/Iteration';

const Page = ({ props: { index, data, values }, props }) => (
  <Container style={{ maxWidth: '37.5rem' }}>
    <Controls {...props} />
    <Iteration {...props} />
    <ProgressBar
      style={{ height: '7px', margin: '0.7em auto' }}
      now={Math.round((index.current * 100) / (Object.keys(data).length - 1))}
    />
    <DataContainer {...values} />
  </Container>
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
