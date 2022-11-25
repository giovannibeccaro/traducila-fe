import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  isNavBlack: boolean;
};

const initialState: InitialStateType = {
  isNavBlack: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setIsNavBlack(state, action) {
      state.isNavBlack = action.payload;
    },
  },
});

export const { setIsNavBlack } = navbarSlice.actions;
export default navbarSlice.reducer;
