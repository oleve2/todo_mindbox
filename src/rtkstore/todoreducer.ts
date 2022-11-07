import { createSlice, PayloadAction, createAsyncThunk}  from '@reduxjs/toolkit';

import cloneDeep from 'lodash.clonedeep';

// models
import { TodoModel, addNewTodoThunkModel, FilterTypes } from '../models/models';
import { RootState } from './store';


//
interface TodoState {
  idCounter: number,
  activeFilter: FilterTypes,
  filterList: FilterTypes[],
  itemsLeft: number,
  todoList: TodoModel[],
  todoListFiltered: TodoModel[],
}

//
const initialState: TodoState = {
  idCounter: 0,
  activeFilter: FilterTypes.all,
  filterList: Object.values(FilterTypes),
  itemsLeft: -1,

  todoList: [],
  todoListFiltered: [],
}

const todoReducer = createSlice({
  name: 'todoreducer',
  initialState: initialState,
  reducers: {
    // main todo list
    setTodoList(state, action: PayloadAction<TodoModel[]>) {
      state.todoList = action.payload;
    },
    // counter
    setIdCounter(state, action: PayloadAction<number>) {
      state.idCounter = action.payload;
    },
    // items left
    setItemsLeft(state, action: PayloadAction<number>) {
      state.itemsLeft = action.payload;
    },
    // 
    setActiveFilter(state, action: PayloadAction<FilterTypes>) {
      state.activeFilter = action.payload;
    },
    // filtered todo list
    setTodoListFiltered(state, action: PayloadAction<TodoModel[]>) {
      state.todoListFiltered = action.payload;
    },    
  }
})

export const actionstodoreducer = todoReducer.actions;
export default todoReducer.reducer;


// ----------------------------------------
// [thunks]

export const updateData = createAsyncThunk(
  'data/init',
  async (obj: Object, thunkAPI) => {
    // root state
    const appState = thunkAPI.getState() as RootState;

    // подсчет "items left"
    let todosLeftLength = appState.todoreducer.todoList.filter( item => !item.isCompleted ).length;
    thunkAPI.dispatch(actionstodoreducer.setItemsLeft(todosLeftLength));

    // фильтрация списка
    let actFilter = appState.todoreducer.activeFilter;
    let newTDL = cloneDeep(appState.todoreducer.todoList);
    newTDL = newTDL.filter( (item) => {
      if (actFilter === FilterTypes.all) { return item }
      else if (actFilter === FilterTypes.active) { return item.isCompleted === false }
      else if (actFilter === FilterTypes.completed) { return item.isCompleted === true }
      else {
        return item;
      }
    })
    thunkAPI.dispatch(actionstodoreducer.setTodoListFiltered(newTDL));
  }
)

export const addNewTodoItem = createAsyncThunk(
  'data/newTodo',
  async (obj: addNewTodoThunkModel, thunkAPI) => {
    const appState = thunkAPI.getState() as RootState;
    let cntVal = appState.todoreducer.idCounter;
    let newTD: TodoModel = {
      id: cntVal, 
      todo_text: obj.inputValue, 
      isActive: false, 
      isCompleted: false
    };
    let newTDL = cloneDeep(appState.todoreducer.todoList);
    newTDL.push(newTD);

    thunkAPI.dispatch( actionstodoreducer.setTodoList(newTDL) );
    thunkAPI.dispatch( actionstodoreducer.setIdCounter(cntVal + 1) );
  }
)

export const doClearCompleted = createAsyncThunk(
  'data/clearCompleted',
  async (obj: Object, thunkAPI) => {
    const appState = thunkAPI.getState() as RootState;
    let newTDL = cloneDeep(appState.todoreducer.todoList);
    newTDL = newTDL.filter( (item) => {
      return !item.isCompleted;
    })
    thunkAPI.dispatch( actionstodoreducer.setTodoList(newTDL) );
  }
)

export const doChangeIsCompleted = createAsyncThunk(
  'data/updateIsChangedById',
  async (id: number, thunkAPI) => {
    const appState = thunkAPI.getState() as RootState;
    let newTDL = cloneDeep(appState.todoreducer.todoList);
    newTDL = newTDL.map( (item) => {
      if (item.id === id) {
        return {...item, isCompleted: !item.isCompleted};
      } else {
        return item;
      }
    })
    thunkAPI.dispatch( actionstodoreducer.setTodoList(newTDL) );
  }
)

