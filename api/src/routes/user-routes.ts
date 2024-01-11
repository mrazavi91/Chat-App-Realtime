import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, userVerify } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router()

userRoutes.get('/', getAllUsers)
userRoutes.post('/signup', validate(signupValidator), userSignup)
userRoutes.post('/login', validate(loginValidator), userLogin)
userRoutes.get('/auth-status', verifyToken, userVerify)
userRoutes.get('/logout',verifyToken, userLogout)


export default userRoutes