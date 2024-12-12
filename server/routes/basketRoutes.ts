import express, { Router, Request, Response } from 'express'
import Basket, { IBasket, IProductQuantity } from '../models/Basket'
import Product, { IProduct } from '../models/Product'
import mongoose from 'mongoose'

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
            newBasket.save()
            res.json(newBasket)
        }
        res.json(basket)
    } catch(err) {
        res.status(500).json({message: err instanceof Error ? err.message : 'Error'})
    } 

})

router.post('/:username/add', async (req, res) => {
    try {
        const { productId } = req.body;
    
        let basket = await Basket.findOne({ userName: req.params.username });
        console.log(req.params.username)
        if (!basket) {
            basket = new Basket({ userName: req.params.username});
        }
    
        const existingProductIndex = basket.products.findIndex((item) =>
            item.product == productId
        );
    
        if (existingProductIndex >= 0) {
            basket.products[existingProductIndex].quantity += 1;
        } else {
            basket.products.push({ product: productId, quantity: 1 } as IProductQuantity);
        }
    
        await basket.save();
        const populatedBasket = await basket.populate('products.product');
        res.status(201).json(populatedBasket);
        
      } catch (err) {
        res.status(500).json({message: err instanceof Error ? err.message : 'Error'})
      }
})

router.delete('/:username/remove', async (req, res) : Promise<void> => {
    try {
      const { productId } = req.body;
  
      const basket : IBasket | null = await Basket.findOne({ userName: req.params.username });
  
      if (basket == null) {
        res.status(404).json({ message: 'Basket not found' });
        return;
      }

      basket.products = basket?.products.filter((item) => !item.product == productId);
  
      await basket.save();
      const populatedBasket = await basket.populate('products.product');
      res.json(populatedBasket);
    } catch (err) {
        res.status(500).json({message: err instanceof Error ? err.message : 'Error'})
    }
  });

router.put('/:username/update', async (req, res) : Promise<void>=> {
    try {
        const { productId, quantity } = req.body;

        const basket = await Basket.findOne({ userName: req.params.username });

        if (!basket) {
            res.status(404).json({ message: 'Basket not found' });
            return
        }

        const productIndex = basket.products.findIndex((item) =>
            item.product == productId
        );

        if (productIndex < 0) {
            res.status(404).json({ message: 'Product not found in basket' });
            return
        }

        if (quantity <= 0) {
            basket.products.splice(productIndex, 1); // Remove if quantity is 0 or less
        } else {
        basket.products[productIndex].quantity = quantity;
        }

        await basket.save();
        const populatedBasket = await basket.populate('products.product');
        res.json(populatedBasket);
    } catch (err) {
        res.status(500).json({message: err instanceof Error ? err.message : 'Error'})
    }
});
export default router