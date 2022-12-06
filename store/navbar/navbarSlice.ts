import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  navbarHeight: string;
};

const initialState: InitialStateType = {
  navbarHeight: "",
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setNavbarHeight(state, action) {
      state.navbarHeight = action.payload;
    },
  },
});

export const { setNavbarHeight } = navbarSlice.actions;
export default navbarSlice.reducer;
