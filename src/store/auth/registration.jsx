// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { userAPI } from './userAPI'

// // First, create the thunk
// const fetchUserById = createAsyncThunk(
//   'users/fetchByIdStatus',
//   async (userId, thunkAPI) => {
//     const response = await userAPI.fetchById(userId)
//     return response.data
//   }
// )

// // Then, handle actions in your reducers:
// const usersSlice = createSlice({
//   name: 'users',
//   initialState: { entities: [], loading: 'idle' },
//   reducers: {
//     // standard reducer logic, with auto-generated action types per reducer
//   },
//   extraReducers: {
//     // Add reducers for additional action types here, and handle loading state as needed
//     [fetchUserById.fulfilled]: (state, action) => {
//       // Add user to the state array
//       state.entities.push(action.payload)
//     }
//   }
// });

import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
const axios = require('axios');

export const fetchRegistration = createAsyncThunk('auth/fetchRegistrationLoading', 
  (data) =>
  axios
    .post('https://wu89z93mp4.execute-api.us-west-2.amazonaws.com/dev/authentication/signup', data, false)
    .then(response => response.data)
    .catch(error => error),
);

const registrationInitialState = {
   registrationList: {
     status: 'idle',
     data: {},
     error: {}
   }    
};

const registrationSlice = createSlice({
  name: 'userData',
  initialState: registrationInitialState,
  reducers: {},
  extraReducers: {
    [fetchRegistration.pending.type]: (state, action) => {
        state.registrationList = {
        status: 'loading',
        data: {},
        error: {}
      };
    },
    [fetchRegistration.fulfilled.type]: (state, action) => {
        state.registrationList = {
        status: 'idle',
        data: action.payload,
        error: {}
     };
    },
    [fetchRegistration.rejected.type]: (state, action) => {
        state.registrationList = {
        status: 'idle',
        data: {},
        error: action.payload,
      };
    },
  }
});

export default registrationSlice;
