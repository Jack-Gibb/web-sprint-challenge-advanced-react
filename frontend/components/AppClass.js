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
    const { coordinates, steps, activeSquare } = this.state;
    const { x, y } = coordinates;

    if (direction === 'up' && y > 1) {
      this.setState({
        coordinates: { x, y: y - 1 },
        activeSquare: activeSquare - 3,
        steps: steps + 1,
      });
    } else if (direction === 'down' && y < 3) {
      this.setState({
        coordinates: { x, y: y + 1 },
        activeSquare: activeSquare + 3,
        steps: steps + 1,
      });
    } else if (direction === 'left' && x > 1) {
      this.setState({
        coordinates: { x: x - 1, y },
        activeSquare: activeSquare - 1,
        steps: steps + 1,
      });
    } else if (direction === 'right' && x < 3) {
      this.setState({
        coordinates: { x: x + 1, y },
        activeSquare: activeSquare + 1,
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
    const { coordinates, limitReachedMessage, steps, email, message, activeSquare } = this.state;

    return (
      <div>
        <div className="grid">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className={`square ${activeSquare === i ? 'active' : ''}`}>
              {activeSquare === i ? 'B' : ''}
            </div>
          )}
        </div>
        <div id="coordinates
