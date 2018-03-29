const userdb = require('../schemas/categoryschema');

module.exports = {
    newpost: function(data){
        return new Promise((res, rej) => {
            userdb.create(data, function(err, result){
                if(err){
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    },
    findpost: function(){
        return new Promise((res, rej) => {
            userdb.find({}, function(err, result){
                if(err){
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    },
}