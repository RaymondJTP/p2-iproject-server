const nodemailer = require('nodemailer');
  
  
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'raymondpanjaitan11@gmail.com',
        pass: 'ganteng11'
    }
});
  
// let mailDetails = {
//     from: 'xyz@gmail.com',
//     to: 'abc@gmail.com',
//     subject: 'Login mail',
//     text: 'Login information mail for FindMe App'
// };
  
// mailTransporter.sendMail(mailDetails, function(err, data) {
//     if(err) {
//         console.log('Error Occurs');
//     } else {
//         console.log('Email sent successfully');
//     }
// });

module.exports = mailTransporter
