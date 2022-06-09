require('dotenv').config();
const { body, validationResult } = require('express-validator');
const express = require("express");
const router = express.Router();
const con = require("../db");
const uniqid = require('uniqid');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');
const JWT_SECRET = process.env.JWT_SECRET;
router.get("/", (req,res)=>{
    const command = "SELECT * FROM student";
    con.query(command, (error, result)=>{
        res.status(200).json(result);
    })
})

// Sign up api 
router.post("/signup",[
    body('email').isEmail()
], (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }else{
        const salt = bcryptjs.genSaltSync(10);
        const {name, email, password, college, batch, phone, avatar, course} = req.body;
        var userid = uniqid();
        const secPass =  bcryptjs.hashSync(password, salt);
        const command = `INSERT INTO student (name, email, password, college, batch, date, avatar, phone, course, userid) VALUES ("${name}","${email}", "${secPass}", "${college}", "${batch}", "${new Date().toISOString().split('T')[0]}", "${avatar}", "${phone}", "${course}" , "${userid}");`;
        console.log(command);
        var username, useravatar;
        con.query(command, (error, result)=>{
            if(error) return res.status(400).json({error:error});
            const authtoken = jwt.sign({userid, name}, JWT_SECRET);
            con.query(`SELECT name, avatar, userid from student where email="${email}"`, (error, data)=>{
                console.log(data)
                if(error) throw error;
                username=data[0].name;
                useravatar=data[0].avatar;
                userid=data[0].userid
                res.status(200).json({authtoken:authtoken, success:true,username,useravatar,userid:userid, data});
            })
        })
    }

})

//Login ap
router.post("/login",[
    body('email').isEmail()
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }else{
        const {email, password} = req.body;
        const command = `SELECT * FROM student WHERE email = "${email}"`;
        con.query(command, async (error, result)=>{
            if(result.length>0){
                const user = result[0];
                const isMatched = await bcryptjs.compare(password, user.password);
                if(isMatched){
                    const authtoken = jwt.sign({userid:user.userid, name:user.name}, JWT_SECRET);
                    res.status(200).json({authtoken:authtoken, success:'true',user});
                }else{
                    res.status(401).json({message:"Invalid credentials"});
                }
            }else{
                res.status(400).json({success:'false', message:'User not found'});
            }
        })
    }
})

//get user by authtoken
router.get("/getuser",fetchUser, (req,res)=>{
    const {userid} = req.user;
    const command = `SELECT * FROM student WHERE userid = "${userid}"`;
    con.query(command, (error, result)=>{
        const user = result[0];
        res.status(200).json(user);
    })
})
module.exports = router;
