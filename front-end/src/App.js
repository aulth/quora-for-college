import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import User from './component/User';
import Poststate from './component/context/Poststate';
import Modestate from './component/context/Modestate';
import Topic from './component/Topic';
import About from './component/About';
import Placement from './component/Placement';
import Addplacement from './component/Addplacement';
import Contact from './component/Contact'
function App() {
  
  return (
    <>
    <Poststate>
    <Modestate>
    <Router>
    <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/user/:userid" element={<User/>} />
      <Route path="/post/topic/:topic" element={<Topic/>} />
      <Route path="/placement" element={<Placement/>} />
      <Route path="/add-placement" element={<Addplacement/>} />
      <Route path='/contact' element={<Contact/>}/>

    </Routes>
    </Router>
    </Modestate>
    </Poststate>
    </>
  );
}

export default App;
 