import express, { Application } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import productRouter from './routes/productRoutes' /// router as productRouter
import basketRouter from './routes/basketRoutes'
import cors = require("cors");

dotenv.config()
let app : Application = express()
const PORT : number = parseInt(process.env.PORT || '5000', 10)
// config
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI || '')
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use('/api/product', productRouter)
app.use('/api/basket', basketRouter)
