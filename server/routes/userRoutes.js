import express from 'express'
import { getCars, getUserData, loginUser, registerUser } from '../controller/userController.js'
import { protect } from '../middleware/auth.js'


export const userRoutes = express.Router()

userRoutes.post('/register',registerUser)
userRoutes.post('/login',loginUser)
userRoutes.get('/data',protect,getUserData)
userRoutes.get('/cars',getCars)