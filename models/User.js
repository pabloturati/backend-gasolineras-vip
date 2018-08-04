const passportLocalMongoose = require('passport-local-mongoose');
const Schema = require('mongoose').Schema;

const userSchema = new require('mongoose').Schema({
    username: String,
    photoURL: String,
    email: String,
    photoURL:{
        type:String,
        default: 'https://image.freepik.com/free-icon/male-user-profile-picture_318-37825.jpg'
    }, 
    facebookId: String,
    purchases:[{
        type: Schema.Types.ObjectId,
        ref: "Sale"
    }], 
    profile:{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    role:{
        type: String,
        enum: ['USER', 'EDITOR', 'ADMIN'],
        default: 'USER'
    },
    products:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.plugin(passportLocalMongoose, {usernameField:'email'})

module.exports = require('mongoose').model('User', userSchema);