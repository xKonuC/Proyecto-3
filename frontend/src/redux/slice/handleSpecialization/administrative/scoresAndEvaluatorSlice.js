import { createSlice } from "@reduxjs/toolkit";

const scoresAndEvaluatorSlice = createSlice({
    name: "scoresAndEvaluator",
    initialState: {
        newItem: {
            thesisGradesID: 0,
            evaluator1ID: 0,
            evaluator2ID: 0,
            evaluator3ID: 0,
            evaluator4ID: 0,
            evaluator5ID: 0,
            grade1: 1.0,
            grade2: 1.0,
            grade3: 1.0,
            grade4: 1.0,
            grade5: 1.0,
        },
    },
    reducers: {
        setNewItem: (state, action) => {
            state.newItem = { ...state.newItem, ...action.payload };
        },
        clearNewItem: (state) => {
            state.newItem = {
                thesisGradesID: 0,
                evaluator1ID: 0,
                evaluator2ID: 0,
                evaluator3ID: 0,
                evaluator4ID: 0,
                evaluator5ID: 0,
                grade1: 1.0,
                grade2: 1.0,
                grade3: 1.0,
                grade4: 1.0,
                grade5: 1.0,
            };
        },
    },
});

export const { setItems, setNewItem, clearNewItem } = scoresAndEvaluatorSlice.actions;
export default scoresAndEvaluatorSlice.reducer;
