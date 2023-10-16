import React, { Component } from 'react';
import axios from 'axios';

class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      email: '',
      index: 4,
      steps: 0,
      x: 1,  // Initialize x and y to 1
      y: 2,
    };
  }

  isEmailValid(email) {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  }

  getXY() {
    const x = Math.floor(this.state.index / 3 + 1);
    const y = this.state.index % 3 + 1;
    return { x, y };
  }

  getXYMessage() {
    const { x, y } = this.getXY();
    return `Coordinates (${x}, ${y})`;
  }

  reset() {
    this.setState({
      message: '',
      email: '',
      index: 4,
      steps: 0,
      x: 1,
      y: 2,
    });
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
    const { email, x, y, steps } = this.state;

    if (!this.isEmailValid(email) || x < 1 || x > 3 || y < 1 || y > 3 || steps <= 0) {
      this.setState({
        message: 'Invalid payload shape',
      });
      return;
    }

    const data = {
      x,
      y,
      steps,
      email,
    };

    axios
      .post('http://localhost:9000/api/result', data)
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          message: "Unprocessable Entity",
        });
      });
  }

  render() {
    return (
      <div id="wrapper" className={this.props.className}>
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
          <input
            id="email"
            type="email"
            placeholder="Type email"
            value={this.state.email}
            onChange={(evt) => this.onChange(evt)}
          />
          <input id="submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AppClass;
