import { useState } from "react";
import IProduct from "../interfaces/product"
import { createProduct } from "../services/api/products";

interface ProductFormProps {
    onAdd:(product : IProduct) => void
}
const ProductForm: React.FC<ProductFormProps> = ({onAdd}) => {
    const [formData, setFormData] = useState<IProduct>({
        name: '',
        price: 0,
        description: '',
        category: '',
        stock: 0,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {data} : any  = await createProduct(formData);
        onAdd(data);
        setFormData({ name: '', price: 0, description: '', category: '', stock: 0 });
    };


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            />
            <button type="submit">Add Product</button>
        </form>
    )
}

export default ProductForm