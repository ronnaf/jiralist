import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JiraProject } from '../api/models/JiraProject';

type State = {
  list: JiraProject[];
};

export const projectSlice = createSlice({
  name: 'project',
  initialState: {
    list: [],
  } as State,
  reducers: {
    receivedList: (state, action: PayloadAction<{ projects: JiraProject[] }>) => {
      state.list = action.payload.projects;
    },
  },
});
