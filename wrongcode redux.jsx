import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChecked: false,
  isdelete: false,
  isEdit: false,
  edit: "",
  status: "",
  noteClick: false,
  updatedNote: "",
  notesArray: [
    {
      id: Date.now(),
      taskname: "Book appointment",
      status: "pending", // default status
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
            status: status || "pending", // Set a default value for status
            edit: "✏️",
            remove: "🗑️",
          },
        };
      },
      reducer(state, action) {
        console.log("Adding note:", action.payload);
        state.notesArray.push(action.payload);
      },
    },

    updateNoteStatus: {
      prepare(id, newStatus) {
        return { payload: { id, newStatus } };
      },
      reducer(state, action) {
        const { id, newStatus } = action.payload;
        const note = state.notesArray.find((note) => note.id === id);
        if (note) {
          console.log("Updating status for note:", id);
          note.status = newStatus;
        } else {
          console.log("Note not found:", id);
        }
      },
    },

    toggleEditModal(state) {
      state.isEdit = !state.isEdit;
    },

    editNote: {
      prepare(id, query) {
        return { payload: { id, query } };
      },
      reducer(state, action) {
        const { id, query } = action.payload;
        const note = state.notesArray.find((note) => note.id === id);
        if (note) {
          console.log("Editing note:", id);
          note.taskname = query;
        } else {
          console.log("Note not found for editing:", id);
        }
      },
    },

    deleteNote(state, action) {
      const idToDelete = action.payload;
      state.notesArray = state.notesArray.filter(
        (note) => note.id !== idToDelete
      );
    },
  },
});

export const {
  createNote,
  editNote,
  deleteNote,
  toggleNoteClick,
  updateNoteStatus,
  toggleEditModal,
} = featureSlice.actions;

export default featureSlice.reducer;
