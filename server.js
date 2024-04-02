var express = require('express')
var cors = require('cors')
var app = express()

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'db tutorial'
});


app.use(cors())
app.use(express.json())


//Read
app.get('/users' , function(req,res,next){
    connection.query(
        'SELECT * FROM `users`',
        function(err,results){
            res.json(results);
            console.log(results)
        }
    );
})

app.get('/users/:id' , function(req,res,next){
    var userId = req.params.id;
    connection.query(
        'SELECT * FROM `users` WHERE id = ?;',[userId],
        function(err,results){
            res.json(results);
            console.log(results)
        }
    );
})

//Create

app.post('/users' , function(req,res,next){
    connection.query(
        'INSERT INTO `users`(`id`,`fname`, `lname`, `username`, `password`, `avatar`) VALUES (?,?,?,?,?,?)',
        [req.body.id,req.body.fname,req.body.lname,req.body.username,req.body.password,req.body.avatar],
        function(err,results){
            res.json(results);
            console.log(results)
        }
    );
})  

//Update
app.put('/users' , function(req,res,next){
    connection.query(
        'UPDATE `users` SET `id`=?,`fname`=?,`lname`=?,`username`=?,`password`=?,`avatar`=? WHERE id = ?;',
        [req.body.id,req.body.fname,req.body.lname,req.body.username,req.body.password,req.body.avatar,req.body.fromId],
        function(err,results){
            res.json(results);
            console.log(results)
        }
    );
})  

//DELETE
app.delete('/users' , function(req,res,next){
    connection.query(
        'DELETE FROM `users` WHERE id = ?;',
        [req.body.id],
        function(err,results){
            res.json(results);
            console.log(results)
        }
    );
})

app.listen(5000,function(){
    console.log('CORS-enable web server listening on port 5000')
})