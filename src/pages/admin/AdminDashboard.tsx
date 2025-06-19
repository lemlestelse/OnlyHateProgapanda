import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Disc, 
  ShoppingBag, 
  TrendingUp, 
  Package,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';

const AdminDashboard: React.FC = () => {
  const { bands, releases, products } = useAdminStore();

  const stats = [
    {
      name: 'Total Bands',
      value: bands.length,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      href: '/admin/bands'
    },
    {
      name: 'Total Releases',
      value: releases.length,
      icon: Disc,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      href: '/admin/releases'
    },
    {
      name: 'Total Products',
      value: products.length,
      icon: ShoppingBag,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      href: '/admin/products'
    },
    {
      name: 'In Stock',
      value: products.filter(p => p.inStock).length,
      icon: Package,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      href: '/admin/products'
    }
  ];

  const outOfStockProducts = products.filter(p => !p.inStock);
  const recentReleases = releases
    .sort((a, b) => b.year - a.year)
    .slice(0, 5);

  const quickActions = [
    { name: 'Add New Band', href: '/admin/bands/new', icon: Users },
    { name: 'Add New Release', href: '/admin/releases/new', icon: Disc },
    { name: 'Add New Product', href: '/admin/products/new', icon: ShoppingBag },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-grimdark-100">Dashboard</h1>
        <div className="text-sm text-grimdark-400">
          Welcome back, admin
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link
              to={stat.href}
              className="block bg-blackmetal-800 border border-blackmetal-600 hover:border-blood-red p-6 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-grimdark-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-grimdark-100">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-grimdark-100 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="flex items-center p-4 bg-blackmetal-700 hover:bg-blackmetal-600 border border-blackmetal-600 hover:border-blood-red rounded-lg transition-colors duration-200"
            >
              <Plus size={20} className="text-blood-red mr-3" />
              <span className="text-grimdark-100">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Out of Stock Alert */}
        {outOfStockProducts.length > 0 && (
          <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <AlertTriangle className="text-yellow-400 mr-2" size={20} />
              <h2 className="text-xl font-bold text-grimdark-100">
                Out of Stock Items ({outOfStockProducts.length})
              </h2>
            </div>
            <div className="space-y-3">
              {outOfStockProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-grimdark-100 font-medium">{product.name}</p>
                    <p className="text-sm text-grimdark-400">{product.artist}</p>
                  </div>
                  <Link
                    to={`/admin/products/${product.id}`}
                    className="text-blood-red hover:text-blood-red/80 text-sm"
                  >
                    Manage
                  </Link>
                </div>
              ))}
              {outOfStockProducts.length > 5 && (
                <Link
                  to="/admin/products"
                  className="block text-center text-blood-red hover:text-blood-red/80 text-sm mt-4"
                >
                  View all out of stock items
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Recent Releases */}
        <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-grimdark-100 mb-4">Recent Releases</h2>
          <div className="space-y-3">
            {recentReleases.map((release) => (
              <div key={release.id} className="flex justify-between items-center">
                <div>
                  <p className="text-grimdark-100 font-medium">{release.title}</p>
                  <p className="text-sm text-grimdark-400">
                    {release.artist} • {release.year}
                  </p>
                </div>
                <Link
                  to={`/admin/releases/${release.id}`}
                  className="text-blood-red hover:text-blood-red/80 text-sm"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;