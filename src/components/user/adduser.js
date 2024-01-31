import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
//import { useSubmit } from 'react-router-dom';
import { addUserThunk } from '../../slice/userSlice';  
import '../question/question.css'
function Adduser() {   
 
const dispatch=useDispatch()
const [name,setName]=useState('');
const [email,setEmail]=useState('');
const [mobile,setMobile]=useState('');
const [password,setPassword]=useState(''); 
 
const [error,setError]=useState('');
const submiting=async(e)=>{   
  e.preventDefault()
  if(name&&email&&password&&mobile){
 const response= await dispatch(addUserThunk({name,email,password,mobile}));   
 
 if(response){ 
  setError('')
 }else{setError(error.response.data.error)}
  }else{ 
    setError('pls enter all fields')
  }
}
  return (<div className='box'>
    <Form> 
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)} />
        </Form.Group> 

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>  

      <Form.Group className="mb-3" controlId="formBasicMobile">
        <Form.Label>Mobile</Form.Label>
        <Form.Control type="text" placeholder="Mobile" value={mobile} onChange={(e)=>setMobile(e.target.value)} />
      </Form.Group> 

      
      <Button variant="primary" type="submit" onClick={submiting}>
        Submit
      </Button> 

      <h1>{error}</h1>
    </Form> </div>
  );
}

export default Adduser;