const mongoose = require('mongoose');
const schema = mongoose.Schema({
    uploadername:{type:String},
    email:{type:String},
    categoty:{type:String, default:'OTHER'},
    description:{type:String},
    time:{type:Date, default:new Date()},
    imagename:{type:String},
    src:{type:String},
    like:{type:Array},
    comment:[{
        name:{type:String},
        comment:{type:String}
    }]
});

module.exports = mongoose.model('posts',schema);