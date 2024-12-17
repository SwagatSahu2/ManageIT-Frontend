import React, { useState } from 'react';

const FunctionComponent = () => {
  const [count, setCount] = useState(0);
  const inc = ()=>{
    setCount(count + 1)
  }
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={inc}>Increment</button>
    </div>
  );
};

export default FunctionComponent;