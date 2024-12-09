import IProduct from '../interfaces/product';
import { Table, Button } from 'react-bootstrap';

interface ProductListProps {
    products: IProduct[];
    onDelete: (id: string) => void;
    onEdit: (product: IProduct) => void;
  }

const ProductList : React.FC<ProductListProps> = ({products, onDelete, onEdit}) => {
 return(
    <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Price</th>
        <th>Stock</th>
        <th>URL</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {products && products.map((product, index) => (
        console.log(product),
         <tr key={product._id}>
          <td>{index + 1}</td>
          <td>{product.name}</td>
          <td>${product.price.toFixed(2)}</td>
          <td>{product.stock}</td>
          <td>{product.url || 'No image URL provided'}</td>
          <td>
              <Button
                variant="primary"
                size="sm"
                className="me-2"
                onClick={() => onEdit(product)}
              >
                Update
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => product._id && onDelete(product._id)}
              >
                Delete
              </Button>
            </td>
        </tr>
      ))}
    </tbody>
  </Table>
 )   
}

export default ProductList