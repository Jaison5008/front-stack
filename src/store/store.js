import { configureStore } from '@reduxjs/toolkit' ;
import userReducer from '../slice/userSlice';
import questionReducer from'../slice/questionSlice'; 
import answerReducer from '../slice/answerslice'
export const store=configureStore({  
    reducer:{  
        user:userReducer ,
        question:questionReducer, 
        answer:answerReducer
    }

}) 
