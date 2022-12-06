import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  songInfo: {
    name: string;
    artistName: string;
    songImg: string;
    albumName: string;
    yearOfProduction: string;
    writtenBy: string;
    producedBy: string;
  };
  //   artistName: string;
};

const initialState: InitialStateType = {
  songInfo: {
    name: "",
    artistName: "",
    songImg: "",
    albumName: "",
    yearOfProduction: "",
    writtenBy: "",
    producedBy: "",
  },
  //   artistName: "",
};

const songInfoSlice = createSlice({
  name: "songInfo",
  initialState,
  reducers: {
    setSongInfo(state, action) {
      state.songInfo = action.payload;
    },
  },
});

export const { setSongInfo } = songInfoSlice.actions;
export default songInfoSlice.reducer;
