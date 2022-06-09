const sql = require('mysql2');
const con = sql.createConnection({
    host : process.env.host,
    user : process.env.user,
    password : process.env.password,
    database : process.env.database
})
con.connect((err)=>{
    if(err) throw err;
    console.log("connected to database");
})

module.exports=con;