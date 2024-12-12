import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import IProduct from "../interfaces/product"
import { fetchProductById } from "../services/api/products"
import { Button, Card, Container } from "react-bootstrap"
import IBasket from "../interfaces/basket"
import { addToBasket, fetchBasketByUsername } from "../services/api/basket"

const ProductDetails = () => {
    const {id} = useParams<{id: string}>()
    const [product, setProduct] = useState<IProduct|null> (null)
    const [basket, setBasket] = useState<IBasket | null>(null)

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
        async function loadBasket() : Promise<void>{
            const {data} : any = await fetchBasketByUsername('admin')
            setBasket(data)
          }

        loadProduct()
        loadBasket()
    }, [id])

    const onAddToBasket =  async () => {
        const { data }: any = await addToBasket("admin", id ?? '');
        
        setBasket(data);
    }
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
            <Button onClick={onAddToBasket} variant="primary">Add to Basket</Button> 

          </Card.Body>
        </Card>
      </Container>
    )
}

export default ProductDetails