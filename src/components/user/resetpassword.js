import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React,{useState} from 'react';  
import { useNavigate } from 'react-router-dom';
import{useDispatch} from "react-redux" 
import { useParams } from 'react-router-dom';
import { resetThunk } from '../../slice/userSlice';
import "../question/question.css"
function Reset() {  
  

const [password,setPassword]=useState(''); 

const[errors,setError]=useState('');  
 const [message,setMessage]=useState('');
 const {_id,token}=useParams() 
 
const dispatch=useDispatch()

const navi=useNavigate()




const login=async(e)=>{    
  e.preventDefault()
 const mm= await dispatch(resetThunk({password,_id,token}))      
   if(mm){ 
  
   setMessage('sucess') 
   navi('/login')
   }else{ 
    setError('error')
   }
 }
  
  
  
 
 return ( <div className='box'><h4>{errors}</h4>
   <Form  style={{marginLeft:'10px',marginRight:'30px'}}> 
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="Enter password"  value={password} onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>

      <Button variant="primary" onClick={login}>
        Submit
      </Button> 
      
    </Form>
  
  
  


 
 
  
  </div>
  
  );
}

export default Reset;