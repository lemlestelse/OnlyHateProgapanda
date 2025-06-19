import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { bands } from '../data/bands';

const BandsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter bands based on search term
  const filteredBands = bands.filter(band => 
    band.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    band.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    band.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="pt-24 bg-blackmetal-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Artists</h1>
          <p className="text-grimdark-300">
            Discover the black metal bands and artists signed to our label.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search by name, country, or genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-dark pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grimdark-400" size={18} />
          </div>
        </div>
        
        {/* Bands Grid */}
        {filteredBands.length === 0 ? (
          <div className="text-center py-12 bg-blackmetal-800 border border-blackmetal-600">
            <p className="text-grimdark-300 mb-4">No artists found matching your search.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="btn-outline"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBands.map((band, index) => (
              <motion.div 
                key={band.id}
                className="bg-blackmetal-800 border border-blackmetal-600 hover:border-blood-red group transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={band.image} 
                    alt={band.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blackmetal-900 to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <Link to={`/bands/${band.id}`} className="block">
                      <h3 className="text-2xl font-bold group-hover:text-blood-red transition-colors duration-300">{band.name}</h3>
                    </Link>
                    <p className="text-grimdark-300">{band.country} • {band.formedIn}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {band.genres.map(genre => (
                      <span 
                        key={genre} 
                        className="text-xs px-2 py-1 bg-blackmetal-700 border border-blackmetal-600 text-grimdark-300"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <p className="text-grimdark-300 text-sm line-clamp-3 mb-4">
                    {band.bio.substring(0, 150)}...
                  </p>
                  <Link to={`/bands/${band.id}`} className="btn-outline text-sm">
                    View Artist
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BandsPage;