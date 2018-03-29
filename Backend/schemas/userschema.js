const mongoose = require('mongoose');
const schema = mongoose.Schema({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, unique: true, required:true},
    password:{type:String, required:false},
    username:{type:String, required:false},
    verified:{type:Boolean, default: false},
    sex:{type:String, default:"Other"},
    description:{type:String, default:'Hi!'},
    imagename:{type:String, default:"timeline_img1.png"},
    src:{type:String, default:"timeline_img1.png"},
    googleid:{type:String}
});

module.exports = mongoose.model('users',schema);