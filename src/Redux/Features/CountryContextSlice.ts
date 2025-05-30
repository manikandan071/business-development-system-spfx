/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const mainState = {
  countryData: [],
};

const CountryContextSlice = createSlice({
  name: "CountryContextSlice",
  initialState: mainState,
  reducers: {
    setCountriesData: (state, action) => {
      state.countryData = action.payload;
    },
  },
});

export const { setCountriesData } = CountryContextSlice.actions;
export default CountryContextSlice.reducer;
