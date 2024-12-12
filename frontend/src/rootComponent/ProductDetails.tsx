import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import IProduct from "../interfaces/product"
import { fetchProductById } from "../services/api/products"
import { Card, Container } from "react-bootstrap"

const ProductDetails = () => {
    const {id} = useParams<{id: string}>()
    const [product, setProduct] = useState<IProduct|null> (null)
    const navigate = useNavigate()
    useEffect (() => {
        const loadProduct = async () => {
            if(id) {
                try {
                    const {data} : any = await fetchProductById(id)
                    setProduct(data)
                }
                catch (err) {
                    navigate(-1)
                }
                
            }
        }
        loadProduct()
    }, [id])

    if (!product) {
        return <Container>Loading ....</Container>
    }
    return (
        <Container className="my-4">
        <Card className="product-card h-100">
        <Card.Img className="card-img-custom" variant="top" src={product.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D'} />
        <Card.Body className="d-flex flex-column">
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              <strong>Price:</strong> ${product.price.toFixed(2)} <br />
              <strong>Stock:</strong> {product.stock} <br />
              <strong>Category:</strong> {product.category} <br />
              <strong>Description:</strong> {product.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    )
}

export default ProductDetails