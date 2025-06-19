import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { items } = useCartStore();
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-blackmetal-900/95 backdrop-blur-sm shadow-lg shadow-blood-red/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="z-50">
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/releases" className="nav-link">Releases</NavLink>
          <NavLink to="/bands" className="nav-link">Bands</NavLink>
          <NavLink to="/shop" className="nav-link">Shop</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
          
          <Link to="/cart" className="relative ml-2">
            <ShoppingCart className="text-grimdark-100 hover:text-blood-red transition-colors duration-300" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blood-red text-blackmetal-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          <Link to="/cart" className="relative mr-6">
            <ShoppingCart className="text-grimdark-100 hover:text-blood-red transition-colors duration-300" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blood-red text-blackmetal-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-grimdark-100 hover:text-blood-red transition-colors duration-300 z-50"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-blackmetal-900/95 flex flex-col items-center justify-center z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.nav 
                className="flex flex-col items-center space-y-8 text-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/releases" className="nav-link">Releases</NavLink>
                <NavLink to="/bands" className="nav-link">Bands</NavLink>
                <NavLink to="/shop" className="nav-link">Shop</NavLink>
                <NavLink to="/contact" className="nav-link">Contact</NavLink>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;