import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import Modecontext from './context/Modecontext';
const Answeritem = (props) => {
    const {darkText,  lightText, mode} = useContext(Modecontext);
    const { username, description, avatar, timestamp, userid, commentid, postid, fetchComment } = props;
    const handleOnDelete = async (commentid, postid) => {
        const host = `https://quoracollegebackend.herokuapp.com/remove/comment/${commentid}`;
        const response = await fetch(host, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        })
        const data = await response.json();
        if (data.success === 'true') {
            alert("Comment deleted successfully");
            fetchComment(postid);
        } else {
            alert("Comment deletion failed");
        }
    }
    return (
        <>
            <div className="c-container c-d-flex">
                <div className="c-comment-avatar-box">
                    <img src={avatar} className="c-comment-avatar" alt="" />
                </div>
                <div className="c-comment-description c-container c-d-flex c-bs-bb c-fd-col">
                    <div style={{ alignItems: 'center' }} className="c-d-flex">
                        <div className="c-container c-d-flex">
                            <Link style={mode==='light'?{color:darkText,textDecoration:'none'}:{color:lightText, textDecoration:'none'}} to={`/user/${userid}`}>{username}</Link>
                            <p style={{ fontSize: '12px' }} className="c-mx-5">{timestamp}</p>
                        </div>
                        <i className="bi bi-trash3" style={{ display: localStorage.getItem('userid') !== userid ? 'none' : '', fontSize:'12px' }} onClick={() => { handleOnDelete(commentid, postid) }} ></i>
                    </div>
                    <div className="c-container">
                    {description}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Answeritem