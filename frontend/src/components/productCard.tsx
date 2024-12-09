import { Button, Card } from "react-bootstrap";
import IProduct from "../interfaces/product";

interface ProductCardProps {
    product : IProduct
}


const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.url || ''} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                price: {product.price}
                <br/>
                stock: {product.stock}
                <br/>
                description: {product.description || ''}
                </Card.Text>
                <Button href={"/product/"+{product._id}}  variant="primary">Go to the product</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCard