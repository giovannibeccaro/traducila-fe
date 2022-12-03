import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbar/navbarSlice";
import swapButtonReducer from "./swapButton/swapButtonSlice";
import songInfoReducer from "./songInfo/songInfoSlice";

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    swapButton: swapButtonReducer,
    songInfo: songInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
