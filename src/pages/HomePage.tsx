import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Disc, ShoppingBag } from 'lucide-react';
import { releases } from '../data/releases';
import { bands } from '../data/bands';
import { products } from '../data/products';

const HomePage: React.FC = () => {
  const featuredReleases = releases.filter(release => release.featured).slice(0, 3);
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);

  return (
    <div className="bg-blackmetal-900 text-grimdark-100">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center bg-blackmetal-900 border-b border-blackmetal-600">
        <motion.div 
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">ONLYHATE PROPAGANDA</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-grimdark-300">
            Unleashing the dark essence of black metal through uncompromising artistic expression
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/releases" className="btn-primary">
              <Disc className="mr-2" size={18} />
              Explore Releases
            </Link>
            <Link to="/shop" className="btn-outline">
              <ShoppingBag className="mr-2" size={18} />
              Visit Shop
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Releases */}
      <section className="py-20 bg-blackmetal-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Latest Releases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredReleases.map((release, index) => (
              <motion.div 
                key={release.id}
                className="album-card bg-blackmetal-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative aspect-square">
                  <img 
                    src={release.image} 
                    alt={`${release.title} by ${release.artist}`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blackmetal-900 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-end">
                    <div className="p-4">
                      <Link to={`/releases/${release.id}`} className="btn-primary text-sm w-full">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <Link to={`/releases/${release.id}`}>
                    <h3 className="text-xl font-bold mb-1 hover:text-blood-red transition-colors duration-300">{release.title}</h3>
                  </Link>
                  <Link to={`/bands/${release.artistId}`} className="text-grimdark-300 hover:text-blood-red transition-colors duration-300">
                    {release.artist}
                  </Link>
                  <div className="flex justify-between mt-2 text-sm text-grimdark-400">
                    <span>{release.year}</span>
                    <span>{release.type}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-blackmetal-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Featured Merchandise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                className="bg-blackmetal-800 border border-blackmetal-600 hover:border-blood-red group transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <Link to={`/shop/product/${product.id}`}>
                    <h3 className="text-lg font-medium mb-1 hover:text-blood-red transition-colors duration-300">{product.name}</h3>
                  </Link>
                  {product.artist && (
                    <p className="text-sm text-grimdark-300">{product.artist}</p>
                  )}
                  <p className="mt-2 text-lg font-bold text-blood-red">${product.price.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-blackmetal-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Newsletter</h2>
            <p className="text-grimdark-300 mb-8">
              Subscribe to receive updates about new releases, merchandise, and exclusive content.
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="input-dark flex-grow" 
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;