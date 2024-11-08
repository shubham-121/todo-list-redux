import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChecked: false,
  isdelete: false,
  edit: "",
  status: "",
  noteClick: false,
  notesArray: [
    {
      // id: Date.now(),
      id: "",
      taskname: "Book appointment",
      status: "",
      edit: "✏️",
      remove: "🗑️",
    },
  ],
};

const featureSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    toggleNoteClick(state) {
      state.noteClick = !state.noteClick;
    },

    createNote: {
      prepare(noteText, status) {
        return {
          payload: {
            id: Date.now(),
            taskname: noteText,
            status: status,
            edit: "✏️", //default value
            remove: "🗑️", //default value
          },
        };
      },

      reducer(state, action) {
        console.log("Before update:", action.payload);
        state.notesArray.push(action.payload);
        console.log("after update:", state);
      },
    },

    updateNoteStatus: {
      reducer(state, action) {
        console.log("Action reached and data", action.payload);

        const { id, newStatus } = action.payload;
        console.log(id, newStatus);

        const note = state.notesArray.find((note) => note.id === id);
        if (note) {
          console.log("note found updating status");
          note.status = newStatus;
        } else console.log("Not found");
      },
    },
    editNote(state, action) {},

    deleteNote(state, action) {},
  },
});

export const {
  createNote,
  editNote,
  deleteNote,
  toggleNoteClick,
  updateNoteStatus,
} = featureSlice.actions;

export default featureSlice.reducer;
