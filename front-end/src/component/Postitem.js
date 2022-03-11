import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Answeritem from './Answeritem';
import Modecontext from './context/Modecontext';
import Postcontext from './context/Postcontext';
const Postitem = (props) => {
    const [answer, setAnswer] = useState('');
    const [answers, setAnswers] = useState({})
    const [post, setPost] = useState({ description: '' });
    const location = useLocation();
    const navigate = useNavigate();
    const { getAllPost, fetchUserPost } = useContext(Postcontext)
    const { lightText, darkText, mode } = useContext(Modecontext);
    const { topic, description, author, date, avatar, userid, postid } = props;
    // Delete Post 
    const handleOnDelete = async (postid) => {
        const url = `https://quoracollegebackend.herokuapp.com/remove/post/${postid}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        })
        const data = await response.json();
        if (data.success === 'true') {
            alert('Post deleted succesfully');
            if (location.pathname.includes('user')) {
                fetchUserPost(userid)
            } else {
                getAllPost();
            }
        } else if (data.success === 'false') {
            alert(data.error)
        } else {
            alert("Deletion failed");
        }
    }
    // Open Edit box 
    const openEditBox = (postid) => {
        setPost({ description: document.getElementById(`post-description-${postid}`).innerText });
        let display = document.getElementsByClassName(`${postid}`)[0].style.display;
        if (display === 'block') {
            document.getElementsByClassName(`${postid}`)[0].style.display = 'none';
        } else if (display === 'none') {
            document.getElementsByClassName(`${postid}`)[0].style.display = 'block';
        }
    }
    // getting input edit data 
    const handleOnChange = (postid) => {
        setPost({ description: document.getElementById(postid).value });
    }

    // Edit Post 
    const handleOnEdit = async (postid) => {
        let topicArray = post.description.split('#');
        topicArray.shift();
        const topic = topicArray.join(', ');
        const url = `https://quoracollegebackend.herokuapp.com/post/edit/${postid}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ description: post.description, topic: topic })
        })
        const data = await response.json();
        if (data.success === 'true') {
            alert("Edited Successfully");
            if (location.pathname.includes('user')) {
                document.getElementsByClassName(`${postid}`)[0].style.display = 'none';
                fetchUserPost(localStorage.getItem('userid'));
                navigate(`/user/${localStorage.getItem('userid')}`);
            } else {
                document.getElementsByClassName(`${postid}`)[0].style.display = 'none';
                getAllPost();
                navigate('/')
            }
        } else {
            alert(data.error);
        }
    }
    const showCommentBox = (postid) => {
        document.getElementById(`comment-box-${postid}`).style.display = document.getElementById(`comment-box-${postid}`).style.display === 'block' ? 'none' : 'block';
    }
    const handleOnAnswerInput = (postid) => {
        setAnswer(document.getElementById(`c-comment-input-${postid}`).value)
    }
    const postAnswer = async (postid) => {
        console.log('calling post answer');
        console.log(postid)
        console.log(answer);
        const host = 'https://quoracollegebackend.herokuapp.com/answer/create';
        const response = await fetch(host, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ description: answer, avatar: localStorage.getItem('useravatar'), postid: postid })
        })
        const data = await response.json();
        if (data.success === 'true') {
            alert("Comment posted succesfully")
            // document.getElementById(`comment-box-${postid}`).style.display = 'none';
            fetchComment(postid)
            setAnswer('')
        } else {
            alert("Comment not posted");
        }
    }
    // fetching particular post's comment 
    const fetchComment = async (postid) => {
        const host = `https://quoracollegebackend.herokuapp.com/answer/post/${postid}`;
        const response = await fetch(host, {
            method: 'GET',
        })
        const data = await response.json();
        if (data.success === 'true') {
            setAnswers(data.result);
        } else {
            console.log('comments not fetched')
        }
    }

    useEffect(() => {
        fetchComment(postid);
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {/* <!-- Post body start --> */}
            <div className="c-container c-bs-bb c-post-body">
                <div className="c-container">
                    <div className="c-post-header-bar">
                        <ul className="c-post-label-list c-d-flex">
                            <Link style={{color:'#d75f68', background:'#fdebe7', textDecoration:'none', borderRadius:'5px', padding:'2px'}} to={`/post/topic/${topic}`}>{topic}</Link>
                            {/* <li>Engineering</li> */}
                        </ul>
                        <div>
                            <i className="bi bi-pen c-mx-5" style={{ display: localStorage.getItem('userid') !== userid ? 'none' : '' }} onClick={() => { openEditBox(postid) }} ></i>
                            <i className="bi bi-trash3" style={{ display: localStorage.getItem('userid') !== userid ? 'none' : '' }} onClick={() => { handleOnDelete(postid) }} ></i>
                        </div>
                    </div>
                    <div className="c-container c-post-content c-my-5">
                        <h3 id={`post-description-${postid}`}>{description}</h3>
                        <div style={{ display: 'none' }} className={`c-container c-edit-box ${postid}`}>
                            <form onSubmit={(e) => { e.preventDefault(); handleOnEdit(postid) }} className={`c-container c-d-flex`}>
                                <input type="text" onChange={() => { handleOnChange(postid) }} className="c-container c-edit-input" value={post.description} name="" id={postid} />
                                <button type="submit" className='c-edit-btn'>Edit</button>
                            </form>
                        </div>
                    </div>
                    <div className="c-container c-post-user c-d-flex">
                        <div className="c-post-user-info c-d-flex">
                            <img src={avatar} className="c-post-user-avatar" alt="" />
                            <div className="c-post-user-name-time c-d-flex c-fd-col ">
                                <p><Link style={mode === 'light' ? { color: darkText, textDecoration: 'none' } : { color: lightText, textDecoration: 'none' }} to={`/user/${userid}`}>{author}</Link></p>
                                <p >{date}</p>
                            </div>
                        </div>
                        <div className="c-post-answer-share-box c-d-flex c-ai-center ">
                            <p style={{ cursor: 'pointer' }} className="c-mx-5" onClick={() => { showCommentBox(postid) }}>{answers && `${answers.length}`} Answers</p>
                            <i className="bi bi-share"></i>
                        </div>
                    </div>
                </div>

                {/* comment start  */}
                <div style={{display: 'none' }} id={`comment-box-${postid}`} className="c-comment-body c-bs-bb c-container">
                    <form className="c-comment-input-box c-container c-bs-bb c-d-flex" onSubmit={async (e) => { e.preventDefault(); await postAnswer(postid) }}>
                        <img src={localStorage.getItem('useravatar')} className="c-comment-input-avatar" alt="" />
                        <input style={mode==='light'?{backgroundColor:'transparent', color:darkText}:{backgroundColor:'transparent', color:lightText}}  type="text" id={`c-comment-input-${postid}`} onChange={async (e) => { e.preventDefault(); handleOnAnswerInput(postid) }} className="c-comment-input" value={answer} placeholder="Write a comment..." />
                        <input  type="submit" className="c-comment-answer-btn" value="Answer" />
                    </form>
                    {answers.length > 0 && console.log("answers available")}
                    {answers.length > 0 && answers.map((answer, index) => {
                        return <Answeritem username={answer.username} key={index} postid={answer.postid} fetchComment={fetchComment} timestamp={answer.date} commentid={answer.commentid} avatar={answer.avatar} userid={answer.userid} description={answer.description} />
                    })}
                    {console.log("comment section")}
                </div>
                {/* commet end  */}
            </div>
            {/* <!-- Post body end  --> */}
        </>
    )
}

export default Postitem