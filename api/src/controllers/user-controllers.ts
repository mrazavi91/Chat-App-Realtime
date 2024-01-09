import User from "../models/User.js"
import bcrypt from 'bcrypt'

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
        const hashedPassword = bcrypt.hashSync(password, 10)
        const user = new User({ name, email, password: hashedPassword }) 
        await user.save()
        res.status(201).json({ message :'User Created Successfully!' , id: user._id.toString()})
    } catch (error) {
        res.json({error: error.message})
    }
}