import { useEffect,useState } from 'react';
import Card from 'react-bootstrap/Card'; 
import{getallanswerThunk,previouspage,nextpage,page} from'../../slice/answerslice';
import {useDispatch,useSelector} from 'react-redux'
import { getquestionThunk } from '../../slice/questionSlice'; 
import Pagination from 'react-bootstrap/Pagination' 
import "../question/question.css"
function Answer() {  
  const{answerList,answer,cureentpage,perpage}=useSelector(state=>state.answer) 
    console.log(answerList) 
    console.log(answer)
     const[Ans,setAnswer]=useState([]) 
     const [que,setQue]=useState('')
    const{selectedquestionadd}=useSelector(state=>state.question)  
     console.log(selectedquestionadd)
      console.log(Ans)
      const totalpage=Math.ceil((Ans.length/perpage)+1) 

const  lasttindex=(cureentpage*perpage)  
const firstindex=(lasttindex-perpage)

const AnswerList=  Ans.slice(firstindex,lasttindex)
const number=[...Array(totalpage).keys()].slice(1) 
  
      const dispatch=useDispatch()
    useEffect(()=>{   
      console.log('hi')
        const ss=async()=>{ 
           
   const sss= await dispatch(getallanswerThunk(selectedquestionadd))  
   setAnswer(sss.payload.user)
  
  const que=  await dispatch(getquestionThunk(selectedquestionadd))  
  setQue(que.payload.user.question)
        };ss()
    },[]) 
    const currentpageaction=(item)=>{ 
      const num=  dispatch(page(item)) 
      } 
      const prevpageaction=(item)=>{ 
        if(item>0){
        dispatch(previouspage(item))  
        }
        else {
        dispatch(previouspage(item+1)) 
        }
      } 
      const nextpageaction=(item)=>{  
        if(item<=totalpage)
        dispatch(nextpage(item)) 
      else { 
        dispatch(nextpage(totalpage))
      }
      }
  return ( <div className='box'>
   {/*<>{questionList?<> {questionList.map((item)=>
        <Card key={item._id}>
          <Card.Body>{item.question}</Card.Body>
        </Card>) } </>
        :<h4>error</h4>}</>*/}  
        <Card >
          <Card.Body><h1>{que}</h1></Card.Body>
        </Card>
        
  <> {AnswerList.map((item)=>
    <Card key={item._id}> 
      <Card.Body>{item.answer}</Card.Body>
    </Card>) } </> 
    <Pagination>
      <Pagination.First onClick={nextpageaction}>next</Pagination.First>
      
     {number.map((item,index)=>
      <Pagination.Item key={index} onClick={()=>currentpageaction(item)}>{(item)}</Pagination.Item>)}
     <Pagination.Last onClick={prevpageaction}> prev</Pagination.Last>
      </Pagination>
   </div>);
}

export default Answer;