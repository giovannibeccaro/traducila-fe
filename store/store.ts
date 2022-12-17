import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbar/navbarSlice";
import swapButtonReducer from "./swapButton/swapButtonSlice";
import songInfoReducer from "./songInfo/songInfoSlice";
import scrollCheckReducer from "./scrollCheck/scrollCheckSlice";

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    swapButton: swapButtonReducer,
    songInfo: songInfoReducer,
    scrollCheck: scrollCheckReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
