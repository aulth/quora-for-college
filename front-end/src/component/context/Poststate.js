import React, {useState} from 'react'
import Postcontext from './Postcontext'

const Poststate = (props) => {
  const [posts, setPosts] = useState()
  // Fetch all home post 
    const getAllPost = async ()=>{
        const host = "https://quoracollegebackend.herokuapp.com/post/get";
        const response = await fetch (host, {
            method:"GET",
        })
        const data = await response.json();
        setPosts(data);
    }
    // get category post 
    const getCategoryPost = async (topic)=>{
      const host = `https://quoracollegebackend.herokuapp.com/post/topic/${topic}`;
      console.log(host)
      const response = await fetch (host, {
          method:"GET",
      })
      const data = await response.json();
      setPosts(data.result);
  }
    // Create post 
    const createPost = async (description, topic)=>{
      const host = 'https://quoracollegebackend.herokuapp.com/post/create';
        const response = await fetch(host, {
            method:'POST',
            headers:{
                'content-type':'application/json',
                'auth-token':localStorage.getItem('auth-token')
            },
            body:JSON.stringify({description:description, avatar:localStorage.getItem('useravatar'), topic:topic})
        })
        console.log(response)
    }

    // fetch user individual post 
    const fetchUserPost =async(userid)=>{
      const url = `https://quoracollegebackend.herokuapp.com/user/post/${userid}`;
      const response = await fetch(url,{
        method:'GET',
      })
      const data = await response.json();
      setPosts(data);
    }
    //search post
    const getSearchPost = async(query)=>{
      const url = `https://quoracollegebackend.herokuapp.com/search/${query}`;
      const response = await fetch(url, {
        method:'POST'
      })
      const data = await response.json();
      setPosts(data.result);
    }
  return (
    <Postcontext.Provider value={{getAllPost, posts, createPost, fetchUserPost, getCategoryPost, getSearchPost}}>
        {props.children}
    </Postcontext.Provider>
  )
}

export default Poststate