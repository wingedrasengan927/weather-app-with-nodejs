// import express
const express = require('express');

// Use dotenv to read .env vars into Node
require('dotenv').config()

const axios = require("axios");

PORT = process.env.PORT;

// create app
app = express();

// set template engine
app.set("view engine", "pug")
app.set("views", "views")

// serve files as public
app.use(express.static('public'))

// middleware to parse request
app.use(express.json());

app.get("/", (req, res, next) => {
    res.status(200)
    return res.render("main")
})

const DARKSKY_KEY = process.env.DARKSKY_SECRET_KEY;
app.post("/place", (req, res, next) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const url = `https://api.darksky.net/forecast/${DARKSKY_KEY}/${latitude},${longitude}`;
    axios({
        url: url,
        responseType: "json"
    })
    .then(response => {
        res.status(200)
        res.send(JSON.stringify(response.data.currently))
        return res
    })
    .catch(err => {
        res.status(400)
        console.log(err)
    })
})

// run the app
app.listen(PORT);