import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";  
import axios from 'axios' ;
const url= 'http://localhost:8000';
export const addUserThunk= createAsyncThunk('post/addUserThunk',async(add,{rejectWithValue})=>{
console.log(add)
 try{  
    const response= await axios.post(`${url}/users/post`,add); 
    
    
    return response.data
    }catch(error){  
    return rejectWithValue({error:error.response.data.error})
 } }
) 
export const getUserThunk= createAsyncThunk('get/addallUserThunk',async(_,{rejectWithValue})=>{

    try{  
       const response= await axios.get(`${url}/users/get`); 
       
       
       return response.data
       }catch(error){  
       return rejectWithValue({error:error.response.data.error})
    } }
   )
export const loginThunk= createAsyncThunk('login/loginUserThunk',async(login,{rejectWithValue})=>{
    
    try{  
       const response= await axios.post(`${url}/users/login`,login);   
       console.log(response)
       
        localStorage.setItem ("userid",JSON.stringify(response.data.users._id))  
        localStorage.setItem("token",JSON.stringify(response.data.tokens))
        localStorage.setItem('nick', JSON.stringify(response.data.users.name))
       return response.data.message
       }catch(error){    
      
       return rejectWithValue({error:error.response.data.error})
    } }
   )


const initialState={  
    getuserList:[],
    userList:[] , 
    login:{},
    isLoading:false, 
    isErorr:'',
    
}

const userSlice=createSlice({  
    name:'user',
    initialState,

reducers:{   
    
   
},
extraReducers:(builder)=>{
builder
.addCase(addUserThunk.pending,(state,action)=>{ 
    state.isLoading=true; 
    
})
.addCase(addUserThunk.fulfilled,(state,action)=>{  
    
    state.isLoading=false; 
    state.userList.push(action.payload);
    state.isErorr=''; 
})
.addCase(addUserThunk.rejected,(state,action)=>{   
    
    state.isLoading=false; 
    state.userList=[];
    state.isErorr=action.payload.error;
})  

  .addCase(loginThunk.pending,(state)=>{ 
    state.isLoading=true; 
    
})
.addCase(loginThunk.fulfilled,(state,action)=>{  
    
    state.isLoading=false; 
    state.login=action.payload
    state.isErorr=''; 
})
.addCase(loginThunk.rejected,(state,action)=>{   
    
    state.isLoading=false; 
    state.login={};
    state.isErorr=action.payload.error;
}) 
.addCase(getUserThunk.pending,(state,action)=>{ 
    state.isLoading=true; 
    
})
.addCase(getUserThunk.fulfilled,(state,action)=>{  
    
    state.isLoading=false; 
    state.getuserList=action.payload;
    state.isErorr=''; 
})
.addCase(getUserThunk.rejected,(state,action)=>{   
    
    state.isLoading=false; 
    state.getuserList=[];
    state.isErorr=action.payload.error;
})  }

})   

export default userSlice.reducer;