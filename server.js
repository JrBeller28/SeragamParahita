const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

// 🔐 LOGIN
app.post('/login',(req,res)=>{
  const {username,password} = req.body

  if(username === 'admin' && password === 'admin123'){
    res.json({success:true})
  } else {
    res.json({success:false})
  }
})

// ROOT
app.get('/', (req,res)=>{
  res.send('Backend jalan 🚀')
})

// CONNECT MONGODB
mongoose.connect('mongodb+srv://admin:parahita2026@cluster0.hrloeif.mongodb.net/parahita?retryWrites=true&w=majority')
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.log('Mongo Error:', err))

// ✅ SCHEMA HUBUNGI KAMI
const ContactSchema = new mongoose.Schema({
  company: String,
  email: String,
  detail: String,
  read: { type: Boolean, default: false }, // 🔥 penting
  created_at: { type: Date, default: Date.now }
})

const Contact = mongoose.model('Contact', ContactSchema)

// ✅ SIMPAN DATA
app.post('/contact', async (req,res)=>{
  try {
    const data = new Contact(req.body)
    await data.save()
    res.json({success:true})
  } catch(err){
    console.log(err)
    res.status(500).json({error:'Server error'})
  }
})

// ✅ AMBIL DATA
app.get('/contact', async (req,res)=>{
  const data = await Contact.find().sort({created_at:-1})
  res.json(data)
})

// ✅ TANDAI DIBACA
app.put('/contact/:id', async (req,res)=>{
  await Contact.findByIdAndUpdate(req.params.id, { read: true })
  res.json({success:true})
})

// PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
  console.log('Running on port ' + PORT)
})
