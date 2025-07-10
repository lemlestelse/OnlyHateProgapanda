import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Disc, 
  BarChart3, 
  Settings, 
  LogOut,
  Home
} from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';

const AdminLayout: React.FC = () => {
  const { session, logout } = useAdminStore();
  const location = useLocation();

  if (!session.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Bands', href: '/admin/bands', icon: Users },
    { name: 'Releases', href: '/admin/releases', icon: Disc },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-blackmetal-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blackmetal-800 border-r border-blackmetal-600">
        <div className="p-6">
          <Link to="/" className="flex items-center text-blood-red hover:text-blood-red/80">
            <Home size={20} className="mr-2" />
            <span className="font-bold">Back to Site</span>
          </Link>
        </div>
        
        <nav className="px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-blood-red text-blackmetal-900'
                        : 'text-grimdark-300 hover:bg-blackmetal-700 hover:text-grimdark-100'
                    }`}
                  >
                    <item.icon size={20} className="mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blackmetal-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-grimdark-100">
                {session.user?.username}
              </p>
              <p className="text-xs text-grimdark-400">
                {session.user?.role}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-grimdark-400 hover:text-blood-red transition-colors duration-200"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-blackmetal-800 border-b border-blackmetal-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-grimdark-100">
            Admin Panel - Onlyhate Propaganda
          </h1>
        </header>
        
        <main className="flex-1 p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;