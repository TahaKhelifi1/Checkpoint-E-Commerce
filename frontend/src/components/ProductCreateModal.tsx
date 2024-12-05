import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import IProduct from '../interfaces/product';

interface ProductCreateModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (newProduct: Omit<IProduct, '_id'>) => void;
}

const ProductCreateModal: React.FC<ProductCreateModalProps> = ({ show, onClose, onCreate }) => {
  const [formData, setFormData] = useState<Omit<IProduct, '_id'>>({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    category: '',
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle create
  const handleCreate = () => {
    onCreate({
      ...formData,
      price: parseFloat(formData.price.toString()),
      stock: parseInt(formData.stock.toString(), 10),
    });
    setFormData({
      name: '',
      price: 0,
      stock: 0,
      description: '',
      category: '',
    }); // Reset form
    onClose(); // Close modal
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Create Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductCreateModal;
