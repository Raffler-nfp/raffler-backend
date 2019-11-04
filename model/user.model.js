var mongoose=require('mongoose');

var userSchema=new mongoose.Schema({
    
    name:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    confirmPassword:{
        type:String
    },
    gameUsername:{
        type:String
    },
    gamingPlatform:{
        type:String
    },
    multipliers:{
        type:String
    },
    rafflesHistory:{
        type:String
    },
    rafflesCount:{
        type:String
    }

});

var userschema=mongoose.model('User',userSchema);
module.exports=userschema;