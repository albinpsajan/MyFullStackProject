import React, { useState } from 'react';
import SearchBar from './SearchBar';

function Counter() {
  // 1. Initialize state
  // count starts at 0. setCount is the tool to change it.
  const [count, setCount] = useState(0);

  // 2. Event Handlers
  const increment = () => {
    // We do not say: count = count + 1 (This is forbidden)
    // We MUST use the setter:
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
        <h2>Search Courses</h2>
             <SearchBar />

      <h3>Class Attendance Counter</h3>
      <h1>{count}</h1>
      <button onClick={increment}>Add Student</button>
      <button onClick={decrement}>Remove Student</button>
    </div>
  );
}

export default Counter;
