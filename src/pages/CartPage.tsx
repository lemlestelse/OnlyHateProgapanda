import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen bg-blackmetal-900 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={48} className="mx-auto mb-4 text-grimdark-400" />
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="mb-6 text-grimdark-300">
            Add some merch or music to your cart to support your favorite black metal artists.
          </p>
          <Link to="/shop" className="btn-primary">
            Browse Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-blackmetal-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-blackmetal-800 border border-blackmetal-600 divide-y divide-blackmetal-600">
              {/* Header Row (Desktop Only) */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 text-grimdark-300 text-sm">
                <div className="md:col-span-6">Product</div>
                <div className="md:col-span-2 text-center">Price</div>
                <div className="md:col-span-2 text-center">Quantity</div>
                <div className="md:col-span-2 text-center">Total</div>
              </div>
              
              {/* Cart Items */}
              {items.map((item, index) => (
                <motion.div 
                  key={`R${item.id}-R${item.variant || 'default'}`}
                  className="p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="md:grid md:grid-cols-12 gap-4 items-center">
                    {/* Product Info */}
                    <div className="md:col-span-6 flex items-center mb-4 md:mb-0">
                      <div className="w-20 h-20 mr-4 bg-blackmetal-700 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        {item.variant && (
                          <p className="text-sm text-grimdark-300">
                            {item.variant}
                          </p>
                        )}
                        <button 
                          onClick={() => removeItem(item.id, item.variant)}
                          className="text-blood-red hover:text-blood-red/80 text-sm flex items-center mt-2"
                        >
                          <Trash2 size={14} className="mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 md:text-center flex justify-between mb-2 md:mb-0">
                      <span className="md:hidden text-grimdark-300">Price:</span>
                      <span>R${item.price.toFixed(2)}</span>
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 md:text-center flex justify-between mb-2 md:mb-0">
                      <span className="md:hidden text-grimdark-300">Quantity:</span>
                      <div className="flex">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.variant)}
                          className="px-2 py-1 bg-blackmetal-700 border border-blackmetal-600 text-grimdark-200"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            updateQuantity(item.id, val >= 1 ? val : 1, item.variant);
                          }}
                          className="w-10 text-center bg-blackmetal-800 border-y border-blackmetal-600 text-grimdark-100"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                          className="px-2 py-1 bg-blackmetal-700 border border-blackmetal-600 text-grimdark-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="md:col-span-2 md:text-center flex justify-between">
                      <span className="md:hidden text-grimdark-300">Total:</span>
                      <span className="font-bold">R${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Cart Actions */}
              <div className="p-4 flex justify-between">
                <button 
                  onClick={clearCart}
                  className="text-grimdark-300 hover:text-blood-red text-sm flex items-center"
                >
                  <Trash2 size={14} className="mr-1" /> Clear Cart
                </button>
                <Link to="/shop" className="text-grimdark-300 hover:text-blood-red text-sm">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-blackmetal-800 border border-blackmetal-600 p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-grimdark-300">Subtotal</span>
                  <span>R${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-grimdark-300">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <div className="border-t border-blackmetal-600 pt-4 mb-6">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-blood-red">R${getTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <Link to="/checkout" className="btn-primary w-full">
                Proceed to Checkout <ArrowRight size={16} className="ml-2" />
              </Link>
              
              <p className="text-xs text-grimdark-400 mt-4 text-center">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;