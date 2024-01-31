import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";   

import axios from 'axios' ;
//import { token } from "../../../back/common/bcrypt";
//const url= 'http://localhost:8000'; 
const url= 'https://stackjaison-back.onrender.com';
export const addUserThunk= createAsyncThunk('post/addUserThunk',async(add,{rejectWithValue})=>{

 try{  
    const response= await axios.post(`${url}/users/post`,add); 
    console.log(response)
    
    return response.data
    }catch(error){  
    return rejectWithValue({error:error.response.data.error})
 } }
)   
export const resetThunk= createAsyncThunk('reset/resetThunk',async(add,{rejectWithValue})=>{
   // console.log(add) 
   
     try{   
       // console.log(await axios.post(`${url}/users/${add._id}/${add.token}}`,add.password))
        const response= await axios.patch(`${url}/users/${add._id}/${add.token}}`,{password:add.password}); 
        
        console.log(response.data)
        return response.data
        }catch(error){  
        return rejectWithValue({error:error.response.data.error})
     } }
    )  
export const forgetThunk= createAsyncThunk('forget/forgetThunk',async(add,{rejectWithValue})=>{
    
     try{  
        const response= await axios.post(`${url}/users/reset`,add); 
        
        
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
   export const getUserThunkbyid= createAsyncThunk('getbyid/addallUserThunk',async(_id,{rejectWithValue})=>{

    try{  
       const response= await axios.get(`${url}/users/get/${_id}`); 
       
       
       return response.data
       }catch(error){  
       return rejectWithValue({error:error.response.data.error})
    } }
   )
export const loginThunk= createAsyncThunk('login/loginUserThunk',async(login,{rejectWithValue})=>{
    
    try{  
       const response= await axios.post(`${url}/users/login`,login);   
       
       
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
    profile:[],
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
}) 
.addCase(forgetThunk.pending,(state,action)=>{ 
    state.isLoading=true; 
    
})
.addCase(forgetThunk.fulfilled,(state,action)=>{  
    
    state.isLoading=false; 
    
    state.isErorr=''; 
})
.addCase(forgetThunk.rejected,(state,action)=>{   
    
    state.isLoading=false; 
    
    state.isErorr=action.payload.error;
})   

.addCase(resetThunk.pending,(state,action)=>{ 
    state.isLoading=true; 
    
})
.addCase(resetThunk.fulfilled,(state,action)=>{  
    
    state.isLoading=false; 
    
    state.isErorr=''; 
})
.addCase(resetThunk.rejected,(state,action)=>{   
    
    state.isLoading=false; 
    
    state.isErorr=action.payload.error;
})   
.addCase(getUserThunkbyid.pending,(state,action)=>{ 
    state.isLoading=true; 
    
})
.addCase(getUserThunkbyid.fulfilled,(state,action)=>{  
    
    state.isLoading=false; 
    state.profile.push(action.payload);
    state.isErorr=''; 
})
.addCase(getUserThunkbyid.rejected,(state,action)=>{   
    
    state.isLoading=false; 
    state.profile='';
    state.isErorr=action.payload.error;
})  
}

})   

export default userSlice.reducer;