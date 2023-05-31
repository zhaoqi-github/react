import { configureStore } from '@reduxjs/toolkit';
import countReduce from './count';

export default configureStore({
  reducer: {
    count: countReduce,
  },
});
