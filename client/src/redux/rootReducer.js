import { combineReducers } from '@reduxjs/toolkit';
import { userInfoReducer } from './userInfo/slice';

export const rootReducer = combineReducers({
  userInfo: userInfoReducer,
});
