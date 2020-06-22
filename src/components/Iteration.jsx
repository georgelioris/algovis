import React from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Iteration = ({ index, handleIndexChange, data }) => {
  const disableButton = () => index.current - 1 < 0;
  return (
    <>
      <Row>
        <Col className="align-self-end">
          <Button
            disabled={disableButton()}
            lable="+1"
            className="controls"
            variant="primary"
            onClick={() => {
              handleIndexChange(index.current - 1);
            }}
          >
            <ArrowLeft size={24} />
          </Button>
        </Col>
        <Col align="center" xs md lg="3">
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group>
              <Form.Label>Iteration</Form.Label>
              <Form.Control
                className="text-center border-top-0 border-left-0 border-right-0"
                style={{ background: '#efefef' }}
                type="number"
                size="sm"
                placeholder={`0-${Object.keys(data).length - 1}`}
                value={index.current || ''}
                onChange={(e) => {
                  handleIndexChange(Number(e.target.value));
                }}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col align="right" className="align-self-end">
          <Button
            lable="+1"
            className="controls"
            variant="primary"
            onClick={() => {
              handleIndexChange(index.current + 1);
            }}
          >
            <ArrowRight size={24} />
          </Button>
        </Col>
      </Row>
    </>
  );
};

Iteration.propTypes = {
  index: PropTypes.shape({
    current: PropTypes.number
  }).isRequired,
  handleIndexChange: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired
};

export default Iteration;
