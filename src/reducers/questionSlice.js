import { createSlice } from "@reduxjs/toolkit";

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    allQuestions: [],
    filteredQuestions: [],
  },
  reducers: {
    setQuestions: (state, action) => {
      return { allQuestions: action.payload, filteredQuestions: action.payload };
    },
    filteredQuestions: (state, action) => {
      state.filteredQuestions = action.payload;
    },
  },
});

export const QuestionActions = questionSlice.actions;

export default questionSlice.reducer;
