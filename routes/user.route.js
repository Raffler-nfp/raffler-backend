var router=require('express').Router()
//var mongoose=require('mongoose')
var User=require('../model/user.model')
router.route('/signup').post((request,response)=>{
var details={
    name:request.body.name,
    username:request.body.username,
    password:request.body.password,
    confirmPassword:request.body.confirmPassword,
    gameUsername:request.body.gameUsername,
    gamingPlatform:request.body.gamingPlatform,
    multipliers:request.body.multipliers,
    rafflesHistory:request.body.rafflesHistory,
    rafflesCount:request.body.rafflesCount
}
var user=new User(details)
user.save().then(response=>console.log(response)).catch(error=>response.status(400).json("Error : "+error))
});
router.route('/login').post((request,response)=>{
    User.findOne(
        {$and:
        [ {'username': request.body.userName},
        {'password':request.body.password}]
        },
        (err, result) => {

            if(err) {
              response.status(500).send(err);
              return;
            }
        
            if(!result) {
                data = {
                    "meta": {
                        "status": "fail",
                        "message": "Login Failure: Invalid username or password"
                    }
                };
                response.status(401).send(data);
            } else {
                data = {
                    "meta": {
                        "status": "success",
                        "message": "Login success"
                    }
                };
                response.json(data);
            }
        }).catch(error=>response.status(400).json("Error : "+error))
    // User.find({username:`${request.username}`}).then()
});
module.exports=router