import { Router } from 'express'
import { saveUser } from '../controller/user'

const userRouter = Router()

userRouter.post("/register", saveUser)

export default userRouter