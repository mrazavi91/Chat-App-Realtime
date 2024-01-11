import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion, sendChatUser , deleteChatUser} from "../controllers/chat-controllers.js";

const chatRoutes = Router()

chatRoutes.post('/new', validate(chatCompletionValidator), verifyToken, generateChatCompletion)
chatRoutes.get('/all-chats' , verifyToken, sendChatUser)
chatRoutes.delete('/delete' , verifyToken, deleteChatUser)

export default chatRoutes

