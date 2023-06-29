import { configureStore } from "@reduxjs/toolkit";
import listSlice from './listSlice';

const savedData = localStorage.getItem('kanbanData');
const initialState = savedData ? JSON.parse(savedData) : { listSlice: { list: [], cardObj: {} } };

const store = configureStore({
  reducer: {
    listSlice: listSlice
  },
  preloadedState: initialState
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('kanbanData', JSON.stringify(state));
});

export default store;
