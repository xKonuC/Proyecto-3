import { createSlice } from "@reduxjs/toolkit";

const rubricSlice = createSlice({
    name: "rubric",
    initialState: {
        items: [],
        info: {},
        itemsCopy: [],
        newItem: {
            rubricID: 0,
            evaluationID: 0,
            evaluationTypeID: 0,
            name: "",
            description: "",
            comment: "",
            templateID: null,
            previousTemplateID: null,
            grade1: 1.0,
            evaluationStatusID: 0,
            isUpdateRubricID: false,
            evaluator1ID: 0,
            evaluator2ID: 0,
            evaluator3ID: 0,
            evaluator4ID: 0,
        },
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        setInfo: (state, action) => {
            state.info = action.payload;
        },
        setItemsCopy: (state, action) => {
            state.itemsCopy = action.payload;
        },
        setNewItem: (state, action) => {
            state.newItem = { ...state.newItem, ...action.payload };
        },
        clearNewItem: (state) => {
            state.newItem = {
                rubricID: 0,
                evaluationID: 0,
                evaluationTypeID: 0,
                name: "",
                description: "",
                comment: "",
                templateID: null,
                previousTemplateID: null,
                grade1: 1.0,
                evaluationStatusID: 0,
                isUpdateRubricID: false,
                evaluator1ID: 0,
                evaluator2ID: 0,
                evaluator3ID: 0,
                evaluator4ID: 0,
            };
        },
    },
});

export const { setItems, setInfo, setItemsCopy, setNewItem, clearNewItem } = rubricSlice.actions;
export default rubricSlice.reducer;
