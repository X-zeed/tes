
var express = require('express')
var cors = require('cors')
var app = express()

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'project-smartfarm'
});


app.use(cors())
app.use(express.json())


//Read
app.get('/output', function (req, res, next) {
    connection.query(
        'SELECT * FROM `output`',
        function (err, results) {
            res.json(results);
            console.log(results)
        }
    );
})

app.get('/output/:id', function (req, res, next) {
    var id = req.params.id;
    connection.query(
        'SELECT `nane`,`status` FROM `output` WHERE id = ?;', [id],
        function (err, results) {
            res.json(results);
            console.log(results)
        }
    );
})

//Update
app.put('/current' , function(req,res,next){
    connection.query(
        'UPDATE `current` SET `status`=? WHERE id = ?;',
        [req.body.status,req.body.id],
        function(err,results){
            res.json(results);
            console.log(results)
        }
    );
})  

app.listen(3000, function () {
    console.log('CORS-enable web server listening on port 3000')
})