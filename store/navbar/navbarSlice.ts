import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  navbarHeight: string;
  isSearchbarVisible: boolean;
};

const initialState: InitialStateType = {
  navbarHeight: "",
  isSearchbarVisible: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setNavbarHeight(state, action) {
      state.navbarHeight = action.payload;
    },
    setIsSearchbarVisible(state, action) {
      state.isSearchbarVisible = action.payload;
    },
  },
});

export const { setNavbarHeight, setIsSearchbarVisible } = navbarSlice.actions;
export default navbarSlice.reducer;
