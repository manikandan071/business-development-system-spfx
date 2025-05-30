import { configureStore } from "@reduxjs/toolkit";
import MainSPContext from "../Features/MainSPContextSlice";
import ProjectContextSlice from "../Features/ProjectContextSlice";
import CountryContextSlice from "../Features/CountryContextSlice";

const store = configureStore({
  reducer: {
    MainSPContext: MainSPContext,
    ProjectContextSlice: ProjectContextSlice,
    CountryContextSlice:CountryContextSlice
  },
});

export { store };
