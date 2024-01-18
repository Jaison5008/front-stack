import { useEffect } from 'react';
import Card from 'react-bootstrap/Card'; 
import{getallanswerThunk,previouspage,nextpage,page} from'../../slice/answerslice';
import {useDispatch,useSelector} from 'react-redux'
import { getquestionThunk } from '../../slice/questionSlice'; 
import Pagination from 'react-bootstrap/Pagination'
function Answer() {  
  const{answerList,cureentpage,perpage}=useSelector(state=>state.answer)  
  const{selectedquestionadd,selectedquestionadding}=useSelector(state=>state.question)   
  const dispatch=useDispatch()
  useEffect(()=>{   
      
           
    dispatch(getallanswerThunk(selectedquestionadd))  
  
 
   dispatch(getquestionThunk(selectedquestionadd))  
 
     
   },[dispatch]) 
    console.log(answerList) 
    console.log(selectedquestionadding)
     console.log(selectedquestionadd)
    
     
      const totalpage=Math.ceil((answerList.length/perpage)+1) 

const  lasttindex=(cureentpage*perpage)  
const firstindex=(lasttindex-perpage)

const AnswerList=  answerList.slice(firstindex,lasttindex)
const number=[...Array(totalpage).keys()].slice(1) 
  
   
    const currentpageaction=(item)=>{ 
       dispatch(page(item)) 
      } 
      const prevpageaction=(item)=>{ 
        if(item>0){
        dispatch(previouspage(item))  
        }
        else {
        const ss=dispatch(previouspage(1))  
        console.log(ss)
        }
      } 
      const nextpageaction=(item)=>{  
        if(item<=totalpage)
        dispatch(nextpage(item)) 
      else { 
        dispatch(nextpage(totalpage))
      }
      }
  return ( <>
   {/*<>{questionList?<> {questionList.map((item)=>
        <Card key={item._id}>
          <Card.Body>{item.question}</Card.Body>
        </Card>) } </>
        :<h4>error</h4>}</>*/}  
       
        <Card >
          <Card.Body><h1>{selectedquestionadding}</h1></Card.Body>
        </Card>
        
  <> {AnswerList.map((item)=>
    <Card key={item._id}> 
      <Card.Body>{item.answer}</Card.Body>
    </Card>) } </> 
    <Pagination> 
    <Pagination.Last onClick={prevpageaction}> prev</Pagination.Last>
     
      
     {number.map((item,index)=>
      <Pagination.Item key={index} onClick={()=>currentpageaction(item)}>{(item)}</Pagination.Item>)}
     <Pagination.First onClick={nextpageaction}>next</Pagination.First>
      </Pagination>
   </>);
}

export default Answer;