const express = require('express')
const router = express.Router()
const Sale = require('../models/Sale')
const isAuthenticated =require('./auth')
const User = require('../models/User')

//Returns all sales
router.get('/', (req, res) => {
    Sale.find()
    .then(sales => {
        return res.status(200).json(sales); //200: The request was fulfilled.                       
    })
    .catch(e => next(e))
});
//Post new sale with it's user
router.post('/', (req, res) => {
    console.log('el user', req.user)
    let thisItem = req.body
    req.body.customer = req.user._id

    Sale.create(thisItem)
    .then(item => {
        User.findByIdAndUpdate(req.user._id, {$push:{purchases: item}}, {new:true})
        .then(u=>{
            console.log(u)
            return res.status(201).json(u)
        }).catch(e =>console.log(e))
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json(err)
    })                 
})
//get one sale
router.get('/:id', (req, res) => {
    Sale.findById(req.params.id)
        .then(sale => {
            if (!sale) return res.status(404)
            return res.status(200).json(sale);
        })
        .catch(err => {
            return res.status(500).json(err);
        });
});
//Delete sale
router.delete('/:id', (req, res, next) => {
    Sale.findByIdAndRemove(req.params.id)
        .then(sale => {
            res.status(200).json(sale)
        })
        .catch(e=>{
            res.status(500).json({message:"delete failed"})
            next(e)
        });
});


module.exports = router


// EDIT A SALE. Not implemented
// /* 
//     this route make an update to the model phone, 
//     but respect the filed even when they don't come in the update
// */
// router.put('/:id', (req, res, next) => {
//     Phone.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         .then(phone => {
//             return res.status(202).json(phone)
//         }).catch(err => {
//             return res.status(404).json(err);
//         });
// })


