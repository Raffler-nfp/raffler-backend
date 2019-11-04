var router=require('express').Router();
var utils=require('./../lib/utils')
var nodemail=require('nodemailer');

var transport = nodemail.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

router.post("/send", (req, res) => {

    var error, _ = utils.requiredBody(req.body, ['email', 'fullName', 'massage'])

    if(error.length > 0)
    {
        res.json({
            "mata": {
                "status": "fail",
                "massage": error.map((item) => {return item + " not set.";})
            }
        });
        return;
    }

    transport.sendMail({

        to: "",
        from: "",
        subject: "Contact-" + req.body.fullName,
        replayTo: req.body.email,
        html: req.body.massage

    }, (err) => {

        if(err)
        {
            data = {
                "mata": {
                    "status": "fail",
                    "massage": err
                }
            };
        }
        else
        {
            data = {
                "mata": {
                    "status": "success",
                    "massage": "email sent"
                }
            };
        }
        res.json(data);

    });

});