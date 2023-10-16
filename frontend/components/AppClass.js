import React from 'react';
import axios from 'axios';

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
};

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  getXY() {
    const x = Math.floor(this.state.index / 3);
    const y = this.state.index % 3;
    return { x, y };
  }

  getXYMessage() {
    const { x, y } = this.getXY();
    return `Coordinates (${x}, ${y})`;
  }

  reset() {
    this.setState(initialState);
  }

  getNextIndex(direction) {
    const currentIndex = this.state.index;
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

    return nextIndex;
  }

  move(evt) {
    const direction = evt.target.id;
    const nextIndex = this.getNextIndex(direction);

    this.setState((prevState) => ({
      index: nextIndex,
      steps: prevState.steps + 1,
    }));
  }

  onChange(evt) {
    const { id, value } = evt.target;
    this.setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  onSubmit(evt) {
    evt.preventDefault();
    const data = {
      x: this.getXY().x,
      y: this.getXY().y,
      steps: this.state.steps,
      email: this.state.email,
    };

    axios
      .post('http://localhost:9000/api/result', data)
      .then((response) => {
        this.setState((prevState) => ({
          ...prevState,
          message: response.data.message,
        }));
      })
      .catch((error) => {
        console.error(error);
        this.setState((prevState) => ({
          ...prevState,
          message: 'An error occurred.',
        }));
      });
  }

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
              {idx === this.state.index ? 'B' : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={(evt) => this.move(evt)}>
            LEFT
          </button>
          <button id="up" onClick={(evt) => this.move(evt)}>
            UP
          </button>
          <button id="right" onClick={(evt) => this.move(evt)}>
            RIGHT
          </button>
          <button id="down" onClick={(evt) => this.move(evt)}>
            DOWN
          </button>
          <button id="reset" onClick={() => this.reset()}>
            Reset
          </button>
        </div>
        <form onSubmit={(evt) => this.onSubmit(evt)}>
          <input id="email" type="email" placeholder="Type email" value={this.state.email} onChange={(evt) => this.onChange(evt)} />
          <input id="submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
