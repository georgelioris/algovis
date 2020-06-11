import React from 'react';
import PropTypes from 'prop-types';

const DataBox = ({ value, isI, isJ }) => {
  const background = isI
    ? '#EDB458'
    : isJ
    ? '#E8871E'
    : `hsl(260,${100 - 100 / value}%,${100 - value}%)`;
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

const DataContainer = ({ step, pointer }) => (
  <div className="data-container">
    {step.map((value, i) => (
      <DataBox
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
  isI: PropTypes.bool,
  isJ: PropTypes.bool
};
DataBox.defaultProps = {
  isI: undefined,
  isJ: undefined
};
DataContainer.propTypes = {
  step: PropTypes.arrayOf(PropTypes.number).isRequired,
  pointer: PropTypes.shape({
    i: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(null)]),
    j: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(null)])
  }).isRequired
};

export default DataContainer;
