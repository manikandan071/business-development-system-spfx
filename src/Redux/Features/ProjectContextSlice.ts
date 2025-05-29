/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const mainState = {
  projectsData: [],
};

const ProjectContextSlice = createSlice({
  name: "ProjectContextSlice",
  initialState: mainState,
  reducers: {
    setProjectsData: (state, action) => {
      state.projectsData = action.payload;
    },
  },
});

export const { setProjectsData } = ProjectContextSlice.actions;
export default ProjectContextSlice.reducer;
