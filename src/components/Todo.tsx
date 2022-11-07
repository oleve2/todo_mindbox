import React, {FC, useState, useEffect}  from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../rtkstore/store";

// store
import { updateData } from "../rtkstore/todoreducer";
import { addNewTodoItem, doClearCompleted } from "../rtkstore/todoreducer";
import { actionstodoreducer } from '../rtkstore/todoreducer';

// components
import TodoElement from './TodoElement';


// models
import { FilterTypes } from '../models/models';

// style
import './Todo.css';
import './TodoElement.css';
import imgBadge from '../assets/badge.png';


//
const Todo:FC = (props): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  // store
  const storeTodo = useSelector( (store: RootState) => store.todoreducer.todoListFiltered);
  const storeItemsLeft = useSelector( (store: RootState) => store.todoreducer.itemsLeft);
  const storeFilterList = useSelector( (store: RootState) => store.todoreducer.filterList);
  const storeActiveFilter = useSelector( (store: RootState) => store.todoreducer.activeFilter);

  const [inputValue, setinputValue] = useState('');

  // handlers
  const handleForm = (event: any) => {
    event.preventDefault();
    dispatch( addNewTodoItem({inputValue: inputValue}) );
    setinputValue('');
    dispatch( updateData({}) );
  }

  const handleFilterSelect = (item: FilterTypes) => {
    dispatch (actionstodoreducer.setActiveFilter(item));
    dispatch( updateData({}) );
  }

  const handleClearCompleted = () => {
    dispatch( doClearCompleted({}) );
    dispatch( updateData({}) );
  }

  //
  useEffect( () => {
    dispatch( updateData({}) );
  }, [dispatch])


  //
  return (<>
  <div className='todo_div'>
    <form
      onSubmit={handleForm}       
      data-testid="todo_form"
      className='todoElem_div'
    > 
      <img className='todoElem_img' src={imgBadge} alt="badge" />
    
      <input 
        className='todoElem_data todo_input' 
        data-testid="form_input"
        type="text" value={inputValue} placeholder="what needs to be done?"
        onChange={(event) => { setinputValue(event.target.value) }} 
      />
    </form>

    <div className='todolist_div' data-testid="todolist_div">
      { storeTodo.map( (item) => {
        return <TodoElement key={item.id} todo={item}/>
      }) }
    </div>
    
    <br />
    <div className="todo_controls">
      <div>
        items left: 
        <span data-testid="span_itemsLeft">{storeItemsLeft}</span> 
      </div>
      
      <div className="todo_controls">
        {storeFilterList.map((item) => {
          return <div key={item}
            className={'filter_item' + (item === storeActiveFilter ? ' filter_active' : '')}
            onClick={() => { handleFilterSelect(item) }}
          >
            {item}
          </div>
        })}
      </div>

      <div 
        data-testid="btn_clearCompleted"
        onClick={() => { handleClearCompleted() }}
      >
        clear completed
      </div>
    </div>
  </div>
  </>)
}

export default Todo;
