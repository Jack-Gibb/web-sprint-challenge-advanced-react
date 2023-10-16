import React, { useState } from 'react';

function AppFunctional() {
  const [activeSquare, setActiveSquare] = useState(4);
  const [coordinates, setCoordinates] = useState({ x: 2, y: 2 });
  const [limitReachedMessage, setLimitReachedMessage] = useState('');
  const [steps, setSteps] = useState(0);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleMove = (direction) => {
    const { x, y } = coordinates;

    if (direction === 'up' && y > 1) {
      setCoordinates({ x, y: y - 1 });
      setActiveSquare(activeSquare - 3);
      setSteps(steps + 1);
    } else if (direction === 'down' && y < 3) {
      setCoordinates({ x, y: y + 1 });
      setActiveSquare(activeSquare + 3);
      setSteps(steps + 1);
    } else if (direction === 'left' && x > 1) {
      setCoordinates({ x: x - 1, y });
      setActiveSquare(activeSquare - 1);
      setSteps(steps + 1);
    } else if (direction === 'right' && x < 3) {
      setCoordinates({ x: x + 1, y });
      setActiveSquare(activeSquare + 1);
      setSteps(steps + 1);
    } else {
      setLimitReachedMessage(`You can't go ${direction}`);
    }
  };

  const handleReset = () => {
    setActiveSquare(4);
    setCoordinates({ x: 2, y: 2 });
    setLimitReachedMessage('');
    setSteps(0);
    setEmail('');
    setMessage('');
  };

  const handleSubmit = async () => {
    if (!email) {
      setMessage('Ouch: email is required');
    } else if (!validateEmail(email)) {
      setMessage('Ouch: email must be a valid email');
    } else if (email === 'foo@bar.baz') {
      setMessage('foo@bar.baz failure #71');
    } else {
      // Perform the submission logic here and handle success messages.
    }
  };

  const validateEmail = (email) => {
    // Implement a basic email validation function here.
    // You can use a regular expression or a library like validator.js.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div>
      <div className="grid">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className={`square ${activeSquare === i ? 'active' : ''}`}>
            {activeSquare === i ? 'B' : ''}
          </div>
        )}
      </div>
      <div id="coordinates">({coordinates.x},{coordinates.y})</div>
      <div id="steps">You moved {steps} times</div>
      <input
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div id="message">{message}</div>
      <button id="up" onClick={() => handleMove('up')}>Up</button>
      <button id="down" onClick={() => handleMove('down')}>Down</button>
      <button id="left" onClick={() => handleMove('left')}>Left</button>
      <button id="right" onClick={() => handleMove('right')}>Right</button>
      <button id="reset" onClick={handleReset}>Reset</button>
      <button id="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AppFunctional;
