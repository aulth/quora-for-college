require('dotenv').config();
const express = require('express');
const ImageKit = require('imagekit');
const cors = require('cors');
const con = require('./db.js');
const app = express();
const port = process.env.PORT;
const post = require('./router/post')
const auth = require('./router/auth');
const user = require('./router/user');
const remove = require('./router/remove')
const answer = require('./router/answer')
app.use(express.json());
app.use(cors())
// imagekit config start
const imagekit = new ImageKit({
    urlEndpoint : "https://ik.imagekit.io/lgju5gzfspd/",
    publicKey : "public_92LmaGdulaemcYl7X2YaL95QGnU=",
    privateKey : "private_SRA0c6B+yObu0UX6VCCiIEYhwEI=",
});
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/imagekit", (req,res)=>{
    var result = imagekit.getAuthenticationParameters();
    res.status(200).json(result);
})

// Routes 
app.use("/post", post)
app.use('/auth', auth)
app.use('/user', user);
app.use('/remove', remove)
app.use('/answer', answer);

app.get('/', (req, res)=>{
    con.query('select *from post', (error, result)=>{
        if(error) res.status(400).json(error)
        else{
            res.status(200).json(result)
        }
    })
})

// app.get('/del/student', (req, res)=>{
//     con.query("Delete from student", (error, result)=>{
//         if(!error){
//             res.status(200).json(result)
//         }
//     })
// })
// app.get('/del/post', (req, res)=>{
//     con.query("Delete from post", (error, result)=>{
//         if(!error){
//             res.status(200).json(result)
//         }
//     })
// })
app.listen(port, ()=>{
    console.log("listening"+port)
})