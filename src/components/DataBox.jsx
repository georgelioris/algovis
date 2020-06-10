import React from 'react';
import PropTypes from 'prop-types';

const DataBox = ({ value, pointer1, pointer2 }) => {
  const background = pointer1
    ? '#EDB458'
    : pointer2
    ? '#E8871E'
    : `hsl(260,${100 - 100 / value}%,${100 - value}%)`;
  const border = `5px solid ${
    pointer1 && !pointer2 ? '#EDB458' : pointer2 ? '#E8871E' : background
  }`;

  return (
    <div
      className="data-box"
      style={{
        background,
        border
      }}
    >
      <div>{value}</div>
    </div>
  );
};

DataBox.propTypes = {
  value: PropTypes.number,
  pointer1: PropTypes.bool,
  pointer2: PropTypes.bool
};
DataBox.defaultProps = {
  value: undefined,
  pointer1: undefined,
  pointer2: undefined
};

export default DataBox;
