import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useSelector } from 'react-redux';
import { addallanswerThunk} from '../../slice/answerslice';
import { useDispatch } from 'react-redux'; 
import{useNavigate} from 'react-router-dom' 
import "../question/question.css"
function Addanswer() {  
const [answer,setAnswer]=useState('');  
const [questionid,setQuestionid]=useState(''); 
const[nick,setNick]=useState('');
const[userid,setUserid]=useState(''); 
const[error,setError]=useState('') 
const dispatch=useDispatch()
const{selectedquestionadd}=useSelector(state=>state.question)  
const navi=useNavigate();

console.log(selectedquestionadd)
useEffect(( )=>{ 
    setUserid(JSON.parse(localStorage.getItem('userid'))); 
    setNick(JSON.parse(localStorage.getItem('nick')))
    setQuestionid(selectedquestionadd);
    

},[])
 const submit=async()=>{   
    if(answer&&userid&&questionid){
  const response= await dispatch(addallanswerThunk({answer,userid,questionid,nick}))     
  //await dispatch(getallanswerThunk(questionid)) 
  console.log(response)
  navi('/answer')
    console.log(response)
  if(response){ 
   console.log(response.payload.message)
  }else{  
    setError(error.response)

  }}else{ 
    setError('error')
  }

 }
  return (<div className='box'>
    <Form>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3} value={answer} onChange={(e)=>setAnswer(e.target.value)} />
      </Form.Group> 
      <Button onClick={submit}> submit</Button>
    </Form></div>
  );
}

export default Addanswer;