import express, { Router, Request, Response } from 'express'
import Product, {IProduct} from '../models/Product';
import mongoose from 'mongoose';
const router : Router = express.Router()

// fetch all products 
router.get('/' , async (req:Request, res: Response): Promise<void> => {
    try{
        const products: IProduct[] = await Product.find();
        console.log(products)
        res.status(200).json(products)
    } catch(err) {
        res.status(500).json({message: err instanceof Error ? err.message : 'Error'})
    }
})

// get product by id
router.get('/:id', async (req: Request, res:Response) : Promise<void> => {
    try{
        let product : IProduct| null = await Product.findById(new mongoose.Types.ObjectId(req.params.id))
        if (product == null) {
            res.status(404).json({message: "Cannot find the product"})
        }
        res.json(product)
    } catch(err) {
        res.status(500).json({message: err instanceof Error ? err.message : 'Error'})
    }
})

// Create new Product
router.post('/', async (req: Request, res:Response) : Promise<void> => {
    try {
        const newProduct: IProduct = req.body as IProduct;
        let product = await Product.create(newProduct)
        res.status(201).json(product)
    } catch(err) {
        res.status(500).json({message: err instanceof Error ? err.message : 'Error'})
    } 

})

// Update product
router.put('/:id', async (req: Request, res:Response) : Promise<void> => {
    try {
        let product : IProduct | null = await Product.findByIdAndUpdate(new mongoose.Types.ObjectId(req.params.id), req.body, { new: true})
        res.json(product)
    } catch(err) {
        res.status(500).json({message: err instanceof Error ? err.message : 'Error'})
    } 
})

// Delete product
router.delete('/:id', async (req: Request, res:Response) : Promise<void> => {
    try {
        await Product.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id))
        res.json("Product deleted")
    } catch(err) {
        res.status(500).json({message: err instanceof Error ? err.message : 'Error'})
    } 
})


export default router