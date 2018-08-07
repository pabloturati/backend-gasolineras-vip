
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    customer:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }, 
    operation: String,
    location: String,
    detail: String,
    orderStatus:{
        type: String,
        enum: ["open","closed"],
        default: "open"
    },
    attendedBy: String,
    attendedDate: String
},{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
})
module.exports = mongoose.model('Report', reportSchema)