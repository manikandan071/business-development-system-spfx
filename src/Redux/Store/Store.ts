import { configureStore } from "@reduxjs/toolkit";
import MainSPContext from "../Features/MainSPContextSlice";
import ProjectContextSlice from "../Features/ProjectContextSlice";

const store = configureStore({
  reducer: {
    MainSPContext: MainSPContext,
    ProjectContextSlice: ProjectContextSlice,
  },
});

export { store };
