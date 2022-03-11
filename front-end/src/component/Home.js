import React, {useState, useContext} from 'react';
import Posts from './Posts';
import Postcontext from './context/Postcontext';
import Modecontext from './context/Modecontext';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
const Home = () => {
    const navigate = useNavigate();
    const {createPost, getAllPost} = useContext(Postcontext);
    const {darkText, darkBg, lightBg, lightText, mode} = useContext(Modecontext);
    const [post, setPost] = useState({description:''});
    const handleOnChange = (e)=>{
        setPost({...post, [e.target.name]:e.target.value});
    }
    const topicLink = mode==='light'?{color:darkText,textDecoration:'none'}:{color:lightText, textDecoration:'none'}
    const handleOnPost =(e)=>{
        console.log('handleOnPost')
        e.preventDefault();
        let topicArray = post.description.split('#');
        topicArray.shift();
        const topic = topicArray.join(', ');
        console.log(topic);
        createPost(post.description, topic);
        setPost({description:''});
        navigate('/');
        getAllPost();
    }
  return (
    <>
    {/* <!-- orange box  --> */}
        <div style={mode==='light'?{backgroundColor:'#fef4eb'}:{backgroundColor:'#222222'}} className="c-container c-home-box1 c-bs-bb">
        </div>
        {/* <!-- main  --> */}
        <div style={mode==='light'?{backgroundColor:lightBg, color:darkText, minHeight:'100vh'}:{backgroundColor:darkBg, color:lightText, minHeight:'100vh'}} className="c-container c-main c-d-flex">
            {/* <!-- Left sidebar --> */}
            <div className="c-left-sidebar c-bs-bb">
                <div className="c-container c-category">
                    <h3 className="c-text-center ">Categories</h3>
                    <ul  className="c-post-category c-d-flex c-fd-col c-my-5">
                        <Link style={topicLink} to='/post/topic/placement'>Placements</Link>
                        <Link style={topicLink} to='/post/topic/admission'>Admission</Link>
                        <Link style={topicLink} to='/post/topic/exam'>Endsem exam</Link>
                        <Link style={topicLink}  to='/post/topic/sessional'>Sessional</Link>
                        <Link style={topicLink}  to='/post/topic/fee'>Admission fee</Link>
                        <Link style={topicLink} to='/post/topic/library'>Library</Link>
                        <Link style={topicLink}  to='/post/topic/english'>English Deptt</Link>
                        <Link style={topicLink}  to='/post/topic/arabic'>Arabic Deptt</Link>
                        <Link style={topicLink}  to='/post/topic/computer'>Computer Deptt</Link>
                        <Link style={topicLink}  to='/post/topic/electronics'>Elctronics Deptt</Link>
                        <Link style={topicLink}  to='/post/topic/electrical'>Electrical Deptt</Link>
                        <Link style={topicLink} to='/post/topic/mechanical'>Mechanical Deptt</Link>
                        <Link style={topicLink} to='/post/topic/civil'>Civil Deptt</Link>
                        <Link style={topicLink}  to='/post/topic/campus'>Campus</Link>
                    </ul>
                </div>
                <div className="c-container c-my-2">
                    <div className="c-placement-btn" >
                        <Link to="/placement" style={{textDecoration:'none', color:'black'}}> Placement info</Link>
                    </div>
                </div>
            </div>
            {/* <!-- Right sidebar --> */}
            <div className="c-right-sidebar c-bs-bb">
                <form style={mode==='light'?{background:'white', color:darkText}:{background:darkBg, color:lightText}} onSubmit={handleOnPost} className="c-ask-bar c-ai-center c-bs-bb c-d-flex ">
                    <input type="text" id="c-ask-input" style={mode==='light'?{background:'white', color:darkText}:{background:darkBg, color:lightText}} name='description' onChange={handleOnChange} value={post.description} className="c-bs-bb" placeholder="ask your query"/>
                    <button style={{cursor:'pointer'}} className="c-ask-button">Ask a question</button>
                </form>
                <Posts/>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Home