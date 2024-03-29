import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";  
import axios from 'axios' ; 
//const url= 'http://localhost:8000'; 

const url= 'https://stackjaison-back.onrender.com';

export const addallanswerThunk= createAsyncThunk('add/answerThunk',async(addanswer,{rejectWithValue})=>{

    try{   
        
       const response= await axios.post(`${url}/answer/post`,addanswer); 
       console.log(response.data.message)
       
       return response.data
       }catch(error){  
       return rejectWithValue({error:error.response.data.error})
    } }
   ) 
   export const voteThunk= createAsyncThunk('edit/answerThunk',async(vote,{rejectWithValue})=>{

    try{    
       // console.log(vote)
         const votes=  (vote.vote)
       const response= await axios.patch(`${url}/answer/${vote._id}`,{vote:votes ,voteid:vote.userid}); 
       console.log(response.data)
       
       return response.data
       }catch(error){  
       return rejectWithValue({error:error.response.data.error})
    } }
   )

   export const getallanswerThunk= createAsyncThunk('get/answerThunk',async(question,{rejectWithValue})=>{

    try{   
     
       const response= await axios.get(`${url}/answer/get/${question}`); 
       
       return response.data
       }catch(error){  
       return rejectWithValue({error:error.response.data.error})
    } }
   )


const initialState={ 
    answerList:[] , 
    answer:[],
    isLoading:false, 
    isErorr:'' ,
    cureentpage:'1' ,
    perpage:'6' , 
    vote:[]
    
}


const answerSlice=createSlice({  
    name:'answer',
    initialState,

reducers:{   
    previouspage:(state)=>{ 
        state.cureentpage =state.cureentpage-1
        },
        nextpage:(state)=>{ 
            state.cureentpage=state.cureentpage+1
            }, 
            page:(state,action)=>{ 
                state.cureentpage=action.payload
            } , 
            votecount:(state,action)=>{ 
                state.vote.push(action.payload)
            }
          
},
extraReducers:(builder)=>{
builder

.addCase(addallanswerThunk.pending,(state,action)=>{ 
    state.isLoading=true; 
    
})
.addCase(addallanswerThunk.fulfilled,(state,action)=>{  
    console.log(action)
    state.isLoading=false; 
    state.answer.push(action.payload);
    state.isErorr=''; 
})
.addCase(addallanswerThunk.rejected,(state,action)=>{   
    console.log(action)
    state.isLoading=false; 
    state.answer=[];
    state.isErorr=action.payload.error;
}) 
.addCase(getallanswerThunk.pending,(state,action)=>{ 
    state.isLoading=true; 
    
})
.addCase(getallanswerThunk.fulfilled,(state,action)=>{  
    console.log(action)
    state.isLoading=false; 
    state.answerList=action.payload.user;
    state.isErorr=''; 
})
.addCase(getallanswerThunk.rejected,(state,action)=>{   
    console.log(action)
    state.isLoading=false; 
    state.answerList=[];
    state.isErorr=action.payload.error;
}) 



}


})   
export const{previouspage,nextpage,page,votecount}=answerSlice.actions
export default answerSlice.reducer;