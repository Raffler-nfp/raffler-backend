const app=require('express')();
const cors=require('cors');
const body_parser=require('body-parser');
const mongoose=require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();

//DB setup
const uri=process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("Mongodb connected succesfully");
});
//end DB setup

app.use(session({
    secret: process.env.SESSION_KEY || "boo",
    store: process.env.DEBUG? new MemoryStore() : new MongoStore({ mongooseConnection: mongoose.connection })
}));

//express.js setup
app.use(cors())
app.use(body_parser.json());

//end express.js setup


//routes import
var userRouter=require('./routes/user.route');
var contactUsRouter=require('./routes/contactus.route');
//end routes import

app.use('/users'   , userRouter);
app.use('/contact' , contactUsRouter);
app.use('/payment/', require('./routes/payment.route.js'));
app.use('/payment/', require('./routes/paypal.route.js' ));

app.listen(process.env.PORT || 5000,()=>{
    console.log(`Connected successfully:${process.env.PORT || 5000}`);
 })