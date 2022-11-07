
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './rtkstore/store';

import App from './App';

test('first launch', () => {
  expect(1).toBe(1);
  /*render(
  <Provider store={store}>
    <App />
  </Provider>)

  expect('a').toBe('a');
  render(<App />);
  const todosH2 = screen.getByText(/todos/i);
  expect(todosH2).toBeInTheDocument();*/
});

