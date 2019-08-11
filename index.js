const app=require('express')();
const cors=require('cors')
const body_parser=require('body-parser')
const mongoose=require('mongoose') 
var userRouter=require('./routes/signup.route')
//var app=express()
require('dotenv').config();
const port=process.env.PORT || 5000
app.use(cors())
app.use(body_parser.json())
const uri=process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("Mongodb connected succesfully")
})


app.use('/users',userRouter)
app.listen(port,()=>{
    console.log(`Connected successfully:${port}`);
 })