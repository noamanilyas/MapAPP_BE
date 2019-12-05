var nodemailer = require('nodemailer');
var emailTemplate = require('./emailTemplate');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zubairmalang92@gmail.com',
    pass: 'zubair@92'
  }
});

module.exports = {

    sendSignupEmail(user) {

        var mailOptions = {
            from: 'americas@americasrf.com',
            // to: 'americas@americasrf.com',
            to: 'noaman.ilyas@gmail.com',
            subject: 'New signup at navajo mapping',
            html: emailTemplate.getEmailTemplate(user.name, user.email, user.reason)
          };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log("Email error", error);
            } else {
              console.log('Email sent: ' + info.response);
            }
            transport.close();
          })
    }
}