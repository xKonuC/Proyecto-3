import { combineReducers } from '@reduxjs/toolkit';
import messageSlice from '../../slice/utils/messageSlice';

const utilsReducer = combineReducers({
    message : messageSlice,
});

export default utilsReducer;
