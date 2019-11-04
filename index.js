const app=require('express')();
const cors=require('cors');
const body_parser=require('body-parser');
const mongoose=require('mongoose') ;
//routes import
var userRouter=require('./routes/user.route');
var contactUsRouter=require('./routes/contactus.route');
//end routes import
//var app=express()
require('dotenv').config();
const port=process.env.PORT || 5000;
app.use(cors())
app.use(body_parser.json());
//DB setup
const uri=process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("Mongodb connected succesfully");
});
//end DB setup
app.use('/users',userRouter);
app.use('/contact',contactUsRouter);
app.listen(port,()=>{
    console.log(`Connected successfully:${port}`);
 })