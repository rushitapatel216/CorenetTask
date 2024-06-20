import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Todo {
  id: number;
  title: string;
  status: boolean;
}

interface TodoState {
  todoList: Todo[];
}

const initialState: TodoState = {
  todoList: [
    {id: 1, title: 'Hit the gym', status: false},
    {id: 2, title: 'Breakfast', status: false},
  ],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addToDo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Math.random(),
        title: action.payload,
        status: false,
      };
      state.todoList.push(newTodo);
    },
    deleteToDo: (state, action: PayloadAction<{id: number}>) => {
      state.todoList = state.todoList.filter(
        item => item.id !== action.payload.id,
      );
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      state.todoList = state.todoList.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
    toggleTodoStatus: (state, action: PayloadAction<{id: number}>) => {
      console.log('id>>>>', action);
      state.todoList = state.todoList.map(item =>
        item.id === action.payload.id ? {...item, status: !item.status} : item,
      );
    },
  },
});

export const {addToDo, deleteToDo, editTodo, toggleTodoStatus} =
  todoSlice.actions;
export default todoSlice.reducer;
