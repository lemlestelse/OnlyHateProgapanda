import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { releases } from '../data/releases';

const ReleasesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get unique years for filter
  const years = [...new Set(releases.map(release => release.year))].sort((a, b) => b - a);
  
  // Get unique types for filter
  const types = [...new Set(releases.map(release => release.type))];
  
  // Filter releases based on search term, type, and year
  const filteredReleases = releases.filter(release => {
    const matchesSearch = 
      release.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      release.artist.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || release.type === filterType;
    
    const matchesYear = filterYear === 'all' || release.year === parseInt(filterYear);
    
    return matchesSearch && matchesType && matchesYear;
  });
  
  return (
    <div className="pt-24 bg-blackmetal-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Releases</h1>
          <p className="text-grimdark-300">
            Explore our catalog of black metal releases, from full-length albums to limited edition EPs.
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by title or artist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-dark pl-10 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grimdark-400" size={18} />
            </div>
            
            <button 
              className="md:hidden btn-secondary flex items-center justify-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={18} className="mr-2" />
              Filters
            </button>
          </div>
          
          {/* Mobile Filters */}
          <div className={`md:hidden bg-blackmetal-800 border border-blackmetal-600 p-4 mb-4 ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Release Type</h3>
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="input-dark w-full"
              >
                <option value="all">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Year</h3>
              <select 
                value={filterYear} 
                onChange={(e) => setFilterYear(e.target.value)}
                className="input-dark w-full"
              >
                <option value="all">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Desktop Filter + Results Grid */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter Sidebar - Desktop */}
            <div className="hidden md:block w-64 shrink-0">
              <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 sticky top-24">
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-4">Release Type</h3>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="type" 
                        value="all" 
                        checked={filterType === 'all'} 
                        onChange={() => setFilterType('all')}
                        className="mr-2"
                      />
                      All Types
                    </label>
                    {types.map(type => (
                      <label key={type} className="flex items-center cursor-pointer">
                        <input 
                          type="radio" 
                          name="type" 
                          value={type} 
                          checked={filterType === type} 
                          onChange={() => setFilterType(type)}
                          className="mr-2"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-4">Year</h3>
                  <select 
                    value={filterYear} 
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="input-dark w-full"
                  >
                    <option value="all">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Releases Grid */}
            <div className="flex-grow">
              {filteredReleases.length === 0 ? (
                <div className="text-center py-12 bg-blackmetal-800 border border-blackmetal-600">
                  <p className="text-grimdark-300 mb-4">No releases found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setFilterType('all');
                      setFilterYear('all');
                    }}
                    className="btn-outline"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredReleases.map((release, index) => (
                    <motion.div 
                      key={release.id}
                      className="album-card bg-blackmetal-800 overflow-hidden group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img 
                          src={release.image} 
                          alt={`${release.title} by ${release.artist}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blackmetal-900 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-end">
                          <div className="p-4 w-full">
                            <Link to={`/releases/${release.id}`} className="btn-primary text-sm w-full">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <Link to={`/releases/${release.id}`} className="block">
                          <h3 className="text-xl font-bold mb-1 group-hover:text-blood-red transition-colors duration-300">{release.title}</h3>
                        </Link>
                        <Link to={`/bands/${release.artistId}`} className="text-grimdark-300 hover:text-blood-red transition-colors duration-300">
                          {release.artist}
                        </Link>
                        <div className="flex justify-between mt-2 text-sm text-grimdark-400">
                          <span>{release.year}</span>
                          <span>{release.type}</span>
                        </div>
                        <div className="mt-3 flex gap-2 flex-wrap">
                          {release.format.map(format => (
                            <span 
                              key={format} 
                              className="text-xs px-2 py-1 bg-blackmetal-700 border border-blackmetal-600 text-grimdark-300"
                            >
                              {format}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReleasesPage;