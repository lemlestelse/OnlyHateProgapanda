import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, AlertCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Initialize Mercado Pago - In a real app, use environment variables
// Note: This is just for display - actual implementation would require backend integration
initMercadoPago('TEST-a1b2c3d4-5e6f-7g8h-9i0j-1k2l3m4n5o6p', {
  locale: 'en-US'
});

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cpf: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    sameAddress: true,
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const validateCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11) return false;
    
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;
    
    return true;
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'cpf') {
      const formattedCPF = formatCPF(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedCPF
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCPF(formData.cpf)) {
      alert('Please enter a valid CPF');
      return;
    }
    
    setFormSubmitted(true);
    
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      navigate('/order-confirmation');
    }, 2000);
  };

  return (
    <div className="pt-24 bg-blackmetal-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/cart"
          className="inline-flex items-center text-grimdark-300 hover:text-blood-red mb-6"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Cart
        </Link>

        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        
        {formSubmitted ? (
          <div className="max-w-2xl mx-auto bg-blackmetal-800 border border-blackmetal-600 p-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blood-red"></div>
              </div>
              <h2 className="text-2xl font-bold mb-4">Processing Your Order</h2>
              <p className="text-grimdark-300">
                Please do not close this page. Your order is being processed...
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-blackmetal-800 border border-blackmetal-600 p-6">
                  <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-grimdark-300 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="input-dark"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-grimdark-300 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="input-dark"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-grimdark-300 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input-dark"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-grimdark-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="input-dark"
                      />
                    </div>
                    <div>
                      <label htmlFor="cpf" className="block text-grimdark-300 mb-1">
                        CPF *
                      </label>
                      <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        required
                        placeholder="000.000.000-00"
                        maxLength={14}
                        className="input-dark"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-blackmetal-800 border border-blackmetal-600 p-6">
                  <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-grimdark-300 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="input-dark"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-grimdark-300 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="input-dark"
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-grimdark-300 mb-1">
                          State/Province *
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="input-dark"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="zipCode" className="block text-grimdark-300 mb-1">
                          Postal/Zip Code *
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          className="input-dark"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-grimdark-300 mb-1">
                          Country *
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          className="input-dark"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="sameAddress"
                          checked={formData.sameAddress}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span>Billing address same as shipping</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-blackmetal-800 border border-blackmetal-600 p-6">
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  
                  <div className="mb-6">
                    <div className="flex space-x-4 mb-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="mr-2"
                        />
                        Credit Card
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="mercadopago"
                          checked={paymentMethod === 'mercadopago'}
                          onChange={() => setPaymentMethod('mercadopago')}
                          className="mr-2"
                        />
                        Mercado Pago
                      </label>
                    </div>
                    
                    {paymentMethod === 'card' ? (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="cardName" className="block text-grimdark-300 mb-1">
                            Name on Card *
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                            className="input-dark"
                          />
                        </div>
                        <div>
                          <label htmlFor="cardNumber" className="block text-grimdark-300 mb-1">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                            placeholder="XXXX XXXX XXXX XXXX"
                            className="input-dark"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="cardExpiry" className="block text-grimdark-300 mb-1">
                              Expiration Date *
                            </label>
                            <input
                              type="text"
                              id="cardExpiry"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              required
                              placeholder="MM/YY"
                              className="input-dark"
                            />
                          </div>
                          <div>
                            <label htmlFor="cardCVC" className="block text-grimdark-300 mb-1">
                              CVC/CVV *
                            </label>
                            <input
                              type="text"
                              id="cardCVC"
                              name="cardCVC"
                              value={formData.cardCVC}
                              onChange={handleInputChange}
                              required
                              placeholder="XXX"
                              className="input-dark"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-blackmetal-700 rounded border border-blackmetal-600">
                        <div className="flex items-center mb-4">
                          <AlertCircle size={20} className="text-grimdark-300 mr-2" />
                          <p className="text-grimdark-300 text-sm">
                            This is a demonstration. In a real application, the Mercado Pago button would process the payment.
                          </p>
                        </div>
                        {/* Mercado Pago wallet button */}
                        <div className="flex justify-center">
                          <button
                            type="button"
                            className="px-4 py-2 bg-[#009ee3] text-white font-bold rounded flex items-center justify-center"
                            onClick={() => setFormSubmitted(true)}
                          >
                            <CreditCard className="mr-2" size={18} />
                            Pay with Mercado Pago
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <button type="submit" className="btn-primary w-full py-3">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="divide-y divide-blackmetal-600">
                  {items.map((item) => (
                    <div key={`R${item.id}-R${item.variant || 'default'}`} className="py-3 flex">
                      <div className="w-16 h-16 bg-blackmetal-700 overflow-hidden mr-4 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        {item.variant && (
                          <p className="text-xs text-grimdark-300">{item.variant}</p>
                        )}
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-grimdark-300">Qty: {item.quantity}</span>
                          <span className="text-sm">R${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-blackmetal-600 mt-4 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-grimdark-300">Subtotal</span>
                    <span>R${getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grimdark-300">Shipping</span>
                    <span>R$9.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grimdark-300">Tax</span>
                    <span>R${(getTotal() * 0.08).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t border-blackmetal-600 mt-4 pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-blood-red">
                      R${(getTotal() + 9.99 + (getTotal() * 0.08)).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 text-xs text-grimdark-400">
                  <p>
                    By placing your order, you agree to our 
                    <Link to="/terms" className="text-blood-red hover:text-blood-red/80 mx-1">
                      Terms of Service
                    </Link>
                    and
                    <Link to="/privacy-policy" className="text-blood-red hover:text-blood-red/80 ml-1">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;