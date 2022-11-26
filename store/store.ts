import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbar/navbarSlice";
import swapButtonReducer from "./swapButton/swapButtonSlice";

export const store = configureStore({
  reducer: { navbar: navbarReducer, swapButton: swapButtonReducer },
});

export type RootState = ReturnType<typeof store.getState>;
