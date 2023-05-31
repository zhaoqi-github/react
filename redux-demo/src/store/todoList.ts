import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export type TodoItemType = {
  id: string;
  title: string;
  completed: boolean;
};

const INIT_STATE: TodoItemType[] = [
  {
    id: nanoid(5),
    title: 'abc',
    completed: false,
  },
  {
    id: nanoid(5),
    title: 'def',
    completed: false,
  },
];

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState: INIT_STATE,
  reducers: {
    addTodo(state: TodoItemType[], action: PayloadAction<TodoItemType>) {
      // return state.contact(action.payload)
      return [action.payload, ...state];
    },
    removeTodo(state: TodoItemType[], action: PayloadAction<{ id: string }>) {
      return state.filter(todo => todo.id !== action.payload.id);
    },
    toggleCompleted(state: TodoItemType[], action: PayloadAction<{ id: string }>) {
      const { id: removeId } = action.payload;
      return state.map(todo => {
        if (todo.id === removeId) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    },
  },
});

export const { addTodo, removeTodo, toggleCompleted } = todoListSlice.actions;

export default todoListSlice.reducer;
