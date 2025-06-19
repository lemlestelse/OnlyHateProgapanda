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

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
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
      </Routes>
    </AnimatePresence>
  );
}

export default App;