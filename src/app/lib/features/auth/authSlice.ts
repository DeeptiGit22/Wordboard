import { RootState } from '@/app/store/store';
import { AuthState, User } from '@/app/types/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const getInitialUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }
  return null;
};

const initialState: AuthState = {
  user: getInitialUser(),
  users: []
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      document.cookie = `user=${encodeURIComponent(JSON.stringify(action.payload))}; path=/;`;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('tasks');
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      window.location.href = "/";
    },
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
  },
});

export const { login, logout ,setUsers} = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state: RootState) => state.auth.user;