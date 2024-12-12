import express, { Router, Request, Response } from 'express'
import Basket, { IBasket } from '../models/Basket'

const router : Router = express.Router()

// 
router.get('/:username', async (req: Request, res:Response) : Promise<void> => {
    if(req.params.username == undefined) {
        res.status(500).json({message:" Username is not found"})
    }

    try {
        let basket : IBasket| null  = await Basket.findOne({userName : req.params.username})
        if (basket == null) {
            let newBasket = await Basket.create({
                userName : req.params.username, 
                products : [],
                total : 0
            })
            res.json(newBasket)
        }
        res.json(basket)
    } catch(err) {
        res.status(500).json({message: err instanceof Error ? err.message : 'Error'})
    } 

})


export default router