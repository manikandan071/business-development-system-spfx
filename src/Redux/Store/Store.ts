import { configureStore } from "@reduxjs/toolkit";
import MainSPContext from "../Features/MainSPContextSlice";

const store = configureStore({
  reducer: {
    MainSPContext: MainSPContext,
  },
});

export { store };
