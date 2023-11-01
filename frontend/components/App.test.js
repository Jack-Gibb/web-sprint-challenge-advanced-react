import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AppClass from "./AppClass";
import '@testing-library/jest-dom/extend-expect'

test('1', () => {
  const { getByText } = render(<AppClass />);

  const leftButton = getByText(/LEFT/i);
  expect(leftButton).toBeInTheDocument();

});

test('2', () => {
  const { getByPlaceholderText } = render(<AppClass />);
  const emailInput = getByPlaceholderText('Type email');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  expect(emailInput.value).toBe('test@example.com');
});

test('3', () => {
  const { getByText } = render(<AppClass />);

  const resetButton = getByText(/RESET/i);
  expect(resetButton).toBeInTheDocument();

});

test('4', () => {
  const { getByText } = render(<AppClass />);

  const coordinatesHeading = getByText(/Coordinates/i);
  expect(coordinatesHeading).toBeInTheDocument();

});

test('5', () => {
  const { getByText } = render(<AppClass />);

  const stepsHeading = getByText(/You moved/i);
  expect(stepsHeading).toBeInTheDocument();
  
});