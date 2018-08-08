const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');



function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        //console.log(req.user)
        return next()
    }else{
        res.json({message:"User not allowed. Login to see this content"});
    }
}
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('/private')
    }else{
        next();
    }
}
router.post('/facebook/login', 
passport.authenticate('facebook-token'),
 (req,res)=>{
    res.json(req.user)
    // console.log("FACEBOOK LOGIN POST RESULT" + req.user)
})

router.get('/profile', isAuthenticated, (req,res, next)=>{
    User.findById(req.user._id)
    // .populate('profile')
    // .populate('products')
    .then(user=>{
        res.send(user);
        //res.json(user)
    })
    .catch(e=>next(e))
})

router.get('/logout', (req,res,next)=>{
    //console.log("session closed")
    req.logout();
    req.session.destroy(()=>
        res.send('Session Closed')
    )
    // console.log(req.user)
})

router.get('/loggedUser', isAuthenticated, (req,res)=>{
    // console.log("LOGGED USER POST RESULT" + req.user)
    User.findById(req.user._id)
    .populate('purchases')
    .then(user=>{
        // console.log(user)
        return res.json(user)
        
    })
    .catch(e=>console.log(e))
})

router.post('/login', passport.authenticate('local'), (req,res,next)=>{
    //console.log(req.user)
    res.json(req.user);
})

router.post('/signup', (req,res,next)=>{
    User.register(req.body, req.body.password)
    .then(user=>{
        res.json(user)
    })
    .catch(e=>next(e));
})


module.exports = router;