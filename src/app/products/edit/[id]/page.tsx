"use client";

import withLayout from '@/components/withLayout';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Define the shape of your form data
interface ProductFormData {
  name: string;
  description: string;
  price: number;
  costPrice: number;
  sku: string;
  category: string;
  stock: number;
  lowStockAlert: number;
}

// Define the shape of the params prop
interface EditProductPageProps {
  params: {
    id: string; // Assuming the id is a string, adjust if necessary
  };
}

const EditProductPage = ({ params }: EditProductPageProps) => { // Use the interface here
  const router = useRouter();
  const { id } = params;

  // Initialize form methods
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid },
  } = useForm<ProductFormData>({
    mode: 'onChange', // Validate on change
  });

  // Fetch the product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) {
        alert('Failed to load product');
        return;
      }
      const data = await res.json();
      
      // Set form values
      setValue('name', data.name);
      setValue('description', data.description);
      setValue('price', data.price);
      setValue('costPrice', data.costPrice);
      setValue('sku', data.sku);
      setValue('category', data.category);
      setValue('stock', data.stock);
      setValue('lowStockAlert', data.lowStockAlert);
    };
    fetchProduct();
  }, [id, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    // Make a PUT request to update the product
    const res = await fetch(`/api/products/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });

    if (res.ok) {
      alert('Product updated successfully');
      router.push('/products'); // Redirect back to product list
    } else {
      alert('Failed to update product');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Product Name */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            title="Enter product name"
            placeholder="Enter product name"
            {...register('name', { required: true })}
            className="border rounded-lg py-2 px-4 w-full"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            title="Enter product description"
            placeholder="Enter product description"
            {...register('description', { required: true })}
            className="border rounded-lg py-2 px-4 w-full"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            title="Enter product price"
            placeholder="Enter product price"
            {...register('price', { required: true })}
            className="border rounded-lg py-2 px-4 w-full"
            required
          />
        </div>

        {/* Cost Price */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="costPrice">Cost Price</label>
          <input
            type="number"
            id="costPrice"
            title="Enter cost price"
            placeholder="Enter cost price"
            {...register('costPrice', { required: true })}
            className="border rounded-lg py-2 px-4 w-full"
            required
          />
        </div>

        {/* SKU */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            title="Enter SKU"
            placeholder="Enter SKU"
            {...register('sku', { required: true })}
            className="border rounded-lg py-2 px-4 w-full"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            title="Enter product category"
            placeholder="Enter product category"
            {...register('category', { required: true })}
            className="border rounded-lg py-2 px-4 w-full"
            required
          />
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            title="Enter stock quantity"
            placeholder="Enter stock quantity"
            {...register('stock', { required: true })}
            className="border rounded-lg py-2 px-4 w-full"
            required
          />
        </div>

        {/* Low Stock Alert */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="lowStockAlert">Low Stock Alert</label>
          <input
            type="number"
            id="lowStockAlert"
            title="Enter low stock alert threshold"
            placeholder="Enter low stock alert threshold"
            {...register('lowStockAlert', { required: true })}
            className="border rounded-lg py-2 px-4 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
          disabled={isSubmitting || !isValid} // Disable button while submitting or if the form is invalid
        >
          {isSubmitting ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default withLayout(EditProductPage);
