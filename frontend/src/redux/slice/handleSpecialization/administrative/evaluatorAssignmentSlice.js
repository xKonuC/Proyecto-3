import { createSlice } from "@reduxjs/toolkit";

const evaluatorAssignmentSlice = createSlice({
    name: "evaluatorAssignment",
    initialState: {
        items: [],
        filteredItems: null,
        newItem: {
            isUpdate: 0,
            evaluationTypeID: 0,
            studentHasSemesterID: 0,
            evaluationID: 0,
            stage: 0,
            evaluator1_userID: 0,
            evaluator2_userID: 0,
            evaluator1ID: 0,
            evaluator2ID: 0,
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
                isUpdate: 0,
                evaluationTypeID: 0,
                studentHasSemesterID: 0,
                evaluationID: 0,
                stage: 0,
                evaluator1_userID: 0,
                evaluator2_userID: 0,
                evaluator1ID: 0,
                evaluator2ID: 0,
            };
        },
    },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = evaluatorAssignmentSlice.actions;
export default evaluatorAssignmentSlice.reducer;
