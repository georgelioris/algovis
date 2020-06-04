import React from 'react';
import Button from 'react-bootstrap/Button';
import { PlayFill, PauseFill } from 'react-bootstrap-icons';

const Controls = ({ button, play, pause }) =>
  button ? (
    <Button className="controls" variant="primary" onClick={play}>
      <PlayFill size={32} />
    </Button>
  ) : (
    <Button className="controls" variant="danger" onClick={pause}>
      <PauseFill size={32} />
    </Button>
  );

export default Controls;
