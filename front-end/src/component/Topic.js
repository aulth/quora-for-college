import React, {useContext, useState} from 'react'
import {useParams , Link} from 'react-router-dom';
import Posts from './Posts';
import Postcontext from './context/Postcontext';
import Modecontext from './context/Modecontext';
import Footer from './Footer';
const Topic = () => {
    const category = useParams().topic;
    const {createPost, getCategoryPost} = useContext(Postcontext);
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
        topicArray.push(`${category.split('')[0].toUpperCase() + category.split('').slice(1).join('')}`);
        const topic = topicArray.join(', ');
        console.log(topic);
        createPost(post.description, topic);
        setPost({description:''});
        getCategoryPost(category);
        // navigate('/');
        // getAllPost();
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
                    <h3 className="c-text-center ">Category</h3>
                    <ul className="c-post-category  c-d-flex c-fd-col c-my-5">
                        <h4>{category.split('')[0].toUpperCase() + category.split('').slice(1).join('')}</h4>
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
                        <Link to="/placement" className="c-placement-btn"  style={{textDecoration:'none', color:'black',marginLeft:'0px'}}> Placement info</Link>
                    </ul>
                </div>
            </div>
            {/* <!-- Right sidebar --> */}
            <div className="c-right-sidebar c-bs-bb">
                <form style={mode==='light'?{background:'white', color:darkText}:{background:darkBg, color:lightText}} onSubmit={handleOnPost} className="c-ask-bar c-ai-center c-bs-bb c-d-flex ">
                    <input type="text" id="c-ask-input" style={mode==='light'?{background:'white', color:darkText}:{background:darkBg, color:lightText}} name='description' onChange={handleOnChange} value={post.description} className="c-bs-bb" placeholder="ask your query"/>
                    <button style={{cursor:'pointer'}} className="c-ask-button">Ask a question</button>
                </form>
                <Posts topic={category}/>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Topic