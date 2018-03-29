var path = require('path');
const express = require('express');
const router = express.Router();
const postapi = require('../apis/postapi');
const userapi = require('../apis/userapi');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
});

const upload = multer({
    storage: storage
});

router.post('/post', upload.single('acceptedFiles'), async function (req, res) {
    let body = req.body;
    let file = req.file;
    try {
        let d = await userapi.finduser(body)
        body.uploadername = d[0].firstname + " " + d[0].lastname;
        let data = {
            uploadername: body.uploadername,
            email: body.email,
            categoty: body.category,
            description: body.description,
            time: Date.now(),
            imagename: file.filename,
            src: file.filename
        }
        let g = await postapi.newpost(data);
        res.send({
            res: "File Uploaded"
        });
    } catch (err) {
        console.log(err);
    }
})

router.post('/findposts', async function (req, res) {
    try {
        let a = await postapi.findall();
        res.send(a);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

router.post('/finduserposts', async function (req, res) {
    try {
        //console.log('req.user--------------------', req.user)
        let a = await postapi.finduserall(req.user);
        res.send(a);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

router.post('/findpost', async function (req, res) {
    try {
        let a = await postapi.findpost(req.body);
        res.send(a[0]);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

router.post('/updatelike', async function (req, res) {
    try {
        if (req.body.todo == '$push') {
            let a = await postapi.like(req.body);
        }
        if (req.body.todo == '$pull') {
            let a = await postapi.unlike(req.body);
        }
        let x = {
            _id: req.body._id
        }
        let b = await postapi.findpost(x);
        res.send(b[0]);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

router.post('/newcomment', async function (req, res) {
    try {
        let n = await userapi.finduser(req.body)
        let name = n[0].firstname + ' ' + n[0].lastname
        let data = {
            _id: req.body._id,
            name: name,
            comment: req.body.comment
        }
        let a = await postapi.newcomment(data);
        res.send(a);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

router.post('/search', async function (req, res) {
    try {
        let n = await postapi.search(req.body)
        res.send(n)
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = router;