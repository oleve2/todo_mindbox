
import React from 'react';
import { render, screen, fireEvent }  from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../rtkstore/store';

import TodoElement from './TodoElement';
import { TodoModel } from '../models/models';

describe('component "TodoElement" tests', () => {
  test('memo text rendered', () => {
    let td1: TodoModel = {id:1, isActive:false, isCompleted:false, todo_text:'some text'};
    render(
      <Provider store={store}>
        <TodoElement key={0} todo={td1}/>
      </Provider>
    );
    //screen.debug()
    let text = screen.getByText(/some text/i);
    expect(text).toBeInTheDocument();
  });
})
