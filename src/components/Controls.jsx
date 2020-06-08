import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PauseFill, PlayFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const Methods = ({ sorting, setSortingMethod }) => (
  <Form.Group>
    <Form.Label>Soring Method</Form.Label>
    <Form.Control
      as="select"
      size="md"
      onChange={e => {
        setSortingMethod(e.target.value);
      }}
    >
      {Object.keys(sorting).map((i, key) => (
        <option key={key}>{i}</option>
      ))}
    </Form.Control>
  </Form.Group>
);

const Slider = ({ speed, handleSpeedChange, playing }) => {
  const [value, setValue] = useState(speed.current);
  return (
    <Form>
      <Form.Group controlId="formBasicRange">
        <Form.Label>{`Delay: ${value}ms`}</Form.Label>
        <Form.Control
          disabled={playing}
          onChange={e => {
            handleSpeedChange(e.target.value);
            setValue(e.target.value);
          }}
          custom
          type="range"
          min="100"
          max="1500"
          step="100"
          value={value}
        />
      </Form.Group>
    </Form>
  );
};

const Buttons = ({ playing, play, pause }) => {
  const [disabled, setDisabled] = useState(true);
  return (
    <ButtonGroup size="lg">
      {!playing ? (
        <Button
          className="controls"
          variant="primary"
          onClick={() => {
            if (!playing) play();
            setDisabled(false);
          }}
        >
          <PlayFill size={32} />
        </Button>
      ) : (
        <Button
          disabled={disabled}
          className="controls"
          variant="danger"
          onClick={() => {
            pause();
            setDisabled(true);
          }}
        >
          <PauseFill size={32} />
        </Button>
      )}
    </ButtonGroup>
  );
};

const Controls = ({
  playing,
  play,
  pause,
  speed,
  handleSpeedChange,
  sorting,
  setSortingMethod
}) => {
  return (
    <div className="container">
      <div className="row  d-flex justify-content-center">
        <Col md={4}>
          <Methods {...{ sorting, setSortingMethod }} />
        </Col>
        <Col md={4}>
          <Slider {...{ speed, handleSpeedChange, playing }} />
        </Col>
      </div>
      <div className="row  d-flex justify-content-center">
        <Buttons {...{ play, pause, playing }} />
      </div>
    </div>
  );
};

Methods.propTypes = {
  sorting: PropTypes.objectOf(PropTypes.func),
  setSortingMethod: PropTypes.func
};
Methods.defaultProps = {
  sorting: undefined,
  setSortingMethod: undefined
};
Slider.propTypes = {
  speed: PropTypes.shape({ current: PropTypes.number }),
  playing: PropTypes.bool,
  handleSpeedChange: PropTypes.func
};
Slider.defaultProps = {
  speed: undefined,
  playing: undefined,
  handleSpeedChange: undefined
};
Buttons.propTypes = {
  playing: PropTypes.bool,
  play: PropTypes.func,
  pause: PropTypes.func
};

Buttons.defaultProps = {
  playing: undefined,
  play: undefined,
  pause: undefined
};
Controls.propTypes = {
  playing: PropTypes.bool,
  play: PropTypes.func,
  pause: PropTypes.func,
  speed: PropTypes.shape({ current: PropTypes.number }),
  handleSpeedChange: PropTypes.func,
  sorting: PropTypes.objectOf(PropTypes.func),
  setSortingMethod: PropTypes.func
};

Controls.defaultProps = {
  playing: undefined,
  play: undefined,
  pause: undefined,
  speed: undefined,
  handleSpeedChange: undefined,
  sorting: undefined,
  setSortingMethod: undefined
};

export default Controls;
