import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChecked: false,
  delete: false,
  edit: "",
  status: "",
};

const featureSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    createNote(state, action) {},

    editNote(state, action) {},

    deleteNote(state, action) {},
  },
});

export const { createNote, editNote, deleteNote } = featureSlice.actions;

export default featureSlice.reducer;
