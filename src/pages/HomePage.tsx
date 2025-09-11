import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ShoppingBag, Star, Truck, Shield, Headphones } from 'lucide-react';
import { supabase } from '../lib/supabase';

const HomePage: React.FC = () => {
  // Fetch featured products
  const { data: featuredProducts = [] } = useQuery(
    'featured-products',
    async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq('featured', true)
        .eq('is_active', true)
        .limit(4);

      if (error) throw error;
      return data;
    }
  );

  // Fetch categories
  const { data: categories = [] } = useQuery(
    'categories',
    async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .limit(6);

      if (error) throw error;
      return data;
    }
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary-900 to-secondary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-rock">
            Metal Madness Store
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Unleash your inner metalhead with our exclusive collection of 
            band merchandise, vinyl records, and rock accessories.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products" className="btn-primary text-lg px-8 py-3">
              <ShoppingBag className="mr-2" size={20} />
              Shop Now
            </Link>
            <Link to="/products?featured=true" className="btn-outline text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-secondary-900">
              Featured Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Customer support whenever you need</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of metal and rock merchandise across different categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 text-center">
                  {category.image_url ? (
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-16 h-16 mx-auto mb-4 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                      <ShoppingBag className="text-primary-600" size={24} />
                    </div>
                  )}
                  <h3 className="font-semibold group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out our handpicked selection of the hottest metal merchandise
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card product-card group">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover product-image"
                  />
                  {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                    <div className="absolute top-2 left-2">
                      <span className="badge-warning">Low Stock</span>
                    </div>
                  )}
                  {product.stock_quantity === 0 && (
                    <div className="absolute top-2 left-2">
                      <span className="badge-error">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">(4.0)</span>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <Link
                      to={`/products/${product.id}`}
                      className="btn-primary text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products" className="btn-outline text-lg px-8 py-3">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-secondary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new arrivals, 
            exclusive deals, and metal news.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
            <button type="submit" className="btn-primary px-6 py-3">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;