import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ReleasesPage from './pages/ReleasesPage';
import BandsPage from './pages/BandsPage';
import ContactPage from './pages/ContactPage';
import BandDetailPage from './pages/BandDetailPage';
import ReleaseDetailPage from './pages/ReleaseDetailPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBands from './pages/admin/AdminBands';
import AdminReleases from './pages/admin/AdminReleases';
import AdminBandForm from './pages/admin/AdminBandForm';
import AdminReleaseForm from './pages/admin/AdminReleaseForm';
import AdminSettings from './pages/admin/AdminSettings';

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
          <Route path="releases" element={<AdminReleases />} />
          <Route path="releases/new" element={<AdminReleaseForm />} />
          <Route path="releases/:id" element={<AdminReleaseForm />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;