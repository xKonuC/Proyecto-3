import { createSlice } from "@reduxjs/toolkit";

const bookChapterSlice = createSlice({
  name: "bookChapter",
  initialState: {
    items: [],
    filteredItems: null,
    newItem: {
      authors: "",
      leadAuthor: "",
      year: "",
      type: "",
      bookName: "",
      chapterName: "",
      place: "",
      editorial: "",
      status: "",
      accessURL: "",
    },
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setNewItem: (state, action) => {
      state.newItem = { ...state.newItem, ...action.payload };
    },
    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
    },
    clearFilteredItems: (state) => {
      state.filteredItems = null;
    },
    clearNewItem: (state) => {
      state.newItem = {
        authors: "",
        leadAuthor: "",
        year: "",
        type: "",
        bookName: "",
        chapterName: "",
        place: "",
        editorial: "",
        status: "",
        accessURL: "",
      };
    },
  },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = bookChapterSlice.actions;
export default bookChapterSlice.reducer;
