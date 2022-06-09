const express = require('express');
const con = require('../db');
const router = express.Router()

router.post('/:query', (req, res)=>{
    let query = req.params.query;
    query = query.split(' ');
    let posts;
    let command = `SELECT * FROM post`;
    con.query(command, (error, result)=>{
        if(error){
            console.log(error)
        }else{
            posts = result;
            let filteredPosts = posts.filter((post)=>{
                let postDescription = post.description.toLowerCase();
                for(let i=0; i<query.length; i++){
                    if(postDescription.includes(query[i])){
                        return true;
                    }
                }
            })
            if(filteredPosts.length>0){
                res.status(200).json({success:true, result:filteredPosts})
            }else{
                res.status(200).json({success:false, error:'No post found'})
            }
        }
    })

})


module.exports = router;