import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-blackmetal-900 flex items-center justify-center">
      <motion.div 
        className="text-center max-w-lg px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-bold text-blood-red mb-2">404</h1>
        <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
        <p className="mb-8 text-grimdark-300">
          The unholy path you seek does not exist in this realm. Return to the shadows from whence you came.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <Home size={18} className="mr-2" />
          Return to Darkness
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;