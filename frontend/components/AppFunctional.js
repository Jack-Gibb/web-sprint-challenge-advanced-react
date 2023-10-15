import React from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [ state, setState ] = useState({
    message: initialMessage,
    email: initialEmail,
    index: initialIndex,
    steps: initialSteps,
  })

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const x = Math.floor(state.index / 3);
    const y = state.index % 3;
    return ( x, y );
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const { x, y } = this.getXY();
    return `Coordinates (${x}, ${y})`
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setState({
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
    })
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const currentIndex = state.index;
    let nextIndex;

    switch (direction) {
      case 'left':
        nextIndex = currentIndex - 1;
        break;
      case 'up':
       nextIndex = currentIndex - 3;
       break;
      case 'right':
        nextIndex = currentIndex + 1;
        break;
      case 'down':
        nextIndex = currentIndex + 3;
        break;
      default:
        nextIndex = currentIndex;
    }

    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex > 8) nextIndex = 8;

    return nextIndex
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction);

    setState((prevState) => ({
      index: nextIndex,
      steps: prevState.steps + 1,
    }));
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const { id, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.

    axios.post(`http://localhost:9000/api/result`, data)
    .then((response) => {
      setState((prevState) => ({
        ...prevState, 
        message: response.data.message,
      }))
    })
    .catch((error) => {
      console.error(error)
      setState((prevState) => ({
        ...prevState,
        message: 'An error occured',
      }));  
    })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
