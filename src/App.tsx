import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ReleasesPage from './pages/ReleasesPage';
import BandsPage from './pages/BandsPage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import BandDetailPage from './pages/BandDetailPage';
import ReleaseDetailPage from './pages/ReleaseDetailPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBands from './pages/admin/AdminBands';
import AdminProducts from './pages/admin/AdminProducts';
import AdminBandForm from './pages/admin/AdminBandForm';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="releases" element={<ReleasesPage />} />
          <Route path="releases/:id" element={<ReleaseDetailPage />} />
          <Route path="bands" element={<BandsPage />} />
          <Route path="bands/:id" element={<BandDetailPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="shop/product/:id" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bands" element={<AdminBands />} />
          <Route path="bands/new" element={<AdminBandForm />} />
          <Route path="bands/:id" element={<AdminBandForm />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="releases" element={<div>Releases Admin (Coming Soon)</div>} />
          <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;