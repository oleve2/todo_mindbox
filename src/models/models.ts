
export interface TodoModel {
  id: number,
  todo_text: string,
  isActive: boolean;
  isCompleted: boolean;
}

export interface addNewTodoThunkModel {
  inputValue: string,
}

export enum FilterTypes {
  all = 'all',
  active = 'active',
  completed = 'completed',
}




