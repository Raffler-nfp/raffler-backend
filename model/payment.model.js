var mongoose=require('mongoose');

var userRef=require("./user.model");

var paymentSchema=new mongoose.Schema({
    
    user:{
        type:[userRef]
    },
    amount:{
        type:Number
    },
    info:{
        type:String
    },
    transID:{
        type:String
    }

});

module.exports=mongoose.model('Payments', paymentSchema);