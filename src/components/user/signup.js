import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addUserThunk } from '../../slice/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Signup() {  
    const dispatch=useDispatch()
const[name,setName ]=useState('')
const[email,setEmail ]=useState('')
const[password,setPassword ]=useState('') 
const[mobile,setMobile ]=useState('')  
const [error,setError]=useState('')   
console.log(name,email,password,mobile)
const navi=useNavigate()
const submiting=async(e)=>{   
  e.preventDefault()
    if(name&&email&&password&&mobile){
 const response= await dispatch (addUserThunk({name,email,password,mobile}))   
 console.log(response)
 if(response.payload.message) { 
  
    navi('/login') 
 }else{ 
    setError(response.payload.error)
 }
  
    }else{ 
    setError('enter all fields')
    }
}
  return (<><h5>{error}</h5>
    <Form> 
        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="Enter name"
         value={name} onChange={(e)=>setName(e.target.value)} />
       </Form.Group> 

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" 
        value={email} onChange={(e)=>setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        value={password} onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicMobile">
        <Form.Label>Mobile</Form.Label>
        <Form.Control type="mobil" placeholder="Enter mobile" 
        value={mobile} onChange={(e)=>setMobile(e.target.value)} />
        </Form.Group> 

      <Button variant="primary" type="submit" onClick={submiting}>
        Submit
      </Button>
    </Form></>
  );
}

export default Signup;