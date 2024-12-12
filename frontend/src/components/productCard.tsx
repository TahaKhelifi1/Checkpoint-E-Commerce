import { Button, Card } from "react-bootstrap";
import IProduct from "../interfaces/product";
import { Navigate, useNavigate } from "react-router";

interface ProductCardProps {
    product : IProduct
    onAddToBasket : () => void
}


const ProductCard: React.FC<ProductCardProps> = ({product, onAddToBasket}) => {
    const navigate = useNavigate()
    const goToProductDetails = (id : string) => {
        navigate(`/product/${id}`)
    }
    return (
        <Card className="product-card h-100">
            <Card.Img className="card-img-custom" variant="top" src={product.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D'} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                price: {product.price}
                <br/>
                stock: {product.stock}
                <br/>
                description: {product.description || ''}
                </Card.Text>
                <Button onClick={()=> goToProductDetails(product._id!)} variant="primary">Go to the product</Button> 
                <Button onClick={onAddToBasket} variant="primary">Add to Basket</Button> 
            </Card.Body>
        </Card>
    )
}

export default ProductCard