const express = require('express');
const con = require('../db');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();

router.get("/:userid", (req,res)=>{
    const {userid} = req.params;
    console.log(userid);
    const command = `SELECT * FROM student where userid="${userid}"`;
    con.query(command, (error, result)=>{
        if(!error){
            res.status(200).json(result);
        }else{
            console.log(error);
        }
    })
})

router.get("/post/:userid", (req,res)=>{
    const {userid} = req.params;
    const command = `SELECT * FROM post where userid="${userid}"`;
    con.query(command, (error, result)=>{
        if(!error){
            res.status(200).json(result);
        }else{
            console.log(error);
        }
    })
})
module.exports = router