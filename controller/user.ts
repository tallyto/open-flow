import * as jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import userModel from '../schemas/user'
import bcrypt from 'bcrypt'

export const login = async (username, password) => {
    const user = await userModel.find({ user: username })
    console.log("user", user)
    if (user.length > 0) {
        const match = await bcrypt.compare(password, user[0].password)
        if (match) {
            const token = jwt.sign({ user: user[0].user, username: user[0].user }, "foobar", {
                expiresIn: '7d'
            })
            return token
        } else {
            return 'wrong password'
        }
    } else {
        return 'user not found'
    }
}

export const saveUser = async (req: Request, res: Response) => {
    const { user, email, password } = req.body
    const userExist = await userModel.find({ email: email })
    if (userExist.length > 0) {
        return res.status(401).json({ message: 'e-mail already registered' })
    }
    const passwordHash = await bcrypt.hash(password, 8)
    const result = await userModel.create({
        email, user, password: passwordHash
    })
    result.password = ""
    return res.json(result)
}