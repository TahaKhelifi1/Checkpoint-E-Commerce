import React, { useEffect, useState } from 'react';
import '../App.css';
import ProductList from '../components/productList';
import IProduct from '../interfaces/product';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../services/api/products';
import { Container, Button } from 'react-bootstrap';
import ProductUpdateModal from '../components/ProductUpdateModal';
import ProductCreateModal from '../components/ProductCreateModal';
function Administration() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [editProduct, setEditProduct] = useState<IProduct | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  async function loadProducts() : Promise<void>{
    const {data} : any = await fetchProducts()
    setProducts(data)
  }
  useEffect(()=> {
    loadProducts()
  }, [])

  const handleDelete = async (id: string): Promise<void> => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product._id !== id));
  };
  
  const handleUpdate = async (id: string, updatedProduct: IProduct): Promise<void> => {
    const {data} : any = await updateProduct(id, updatedProduct);
    setProducts(
      products.map((product) =>
       {
        return product._id === data._id ? data : product
       }
      )
    );
    setEditProduct(null); // Close modal
  };

  const handleCreate = async (newProduct: Omit<IProduct, '_id'>): Promise<void> => {
    const {data} : any = await createProduct(newProduct);
    setProducts([...products, data]);
    setShowCreateModal(false);
  };
  
  return (
    <Container>
      <h1 className="my-4">Product Management</h1>
      <Button variant="success" className="mb-4" onClick={() => setShowCreateModal(true)}>
        Create New Product
      </Button>
      <ProductList products={products} onDelete={handleDelete} onEdit={(product) => setEditProduct(product)} ></ProductList>
      {editProduct && (
        <ProductUpdateModal
          show={!!editProduct}
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={handleUpdate}
        />
      )}

    <ProductCreateModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreate}
      />
    </Container>
  );
}

export default Administration;
