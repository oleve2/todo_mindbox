import { FC } from "react";
import { useDispatch } from "react-redux";

// models
import { TodoModel } from '../models/models';

// images
import img_active from '../assets/todo_active.png';
import img_done from '../assets/todo_done.png';

// store
import { doChangeIsCompleted, updateData } from "../rtkstore/todoreducer";
import { AppDispatch } from "../rtkstore/store";


// styles
import './TodoElement.css';

interface TodoElementProps {
  todo: TodoModel,
}

//
const TodoElement:FC<TodoElementProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const handleDone = (id: number) => {
    console.log('inside handleDone');
    dispatch( doChangeIsCompleted(id) );
    dispatch( updateData({}) );
  }

  return (<>
  {/*JSON.stringify(props.todo)*/}
  <div className="todoElem_div"> 
    <img className="todoElem_img"
      src={props.todo.isCompleted ? img_done : img_active} 
      alt="status" 
      onClick={() => { handleDone(props.todo.id) }}
    />
    
    <div className={'todoElem_data' + (props.todo.isCompleted ? ' text_crossed' : '')}>
      {props.todo.todo_text}
    </div>
  </div>
  </>)
}

export default TodoElement;
