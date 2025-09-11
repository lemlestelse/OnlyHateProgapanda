import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCartContext } from '../contexts/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut } = useAuth();
  const { getTotalItems, openCart } = useCartContext();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://raw.githubusercontent.com/lemlestelse/img/refs/heads/main/Logo%20Metal%20Madness%20Store%20-%20Editado.png" 
              alt="Metal Madness Store" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </form>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* User menu */}
            <div className="relative">
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/account"
                    className="hidden md:flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <User size={20} />
                    <span>Account</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="hidden md:block text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="hidden md:flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <User size={20} />
                  <span>Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8 py-4 border-t border-gray-100">
          <Link
            to="/products"
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
          >
            All Products
          </Link>
          <Link
            to="/products?category=t-shirts"
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
          >
            T-Shirts
          </Link>
          <Link
            to="/products?category=hoodies"
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
          >
            Hoodies
          </Link>
          <Link
            to="/products?category=accessories"
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
          >
            Accessories
          </Link>
          <Link
            to="/products?category=vinyl-records"
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
          >
            Vinyl
          </Link>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </form>

            {/* Mobile navigation */}
            <nav className="space-y-2">
              <Link
                to="/products"
                className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              <Link
                to="/products?category=t-shirts"
                className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                T-Shirts
              </Link>
              <Link
                to="/products?category=hoodies"
                className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Hoodies
              </Link>
              <Link
                to="/products?category=accessories"
                className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link
                to="/products?category=vinyl-records"
                className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Vinyl
              </Link>
              
              {/* Mobile user menu */}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <>
                    <Link
                      to="/account"
                      className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      to="/orders"
                      className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors w-full text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;