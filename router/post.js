const {v4:uuidv4} = require('uuid');
const express = require("express");
const router = express.Router();
const con = require("../db");
const fetchUser = require('../middleware/fetchuser');

// create a post 
router.post("/create", fetchUser, (req,res)=>{
    const user = req.user;
    const {description, avatar, topic} = req.body;
    console.log(topic);
    const command = `INSERT INTO post (id, description, userid, author, topic, avatar, date) VALUES ("${uuidv4()}", "${description}", "${user.userid}", "${user.name}","${topic?topic:'General'}", "${avatar}", "${new Date().toLocaleString()}")`
    con.query(command, (error, result)=>{
        if(error) {
            res.json({success:'false', error:error});
        }else{
            res.status(200).json({success:'true', result});
        }
    })
})

// getall post 
router.get('/get', (req,res)=>{
    const command = `SELECT * FROM post`;
    con.query(command, (error, result)=>{
        if(!error){
            res.status(200).json(result);
        }else{
            res.status(400).json({error:error});
        }
    })
})

//Edit post
router.put('/edit/:postid', fetchUser, (req,res)=>{
    const {postid} = req.params;
    const user = req.user;
    const {description, topic} = req.body;
    const command = `SELECT userid FROM post WHERE id="${postid}"`;
    con.query(command, (error, result)=>{
        if(!error){
           if(result[0].userid===user.userid){
               const command = `UPDATE post set description="${description}" ${(topic)?`, topic="${topic}"`:' '} WHERE id="${postid}"`;
               console.log(command);
               con.query(command, (error, result)=>{
                   if(!error){
                       res.status(200).json({success:'true', result});
                   }
               })
           }else{
               res.status(400).json({success:'false', error:'You are not authorized to edit this post'});
           }
        }else{
            console.log(error);
        }
    })
})
// fetching particular category post 
router.get('/topic/:topic', (req, res)=>{
    const {topic} = req.params;
    const command = `SELECT * FROM post WHERE topic="${topic}"`;
    con.query(command, (error, result)=>{
        if(!error){
            console.log(result)
            res.status(200).json({success:'true', result});
        }else{
            res.status(400).json({success:'false', error});
        }
    })
})
module.exports = router;