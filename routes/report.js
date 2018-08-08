const express = require('express')
const router = express.Router()
const Report = require('../models/Report')
const isAuthenticated =require('./auth')
const User = require('../models/User')


//Returns all emergency reports
router.get('/', (req, res) => {
    Report.find()
    .then(report => {
        return res.status(200).json(report); //200: The request was fulfilled.                       
    })
    .catch(e => next(e))
});
//Find one report
router.get('/:id', (req, res) => {
    Report.findById(req.params.id)
    .then(report => {
        return res.status(200).json(report); //200: The request was fulfilled.                       
    })
    .catch(e => next(e))
});
//Find one report and cancel it
router.patch('/:id', (req, res) => {
    Report.findByIdAndUpdate(req.params.id,{orderStatus: "cancelled"}, {new: true})
    .then(report => {
        return res.status(200).json(report); //200: The request was fulfilled.                       
    })
    .catch(e => next(e))
});

//Post new report
router.post('/', (req, res) => {
    //Get the report item from the frontend package (req.body)
    let thisItem = req.body

    //Add the user Id to to the report ("customer" property)
    req.body.customer = req.user._id

    //Create the item
    Report.create(thisItem)
    .then(item => {
        User.findByIdAndUpdate(req.user._id, {$push:{reports: item}}, {new:true})
        .then(u=>{
            //Find the user to inform him of the new report
            return res.status(201).json(u)
        }).catch(e =>console.log(e))
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json(err)
    })                 
})

module.exports = router