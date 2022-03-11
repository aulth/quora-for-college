import React, {useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import Postcontext from './context/Postcontext';
import Postitem from './Postitem';
import Modecontext from './context/Modecontext';
import Footer from './Footer';

const User = () => {
    const {userid} = useParams();
    const [user, setUser] = useState()
    const {fetchUserPost, posts} = useContext(Postcontext);
    const {lightText, darkText, lightBg, darkBg, mode} = useContext(Modecontext);
    const fetchUser = async ()=>{
        const url = `https://quoracollegebackend.herokuapp.com/user/${userid}`;
        const response = await fetch(url, {
            method:'GET',
        })
        const data = await response.json();
        setUser(data[0]);
    }
    useEffect(() => {
     fetchUserPost(userid);
     fetchUser();
     //eslint-disable-next-line
    }, [])
    
  return (
    <>
    {user && posts && 
    <>
    <div style={mode==='light'?{background:lightBg, color:darkText}:{background:darkBg, color:lightText}} className="c-user-page c-bs-bb">
                <div className="c-user-header c-bs-bb c-d-flex">
                    <div className="c-user-header-avatar c-bs-bb">
                        <img  src={user.avatar} alt=""/>
                    </div>
                    <div className="c-user-header-info c-mx-5 c-bs-bb c-d-flex c-fd-col">
                        <h3>{user.name}</h3>
                        <p>{user.college} </p>
                        <p> {user.email} </p>
                        <ul className=" c-d-flex c-user-header-social-list">
                            <li><i className="bi bi-facebook"></i></li>
                            <li><i className="bi bi-github"></i></li>
                            <li><i className="bi bi-instagram"></i></li>
                            <li><i className="bi bi-twitter"></i></li>
                            <li><i className="bi bi-linkedin"></i></li>
                        </ul>
                    </div>
                </div>
                <hr style={{marginTop: "10px"}}/>
                {
                    posts.map((post, index)=>{
                        return <Postitem key={index} topic={post.topic} description={post.description} author={post.author} userid={post.userid} postid={post.id} date={post.date} avatar={post.avatar} />
                    })
                }
    </div>
        {/* <!-- user profile end  --> */}
    </>
    }
    <Footer/>
    </>
  )
}

export default User