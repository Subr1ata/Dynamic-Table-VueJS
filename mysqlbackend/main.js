var cors = require('cors');
var express = require('express');
var mysql = require('mysql');
var app = express()
app.use(express.json())
app.use(cors())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Swi@tzer4',
    database: 'newdb'
})

con.connect((err)=>{
    if(err) {
        console.log(err);
    }else{
        console.log("connected !!");
    }
})

app.get('/get', (req,res)=>{
    con.query('select * from mytable', function (error, results, fields){
        if (error) {
            console.log(error);
        }else{
            console.log('successfully executed !!');
            res.json(results);
        }
    });
})

app.post('/post', (req,res)=>{
    const Sr_No = req.body.Sr_No;
    const Invoice_No = req.body.Invoice_No;
    const Invoice_Date = req.body.Invoice_Date;
    const PartyName = req.body.PartyName;
    const Invoice_Value = req.body.Invoice_Value;
    const User_Name = req.body.User_Name;

    con.query('insert into mytable values(?,?,?,?,?,?)', [Sr_No, Invoice_No, Invoice_Date, PartyName, Invoice_Value, User_Name], (err, result)=>{
        if(err) {
            console.log(err);
        }else{
            res.send("POSTED");
            console.log(result,"connected !!");
        }
    });
})

app.listen(3000, (err)=>{
    if(err) {
        console.log(err);
    }else{
        console.log('on port 3000 !!');
    }
})