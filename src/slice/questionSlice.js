import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";  
import axios from 'axios' ;
const url= 'http://localhost:8000';
export const getallquestionthunk = createAsyncThunk('getall/questionThunk',async(_,{rejectWithValue})=>{

 try{  
    const response= await axios.get(`${url}`); 
    console.log(response.data.message)
    
    return response.data
    }catch(error){  
    return rejectWithValue({error:error.response.data.error})
 } }
)  
export const getquestionThunk = createAsyncThunk('get/questionThunk',async(questionid,{rejectWithValue})=>{

    try{  
       const response= await axios.get(`${url}/get/${questionid}`); 
       console.log(response.data.message)
       
       return response.data
       }catch(error){  
       return rejectWithValue({error:error.response.data.error})
    } }
   ) 
export const addallquestionthunk = createAsyncThunk('add/questionThunk',async(addquestion,{rejectWithValue})=>{

    try{   
        console.log(addquestion)
       const response= await axios.post(`${url}/post`,addquestion); 
       console.log(response.data.message)
       
       return response.data
       }catch(error){  
       return rejectWithValue({error:error.response.data.error})
    } }
   )



const initialState={ 
    questionList:[] ,
    isLoading:false, 
    isErorr:'' ,
    selectedquestionadding:'',
    cureentpage:'1' ,
    perpage:'5'
}


const questionSlice=createSlice({  
    name:'question',
    initialState,

reducers:{   
    selectedquestion:(state,action)=>{   
        console.log(action.payload)
        state.selectedquestionadd=action.payload

    } 
   
},
extraReducers:(builder)=>{
builder.addCase(getallquestionthunk.pending,(state,action)=>{ 
    state.isLoading=true; 
    })
 .addCase(getallquestionthunk.fulfilled,(state,action)=>{  
    
    state.isLoading=false; 
    state.questionList=action.payload.user;
    state.isErorr=''; 
})
.addCase(getallquestionthunk.rejected,(state,action)=>{   
    
    state.isLoading=false; 
    state.questionList=[];
    state.isErorr=action.payload.error;
}) 
.addCase(addallquestionthunk.pending,(state,action)=>{ 
    state.isLoading=true; 
    
})
.addCase(addallquestionthunk.fulfilled,(state,action)=>{  
    console.log(action)
    state.isLoading=false; 
    state.questionList.push(action.payload);
    state.isErorr=''; 
})
.addCase(addallquestionthunk.rejected,(state,action)=>{   
    console.log(action)
    state.isLoading=false; 
    state.questionList=[];
    state.isErorr=action.payload.error;
}) .addCase(getquestionThunk.pending,(state,action)=>{ 
    state.isLoading=true; 
    
})
.addCase(getquestionThunk.fulfilled,(state,action)=>{  
    console.log(action.payload.user.question)
    state.isLoading=false; 
    state.selectedquestionadding=action.payload.user.question;
    state.isErorr=''; 
})
.addCase(getquestionThunk.rejected,(state,action)=>{   
    console.log(action)
    state.isLoading=false; 
    state.selectedquestionadding={};
    state.isErorr=action.payload.error;
}) 
}})   
export const{selectedquestion,previouspage,nextpage,page}=questionSlice.actions;
export default questionSlice.reducer;