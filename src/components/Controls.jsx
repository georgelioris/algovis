import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { PauseFill, PlayFill, ArrowClockwise } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const Methods = ({ sorting, setSortingMethod }) => (
  <Form>
    <Form.Group>
      <Form.Label>Soring Method</Form.Label>
      <Form.Control
        as="select"
        size="md"
        onChange={(e) => {
          setSortingMethod(e.target.value);
        }}
      >
        {Object.keys(sorting).map((method) => (
          <option key={method}>{method}</option>
        ))}
      </Form.Control>
    </Form.Group>
  </Form>
);

const Sample = ({ sampleSize, setSamplesSize }) => (
  <Form>
    <Form.Group>
      <Form.Label>Sample Size</Form.Label>
      <Form.Control
        as="select"
        size="md"
        value={sampleSize}
        onChange={(e) => {
          setSamplesSize(Number(e.target.value));
        }}
      >
        {[5, 10, 50, 100].map((size) => (
          <option key={size}>{size}</option>
        ))}
      </Form.Control>
    </Form.Group>
  </Form>
);

const Slider = ({ speed, handleSpeedChange, playing }) => {
  const [value, setValue] = useState(speed.current);
  return (
    <Form>
      <Form.Group controlId="formBasicRange">
        <Form.Label>{`Delay: ${value}ms`}</Form.Label>
        <Form.Control
          disabled={playing}
          onChange={(e) => {
            handleSpeedChange(e.target.value);
            setValue(e.target.value);
          }}
          custom
          type="range"
          min="50"
          max="1500"
          step="50"
          value={value}
        />
      </Form.Group>
    </Form>
  );
};

const Buttons = ({ playing, play, pause, shuffleNumbers }) => {
  const [disabled, setDisabled] = useState(true);
  const shflBtn = useRef(null);
  return (
    <ButtonGroup size="lg">
      {!playing ? (
        <Button
          className="controls"
          variant="primary"
          onClick={() => {
            play();
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
      <Button
        disabled={playing}
        className="controls"
        variant="primary"
        ref={shflBtn}
        onClick={() => {
          shuffleNumbers();
          shflBtn.current.blur();
        }}
      >
        <ArrowClockwise size={32} />
      </Button>
    </ButtonGroup>
  );
};

const Controls = ({ ...props }) => {
  return (
    <>
      <Row>
        <Col>
          <Methods {...props} />
        </Col>
        <Col>
          <Sample {...props} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Slider {...props} />
        </Col>
      </Row>
      <Row>
        <Col align="center">
          <Buttons {...props} />
        </Col>
      </Row>
    </>
  );
};

Methods.propTypes = {
  sorting: PropTypes.objectOf(PropTypes.func).isRequired,
  setSortingMethod: PropTypes.func.isRequired
};
Sample.propTypes = {
  sampleSize: PropTypes.number.isRequired,
  setSamplesSize: PropTypes.func.isRequired
};
Slider.propTypes = {
  speed: PropTypes.shape({ current: PropTypes.number }).isRequired,
  playing: PropTypes.bool.isRequired,
  handleSpeedChange: PropTypes.func.isRequired
};
Buttons.propTypes = {
  playing: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  shuffleNumbers: PropTypes.func.isRequired
};

export default Controls;
