import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Music, AlertCircle } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = useState<string | null>(null);

  // Find the current product
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="pt-24 min-h-screen bg-blackmetal-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6 text-grimdark-300">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/shop" className="btn-primary">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Find related products (same artist or type)
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.artist === product.artist || p.type === product.type)
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    // Validate variant selection if needed
    if (product.variants && !selectedVariant) {
      setError('Please select a variant');
      return;
    }

    setError(null);

    // Add to cart
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      type: product.type,
      ...(selectedVariant ? { variant: selectedVariant } : {}),
    });

    // Show success message or navigate to cart
    navigate('/cart');
  };

  return (
    <div className="pt-24 bg-blackmetal-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/shop"
          className="inline-flex items-center text-grimdark-300 hover:text-blood-red mb-6"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Shop
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-blackmetal-800 border border-blackmetal-600"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            {product.artist && (
              <Link
                to={`/bands/${product.artistId || '1'}`}
                className="text-grimdark-300 hover:text-blood-red block mb-4"
              >
                {product.artist}
              </Link>
            )}

            <p className="text-2xl font-bold text-blood-red mb-6">
              ${product.price.toFixed(2)}
            </p>

            <div className="mb-6">
              <p className="text-grimdark-200 mb-4">{product.description}</p>

              {product.releaseId && (
                <Link
                  to={`/releases/${product.releaseId}`}
                  className="inline-flex items-center text-blood-red hover:text-blood-red/80 mb-4"
                >
                  <Music size={16} className="mr-2" /> View Release Details
                </Link>
              )}
            </div>

            {!product.inStock ? (
              <div className="bg-blackmetal-700 border border-blackmetal-600 p-4 mb-6 flex items-center">
                <AlertCircle size={20} className="text-grimdark-300 mr-2" />
                <p className="text-grimdark-300">
                  This product is currently out of stock. Check back later or
                  subscribe to our newsletter for restock alerts.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Variant Selection */}
                {product.variants && (
                  <div>
                    <label className="block text-grimdark-200 mb-2">
                      Select Option:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {product.variants.map((variant) => (
                        <button
                          key={variant}
                          type="button"
                          className={`py-2 px-4 border ${
                            selectedVariant === variant
                              ? 'border-blood-red bg-blood-red/10 text-grimdark-100'
                              : 'border-blackmetal-600 bg-blackmetal-700 text-grimdark-300 hover:border-blood-red/50'
                          } transition-colors duration-200`}
                          onClick={() => {
                            setSelectedVariant(variant);
                            setError(null);
                          }}
                        >
                          {variant}
                        </button>
                      ))}
                    </div>
                    {error && (
                      <p className="text-blood-red text-sm mt-2">{error}</p>
                    )}
                  </div>
                )}

                {/* Quantity Selection */}
                <div>
                  <label className="block text-grimdark-200 mb-2">
                    Quantity:
                  </label>
                  <div className="flex w-32">
                    <button
                      type="button"
                      className="px-3 py-2 bg-blackmetal-700 border border-blackmetal-600 text-grimdark-200"
                      onClick={() =>
                        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setQuantity(val >= 1 ? val : 1);
                      }}
                      className="w-full text-center bg-blackmetal-800 border-y border-blackmetal-600 text-grimdark-100"
                    />
                    <button
                      type="button"
                      className="px-3 py-2 bg-blackmetal-700 border border-blackmetal-600 text-grimdark-200"
                      onClick={() => setQuantity((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="btn-primary w-full py-3"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  className="bg-blackmetal-800 border border-blackmetal-600 hover:border-blood-red group transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link to={`/shop/product/${relatedProduct.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link
                      to={`/shop/product/${relatedProduct.id}`}
                      className="block"
                    >
                      <h3 className="text-lg font-medium mb-1 group-hover:text-blood-red transition-colors duration-300 line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    {relatedProduct.artist && (
                      <p className="text-sm text-grimdark-300">
                        {relatedProduct.artist}
                      </p>
                    )}
                    <p className="mt-2 text-lg font-bold text-blood-red">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;