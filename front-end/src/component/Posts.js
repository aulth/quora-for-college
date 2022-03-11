import React, {useContext, useEffect} from 'react';
import Postitem from './Postitem';
import { useLocation } from 'react-router-dom';
import Postcontext from './context/Postcontext';
const Posts = (props) => {
  const {topic} = props;
  const location = useLocation();
  const {getAllPost, posts, getCategoryPost} = useContext(Postcontext);
  useEffect(() => {
    if(location.pathname.includes('/topic/')){
      getCategoryPost(topic);
      console.log('calling category post'+topic)
    }else{
      getAllPost();
    }
    // eslint-disable-next-line
  }, [])
  useEffect(()=>{
    if(location.pathname.includes('/topic/')){
      getCategoryPost(topic)
    }
  },[location])
  return (
    <>
    {posts && posts.length>0 && posts.map((post, index)=>{
      return <Postitem key={index} topic={post.topic} postid={post.id} description={post.description} author={post.author} userid={post.userid} date={post.date} avatar={post.avatar} />
    })}
    </>
  )
}

export default Posts