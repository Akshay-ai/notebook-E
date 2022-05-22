const express = require('express');
const User = require('../models/User')
const router  = express.Router();
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchData = require('../middleware/fetchdata')

const jwtSecret = "asdfghjkl;";

//Createing a user using POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name','UserName should have atleast 3 characters').isLength({min : 3}),
    body('email','Email is incorrect').isEmail(),
    body('password','Password should have atleast 8 characters' ).isLength({min : 8}),
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    //check weather the email with user already exists
    try{
        let success = false;
        let user = await User.findOne({email : req.body.email});
        if(user){
            return res.status(400).json({success, error:'Email already exists'})
        }
        const salt = await bcrypt.genSalt(10);
        let setPass = await bcrypt.hash(req.body.password,salt);

        //Create a user
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:setPass,
        });
        console.log(user._id);
        const data = {
            user : {
                id : user.id,
            }
        }
        const authToken = jwt.sign(data,jwtSecret);
        console.log(authToken);
        success = true;
        res.json({success, authToken})
        // res.json({"Success" : "Created account",user});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error Occured")
    }
    // .then(user => res.json(user))
    // .catch(err => res.json({error : 'This Email is already used', message : err.message}));
});

router.post('/login',[
    body('email','Email is incorrect').isEmail(),
    body('password','Password should not be blank' ).exists(),
],async (req,res) => {
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user) {
            res.status(400).json({error : "Login with correct details"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare) {
            res.status(400).json({error : "Login with correct details"});
        }
        const data = {
            user : {
                id : user.id,
            }
        }
        const authToken = jwt.sign(data,jwtSecret);
        success = true;
        res.json({success, authToken})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error Occured")
    }
});

router.post('/getuser', fetchData, async(req, res) => {
    try {
        console.log("req.user.id : ", req.user.id);
        var userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.status(200).send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error Occured")
    }
});

module.exports = router;