import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { createToken } from "../utils/token-manager.js"


export const getAllUsers = async (req, res, next) => {

    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        res.json(error.message)
    }
    
}


export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const existing = await User.findOne({ email })
        if (existing) return res.status(401).json({ message: "User already registered" })
        
        const hashedPassword = bcrypt.hashSync(password, 10)
        const user = new User({ name, email, password: hashedPassword }) 
        await user.save()

        res.clearCookie("auth_token", {
            path: '/',
            httpOnly: true,
            signed: true,
            sameSite: "none",
            secure: true,
        })


        const token = createToken(user._id.toString() , user.email , "7d")
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie("auth_token", token, {
            path: '/',
            expires,
            httpOnly: true,
            signed: true,
            sameSite: "none",
            secure: true,
        })

        res.status(201).json({ message :'User Created Successfully!' , name: user.name , email: user.email})
    } catch (error) {
        res.json({error: error.message})
    }
}


export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ message: " User not registered" })
        
        const validPassword =  bcrypt.compareSync(password, user.password)
        if (!validPassword) return res.status(403).json({ message: "Invalid Password" })
        
        
        res.clearCookie("auth_token", {
            httpOnly: true,
            // domain: "localhost",
            signed: true,
            path: "/",
            sameSite: "none",
            secure: true,
            
        });


        const token = createToken(user._id.toString() , user.email , "7d")
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie("auth_token", token, {
            path: "/",
            // domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
            sameSite: "none",
            secure: true,
        });


        res.status(200).json({ message: 'User Logged in Successfully!', name: user.name , email: user.email })
    } catch (error) {
        res.json({error: error.message})
    }
}


export const userVerify = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        console.log(user)
        if (!user) return res.status(401).json({ message: " User not registered or Token Failed " })
        
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: " Permissions did not match" })
        }
        
        res.status(200).json({ message: 'User Logged in Successfully!', name: user.name , email: user.email })
    } catch (error) {
        console.log(error.message)
        res.json({error: error.message})
    }
}


export const userLogout = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) return res.status(401).json({ message: " User not registered or Token Failed " })
        
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: " Permissions did not match" })
        }
        

        res.clearCookie("auth_token", {
            path: '/',
            httpOnly: true,
            signed: true,
            sameSite: "none",
            secure: true,
        })
        res.status(200).json({ message: 'User Logged out successfully!'})
    } catch (error) {
        res.json({error: error.message})
    }
}