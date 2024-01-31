import { useEffect } from 'react';
import Card from 'react-bootstrap/Card'; 
import{getallanswerThunk,previouspage,nextpage,page} from'../../slice/answerslice';
import {useDispatch,useSelector} from 'react-redux'
import { getquestionThunk } from '../../slice/questionSlice';  
import { voteThunk } from '../../slice/answerslice';
import Pagination from 'react-bootstrap/Pagination'  
import Button from 'react-bootstrap/Button'
import "../question/question.css"
function Answer() {  
  const{answerList,cureentpage,perpage}=useSelector(state=>state.answer)    
  //const [error, setError]=useState('');
  //console.log(answerList)
  const{selectedquestionadd,selectedquestionadding}=useSelector(state=>state.question)  
  
   console.log(selectedquestionadding)
   
  const dispatch=useDispatch()
  useEffect(()=>{   
      
           
    dispatch(getallanswerThunk(selectedquestionadd))  
  
 
   dispatch(getquestionThunk(selectedquestionadd))  
 
     
   },[dispatch]) 
   
     
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
      
      const Sumvote=async (a1,a2,a4)=>{     
        const userid= JSON.parse(localStorage.getItem('userid')) 
       // const ss=[...a4,...vote.voteid]
       //const ss=answerList.voteid.map((item)=>item===a2)   
      // const s=answerList.map((item)=>item.voteid.find((item)=>console.log(item),item===a3)) 
     const mm=a4.filter((item)=>item===userid) 
    
           
    
        if(mm.length===0){
        const ite=a1+1;
       
        const _id=a2; 
        
        
       const ans=await dispatch(voteThunk({vote:ite,_id:_id,userid:userid}))  
       console.log(ans)
      await  dispatch(getallanswerThunk(selectedquestionadd))  
         
    }else{ 
     // setError("already voted")
    }} 
    //useEffect(()=>{Sumvote()},[dispatch])
  return ( <><div className='box'>
   {/*<>{questionList?<> {questionList.map((item)=>
        <Card key={item._id}>
          <Card.Body>{item.question}</Card.Body>
        </Card>) } </>
        :<h4>error</h4>}</>*/}  <div>   
          
          <Card className="bg" style={{backgroundColor:'beige', padding:"10px",marginBottom:"10px"}}>
      <Card.Header>{selectedquestionadding.title}</Card.Header>
      <Card.Body>
        <Card.Title>{selectedquestionadding.question}</Card.Title>
        <Card.Text>author:
        {selectedquestionadding.nick}
        </Card.Text>
       
      </Card.Body>
    </Card>
    </div>
        
        
  < div className='boxanswer'> {AnswerList.map((item)=>
    <Card style={{ width: '18rem',backgroundColor:"gray"}} key={item._id}> 
      <Card.Body><h6>{item.answer}</h6></Card.Body>   
                     
      <Card.Body><h3>{item.vote}</h3></Card.Body>  
      <Card.Body><h6> ans by:{item.nick}</h6></Card.Body>

      <Button onClick={()=>Sumvote(item.vote,item._id,item.voteid)} > vote</Button>
    </Card>) } </div>   </div>
    <div className='page' style={{display:'flex',justifyContent:"end",alignItems:"flex-end"}}>
    <Pagination style={{display:'flex',justifyContent:'flex-end'}}> 
    <Pagination.Last onClick={prevpageaction}> prev</Pagination.Last>
     
      
     {number.map((item,index)=>
      <Pagination.Item key={index} onClick={()=>currentpageaction(item)}>{(item)}</Pagination.Item>)}
     <Pagination.First onClick={nextpageaction}>next</Pagination.First>
      </Pagination> 
      </div>
      </>);
}

export default Answer;