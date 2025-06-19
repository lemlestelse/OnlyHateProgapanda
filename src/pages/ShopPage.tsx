import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Search, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';

const ShopPage: React.FC = () => {
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addItem } = useCartStore();

  // Filter products based on search term and type
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.artist && product.artist.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'all' || product.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Grouped products for filter counts
  const productCounts = {
    all: products.length,
    vinyl: products.filter(p => p.type === 'vinyl').length,
    cd: products.filter(p => p.type === 'cd').length,
    cassette: products.filter(p => p.type === 'cassette').length,
    merch: products.filter(p => p.type === 'merch').length,
  };

  // Add to cart handler for quick add
  const handleQuickAdd = (product: typeof products[0], variant?: string) => {
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      type: product.type,
      ...(variant ? { variant } : {})
    };
    
    addItem(itemToAdd);
  };

  return (
    <div className="pt-24 bg-blackmetal-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shop</h1>
          <p className="text-grimdark-300">
            Browse our collection of vinyl records, CDs, cassettes, and official merchandise.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by name or artist..."
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

          {/* Filter Options - Mobile */}
          <div className={`md:hidden bg-blackmetal-800 border border-blackmetal-600 p-4 mb-4 R${isFilterOpen ? 'block' : 'hidden'}`}>
            <h3 className="text-lg font-medium mb-4">Product Type</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="type" 
                  value="all" 
                  checked={selectedType === 'all'} 
                  onChange={() => setSelectedType('all')}
                  className="mr-2"
                />
                All ({productCounts.all})
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="type" 
                  value="vinyl" 
                  checked={selectedType === 'vinyl'} 
                  onChange={() => setSelectedType('vinyl')}
                  className="mr-2"
                />
                Vinyl ({productCounts.vinyl})
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="type" 
                  value="cd" 
                  checked={selectedType === 'cd'} 
                  onChange={() => setSelectedType('cd')}
                  className="mr-2"
                />
                CDs ({productCounts.cd})
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="type" 
                  value="cassette" 
                  checked={selectedType === 'cassette'} 
                  onChange={() => setSelectedType('cassette')}
                  className="mr-2"
                />
                Cassettes ({productCounts.cassette})
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="type" 
                  value="merch" 
                  checked={selectedType === 'merch'} 
                  onChange={() => setSelectedType('merch')}
                  className="mr-2"
                />
                Merchandise ({productCounts.merch})
              </label>
            </div>
          </div>

          {/* Desktop Filter + Results Grid */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter Sidebar - Desktop */}
            <div className="hidden md:block w-64 shrink-0">
              <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 sticky top-24">
                <h3 className="text-xl font-medium mb-6">Product Type</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="type" 
                      value="all" 
                      checked={selectedType === 'all'} 
                      onChange={() => setSelectedType('all')}
                      className="mr-2"
                    />
                    All ({productCounts.all})
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="type" 
                      value="vinyl" 
                      checked={selectedType === 'vinyl'} 
                      onChange={() => setSelectedType('vinyl')}
                      className="mr-2"
                    />
                    Vinyl ({productCounts.vinyl})
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="type" 
                      value="cd" 
                      checked={selectedType === 'cd'} 
                      onChange={() => setSelectedType('cd')}
                      className="mr-2"
                    />
                    CDs ({productCounts.cd})
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="type" 
                      value="cassette" 
                      checked={selectedType === 'cassette'} 
                      onChange={() => setSelectedType('cassette')}
                      className="mr-2"
                    />
                    Cassettes ({productCounts.cassette})
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="type" 
                      value="merch" 
                      checked={selectedType === 'merch'} 
                      onChange={() => setSelectedType('merch')}
                      className="mr-2"
                    />
                    Merchandise ({productCounts.merch})
                  </label>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-grow">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-blackmetal-800 border border-blackmetal-600">
                  <p className="text-grimdark-300 mb-4">No products found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedType('all');
                    }}
                    className="btn-outline"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div 
                      key={product.id}
                      className="bg-blackmetal-800 border border-blackmetal-600 hover:border-blood-red group transition-all duration-300 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blackmetal-900 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-end">
                          <div className="p-4 w-full">
                            <Link 
                              to={`/shop/product/${product.id}`} 
                              className="btn-primary text-sm w-full mb-2"
                            >
                              View Details
                            </Link>
                            {product.inStock && !product.variants && (
                              <button 
                                onClick={() => handleQuickAdd(product)}
                                className="btn-outline text-sm w-full"
                              >
                                <ShoppingCart size={16} className="mr-2" />
                                Quick Add
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <Link to={`/shop/product/R${product.id}`} className="block">
                          <h3 className="text-lg font-medium mb-1 group-hover:text-blood-red transition-colors duration-300 line-clamp-1">{product.name}</h3>
                        </Link>
                        {product.artist && (
                          <p className="text-sm text-grimdark-300">{product.artist}</p>
                        )}
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-lg font-bold text-blood-red">R${product.price.toFixed(2)}</p>
                          {!product.inStock && (
                            <p className="text-sm text-grimdark-400">Out of Stock</p>
                          )}
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

export default ShopPage;