import axios from "axios";
import IProduct from "../../interfaces/product";

const API: any = axios.create({baseURL: 'http://localhost:5000/api/product'})

export const fetchProducts = () : IProduct[] => API.get('/')
export const createProduct = (data:IProduct): IProduct => API.post('/', data)
export const updateProduct = (id:string, data:IProduct): IProduct => API.put(`/${id}`, data)
export const deleteProduct = (id:string): void => API.delete(`/${id}`)
export const fetchProductById = (id:string) : IProduct | null => API.get(`/${id}`)