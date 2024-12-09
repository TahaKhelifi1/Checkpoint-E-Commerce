import { useEffect, useState } from "react"
import IProduct from "../interfaces/product"
import { fetchProducts } from "../services/api/products"
import ProductCreateModal from "../components/ProductCreateModal"
import ProductCard from "../components/productCard"

function User () {

    const [products, setProducts] = useState<IProduct[]>([])
    async function loadProducts() : Promise<void>{
        const {data} : any = await fetchProducts()
        setProducts(data)
      }
      useEffect(()=> {
        loadProducts()
      }, [])
    
    return (
    <div>
        {products && products.map((product : IProduct) => {
           return (
            <div key={product._id}>
                <ProductCard product={product}/>
            </div>
           )
        })}
    </div>
    )
    
}

export default User