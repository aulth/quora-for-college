import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Modecontext from './context/Modecontext';
import swal from 'sweetalert';
import Footer from './Footer';
const Login = () => {
    const navigate = useNavigate();
    const {lightText, darkText, lightBg, darkBg, mode} = useContext(Modecontext);
    const [user, setUser] = useState({email:'', password:''});
    const handleOnChange = (e)=>{
        setUser({...user, [e.target.name]:e.target.value});
    }
    const handleOnLogin= async (e)=>{
        e.preventDefault();
        const host = 'https://quoracollegebackend.herokuapp.com/auth/login';
        const response = await fetch(host, {
            method:"POST",
            headers:{
                'content-type':'application/json',
            },
            body : JSON.stringify({email:user.email, password:user.password}),
        })
        var data = await response.json();
        data = JSON.stringify(data);
        data = JSON.parse(data);
        if(data.success==='true'){
            swal("Login!", "You have logged in succesful!", "success");
            localStorage.setItem('auth-token', data.authtoken);
            localStorage.setItem('username', data.user.name);
            localStorage.setItem('useravatar', data.user.avatar);
            localStorage.setItem('userid', data.user.userid);
            setUser({email:'', password:''});
            navigate('/');
        }else{
            swal("Login!", "Login failed", "error");

        }
    }
  return (
   <>
   <form style={mode==='light'?{background:lightBg, color:darkText}:{background:darkBg, color:lightText}} onSubmit={handleOnLogin} className="c-container c-login c-d-flex">
            <div style={{}} className="c-auth-box">
                <div className="c-auth-illustrator c-d-flex">
                    <i className="bi bi-person-circle"></i>
                </div>
                <h3 className="c-text-center">Login</h3>
                <div className="c-auth-input-box c-bs-bb c-d-flex c-fd-col">
                    <div className="c-auth-input-field c-bs-bb c-d-flex c-ai-center">
                        <i className="bi bi-person"></i>
                        <input type="email" style={mode==='light'?{color:darkText}:{color:lightText}} name='email' value={user.email} onChange={handleOnChange}  placeholder="Enter your email.." required/>
                    </div>
                    <div className="c-auth-input-field c-bs-bb c-d-flex c-ai-center">
                        <i className="bi bi-key"></i>
                        <input type="password" style={mode==='light'?{color:darkText}:{color:lightText}}  name='password' onChange={handleOnChange} value={user.password} placeholder="Password" required/>
                    </div>
                    <p  className="c-text-right c-my-5 c-forgot-password">Forgot password</p>
                    <button  style={mode==='light'?{color:darkText}:{color:lightText}} type='submit' className="c-bs-bb c-my-10 c-primary-btn">Login</button>
                    <button   style={mode==='light'?{color:darkText}:{color:lightText}} className="c-bs-bb c-my-10 c-secondary-btn">Create an account</button>
                </div>
            </div>
        </form>
        <Footer/>
   </>
  )
}

export default Login