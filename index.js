const express=require('express')
const logger=require('morgan')
const bodyParser=require('body-parser')
var admin = require("firebase-admin");
var serviceAccount = require("./admin-5db03-firebase-adminsdk-822r2-5624592e48.json");
 var firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseurl: "https://admin-5db03-default-rtdb.firebaseio.com"
});
var database = firebaseAdmin.database

const app=express()
app.set('view engine' ,' ejs')
app.use(express.static('views'))
app.set('vies',__dirname+'/views')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))



app.get('/',(req,res)=>{
    res.render('home.ejs')
})
app.get('/result',(req,res)=>{
    const result=req.body
   res.render('result.ejs')
})
 

const port = process.env.port ||3000
app.listen(port,()=>{
    console.log(`server is running in port ${port}`)
})