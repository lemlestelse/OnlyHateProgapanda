import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Users } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';

const AdminBands: React.FC = () => {
  const { bands, deleteBand } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredBands = bands.filter(band =>
    band.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    band.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteBand(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-grimdark-100">Bands Management</h1>
        <Link to="/admin/bands/new" className="btn-primary">
          <Plus size={18} className="mr-2" />
          Add New Band
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Search bands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-dark pl-10 w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grimdark-400" size={18} />
      </div>

      {/* Bands List */}
      <div className="bg-blackmetal-800 border border-blackmetal-600 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blackmetal-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Band
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Formed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Releases
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blackmetal-600">
              {filteredBands.map((band, index) => (
                <motion.tr
                  key={band.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="hover:bg-blackmetal-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded object-cover"
                          src={band.image}
                          alt={band.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-grimdark-100">
                          {band.name}
                        </div>
                        <div className="text-sm text-grimdark-400">
                          {band.genres.join(', ')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-grimdark-300">
                    {band.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-grimdark-300">
                    {band.formedIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-grimdark-300">
                    {band.discography.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/bands/${band.id}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(band.id)}
                        className={`${
                          deleteConfirm === band.id
                            ? 'text-red-400'
                            : 'text-grimdark-400 hover:text-red-400'
                        }`}
                        title={deleteConfirm === band.id ? 'Click again to confirm' : 'Delete band'}
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

      {filteredBands.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-grimdark-400 mb-4" />
          <h3 className="text-lg font-medium text-grimdark-300 mb-2">
            No bands found
          </h3>
          <p className="text-grimdark-400 mb-4">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first band.'}
          </p>
          <Link to="/admin/bands/new" className="btn-primary">
            <Plus size={18} className="mr-2" />
            Add New Band
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminBands;