require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())


const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

mongoose.connect(uri)
.then(() => {
    console.log("Connected to DB")
    app.listen(port, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log("Connection failed")
})

app.get('/', (req, res) => {
    res.send('Hello from node API')
}) 

app.post("/api/product", (req, res) => {
    console.log(req.body)
    res.send(req.body)
})