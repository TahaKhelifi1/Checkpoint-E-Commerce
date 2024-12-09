import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import IProduct from '../interfaces/product';

interface ProductUpdateModalProps {
  show: boolean;
  product: IProduct | null;
  onClose: () => void;
  onSave: (id: string, updatedProduct: IProduct) => void;
}

const ProductUpdateModal: React.FC<ProductUpdateModalProps> = ({ show, product, onClose, onSave }) => {
  const [formData, setFormData] = useState<IProduct | null>(product);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Save changes
  const handleSave = () => {
    if (formData) {
      onSave(formData._id || '', { ...formData, price: parseFloat(formData.price.toString()), stock: parseInt(formData.stock.toString(), 10) });
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formData && (
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
                value={formData.description || ''}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control
                as="textarea"
                name="url"
                value={formData.url || ''}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductUpdateModal;
