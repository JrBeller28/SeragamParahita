const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/login',(req,res)=>{
  const {username,password} = req.body

  if(username==='admin' && password==='admin123'){
    res.json({success:true})
  } else {
    res.json({success:false})
  }
})

// CONNECT MONGODB
mongoose.connect('mongodb+srv://admin:<db_password>@cluster0.hrloeif.mongodb.net/?appName=Cluster0')
.then(()=>console.log('MongoDB Connected'))

// SCHEMA
const OrderSchema = new mongoose.Schema({
  company: String,
  email: String,
  detail: String,
  created_at: { type: Date, default: Date.now }
})

const Order = mongoose.model('Order', OrderSchema)

// CREATE ORDER
app.post('/orders', async (req,res)=>{
  const order = new Order(req.body)
  await order.save()
  res.json({success:true})
})

// GET ORDERS
app.get('/orders', async (req,res)=>{
  const orders = await Order.find().sort({created_at:-1})
  res.json(orders)
})

app.listen(3000,()=>console.log('Server jalan di port 3000'))
