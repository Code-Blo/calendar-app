import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './reducers/eventsReducer';
import goalsReducer from './reducers/goalsReducer';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    goals: goalsReducer,
  },
});
