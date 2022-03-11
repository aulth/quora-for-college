const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
const con = require('../db');
const fetchUser = require('../middleware/fetchuser');
router.post('/create', fetchUser, (req, res)=>{
    const {description, avatar, postid} = req.body;
    const {userid, name} = req.user;
    const commentid = uniqid();
    const command = `INSERT INTO answer (commentid, description, avatar, username, userid, date, postid) VALUES ("${commentid}", "${description}", "${avatar}", "${name}", "${userid}", "${new Date().toLocaleString()}", "${postid}")`;
    console.log(command);
    con.query(command, (error, result)=>{
        if(!error){
            res.status(200).json({success:'true', result});
        }else{
            res.status(400).json({success:'false', error:error});
        }
    })
})

//fetching all comments
router.get('/all', (req, res)=>{
    const command = `SELECT *FROM answer`;
    con.query(command, (error, result)=>{
        if(!error){
            res.status(200).json({success:'true',result})
        }else{
            res.status(400).json({success:'false', error});
        }
    })
})
// fetching a particular post's comment 
router.get('/post/:postid', (req,res)=>{
    const {postid} = req.params;
    const command =  `SELECT *FROM answer where postid="${postid}"`;
    con.query(command, (error, result)=>{
        if(!error){
            res.status(200).json({success:'true', result})
        }else{
            res.status(400).json({success:'false', error})
        }
    })
})
module.exports = router;