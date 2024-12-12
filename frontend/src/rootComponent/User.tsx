import { useEffect, useState } from "react"
import IProduct from "../interfaces/product"
import { fetchProducts } from "../services/api/products"
import ProductCreateModal from "../components/ProductCreateModal"
import ProductCard from "../components/productCard"
import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import IBasket from "../interfaces/basket"
import { addToBasket, fetchBasketByUsername, getBasketDetails, removeFromBasket, updateBasketQuantity } from "../services/api/basket"

function User () {
    const [basket, setBasket] = useState<IBasket | null>(null)
    const [products, setProducts] = useState<IProduct[]>([])
    const [showBasket, setShowBasket] = useState<boolean>(false)
    
    async function loadProducts() : Promise<void>{
      const {data} : any = await fetchProducts()
      setProducts(data)
    }
    async function loadBasket() : Promise<void>{
      const {data} : any = await fetchBasketByUsername('admin')
      const basket: IBasket = await getBasketDetails(data)
      setBasket(basket)
    }

      // Handle modal visibility
    const handleShowBasket = () => setShowBasket(true);
    const handleCloseBasket = () => setShowBasket(false);


    const updateQuantity = (index: number, newQuantity: number) => {
      if (basket) {
        const updatedProducts = [...basket.products];
        updatedProducts[index].quantity = newQuantity;

        const filteredProducts = updatedProducts.filter((item) => item.quantity > 0);
        const newTotal = filteredProducts.reduce(
          (sum, item) =>
            sum +
            (typeof item.product === "object" && item.product !== null
              ? (item.product as IProduct).price
              : 0) *
              item.quantity,
          0
        );
    
        setBasket({ ...basket, products: filteredProducts, total: newTotal });

        updateBasketQuantity(
          basket.userName,
          typeof updatedProducts[index].product === "object"
            ? (updatedProducts[index].product as IProduct)?._id ?? ""
            : (updatedProducts[index].product as string),
          newQuantity
        )
      }
    };


    const handleRemoveProduct = (index: number) => {
      if (basket) {
        const updatedProducts = [...basket.products];
    
        const productToRemove = updatedProducts[index];
    
        // Remove the product from the array
        updatedProducts.splice(index, 1);
    
        // Recalculate the total
        const newTotal = updatedProducts.reduce(
          (sum, item) =>
            sum +
            (typeof item.product === "object" && item.product !== null
              ? (item.product as IProduct).price
              : 0) *
              item.quantity,
          0
        );
    
        // Update the state
        setBasket({ ...basket, products: updatedProducts, total: newTotal });
    
        // Remove from the backend
        removeFromBasket(
          basket.userName,
          typeof productToRemove.product === "object"
            ? (productToRemove.product as IProduct)?._id ?? ""
            : (productToRemove.product as string)
        );
      }
    };

    useEffect(()=> {
      loadProducts()
      loadBasket()
    }, [])
    
    async function handleAddToBasket(productId: string): Promise<void> {
      const { data }: any = await addToBasket("admin", productId);
      const basket: IBasket = await getBasketDetails(data)

      setBasket(basket);
    }
    
    return (
    <Container className="my-4">
        <h1 className="mb-4">Available Products</h1>
        <Button variant="primary" className="mb-4" onClick={handleShowBasket}>
            View Basket
          </Button>
        <Row>
        {products && products.map((product : IProduct) => {
           return (
            <Col key={product._id} md={4} className="mb-4">
                <ProductCard product={product}
                onAddToBasket = {() => handleAddToBasket(product._id!)}
                />
            </Col>
           )
        })}
        </Row>
        {/* Basket Modal */}
      <Modal show={showBasket} onHide={handleCloseBasket} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Basket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {basket && basket.products.length > 0 ? (
            <div>
              {basket.products.map((item, index) => {
                if(typeof item.product === "object")
                  return (
                    <div key={item.product._id} className="d-flex justify-content-between mb-3">
                      <div>
                        <strong>{item.product.name}</strong>
                        <p>Quantity: {item.quantity}</p>  
                        <button
                          className="btn btn-sm btn-outline-secondary mx-1"
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <Button
                        onClick={() => handleRemoveProduct(index)}
                        variant="outline-warning"
                      >
                        Remove
                      </Button>
                      </div>
                      <div>
                        <p>${item.product.price}</p>
                      </div>
                    </div>
                  )
               })}
              <div className="mt-3">
                <h5>Total: ${basket.total.toFixed(2)}</h5>
              </div>
            </div>
          ) : (
            <p>Your basket is empty.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBasket}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    )
    
}

export default User