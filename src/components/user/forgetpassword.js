import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React,{useState} from 'react';  

import{useDispatch} from "react-redux" 
import { forgetThunk } from '../../slice/userSlice';

import "../question/question.css"
function Forget() {  
  

const [email,setEmail]=useState(''); 

const[errors,setError]=useState('');    

 const [message,setMessage]=useState('');
 
const dispatch=useDispatch()

console.log(message)




const login=async(e)=>{    
  e.preventDefault()
 const mm= await dispatch(forgetThunk({email}))      
   console.log(mm)
       if(mm.payload.message==="sucess"){  
        setError('')
       setMessage("reset your password threw your gmail ")
  
 } 
 else  { 
  
  setError('plese enter correct email') 
  setMessage("")
 }
 }
  
  
  
 
 return ( <div className='box'>{!errors?<><h2 key={message}>{message}</h2>
   <Form  style={{marginLeft:'10px',marginRight:'30px'}}> 
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="Enter email"  value={email} onChange={(e)=>setEmail(e.target.value)} />
        
      </Form.Group>

      
      
     

      
      <Button variant="primary" onClick={login}>
        Submit
      </Button> 
      
    </Form></>:<><h2 key={errors}>{errors}</h2>  
    <Form  style={{marginLeft:'10px',marginRight:'30px'}}> 
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="Enter email"  value={email} onChange={(e)=>setEmail(e.target.value)} />
        
      </Form.Group>

      
      
     

      
      <Button variant="primary" onClick={login}>
        Submit
      </Button> 
      
    </Form></>

    }
  
  
  


 
 
  
  </div>
  
  );
}

export default Forget;