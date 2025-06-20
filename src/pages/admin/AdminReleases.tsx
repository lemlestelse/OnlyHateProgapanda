import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Disc } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';

const AdminReleases: React.FC = () => {
  const { releases, deleteRelease } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const years = [...new Set(releases.map(r => r.year))].sort((a, b) => b - a);
  const types = [...new Set(releases.map(r => r.type))];

  const filteredReleases = releases.filter(release => {
    const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.artist.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || release.type === filterType;
    const matchesYear = filterYear === 'all' || release.year === parseInt(filterYear);
    
    return matchesSearch && matchesType && matchesYear;
  });

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteRelease(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-grimdark-100">Releases Management</h1>
        <Link to="/admin/releases/new" className="btn-primary">
          <Plus size={18} className="mr-2" />
          Add New Release
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search releases..."
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
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="input-dark"
        >
          <option value="all">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        
        <div className="text-sm text-grimdark-400 flex items-center">
          Total: {filteredReleases.length} releases
        </div>
      </div>

      {/* Releases List */}
      <div className="bg-blackmetal-800 border border-blackmetal-600 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blackmetal-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Release
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Artist
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Tracks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-grimdark-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blackmetal-600">
              {filteredReleases.map((release, index) => (
                <motion.tr
                  key={release.id}
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
                          src={release.image}
                          alt={release.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-grimdark-100">
                          {release.title}
                        </div>
                        <div className="text-sm text-grimdark-400">
                          {release.format.join(', ')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-grimdark-300">
                    {release.artist}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-grimdark-300">
                    {release.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-grimdark-500/20 text-grimdark-300">
                      {release.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-grimdark-300">
                    {release.tracklist.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/releases/${release.id}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(release.id)}
                        className={`${
                          deleteConfirm === release.id
                            ? 'text-red-400'
                            : 'text-grimdark-400 hover:text-red-400'
                        }`}
                        title={deleteConfirm === release.id ? 'Click again to confirm' : 'Delete release'}
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

      {filteredReleases.length === 0 && (
        <div className="text-center py-12">
          <Disc size={48} className="mx-auto text-grimdark-400 mb-4" />
          <h3 className="text-lg font-medium text-grimdark-300 mb-2">
            No releases found
          </h3>
          <p className="text-grimdark-400 mb-4">
            {searchTerm || filterType !== 'all' || filterYear !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first release.'}
          </p>
          <Link to="/admin/releases/new" className="btn-primary">
            <Plus size={18} className="mr-2" />
            Add New Release
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminReleases;