import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  isOpen: false
};

export const testSlice = createSlice({
  name: 'testSlice',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: {},
});

export const {increment, decrement, setDrawer} = testSlice.actions;

export default testSlice.reducer;
