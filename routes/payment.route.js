var router=require('express').Router()

var paymentModel = require('../model/payment.model');

router.post('/make', (req, res) => {

    

});

router.get('/get/:ID', (req, res) => {

    paymentModel.findById(req.params.ID, (err, res) => {
        if(err)
        {
            data = {
                "meta": {
                    "status": "fail",
                    "message": "404"
                }
            };
        }
        else
        {
            data = {
                "meta": {
                    "status": "success",
                    "data": res
                }
            };
        }
        
        response.json(data);

    });
    

});

module.exports=router;