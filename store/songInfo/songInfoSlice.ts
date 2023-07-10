import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  songInfo: {
    title: string;
    artistName: string;
    songImg: string;
    albumName: string;
    releaseDate: string;
    writtenBy: string;
    producedBy: string;
  };
  //   artistName: string;
};

const initialState: InitialStateType = {
  songInfo: {
    title: "",
    artistName: "",
    songImg: "",
    albumName: "",
    releaseDate: "",
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
