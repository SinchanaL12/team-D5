const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

require('dotenv').config()

const FoodModel = require('./models/Food')

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3001

//console.log(process.env.MongoDB_URL)
mongoose.connect('mongodb+srv://root:root1@cluster0.dkqn9.mongodb.net/')

app.post('/insert', async (req,res)=>{
    const foodName = req.body.foodName
    const days = req.body.days
    const food = new FoodModel({foodName:foodName, daysSinceIAte: days})
    try{
        await food.save()
        res.send("inserted data")
    }catch(err){
        console.log(err);
    }
})
app.get('/read', async (req,res)=>{
       try{
        const result = await FoodModel.find({})
        res.send(result)
       }catch{

       }
   })
app.put('/update', async (req,res)=>{
    const newFoodName = req.body.newFoodName
    const id = req.body.id

    try{
        const updatedFood = await FoodModel.findById(id)
        updatedFood.foodName = newFoodName
        updatedFood.save();
        
    }catch(err){
        console.log(err);
    }
})

app.delete('/delete/:id', async(req,res)=>{
    try{
        const id = req.params.id
        await FoodModel.findByIdAndDelete(id)
        res.send("deleted")
    }catch{

    }
})

app.listen(PORT,()=>{
    console.log(`server running in port ${PORT}`)
})