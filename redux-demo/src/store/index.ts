import { configureStore } from '@reduxjs/toolkit';
import countReduce from './count';
import todoListReduce, { TodoItemType } from './todoList';

export type StateType = {
  count: Number;
  todoList: TodoItemType[];
};

export default configureStore({
  reducer: {
    count: countReduce,
    todoList: todoListReduce,
  },
});
