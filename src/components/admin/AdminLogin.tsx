import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';

const AdminLogin: React.FC = () => {
  const { session, login } = useAdminStore();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (session.isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(formData.username, formData.password);
    
    if (!success) {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-blackmetal-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-4"
      >
        <div className="bg-blackmetal-800 border border-blackmetal-600 p-8 rounded-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-grimdark-100 mb-2">
              Admin Login
            </h1>
            <p className="text-grimdark-300">
              Access the Onlyhate Propaganda admin panel
            </p>
          </div>

          {error && (
            <div className="bg-blood-red/10 border border-blood-red p-3 rounded mb-6 flex items-center">
              <AlertCircle size={18} className="text-blood-red mr-2" />
              <span className="text-blood-red text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-grimdark-300 mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="input-dark pl-10 w-full"
                  placeholder="Enter your username"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grimdark-400" size={18} />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-grimdark-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="input-dark pl-10 w-full"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grimdark-400" size={18} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-blackmetal-700 rounded border border-blackmetal-600">
            <p className="text-xs text-grimdark-400 mb-2">Demo Credentials:</p>
            <p className="text-xs text-grimdark-300">Username: admin</p>
            <p className="text-xs text-grimdark-300">Password: admin123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;