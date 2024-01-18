import React from "react"; 
import{ BrowserRouter,Routes,Route} from 'react-router-dom';
import Adduser from '../src/components/user/adduser' ;
import Getquestion from'../src/components/question/getquestion';
import Login from "./components/user/login"; 
import Answer from './components/answer/getanswer'; 
import Addanswer from './components/answer/addanswer' ;
import Signup from './components/user/signup'; 
import Navbar from './components/navbar/nav' 
import AddQuestion from "./components/question/addquestion";
function App() {
  return (<BrowserRouter>
<Navbar/>
<Routes> 
<Route exact path='/' element={<Getquestion/>}/>
<Route exact path='/adduser' element={<Adduser/>}/>
<Route exact path='/login' element={<Login/>}/> 
<Route exact path='/addquestion' element={<AddQuestion/>}/> 
<Route exact path='/signup' element={<Signup/>}/>   
<Route exact path='/addanswer' element={<Addanswer/>}/>   
<Route exact path='/answer' element={<Answer/>}/>
 {/* <Route exact path='/signup' element={<Signup/>}/> <Route exact path='/viewanswer' element={<Answer/>}/>  */}
</Routes>


</BrowserRouter> 
    
  );
}

export default App;
