import Button from 'react-bootstrap/Button'; 
import Card from 'react-bootstrap/Card'; 
import { useEffect} from 'react'; 
import { useSelector } from 'react-redux'; 
import { useDispatch } from 'react-redux';
import { getUserThunkbyid } from '../../slice/userSlice';
import "../question/question.css"
function BasicExample() {  
    const {profile}=useSelector(state=>state.user)   
    console.log(profile)
    const dispatch=useDispatch()
    useEffect(()=>{ 
        const ss=async()=>{
         const _id=JSON.parse(localStorage.getItem('userid')) 
     await dispatch(getUserThunkbyid(_id))
        } 
       return ()=> ss()
        },[])
  return (<div className='box'>{profile? profile.map((item,index)=><Card key={index} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>{item.user.name}</Card.Title>
        <Card.Text>
          {item.user.email}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>):"loding" } </div> )
}

export default BasicExample;