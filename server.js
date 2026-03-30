const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

// DEBUG GLOBAL
process.on('uncaughtException', err => {
  console.error('UNCAUGHT ERROR:', err)
})

// ROOT
app.get('/', (req,res)=>{
  res.send('Backend jalan 🚀')
})

// CONNECT MONGODB
mongoose.connect('mongodb+srv://admin:parahita2026@cluster0.hrloeif.mongodb.net/parahita?retryWrites=true&w=majority')
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.log('Mongo Error:', err))

// SCHEMA
const OrderSchema = new mongoose.Schema({
  company: String,
  email: String,
  detail: String,
  created_at: { type: Date, default: Date.now }
})

const Order = mongoose.model('Order', OrderSchema)

// ROUTES
app.post('/orders', async (req,res)=>{
  try {
    const order = new Order(req.body)
    await order.save()
    res.json({success:true})
  } catch(err){
    console.log(err)
    res.status(500).json({error:'Server error'})
  }
})

app.get('/orders', async (req,res)=>{
  const data = await Order.find()
  res.json(data)
})

// PORT WAJIB
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
  console.log('Running on port ' + PORT)
})
