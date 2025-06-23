import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import issueReducer from './slice/issueSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    issues: issueReducer,
  },
});

export default store;
