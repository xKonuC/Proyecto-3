// messageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    type: null,
    content: null,
  },
  reducers: {
    setWaitingMessage: (state, action) => {
      return {
        ...state,
        type: 'waiting',
        content: action.payload,
      };
    },
    setErrorMessage: (state, action) => {
      return {
        ...state,
        type: 'error',
        content: action.payload,
      };
    },
    setVerificationMessage: (state, action) => {
      return {
        ...state,
        type: 'verification',
        content: action.payload,
      };
    },
    clearMessage: (state) => {
      return {
        ...state,
        type: null,
        content: null,
      };
    },
  },
});

export const {
  setWaitingMessage,
  setErrorMessage,
  setVerificationMessage,
  clearMessage,
} = messageSlice.actions;
export default messageSlice.reducer;
