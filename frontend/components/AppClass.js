import React, { Component } from 'react';

class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSquare: 4,
      coordinates: { x: 2, y: 2 },
      limitReachedMessage: '',
      steps: 0,
      email: '',
      message: '',
    };
  }

  handleMove = (direction) => {
    const { coordinates, steps } = this.state;
    const { x, y } = coordinates;

    if (direction === 'up' && y > 1) {
      this.setState({
        coordinates: { x, y: y - 1 },
        steps: steps + 1,
      });
    } else if (direction === 'down' && y < 3) {
      this.setState({
        coordinates: { x, y: y + 1 },
        steps: steps + 1,
      });
    } else if (direction === 'left' && x > 1) {
      this.setState({
        coordinates: { x: x - 1, y },
        steps: steps + 1,
      });
    } else if (direction === 'right' && x < 3) {
      this.setState({
        coordinates: { x: x + 1, y },
        steps: steps + 1,
      });
    } else {
      this.setState({ limitReachedMessage: `You can't go ${direction}` });
    }
  };

  handleReset = () => {
    this.setState({
      activeSquare: 4,
      coordinates: { x: 2, y: 2 },
      limitReachedMessage: '',
      steps: 0,
      email: '',
      message: '',
    });
  };

  handleSubmit = async () => {
    const { email } = this.state;

    if (!email) {
      this.setState({ message: 'Ouch: email is required' });
    } else if (!this.validateEmail(email)) {
      this.setState({ message: 'Ouch: email must be a valid email' });
    } else if (email === 'foo@bar.baz') {
      this.setState({ message: 'foo@bar.baz failure #71' });
    } else {
      // Perform the submission logic here and handle success messages.
    }
  };

  validateEmail = (email) => {
    // Implement a basic email validation function here.
    // You can use a regular expression or a library like validator.js.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  render() {
    const { coordinates, limitReachedMessage, steps, email, message } = this.state;

    return (
      <div>
        {/* Render the grid and form elements based on the requirements */}
        <div className="square">B</div>
        {/* Implement the rest of the grid squares */}
        <div id="coordinates">({coordinates.x},{coordinates.y})</div>
        <div id="steps">You moved {steps} times</div>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <div id="message">{message}</div>
        <button id="up" onClick={() => this.handleMove('up')}>Up</button>
        {/* Implement buttons for other directions (down, left, right) */}
        <button id="reset" onClick={this.handleReset}>Reset</button>
        <button id="submit" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default AppClass;
