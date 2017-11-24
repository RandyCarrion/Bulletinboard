const express = require("express")
require('dotenv').load();
const app = express()
const pg = require('pg')
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded())
const Client = pg.Client
const client = new Client({ //this locates the server on the computer
    user: process.env.user,
    host: 'localhost',
    database: 'bulletinboard',
    port: '5432',
    password: process.env.password
})

client.connect()//this connects to the sesrver


app.set('view engine', 'pug')//tells that the file its reading its in pug form


app.get("/", (req, res) => { //get the homepage
    // const readquery = {
    //     text: `select * from messages;` //command into shell, what to execute
    // }
    // client.query(readquery, function(err, response) {
    //     var songs = response.rows
         res.render('index') //songs:songs gets the input songs into the index page
    // })
})

app.get("/Bulletin", (req, res) => {
    const readquery = {
        text: `select * from messages;`
    }
    client.query(readquery, function(err, response) {
        var songs = response.rows
        console.log(songs)
        res.render('Bulletin', { songs: songs }) //songs:songs gets the input songs into the index page
    })
})


app.post("/add", (req, res) => {
    //this connects to the SQL shell tabless
    console.log(req.body.artist, req.body.title)
    const insertquery = {
        text: `INSERT INTO messages (title, body) values ('${req.body.artist}','${req.body.title}')`
    }
    client.query(insertquery, function(err, response) {
        console.log('error', err)
    })
    let songs = [1, 2, 3, 4, 5];
    const readquery = {
        text: `select * from messages;`
    }
    client.query(readquery, function(err, response) {

        var songs = response.rows
        // console.log(err)
        res.render('Bulletin', { songs: songs })
    })
    //songs:songs gets the input songs into the index page
})

// app.get("/form", (req, res) => {
// 	res.redner
// })





// 	console.log(err)
// 	client.end() //this ends connections with the server
// })

app.listen(3004, function() {
    console.log("yuurr")
})