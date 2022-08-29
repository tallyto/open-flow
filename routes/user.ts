import { Router } from 'express'
import { saveUser } from '../controller/User'

const userRouter = Router()

userRouter.post("/register", saveUser)

export default userRouter