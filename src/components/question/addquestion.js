import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux'; 
import { addallquestionthunk } from '../../slice/questionSlice'; 
import { useNavigate } from 'react-router-dom';
function AddQuestion() { 
    const [question,setQuestion]=useState(''); 
    const[title,setTitle]=useState('')
   const [userid,setUserid]=useState('');    
   const [nick,setNick]=useState('');
   const[error,setError]=useState('')  
   console.log(question) 
   console.log(title) 
   console.log(userid)
   const navi=useNavigate()
   const dispatch=useDispatch()
  useEffect(()=>{ 
    setUserid(JSON.parse(localStorage.getItem('userid')))  
    setNick(JSON.parse(localStorage.getItem('nick'))) 
  },[userid]) 
  const submiting=(e)=>{  
    e.preventDefault()
    if(title&&userid&&question&&nick){
   const questions= dispatch(addallquestionthunk({title,userid,question,nick}))   
   console.log(questions)
   if(questions){ 
    navi('/');
   }else{ 
    console.log(error.question)
   }
    }
  else{  
    setError('login')

  }
  }
  return (<>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="question title" value={title} onChange={(e)=>setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Type Question</Form.Label>
        <Form.Control as="textarea" rows={3} value={question} onChange={(e)=>setQuestion(e.target.value)} />
      </Form.Group> 

      <Button variant="primary" type="submit" onClick={submiting}>
        Submit
      </Button> 
    </Form> 
    <h1>{error}</h1> 
    </>
  );
}

export default AddQuestion;