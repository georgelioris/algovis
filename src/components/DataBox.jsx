import React from 'react';

const DataBox = ({ value, pointer1, pointer2 }) => {
  const background = `hsl(260,${100 - 100 / value}%,${100 - value}%)`;
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

export default DataBox;
