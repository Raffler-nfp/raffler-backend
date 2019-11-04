var mongoose=require('mongoose');

var userRef=require("./user.model");

var transactionSchema=new mongoose.Schema({
    
    user:{
        type:[userRef]
    },
    amount:{
        type:Number
    },
    info:{
        type:String
    }

});

module.exports=mongoose.model('Transactions', transactionSchema);