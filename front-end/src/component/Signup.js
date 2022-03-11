import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {IKContext, IKUpload } from 'imagekitio-react';
import Spinner from './Spinner';
import Modecontext from './context/Modecontext';
const publicKey = "public_92LmaGdulaemcYl7X2YaL95QGnU=";
const urlEndpoint = "https://ik.imagekit.io/lgju5gzfspd/";
const authenticationEndpoint = "https://quoracollegebackend.herokuapp.com/imagekit";
const Signup = () => {
    const {lightText,lightBg, darkText, darkBg, mode } = useContext(Modecontext)
    const navigate = useNavigate();
    const [spin, setSpin] = useState(false);
    const [user, setUser] = useState({name:'', email:'', password:'',college:'',course:'', phone:'',batch:'2010'});
    const handleOnChange = (e)=>{
        setUser({...user, [e.target.name]:e.target.value});
    }
    const onError = (err) => {
        console.log(err);
      };
    var avatar;
    const onSuccess = async (res) => {
    avatar = res.url;
    }
    const handleOnSignup = (e)=>{
        e.preventDefault();
        if(user.name && user.email && user.password && user.college && user.course && user.phone && user.batch){
            setSpin(true);
            const isAvatar = async ()=>{
                if(!avatar){
                    setTimeout(()=>{
                        isAvatar();
                        console.log('waiting');
                    }, 500)
                }else{
                    const host = 'https://quoracollegebackend.herokuapp.com/auth/signup';
                    const response = await fetch(host, {
                        method:"POST",
                        headers:{
                            'content-type':'application/json',
                        },
                        body:JSON.stringify({name:user.name, email:user.email, password:user.password, college:user.college, course:user.course, phone:user.phone, batch:user.batch, avatar:avatar?avatar:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'})
                    })
                    var data = await response.json();
                    data = JSON.stringify(data);
                    data = JSON.parse(data);
                    console.log(data);
                    if(data.success===true){
                        setSpin(false);
                        alert("signup success");
                        setUser({name:'', email:'', password:'',college:'',course:'', phone:'',batch:'2010', avatar:''});
                        localStorage.setItem('auth-token', data.authtoken);
                        localStorage.setItem('username', data.username);
                        localStorage.setItem('useravatar', data.useravatar);
                        localStorage.setItem('userid', data.userid);
                        navigate('/');
                    }else{
                        alert("sign up failed")
                    }
                }
            }
            isAvatar();
        }else{
            alert("Please fill all the fields");
        }
    }
  return (
      <>
      <div style={mode==='light'?{background:lightBg, color:darkText}:{background:darkBg, color:lightText}} className="c-container c-signup c-d-flex">
            <div className="c-auth-box">
                <div className="c-auth-illustrator c-d-flex">
                    <i className="bi bi-person-plus-fill"></i>
                    
                        {/* <img style={{width: "60px",height:"60px",borderRadius: "50%"}} src="https://i.ibb.co/HgFyXyw/profile-usman.jpg" alt=""/> */}
                </div>
                <h3 className="c-text-center">Sign up</h3>
                <form onSubmit={handleOnSignup} className="c-auth-input-box c-bs-bb c-d-flex c-fd-col">
                    <div className="c-auth-input-field c-bs-bb c-d-flex c-ai-center">
                        <i className="bi bi-person"></i>
                        <input type="text" style={mode==='light'?{color:darkText}:{color:lightText}}  name='name' value={user.name} onChange={handleOnChange} placeholder="Enter your name.." required/>
                    </div>
                    <div className="c-auth-input-field c-bs-bb c-d-flex c-ai-center">
                        <i className="bi bi-envelope"></i>
                        <input type="email" style={mode==='light'?{color:darkText}:{color:lightText}}  name='email' value={user.email}  onChange={handleOnChange}  placeholder="Enter your email.." required/>
                    </div>
                    <div className="c-auth-input-field c-bs-bb c-d-flex c-ai-center">
                        <i className="bi bi-key"></i>
                        <input type="password" style={mode==='light'?{color:darkText}:{color:lightText}}  name='password'  value={user.password}  onChange={handleOnChange}  placeholder="Password" required/>
                    </div>
                    <div className="c-auth-input-field c-bs-bb c-d-flex c-ai-center">
                        <i className="bi bi-building"></i>
                        <input type="text" style={mode==='light'?{color:darkText}:{color:lightText}}  name='college' onChange={handleOnChange}   value={user.college}  placeholder="Enter your college name.." required/>
                    </div>
                    <div className="c-auth-input-field c-bs-bb c-d-flex c-ai-center">
                        <i className="bi bi-book"></i>
                        <input type="text" style={mode==='light'?{color:darkText}:{color:lightText}}  name="course" onChange={handleOnChange}  value={user.course}  placeholder="Course" required/>
                    </div>
                    <div className="c-auth-input-field c-bs-bb c-d-flex c-ai-center">
                        <i className="bi bi-telephone"></i>
                        <input type="tel" style={mode==='light'?{color:darkText}:{color:lightText}}  name='phone' onChange={handleOnChange}  value={user.phone}  placeholder="Phone" required/>
                    </div>
                    <div className="c-auth-input-field c-bs-bb c-d-flex c-ai-center">
                        <i className="bi bi-calendar"></i>
                        <select className="c-batch" style={mode==='light'?{color:darkText, background:lightBg}:{color:lightText}}  name="batch" onChange={handleOnChange}  id="batch">
                            <option value="2010" style={mode==='light'?{color:darkText, background:lightBg}:{color:lightText,background:darkBg}} >Batch 2010</option>
                            <option value="2011" style={mode==='light'?{color:darkText, background:lightBg}:{color:lightText,background:darkBg}} >Batch 2011</option>
                            <option value="2012" style={mode==='light'?{color:darkText, background:lightBg}:{color:lightText,background:darkBg}} >Batch 2012</option>
                            <option value="2013" style={mode==='light'?{color:darkText, background:lightBg}:{color:lightText,background:darkBg}} >Batch 2013</option>
                            <option value="2014" style={mode==='light'?{color:darkText, background:lightBg}:{color:lightText,background:darkBg}} >Batch 2014</option>
                            <option value="2015" style={mode==='light'?{color:darkText, background:lightBg}:{color:lightText,background:darkBg}} >Batch 2015</option>
                            <option value="2016" style={mode==='light'?{color:darkText, background:lightBg}:{color:lightText,background:darkBg}} >Batch 2016</option>
                            <option value="2017" style={mode==='light'?{color:darkText, background:lightBg}:{color:lightText,background:darkBg}} >Batch 2017</option>
                            <option value="2018" style={mode==='light'?{color:darkText, background:lightBg}:{color:lightText,background:darkBg}} >Batch 2018</option>
                            <option value="2019" style={mode==='light'?{color:darkText, background:lightBg}:{color:lightText,background:darkBg}} >Batch 2019</option>
                            <option value="2020" style={mode==='light'?{color:darkText, background:lightBg}:{color:lightText,background:darkBg}} >Batch 2020</option>
                            <option value="2021" style={mode==='light'?{color:darkText, background:lightBg}:{color:lightText,background:darkBg}} >Batch 2021</option>
                        </select>
                        {/* <!-- <input type="text" placeholder="Batch 2020-24"> --> */}
                    </div>
                    <div className="c-auth-input-field c-bs-bb c-d-flex c-ai-center">
                    <i className="bi bi-card-image"></i>
                    <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint}>
                        <IKUpload onSuccess={onSuccess} onError={onError} />
                    </IKContext>
                    </div>
                    {spin && <Spinner/>}
                    {!spin && <button style={mode==='light'?{color:darkText}:{color:lightText}}  className="c-bs-bb c-my-10 c-primary-btn" type='submit' >Sign up</button>}
                    <button  style={mode==='light'?{color:darkText}:{color:lightText}} className="c-bs-bb c-my-10 c-secondary-btn">Login</button>
                </form>
            </div>
        </div>
      </>
  )
}

export default Signup