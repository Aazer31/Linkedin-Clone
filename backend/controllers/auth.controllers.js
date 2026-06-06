import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import genToken from "../config/token.js";

export const signUp = async (req, res) => {
    try {
        let {firstname, lastname, username,  email, password} = req.body;
        let existEmail = await User.findOne({email});
        if(existEmail){
            return res.status(400).json({message: "Email already exists !"});
        }

        let existUsername = await User.findOne({username});
        if(existUsername){
            return res.status(400).json({message: "Username already exists !"});
        }

        if(password.length < 8){
            return res.status(400).json({message: "Password must be at least 8 characters !"});
        }

        let hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword
        })
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENVIRONMENT === "production" 
        })
        return res.status(201).json(user);
    }catch (error) {
        return res.status(500).json({message: error.message});
    }    
};  



export const login = async (req, res) => {
   try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist !"});
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Incorrect password !"});
        }

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENVIRONMENT === "production" 
        })
        return res.status(200).json(user);
    }catch (error) {
        return res.status(500).json({message: error.message});
    }    
};  


export const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "Logged out successfully !"});
    }catch (error) {
        return res.status(500).json({message: error.message});
    }    
}
     