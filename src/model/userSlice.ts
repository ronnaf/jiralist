import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../api/models/User';

type State = {
  profile: User | null;
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: { firstName: 'Mock', id: 1 },
  } as State,
  reducers: {
    receivedUser: (state, action: PayloadAction<{ user: User }>) => {
      state.profile = action.payload.user;
    },
  },
});
