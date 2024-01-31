import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux' 
import Card from 'react-bootstrap/Card'  
import Button from 'react-bootstrap/Button'  
import Form from 'react-bootstrap/Form'
import{getallquestionthunk} from'../../slice/questionSlice'  
import{selectedquestion} from '../../slice/questionSlice'  
import'./question.css'

import { useNavigate } from 'react-router-dom'
function Getquestion (){    
 
  const navi=useNavigate()
const {questionList}=useSelector((state)=>state.question)   
//const {login}=useSelector(state=>state.user)  

const[error,setError]=useState(false) 
const [search,setSearch]=useState('') 

//

const dispatch=useDispatch() 
useEffect(()=>{  
  //const ss=questionList.reverse()
   dispatch(getallquestionthunk()); 
 
},[dispatch]) 
const addquestion=()=>{  
  if(localStorage.getItem('userid')){
  navi('/addquestion'); 
  }else{ 
    setError(true)
  }
} 

const addanswer=(item)=>{   
  if(localStorage.getItem('userid')){
  dispatch(selectedquestion(item));
  navi('/addanswer') 
  }else{ 
    setError(true)
  }
} 
const view=(item)=>{  
  if(localStorage.getItem('userid')){
  dispatch(selectedquestion(item)) 
  navi('/answer')}else{ 
    setError(true)
  }
}  



  return (<div className='box'>  {error?<h4>login / new user signup</h4>:''} 
           <Form className="d-flex" style={{margin:'5px'}}> 
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"value={search} onChange={(e)=>setSearch(e.target.value)} />
          {/*<Button variant="outline-success" onClick={()=>on()}>Search</Button>*/}
            </Form> 
            
   <div className='bu' style={{display:'flex',justifyContent:"flex-end",marginRight:'1rem'}} > 
  <Button  onClick={addquestion} style={{marginBottom:'5px'}} key={1}>askQuestion</Button></div> 
  


  <div >{questionList?questionList.filter((val)=>{
  if(search===('')){
       return val;
    }
       else if ((val.title.toLowerCase()).includes(search.toLowerCase())){  
    
      return val;
    }  
  
}) .reverse()
.map((item)=><Card className="bg" key={item._id} style={{marginBottom:'5px'}}> 
 
     <Card.Header>{item.title}</Card.Header>
    <Card.Body>
      <blockquote className="blockquote mb-0">
        <p>
          {item.question}
        </p> 
        
        <div style={{display:'flex',justifyContent:"space-evenly", alignItems:"center"}} >
       
        <h6>author :{item.nick}</h6>
       
       
        
          <Button style={{margin:'5px'}} onClick={()=>view(item._id)} > viewAnswer</Button> 
          <Button onClick={()=>addanswer(item._id)}>AddAnswer</Button> 
          
        </div> 

      </blockquote>
    </Card.Body>
  </Card>):<>''</>}</div>
 
  
    
  </div>)
}

export default Getquestion


