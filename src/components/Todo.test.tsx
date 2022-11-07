
import React from 'react';
import { render, screen, fireEvent }  from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../rtkstore/store';
import userEvent from '@testing-library/user-event';

import Todo from './Todo';

const renderTodo = () => {
  render(<Provider store={store}>
    <Todo />
  </Provider>      
  );
}

describe('component "Todo" tests', () => {
  test('form input, itemsLeft, clearCompleted are in document', () => {
    renderTodo();
    //screen.debug();
    
    let formInput = screen.getByTestId('form_input');
    expect(formInput).toBeInTheDocument();

    let spanitemsLeft = screen.getByTestId('span_itemsLeft');
    expect(spanitemsLeft).toBeInTheDocument();

    let btnclearCompleted = screen.getByTestId('btn_clearCompleted');
    expect(btnclearCompleted).toBeInTheDocument();        
  });

  test('new todo is added to the todolist, also new item is found on page and counter', () => {
    renderTodo();

    let spanitemsLeft = screen.getByTestId('span_itemsLeft');
    let todolist_div = screen.getByTestId('todolist_div');

    expect(spanitemsLeft).toHaveTextContent('0');
    //screen.debug();

    let formInput = screen.getByTestId('form_input');
    userEvent.type(formInput, "sample todo{enter}");
    expect(spanitemsLeft).toHaveTextContent('1');
    expect(todolist_div).toHaveTextContent('sample todo');
    
    //screen.debug();

  })

})


