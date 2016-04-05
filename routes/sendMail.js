var express = require('express');
var router = express.Router();
var mailer = require("nodemailer");


var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "bmt.transportpublic@gmail.com",
        pass: "azerty100"
    }
});

/* GET home page. */
router.post('/', function(req, res, next) {
    var mail = {
        from: 'bmt.transportpublic@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
        //html: "<b>Node.js New world for me</b>"
    };

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            res.send(error);
        }else{
            res.send("Message sent: " + response.message);
        }

        smtpTransport.close();
    });
});

module.exports = router;
