const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

// GANTI DENGAN URL MONGODB KAMU
mongoose.connect('mongodb+srv://admin:parahita2026@cluster0.hrloeif.mongodb.net/parahita')
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.log('Mongo Error:', err))

// ROOT TEST
app.get('/', (req,res)=>{
  res.send('Backend jalan 🚀')
})

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
  const order = new Order(req.body)
  await order.save()
  res.json({success:true})
})

app.get('/orders', async (req,res)=>{
  const orders = await Order.find()
  res.json(orders)
})

// PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Server jalan di port ' + PORT)
})
