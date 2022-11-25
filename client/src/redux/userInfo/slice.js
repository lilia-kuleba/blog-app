import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  realName: '',
  userName: '',
  roles: [],
  sex: null,
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.id = payload.id;
      state.realName = payload.realName;
      state.userName = payload.userName;
      state.roles = payload.roles;
      state.sex = payload.sex;
    },
    logoutUser: state => {
      state.id = '';
      state.realName = '';
      state.userName = '';
      state.roles = [];
      state.sex = [];
    },
  },
});

export const { setUser, logoutUser } = userInfoSlice.actions;

export const userInfoReducer = userInfoSlice.reducer;