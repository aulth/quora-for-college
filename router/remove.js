const express = require('express');
const con = require('../db');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();

router.delete('/post/:postid', fetchUser, (req, res)=>{
        const {userid} = req.user;
        const command = `SELECT userid FROM post where id="${req.params.postid}"`;
        con.query(command, (error, result)=>{
            if(!error){
                if(result[0].userid===userid){
                    const command = `DELETE FROM post where id="${req.params.postid}"`;
                    con.query(command, (error, result)=>{
                        if(!error){
                            res.status(200).json({success:'true', result});
                            console.log("Deleted successfully");
                        }else{
                            res.status(400).json({success:'false', error:error});
                        }
                    })
                }else{
                    res.status(400).json({success:'false', error:'You are not authorized to delete this post'});
                }
            }
        })
})
router.delete('/comment/:commentid', fetchUser, (req, res)=>{
    const {userid} = req.user;
    const {commentid} = req.params;
    if(userid){
        const command = `SELECT userid FROM answer where commentid="${commentid}"`;
        con.query(command, (error, result)=>{
            if(!error){
                if(result[0].userid===userid){
                    const command = `DELETE FROM answer where commentid="${commentid}"`;
                    con.query(command, (error, result)=>{
                        if(!error){
                            res.status(200).json({success:'true', result})
                        }else{
                            res.status(400).json({success:'false', error})
                        }
                    })
                }else{
                    res.status(400).json({success:'false', error:'You are not authorized to delete this comment'});
                }
            }else{
                res.status(400).json({success:'false', error:error});
            }
        })
    }else{
        res.status(400).json({success:'false', error:'You are not authorized to delete this comment'});
    }
})
module.exports = router;