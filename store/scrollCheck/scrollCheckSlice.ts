import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  isPageScrolled: boolean;
};

const initialState: InitialStateType = {
  isPageScrolled: false,
};

const scrollCheckSlice = createSlice({
  name: "scrollCheck",
  initialState,
  reducers: {
    setIsPageScrolled(state, action) {
      state.isPageScrolled = action.payload;
    },
  },
});

export const { setIsPageScrolled } = scrollCheckSlice.actions;
export default scrollCheckSlice.reducer;
