const express = require('express');
const con = require('../db');
const router = express.Router();

router.post('/add', (req, res)=>{
    const {name, company, package, jobProfile, questionTopic, campus, department, session} = req.body;
    const command = `INSERT into placement (name, company, package, jobprofile, questiontopic, campus, department, session) values ('${name}', '${company}', '${package}', '${jobProfile}', '${questionTopic}', '${campus}', '${department}', '${session}')`;
    con.query(command, (error, result)=>{
        if(error){
            res.status(400).json({success:false, error})
        }else{
            res.status(200).json({success:true, result})
        }
    })
})
router.get('/get', (req, res)=>{
    const command = "SELECT *FROM placement";
    con.query(command, (error, result)=>{
        if(error){
            res.status(400).json({success:false, error})
        }else{
            res.status(200).json({success:true, result})
        }
    })
})
module.exports = router;