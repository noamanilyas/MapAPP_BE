var nodemailer = require('nodemailer');
var emailTemplate = require('./');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aotc.invite%40gmail.com',
    pass: 'object00'
  }
});

module.exports = {

    sendSignupEmail(user) {

        var mailOptions = {
            from: 'americas@americasrf.com',
            // to: 'americas@americasrf.com',
            to: 'noaman.ilyas@gmail.com',
            subject: 'New signup at navajo mapping',
            html: getEmailTemplate(user.firstName +' '+ user.lastName, user.email, user.reason)
          };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          })
    }
}