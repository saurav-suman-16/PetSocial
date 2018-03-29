const userdb = require('../schemas/postschema');

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
    findall: function(){
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
    finduserall: function(data){
        return new Promise((res, rej) => {
            userdb.find({email: data.email}, function(err, result){
                if(err){
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    },
    findpost: function(data){
        return new Promise((res, rej) => {
            userdb.find(data, function(err, result){
                if(err){
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    },
    like: function(data){
        return new Promise((res, rej) => {
            userdb.update({_id: data._id}, {$push: {like: data.email}} , function(err, result){
                if(err){
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    },
    unlike: function(data){
        return new Promise((res, rej) => {
            userdb.update({_id: data._id}, {$pull: {like: data.email}} , function(err, result){
                if(err){
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    },
    newcomment: function(data){
        return new Promise((res, rej) => {
            userdb.update({_id: data._id},{$push: {comment: data}} , function(err, result){
                if(err){
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    },
    search: function(data){
        return new Promise((res, rej) => {
            userdb.find({description: {$regex:`.*${data.key}*.`}}, function(err, result){
                if(err){
                    rej(err);
                } else {
                    res(result);
                }
            })
        })
    }
}