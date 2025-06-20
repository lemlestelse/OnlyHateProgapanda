import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';
import { Product } from '../../data/products';

const AdminProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, bands, releases, addProduct, updateProduct } = useAdminStore();
  
  const isEditing = id !== 'new';
  const existingProduct = isEditing ? products.find(p => p.id === id) : null;

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    type: 'cd',
    artist: '',
    release: '',
    releaseId: '',
    price: 0,
    image: '',
    description: '',
    variants: [],
    inStock: true,
    stockQuantity: 0,
    featured: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name,
        type: existingProduct.type,
        artist: existingProduct.artist || '',
        release: existingProduct.release || '',
        releaseId: existingProduct.releaseId || '',
        price: existingProduct.price,
        image: existingProduct.image,
        description: existingProduct.description,
        variants: existingProduct.variants || [],
        inStock: existingProduct.inStock,
        stockQuantity: existingProduct.stockQuantity,
        featured: existingProduct.featured || false
      });
    }
  }, [existingProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseFloat(value) || 0 : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleReleaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const releaseId = e.target.value;
    const selectedRelease = releases.find(r => r.id === releaseId);
    
    setFormData(prev => ({
      ...prev,
      releaseId,
      release: selectedRelease?.title || '',
      artist: selectedRelease?.artist || prev.artist
    }));
  };

  const handleVariantChange = (index: number, value: string) => {
    const newVariants = [...formData.variants];
    newVariants[index] = value;
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  const addVariant = () => {
    setFormData(prev => ({ ...prev, variants: [...prev.variants, ''] }));
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    if (formData.stockQuantity < 0) {
      newErrors.stockQuantity = 'Stock quantity cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const productData = {
      ...formData,
      variants: formData.variants.filter(variant => variant.trim()),
      inStock: formData.stockQuantity > 0
    };

    if (isEditing && id) {
      updateProduct(id, productData);
    } else {
      addProduct(productData);
    }

    navigate('/admin/products');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/admin/products"
            className="mr-4 text-grimdark-300 hover:text-blood-red"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-grimdark-100">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-grimdark-100 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-grimdark-300 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`input-dark ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="type" className="block text-grimdark-300 mb-2">
                  Product Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="input-dark"
                >
                  <option value="vinyl">Vinyl</option>
                  <option value="cd">CD</option>
                  <option value="cassette">Cassette</option>
                  <option value="merch">Merchandise</option>
                </select>
              </div>

              <div>
                <label htmlFor="releaseId" className="block text-grimdark-300 mb-2">
                  Related Release
                </label>
                <select
                  id="releaseId"
                  name="releaseId"
                  value={formData.releaseId}
                  onChange={handleReleaseChange}
                  className="input-dark"
                >
                  <option value="">Select a release (optional)</option>
                  {releases.map(release => (
                    <option key={release.id} value={release.id}>
                      {release.artist} - {release.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="artist" className="block text-grimdark-300 mb-2">
                  Artist
                </label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  value={formData.artist}
                  onChange={handleInputChange}
                  className="input-dark"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-grimdark-300 mb-2">
                  Price (R$) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`input-dark ${errors.price ? 'border-red-500' : ''}`}
                />
                {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label htmlFor="stockQuantity" className="block text-grimdark-300 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  id="stockQuantity"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  min="0"
                  className={`input-dark ${errors.stockQuantity ? 'border-red-500' : ''}`}
                />
                {errors.stockQuantity && <p className="text-red-400 text-sm mt-1">{errors.stockQuantity}</p>}
              </div>

              <div>
                <label htmlFor="image" className="block text-grimdark-300 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className={`input-dark ${errors.image ? 'border-red-500' : ''}`}
                  placeholder="https://example.com/product-image.jpg"
                />
                {errors.image && <p className="text-red-400 text-sm mt-1">{errors.image}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="description" className="block text-grimdark-300 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`input-dark ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Describe the product..."
              />
              {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="mt-6 flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-grimdark-300">Featured Product</span>
              </label>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-grimdark-100">Product Variants</h2>
              <button
                type="button"
                onClick={addVariant}
                className="btn-outline text-sm"
              >
                <Plus size={16} className="mr-1" />
                Add Variant
              </button>
            </div>
            
            {formData.variants.length === 0 ? (
              <p className="text-grimdark-400">No variants added. Variants are optional (e.g., sizes, colors, limited editions).</p>
            ) : (
              <div className="space-y-3">
                {formData.variants.map((variant, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={variant}
                      onChange={(e) => handleVariantChange(index, e.target.value)}
                      className="input-dark flex-1"
                      placeholder="Variant name (e.g., Black Vinyl, Size L)"
                    />
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link to="/admin/products" className="btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-primary">
              <Save size={18} className="mr-2" />
              {isEditing ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminProductForm;