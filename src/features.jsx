import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChecked: false,
  delete: false,
  isEdit: false,
  edit: "",
  status: "",
  notesArray: [],
  createNoteClick: false,
};

// {
//     key: 1,
//     taskname: "Eat breakfast",
//     status: "pending",
//     edit: "✏️",
//     remove: "🗑️",
//   },

const featureSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    toggleCreateNote(state) {
      state.createNoteClick = !state.createNoteClick;
    },

    createNote: {
      prepare(noteText, noteStatus) {
        return {
          payload: { noteText, noteStatus },
        };
      },

      reducer(state, action) {
        const noteText = action.payload.noteText;
        const noteStatus = action.payload.noteStatus;
        console.log("Before update, note array->", state.notesArray);

        state.notesArray.push({
          id: Date.now(),
          taskName: noteText,
          status: noteStatus,
          edit: "✏️",
          remove: "🗑️",
        });

        // console.log("New note data:", noteText,noteStatus);
        console.log("After update, note array->", state.notesArray);
      },
    },

    editNote(state, action) {},

    deleteNote(state, action) {},
  },
});

export const { createNote, editNote, deleteNote, toggleCreateNote } =
  featureSlice.actions;

export default featureSlice.reducer;
