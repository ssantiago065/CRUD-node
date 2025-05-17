require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model.js')
const app = express()



app.use(express.json())


const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

mongoose.connect(uri)
.then(() => {
    console.log("Connected to DB")
    app.listen(port, () => {
        console.log("Server is running on port 3000");
    });
})
.catch(() => {
    console.log("Connection failed")
})

app.get('/', (req, res) => {
    res.send("Hello from node API")
}) 

app.get("/api/products" , async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)

    }catch (error){
        res.status(500).json({message: error.message})
    }
})

app.get("/api/products/:id", async (req, res) => {
    try{
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)

    }catch (error){
        response.status(500).json({message: error.message})
    }
})

app.post("/api/products", async (req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }catch (error){
        res.status(500).json({message: error.message})
    }
})

app.put("/api/products/:id", async (req, res) => {
    try{
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)

        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)

    }catch (error){
        res.status(500).json({message: error.message})
    }
})  

app.delete("/api/products/:id", async (req, res) => {
    try{
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        res.status(200).json({message: "Product deleted succesfully"})
        

    }catch (error){
        res.status(500).json({message: error.message})
    }
})