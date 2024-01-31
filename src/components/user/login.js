import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 

import React,{useState} from 'react';  

import{useDispatch} from "react-redux" 
import { useNavigate } from 'react-router-dom'; 

import{ loginThunk} from '../../slice/userSlice'; 
import "../question/question.css"
function Login() {  
  

const [email,setEmail]=useState(''); 
const[password,setPassword]=useState(''); 
//const [sucess,setSucess]=useState('')
const[errors,setError]=useState('');  
 
 console.log(email)
 console.log(password)
const dispatch=useDispatch()

const navi=useNavigate()




const login=async(e)=>{    
  e.preventDefault()
 const mm= await dispatch(loginThunk({email,password}))      
   
       if(mm.payload==="LOGIN SUCESS"){  
        
       
  navi('/')
 } 
 else  { 
  
  setError(mm.payload.error)
 }
 }
  
  const forget=()=>{ 
    navi('/forget')
  }
  
 
 return ( <div className='box'>{!errors? 
   <Form  style={{marginLeft:'10px',marginRight:'30px'}}> 
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="Enter email"  value={email} onChange={(e)=>setEmail(e.target.value)} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="Password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      
     

      
      <Button variant="primary" onClick={login}>
        Submit
      </Button>
    </Form>:<>
  
  <h1>{errors.error}</h1>   
  <Form  style={{marginLeft:'10px',marginRight:'30px'}}> 
  <Form.Group className="mb-3" controlId="formBasicEmail">
   <Form.Label>Email address</Form.Label>
   <Form.Control type="text" placeholder="Enter email"  value={email} onChange={(e)=>setEmail(e.target.value)} />
   
 </Form.Group>

 <Form.Group className="mb-3" controlId="formBasicPassword">
   <Form.Label>Password</Form.Label>
   <Form.Control type="text" placeholder="Password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
 </Form.Group>
 


 
 <Button variant="primary" onClick={login}>
   Submit
 </Button> 
 
</Form></>

  
  }  
  <br/>
 <Button onClick={forget}>forget password</Button><label>click the button if you forget your password</label>
  </div>
  
  );
}

export default Login;