import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: false,
  isSort: false,
  sortedNotes: [],
};

const UiSlice = createSlice({
  name: "UIFeature",
  initialState,
  reducers: {
    toggleDark(state, action) {
      console.log("Dark mode clicked");
      state.isDark = !state.isDark;
    },

    sortAlphabetically(state, action) {
      console.log("Sort reached", action.payload);

      state.sortedNotes = [...action.payload].sort((a, b) => {
        const first = a.taskName.toLowerCase();
        const second = b.taskName.toLowerCase();
        if (first < second) return -1;
        if (first > second) return 1;
        if (first == second) return 0;
      });
      console.log("sorted Array", action.payload);
    },
    sortCompleted(state, action) {},
    sortNewest(state, action) {},
    sortOldest(state, action) {},
  },
});

export const {
  toggleDark,
  sortNotes,
  sortAlphabetically,
  sortCompleted,
  sortNewest,
  sortOldest,
} = UiSlice.actions;

export default UiSlice.reducer;
