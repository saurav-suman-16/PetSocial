const mongoose = require('mongoose');
const schema = mongoose.Schema({
    category:{type:String, unique:true},
    imagename:{type:String},
    src:{type:String}
});

module.exports = mongoose.model('categories',schema);