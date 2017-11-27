/*--------------------MANDATORY in order to read the file and send info-----------*/
const express = require("express")
require('dotenv').load(); //file that has keywords and usernames "environment variables"
const app = express() //accesing methods in the server side 
const pg = require('pg')  //include the node postgres library
const bodyParser = require("body-parser") //THis allows the info to be read and retreaved (parsing) the data. This must be used
app.use(bodyParser.urlencoded()) 
const Client = pg.Client //this is needed to use postgres 
const client = new Client({ //this locates the server on the computer
    user: process.env.user,
    host: 'localhost',
    database: 'bulletinboard',
    port: '5432',
    password: process.env.password
}) //then this client is the command connection to the server.

client.connect()//this connects to the sesrver


app.set('view engine', 'pug')//tells that the file its reading its in pug form

/*-------Renders INDEX page--------------*/
app.get("/", (req, res) => { //get the homepage
    // const readquery = {
    //     text: `select * from messages;` //command into shell, what to execute
    // }
    // client.query(readquery, function(err, response) {
    //     var songs = response.rows
         res.render('index') //songs:songs gets the input songs into the index page
    // })
})
/*--------------gets the list from Shell and logs it--------*/
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

/*---------------Sends the inputted info to the Shell-------------*/
app.post("/add", (req, res) => {
    //this connects to the SQL shell tables
    //console.log(req.body.artist, req.body.title)
    const insertquery = {
        text: `INSERT INTO messages (title, body) values ('${req.body.artist}','${req.body.title}')`
    }
    client.query(insertquery, function(err, response) /*this response is written differently because its not the same as the res, but it is just a parameter */ {
        console.log('error', err)
    })
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
	//client.end() //this ends connections with the server
// }) If you end the connection, in order to connect again, you need to make a new client request

/*--------connect to your localhost---------*/
app.listen(3004, function() {
    console.log("yuurr")
})