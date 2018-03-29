const userdb = require('../schemas/userschema');
const nodemailer = require('nodemailer');

module.exports = {
    newuser: function (data) {
        return new Promise((res, rej) => {
            userdb.create(data, function (err, result) {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    },
    verifyuser: function (data) {
        return new Promise((res, rej) => {
            userdb.update({
                "_id": data
            }, {
                "verified": true
            }, function (err, result) {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    },
    findusermail: function (data) {
        return new Promise((res, rej) => {
            userdb.find({
                "_id": data
            }, {
                "_id": 0,
                "email": 1
            }, function (err, result) {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    },
    finduser: function (data) {
        return new Promise((res, rej) => {
            userdb.find({
                email: data.email
            }, function (err, result) {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    },
    findalluser: function (data) {
        return new Promise((res, rej) => {
            userdb.find({}, function (err, result) {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    },
    updatedetails: function (data) {
        return new Promise((res, rej) => {
            userdb.update({
                _id: data._id
            }, {
                $set: {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    sex: data.sex,
                    description: data.description
                }
            }, function (err, result) {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    },
    updateimage: function (data) {
        return new Promise((res, rej) => {
            userdb.update({
                _id: data._id
            }, {
                $set: {
                    imagename: data.imagename,
                    src: data.src
                }
            }, function (err, result) {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    },
    newpassword: function (data) {
        return new Promise((res, rej) => {
            userdb.update({
                _id: data._id
            }, {
                $set: {
                    password: data.password
                }
            }, function (err, result) {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    },
    sendmail: function (link, mailid) {
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'youremail@gmail.com', // generated ethereal user
                    pass: 'yourpassword' // generated ethereal password
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Authentication Server" ldin2ay55qeh7ti2@ethereal.email', // sender address
                to: mailid, // list of receivers
                subject: 'Your verification link', // Subject line
                text: 'link', // plain text body
                html: `<b>Click on the link to complete the regestration is ${link}</b>` // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });
    },
    sendresetmail: function (link, mailid) {
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'youremail@gmail.com', // generated ethereal user
                    pass: 'yourpassword' // generated ethereal password
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Authentication Server" ldin2ay55qeh7ti2@ethereal.email', // sender address
                to: mailid, // list of receivers
                subject: 'Your password reset link', // Subject line
                text: 'link', // plain text body
                html: `<b>Your password reset link is ${link}</b>` // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });
    }
}