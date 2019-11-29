var router=require('express').Router();

var request = require('request');
var Payments=require('../model/payment.model');

var CLIENT     = process.env.PP_CLIENT;
var SECRET     = process.env.PP_SECRET;
var PAYPAL_API = process.env.DEBUG? "https://api.sandbox.paypal.com" : "https://api.paypal.com";
var DOMAIN     = process.env.DOMAIN;

router.get("/paypal/make/:paymentID", (req, res) => {
    Payments.findById({id: req.params['paymentID']}, (error, item) => {

        if(error){
            res.status(500).send({ error: "payment-pay-pp", data: error });
            return;
        }

        if(item[0] == null)
        {
            res.status(404).send({ error: "payment-pay-pp", data: "Payment not found" });
            return;
        }

        request.post(PAYPAL_API + "/v1/payments/patyment", {

            auth: {
                user: CLIENT,
                pass: SECRET
            },
            body:
            {
                intent: 'sale',
                payer:
                {
                    payment_method: 'paypal'
                },
                transactions: [
                {
                    amount:
                    {
                        total: item[0].amount,
                        currency: 'AUD'
                    }
                }],
                redirect_urls:
                {
                    return_url: 'https://' + DOMAIN + '/paypal/callback/' + req.params['paymentID'],
                    cancel_url: 'https://' + DOMAIN + '/paypal/camcel/' + req.params['paymentID']
                }
            },
            json: true
            }, 
            (err, resp) => {
                if(err){
                    return res.status(500).send({ error: "payment-pay-pp-1", data: error });
                }
              
                res.json(
                {
                    id: response.body.id
                });
        });
    });
});

router.post("/paypal/callback/:paymentID", (req, res) => {

    Payments.findById({id: req.params['paymentID']}, (error, item) => {

        if(error){
            res.status(500).send({ error: "payment-callback-pp", data: error });
            return;
        }

        if(item == null)
        {
            res.status(404).send({ error: "payment-callback-pp", data: "Payment not found" });
            return;
        }

        var paymentID = req.body.paymentID;
        var payerID = req.body.payerID;

        request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID + '/execute', {
            
            auth: {
                user: CLIENT,
                pass: SECRET
            },
            body: {
                payer_id: payerID,
                transactions: [
                {
                amount: {
                    total: item[0].amount,
                    currency: 'AUD'
                }
                }]
            },
            json: true
            }, (err, response) => {
                if (err) return res.status(500).send({ error: "payment-callback-pp", data: err });
              
                item.transID = paymentID;
                item.save();
                
                res.json({
                    status: 'success',
                    id: req.params['paymentID']
                });
        });
    });
});


module.exports=router;