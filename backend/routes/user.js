const express = require("express");
const zod =require("zod");
const {User} = require('../db');
const jwt = require("jsonwebtoken");


const router =express.Router();
const signupBody =zod.object({
username:zod.string().email(),
    password : zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})
router.post("/signup",async(req,res)=>{
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg :"please enter valid credentials"
        })
    }
    // console.log(req.body);
    const existingUser =await User.findOne({
        username:req.body.username
    })
    // console.log(existingUser);
    if(existingUser){
        return res.status(411).json({
            msg :"User already exist"
        })
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId = user._id;
    const token =jwt.sign({userId},"arsalan_secret")
    
    return res.json({
        msg :"user created successfully",
        token:token
    })
})
const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string()
})
router.post("/signin",async(req,res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"Invalid credentials"
        })
    }
    const existingUser = await User.findOne({
        username : req.body.username
    })
    if(!existingUser){
        return res.status(411).json({
            msg:"user doesn't exist"
        })
    }
    const token = jwt.sign({
        userId : existingUser._id
    },"arsalan_secret")
    return res.json({
        token
    })
})

module.exports =router;