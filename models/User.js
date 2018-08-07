
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = require('mongoose').Schema;

const userSchema = new require('mongoose').Schema({
    username: String,
    photoURL: String,
    email: String,
    photoURL:{
        type:String,
        default: 'https://cdn150.picsart.com/upscale-245339439045212.png?r1024x1024'
        //default: '../public/assets/profileSample.png'
    }, 
    address:{
        type:String,
        default: "Mexico City"
    },
    facebookId: String,
    purchases:[{
        type: Schema.Types.ObjectId,
        ref: "Sale"
    }],
    role:{
        type: String,
        enum: ['USER', 'EDITOR', 'ADMIN'],
        default: 'USER'
    },
    reports:[{
        type: Schema.Types.ObjectId,
        ref: "Report"
    }]
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.plugin(passportLocalMongoose, {usernameField:'email'})
module.exports = require('mongoose').model('User', userSchema);