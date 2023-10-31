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

  

  getXY() {
    const y = Math.floor(this.state.index / 3 + 1);
    const x = this.state.index % 3 + 1;
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
      x: 2,
      y: 2,
    });
  }

  getNextIndex(direction) {
    const currentIndex = this.state.index;
    let nextIndex;

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
      this.setState({
        message: `You can't go ${direction}`,
      });
    } else {
      this.setState({
        message: '',
      });
    }

    return nextIndex;
  }

  move(evt) {
    const direction = evt.target.id;
    const nextIndex = this.getNextIndex(direction);

    if (nextIndex === this.state.index) {
      return;
    }

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
        this.setState({
          message: response.data.message,
          email:"",
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          message: error.response.data.message,
          email: "",
        });
      });
  }

  render() {
    return (
      <div id="wrapper" className={this.props.className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps}
          {this.state.steps === 1 ? ' time': ' times'}</h3>
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
