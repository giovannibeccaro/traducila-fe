import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  isTranslation: boolean;
};

const initialState: InitialStateType = {
  isTranslation: true,
};

const swapButtonSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setIsTranslation(state, action) {
      state.isTranslation = action.payload;
    },
  },
});

export const { setIsTranslation } = swapButtonSlice.actions;
export default swapButtonSlice.reducer;
