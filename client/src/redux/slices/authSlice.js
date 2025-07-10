import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    adminToken: localStorage.getItem('adminToken') || null,
  },
  reducers: {
    login: (state, action) => {
      state.adminToken = action.payload;
      localStorage.setItem('adminToken', action.payload);
    },
    logout: (state) => {
      state.adminToken = null;
      localStorage.removeItem('adminToken');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
