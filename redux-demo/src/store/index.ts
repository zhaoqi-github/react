import { configureStore } from '@reduxjs/toolkit';
import countReduce from './count';

export type StateType = {
  count: Number
}

export default configureStore({
  reducer: {
    count: countReduce,
  },
});
