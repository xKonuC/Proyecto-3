import { createSlice } from "@reduxjs/toolkit";

const evaluationStatusSlice = createSlice({
    name: "evaluationStatus",
    initialState: {
        newItem: {
            studentHasSemesterID: 0,
            evaluationStatusID: 0,
            evaluationTypeID: 0,
            semesterID: 0,
            specializationID: 0,
            studentID: 0,
            evaluationID: 0,
        },
    },
    reducers: {
        setNewItem: (state, action) => {
            state.newItem = { ...state.newItem, ...action.payload };
        },
        clearNewItem: (state) => {
            state.newItem = {
                studentHasSemesterID: 0,
                evaluationStatusID: 0,
                evaluationTypeID: 0,
                semesterID: 0,
                specializationID: 0,
                studentID: 0,
                evaluationID: 0,
            };
        },
    },
});

export const { setItems, setNewItem, clearNewItem } = evaluationStatusSlice.actions;
export default evaluationStatusSlice.reducer;
