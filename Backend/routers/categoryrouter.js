var path = require('path');
const express = require('express');
const router = express.Router();
const postapi = require('../apis/categoryapi');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './category')
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+"_"+file.originalname)
    }
});

const upload = multer({storage: storage});

router.post('/new', upload.single('acceptedFiles'), async function(req,res){
    let body = req.body;
    let file = req.file;
    try{
        let data = {
            category:body.category,
            imagename:file.filename,
            src:file.filename
        }
        let g = await postapi.newpost(data);
        res.send({res:"File Uploaded"});
    }
    catch(err){
        res.send(err);
    }
})

router.post('/find', async function(req, res){
    try{
        let a = await postapi.findpost();
        res.send(a);
    }
    catch(err){
        res.send(err);
    }
})

module.exports = router;