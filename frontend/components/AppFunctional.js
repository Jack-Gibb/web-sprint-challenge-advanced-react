import React, { useState } from 'react';
import axios from 'axios';

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

export default function AppFunctionality(props) {
  const [state, setState] = useState({
    message: initialMessage,
    email: initialEmail,
    index: initialIndex,
    steps: initialSteps,
  });

  function getXY() {
    const y = Math.floor(state.index / 3 + 1);
    const x = state.index % 3 + 1 ;
    return { x, y };
  }

  function getXYMessage() {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    setState({
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
    });
  }

  function getNextIndex(direction) {
    const currentIndex = state.index;
    let nextIndex;
    let message = '';

    switch (direction) {
      case 'left':
        nextIndex = currentIndex % 3 === 0 ? currentIndex : currentIndex - 1;
        break;
      case 'up':
        nextIndex = currentIndex < 3 ? currentIndex : currentIndex - 3;
        break;
      case 'right':
        nextIndex = currentIndex % 3 === 2 ? currentIndex : currentIndex + 1;
        break;
      case 'down':
        nextIndex = currentIndex > 5 ? currentIndex : currentIndex + 3;
        break;
      default:
        nextIndex = currentIndex;
    }
    if (nextIndex === currentIndex) {
      message = `You can't go ${direction}`;
    }
    setState((prevState) => ({
      ...prevState,
      message: message, // Update the message
      index: nextIndex,
    }));
  
    
    return nextIndex;
  }

  function move(evt) {
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction);

    if (nextIndex === state.index) {
      return;
    }

    setState((prevState) => ({
      index: nextIndex,
      steps: prevState.steps + 1,
    }));
  }

  function onChange(evt) {
    const { id, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  function onSubmit(evt) {
    evt.preventDefault();
    const data = {
      x: getXY().x,
      y: getXY().y,
      steps: state.steps,
      email: state.email,
    };

    axios
      .post('http://localhost:9000/api/result', data)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          message: response.data.message,
          email: "",
        }));
      })
      .catch((error) => {
    //    console.error(error);
        setState((prevState) => ({
          ...prevState,
          message: error.response.data.message,
          email: "",
        }));
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {state.steps} 
        {state.steps === 1 ? ' time': ' times'}</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === state.index ? ' active' : ''}`}>
            {idx === state.index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>
          LEFT
        </button>
        <button id="up" onClick={move}>
          UP
        </button>
        <button id="right" onClick={move}>
          RIGHT
        </button>
        <button id="down" onClick={move}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          Reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="Type email" value={state.email} onChange={onChange} />
        <input id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
