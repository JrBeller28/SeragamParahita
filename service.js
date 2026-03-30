const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'parahita'
})

app.post('/orders',(req,res)=>{
  const {company,email,detail} = req.body
  db.query(
    'INSERT INTO orders (company,email,detail) VALUES (?,?,?)',
    [company,email,detail]
  )
  res.json({success:true})
})

app.get('/orders',(req,res)=>{
  db.query('SELECT * FROM orders',(err,result)=>{
    res.json(result)
  })
})

app.listen(3000,()=>console.log('Server jalan di port 3000'))
