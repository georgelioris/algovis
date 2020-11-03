import React from 'react';
import PropTypes from 'prop-types';

const DataBox = ({ value, size, isI, isJ }) => {
  const background = isI
    ? '#EDB458'
    : isJ
    ? '#E8871E'
    : `hsl(260,${100 - size / value}%,${((size - value) / size) * 100}%)`;
  const border = `5px solid ${
    isI && !isJ ? '#EDB458' : isJ ? '#E8871E' : background
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

const DataContainer = ({ step, pointer, size }) => (
  <div className="data-container">
    {step.map((value, i) => (
      <DataBox
        size={size}
        key={value}
        value={value}
        isI={pointer && pointer.i === i}
        isJ={pointer && pointer.j === i}
      />
    ))}
  </div>
);

DataBox.propTypes = {
  value: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  isI: PropTypes.bool,
  isJ: PropTypes.bool
};
DataBox.defaultProps = {
  isI: undefined,
  isJ: undefined
};
DataContainer.propTypes = {
  step: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.number.isRequired,
  pointer: PropTypes.shape({
    i: PropTypes.number,
    j: PropTypes.number
  })
};
DataContainer.defaultProps = {
  pointer: {
    i: null,
    j: null
  }
};

export default DataContainer;
