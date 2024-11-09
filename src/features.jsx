import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  isChecked: false,
  delete: false,
  isEditClicked: false,
  edit: "",
  status: "",
  notesArray: [],
  createNoteClick: false,
  editSubmit: false,
  updateNotif: false, //note update notification
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

    toggleEditModal(state) {
      state.isEditClicked = !state.isEditClicked;
    },

    editNote: {
      prepare(editNotetext, editStatus, uniqueId) {
        return {
          payload: { editNotetext, editStatus, uniqueId },
        };
      },
      reducer(state, action) {
        console.log("Edit data reached", action.payload);
        const { editNotetext, editStatus, uniqueId } = action.payload;
        const noteToUpdate = state.notesArray.find(
          (note) => note.id === uniqueId
        );
        if (noteToUpdate) console.log("Note found", uniqueId);
        else alert("Problem in editing the note!");

        noteToUpdate.taskName = editNotetext;
        noteToUpdate.status = editStatus;
        noteToUpdate.id = uniqueId;

        console.log("Update successfully the note data");
      },
    },
    updateNotification(state) {
      state.updateNotif = true;
    },

    clearUpdateNotification(state) {
      state.updateNotif = false;
    },

    deleteNote(state, action) {},
  },
});

export const {
  createNote,
  editNote,
  deleteNote,
  toggleCreateNote,
  toggleEditModal,
  updateNotification,
  clearUpdateNotification,
} = featureSlice.actions;

export default featureSlice.reducer;
