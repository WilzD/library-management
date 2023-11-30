const express=require('express')
const app=express()

const sequelizeDB=require('./path/database')

const bodyParser=require('body-parser')
app.use(bodyParser.json({extended:false}))

app.listen(3000)