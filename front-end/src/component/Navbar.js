import React ,{useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Modecontext from './context/Modecontext';
import Postcontext from './context/Postcontext';
const Navbar = () => {
    const navigate = useNavigate();
    const {getSearchPost} = useContext(Postcontext);
    const handleOnLogout=()=>{
        localStorage.removeItem('auth-token');
        localStorage.removeItem('username');
        localStorage.removeItem('useravatar');
        navigate('/');
    }
    const {darkText, darkBg, lightText, lightBg, mode, modeSwitch} = useContext(Modecontext);
    const showSearchBar = ()=>{
        document.getElementById('c-search-bar').style.display = document.getElementById('c-search-bar').style.display === 'none' ? 'block' : 'none';
    }
    const search = (e)=>{
        e.preventDefault();
        const query = document.getElementById('c-search-input').value;
        getSearchPost(query);
    }
  return (
    <>
    <div style={mode==='light'?{backgroundColor:lightBg, color:darkText}:{backgroundColor:darkBg, color:lightText}} className="c-container c-header c-d-flex c-bs-bb c-ai-center">
            <div className="c-logo c-h-45 c-ai-center c-d-flex c-bs-bb">
                <Link style={mode==='light'?{color:darkText, textDecoration:'none'}:{color:lightText,textDecoration:'none'}} to="/" >CollegeQuora </Link>
            </div>
            <form onSubmit={search} id="c-search-bar" className="c-search-bar c-d-flex ">
                <input style={mode==='light'?{backgroundColor:lightBg, color:darkText}:{backgroundColor:darkBg, color:lightText}}  id="c-search-input" name='query' className="c-h-45 c-bs-bb" type="search" placeholder="Search here"/>
                <button type="submit" value="" style={{border:'none',marginLeft:'2px'}} className='bi bi-search' name="" id="" ></button>
            </form>
            <div className="c-navigation c-h-45 c-d-flex">
                <ul  className="c-d-flex c-navigation-list c-bs-bb c-ai-center">
                    <i onClick={showSearchBar}  className="bi bi-search c-mx-2"></i>
                    {/* <i class="bi bi-moon-fill"></i> */}
                    <i className={`bi c-dark-light-icon ${mode==='light'?'bi-moon':'bi-brightness-high-fill'} c-mx-5`} onClick={modeSwitch} ></i>
                    {/* <i className={`bi ${mode==='light'?'bi-brightness-high':'bi-brightness-high-fill'} c-mx-5`} onClick={modeSwitch} ></i> */}
                    {localStorage.getItem('auth-token')?
                    <>
                    <li className="c-home-username"> {localStorage.getItem('username')} </li>
                    <li><Link to={`/user/${localStorage.getItem('userid')}`}><img className="c-logged-in-user-avatar" src={localStorage.getItem('useravatar')} alt="user"/></Link></li>
                    <li style={{backgroundColor: "#ffb166",color:'white',padding: "5px",borderRadius: "5px", cursor:"pointer"}} onClick={handleOnLogout}>Logout</li>
                    </>:
                    <>
                    <li style={{backgroundColor: "transparent",padding: "5px",borderRadius: "5px",border: "1px solid #ffb166", cursor:"pointer"}}> <Link  style={{textDecoration:'none',color: "#ffb166"}}  to="/login">Login</Link> </li>
                    <li style={{backgroundColor: "#ffb166",padding: "5px",borderRadius: "5px", cursor:"pointer"}}><Link style={{textDecoration:'none',color: "white"}} to="/signup">Signup</Link>  </li>
                    </>
                    }
                </ul>
            </div>
        </div>
    </>
  )
}

export default Navbar