import express, { Router, Request, Response } from 'express'
import bycrpt from "bcryptjs"
import User from '../models/User'
import jwt from "jsonwebtoken"
const router : Router = express.Router()
const JWT_SECRET = "jwt_secret"


// User registration

router.post("/register", async (req, res) => {
    const {username, password, role} = req.body
    try {
        const hashedPwd = await bycrpt.hash(password, 10)
        let newUser = new User({username: username, password:hashedPwd, role: role ?? "user"})
        newUser.save()
        res.status(201).json({message: "User registered"})
    } catch (err) {
        res.status(500).json({message: err instanceof Error ? err.message : 'Error'})
    }
})


router.post("/login", async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.findOne({username: username})
        if (!user) {
            res.status(404).json({message: "user not found"})
            return
        }
        const isPasswordValid = await bycrpt.compare(password, user.password)
        if(!isPasswordValid) {
            res.status(401).json({message: "invalid password"})
            return
        }
        console.log(user)
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role} , JWT_SECRET, {
            expiresIn: "1h"
        })
        res.status(200).json({token})
    } catch (err){
        res.status(500).json({message: err instanceof Error ? err.message : 'Error'})
    }
})


// Middleware 
export const verifyJWT = (req:any , res:any , next:any ) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        res.status(401).json({message : "Unauthorized"})
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        next()
    } catch(err){
        res.status(500).json({message: err instanceof Error ? err.message : 'Error'})
    }
}

export default router