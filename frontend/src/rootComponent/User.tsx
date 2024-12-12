import { useEffect, useState } from "react"
import IProduct from "../interfaces/product"
import { fetchProducts } from "../services/api/products"
import ProductCreateModal from "../components/ProductCreateModal"
import ProductCard from "../components/productCard"
import { Col, Container, Row } from "react-bootstrap"

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
    <Container className="my-4">
        <h1 className="mb-4">Available Products</h1>
        <Row>
        {products && products.map((product : IProduct) => {
           return (
            <Col key={product._id} md={4} className="mb-4">
                <ProductCard product={product}/>
            </Col>
           )
        })}
        </Row>
    </Container>
    )
    
}

export default User