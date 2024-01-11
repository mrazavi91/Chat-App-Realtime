import User from "../models/User.js"
import { NextFunction } from "express";
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";


export const generateChatCompletion = async (req, res, next) => {
    
    try {
        const { message } = req.body
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) return res.status(401).json({ message: " User not registered or Token Failed " })
        
        //step 1: get the user chats 
        const chats =  user.chats.map(({ role, content }) => ({role, content})) as ChatCompletionMessageParam[]
        chats.push({ content: message, role: 'user' })
        user.chats.push({ content: message, role: 'user' })
        //step 2: send to openai + step3: get the response and save
        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_SECRET,
            organization: process.env.OPENAI_ORGANISATION_ID
        });

        const openAIRes = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        console.log(openAIRes.choices[0].message);


        user.chats.push(openAIRes.choices[0].message)
        await user.save()
        res.status(200).json({chats: user.chats})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Something went wrong"})
    }
    
} 



export const sendChatUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) return res.status(401).json({ message: " User not registered or Token Failed " })
        
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: " Permissions did not match" })
        }
        
        res.status(200).json({ message: 'Can have data', chats: user.chats})
    } catch (error) {
        res.json({error: error.message})
    }
}


export const deleteChatUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) return res.status(401).json({ message: " User not registered or Token Failed " })
        
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: " Permissions did not match" })
        }
        //@ts-ignore
        user.chats = []
        await user.save()
        res.status(200).json({ message: 'Chat Deleted Successfully!'})
    } catch (error) {
        res.json({error: error.message})
    }
}
