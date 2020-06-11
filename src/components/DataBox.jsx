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

DataBox.propTypes = {
  value: PropTypes.number.isRequired,
  isI: PropTypes.bool,
  isJ: PropTypes.bool
};
DataBox.defaultProps = {
  isI: undefined,
  isJ: undefined
};

export default DataBox;
