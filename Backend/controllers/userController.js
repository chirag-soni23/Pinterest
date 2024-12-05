import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { TryCatch } from "../utils/TryCatch.js";
import { generateToken } from "../utils/generateToken.js";

// Register 
export const registerUser = TryCatch(async(req,res)=>{
    const {name,email,password} = req.body;
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({message:"Already have an account"})
    };
    const hashPassword = await bcrypt.hash(password,10);
    user = await User.create({
        name,email,password:hashPassword
    });
    
    // JSON Web Token
    generateToken(user._id,res);
    res.status(200).json({user,message:"User registered successfully!"});
})

// Login
export const loginUser = TryCatch(async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Email or Password is incorrect"});
    }
    const comparePassword = await bcrypt.compare(password,user.password);
    if(!comparePassword){
        return res.status(400).json({message:"Email or Password is incorrect"})
    };
    // JSON Web Token
    generateToken(user._id,res);
    res.json({
        user,
        message:"User Logged in successfully!"
    })
})

// my profile
export const Myprofile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.user._id);
    res.json(user);
})

// user profile
export const userProfile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
})


// follow and unfollow
export const followAndUnfollowUser = TryCatch(async(req, res) => {
    const userId = req.params.id;
    const loggedInUserId = req.user._id;

    const user = await User.findById(userId);
    const loggedInUser = await User.findById(loggedInUserId);

    if (!user) {
        return res.status(400).json({ message: "No user with this id" });
    }

    if (user._id.toString() === loggedInUser._id.toString()) {
        return res.status(400).json({ message: "You cannot follow yourself" });
    }

    if (user.followers.includes(loggedInUser._id)) {
        const indexFollowing = loggedInUser.following.indexOf(user._id);
        const indexFollowers = user.followers.indexOf(loggedInUser._id);
        loggedInUser.following.splice(indexFollowing, 1);
        user.followers.splice(indexFollowers, 1);
        await loggedInUser.save();
        await user.save();
        res.json({ message: "User Unfollowed" });
    } else {
        loggedInUser.following.push(user._id);
        user.followers.push(loggedInUser._id);
        
        await loggedInUser.save();
        await user.save();
        res.json({ message: "User followed" });
    }
});

// logout
export const logout = TryCatch(async(req,res)=>{
    res.cookie("token","",{maxAge:0});
    res.json({
        message:"Logged out succesfully!"
    })
})
