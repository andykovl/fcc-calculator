import React from 'react'

const Screen = ({ value }) => {
  return (
    <div className="screen" id='display'>
      {value}
    </div>
  );
};

export default Screen;