import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JiraUser } from '../api/models/JiraUser';

type State = {
  profile: JiraUser | null;
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
  } as State,
  reducers: {
    receivedUser: (state, action: PayloadAction<{ user: JiraUser }>) => {
      state.profile = action.payload.user;
    },
  },
});
