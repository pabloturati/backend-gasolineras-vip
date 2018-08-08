
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    customer:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }, 
    operation: String,
    serviceChoice: String,
    location: String,
    installDetail: String,
    orderStatus:{
        type: String,
        enum: ["open","closed","cancelled"],
        default: "open"
    },
    servicedBy:{
        type: String,
        default: "Pending assignation"
    },
    servicedDate: {
        type:String,
        default: "Not yet completed"
    }
},{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
})

module.exports = mongoose.model('Sale', saleSchema)