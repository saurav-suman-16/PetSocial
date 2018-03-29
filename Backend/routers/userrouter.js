var path = require('path');
const express = require('express');
const router = express.Router();
const userapi = require('../apis/userapi');
const passport = require('passport');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './profileimage')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
});

const upload = multer({
    storage: storage
});

router.post('/googlelogin', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('user/login/')
});

router.post('/userlogin', async function (req, res) {
    let data = req.body;
    try {
        let g = await userapi.finduser(data);
        if (g.length == 0) {
            res.send({
                res: 'User not registered'
            });
        } else if (g[0].verified == false) {
            res.send({
                res: 'User not verified'
            });
        } else if (g[0].password == data.password) {
            res.send({
                res: 'Password Match'
            });
        } else {
            res.send({
                res: 'Wrong Password'
            });
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/finduserdata', async function (req, res) {
    try {
        let g = await userapi.finduser(req.body);
        res.send(g[0]);
    } catch (err) {

    }
})

router.post('/verifyuser', async function (req, res) {
    let data = req.body._id;
    try {
        let g = await userapi.verifyuser(data);
        let mail = await userapi.findusermail(data);
        res.send(mail);
    } catch (err) {
        console.log(err);
    }
})


router.post('/newuser', async function (req, res) {
    let data = req.body;
    let mail = "http://localhost:3000/login/"
    try {
        let r = await userapi.newuser(data);
        mail += r._id;
        let a = await userapi.sendmail(mail, r.email);
        res.send(r);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

router.post('/updatedetails', async function (req, res) {
    try {
        let r = await userapi.updatedetails(req.body);
        res.send(r);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})

router.post('/forgotpassword', async function (req, res) {
    let data = req.body;
    let mail = "http://localhost:3000/reset/"
    try {
        let r = await userapi.finduser(data);
        if (r.length) {
            mail += r[0]._id;
            let a = await userapi.sendresetmail(mail, req.body.email);
            res.send(r);
        } else {
            res.send({
                res: 'Email not registered'
            })
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

router.post('/updateimage', upload.single('acceptedFiles'), async function (req, res) {
    try {
        let data = {
            _id: req.body._id,
            imagename: req.file.filename,
            src: req.file.filename
        }
        let r = await userapi.updateimage(data);
        res.send(r);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
})

router.post('/newpassword', async function (req, res) {
    try {
        let a = await userapi.newpassword(req.body);
        res.send(a);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = router;