import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Package, ToggleLeft, ToggleRight } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';

const AdminProducts: React.FC = () => {
  const { products, deleteProduct, updateStock } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStock, setFilterStock] = useState<string>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.artist && product.artist.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || product.type === filterType;
    
    const matchesStock = filterStock === 'all' || 
      (filterStock === 'in-stock' && product.inStock) ||
      (filterStock === 'out-of-stock' && !product.inStock);
    
    return matchesSearch && matchesType && matchesStock;
  });

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteProduct(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const handleStockToggle = (id: string, currentStock: boolean) => {
    updateStock(id, !currentStock);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vinyl': return 'bg-purple-500/20 text-purple-300';
      case 'cd': return 'bg-blue-500/20 text-blue-300';
      case 'cassette': return 'bg-yellow-500/20 text-yellow-300';
      case 'merch': return 'bg-green-500/20 text-green-300';
      default: return 'bg-grimdark-500/20 text-grimdark-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-grimdark-100">Products Management</h1>
        <Link to="/admin/products/new" className="btn-primary">
          <Plus size={18} className="mr-2" />
          Add New Product
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-dark pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grimdark-400" size={18} />
        </div>
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="input-dark"
        >
          <option value="all">All Types</option>
          <option value="vinyl">Vinyl</option>
          <option value="cd">CD</option>
          <option value="cassette">Cassette</option>
          <option value="merch">Merchandise</option>
        </select>
        
        <select
          value={filterStock}
          onChange={(e) => setFilterStock(e.target.value)}
          className="input-dark"
        >
          <option value="all">All Stock Status</option>
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
        
        <div className="text-sm text-grimdark-400 flex items-center">
          Total: {filteredProducts.length} products
        </div>
      </div>

      {/* Products List */}
      <div className="bg-blackmetal-800 border border-blackmetal-600 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blackmetal-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blackmetal-600">
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="hover:bg-blackmetal-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-grimdark-100">
                          {product.name}
                        </div>
                        {product.artist && (
                          <div className="text-sm text-grimdark-400">
                            {product.artist}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(product.type)}`}>
                      {product.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-grimdark-300">
                    R${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleStockToggle(product.id, product.inStock)}
                      className={`flex items-center ${
                        product.inStock ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {product.inStock ? (
                        <>
                          <ToggleRight size={20} className="mr-1" />
                          In Stock
                        </>
                      ) : (
                        <>
                          <ToggleLeft size={20} className="mr-1" />
                          Out of Stock
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/products/${product.id}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className={`${
                          deleteConfirm === product.id
                            ? 'text-red-400'
                            : 'text-grimdark-400 hover:text-red-400'
                        }`}
                        title={deleteConfirm === product.id ? 'Click again to confirm' : 'Delete product'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-grimdark-400 mb-4" />
          <h3 className="text-lg font-medium text-grimdark-300 mb-2">
            No products found
          </h3>
          <p className="text-grimdark-400 mb-4">
            {searchTerm || filterType !== 'all' || filterStock !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Get started by adding your first product.'}
          </p>
          <Link to="/admin/products/new" className="btn-primary">
            <Plus size={18} className="mr-2" />
            Add New Product
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;