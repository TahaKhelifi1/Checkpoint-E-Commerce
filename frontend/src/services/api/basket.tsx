import axios from "axios";
import IBasket from "../../interfaces/basket";
import { fetchProductById } from "./products";

const API : any = axios.create({baseURL: 'http://localhost:5000/api/basket'})

export const fetchBasketByUsername = (username: string) : IBasket => API.get(`/${username}`)
export const addToBasket = (username: string, productId: string) => API.post(`/${username}/add`, {productId : productId})
export const removeFromBasket = (username: string, productId: string) => API.delete(`/${username}/remove`, {productId : productId})
export const updateBasketQuantity = (username: string, productId: string, quantity: number) => API.put(`/${username}/update`, {
    productId : productId,
    quantity : quantity
})

export async function getBasketDetails(basket: IBasket) {
    const detailedProducts = await Promise.all(
      basket.products.map(async (item) => {
        if (typeof item.product === "string"){
            console.log("xxx")
            const {data} : any = await fetchProductById(item.product); 
            return {
              ...item,
              product: data, 
            };
        }
       
      })
    );
  
    return { ...basket, products: detailedProducts } as IBasket;
  }