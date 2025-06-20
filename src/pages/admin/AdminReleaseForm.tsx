import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';
import { Release } from '../../data/releases';

const AdminReleaseForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { releases, bands, addRelease, updateRelease } = useAdminStore();
  
  const isEditing = id !== 'new';
  const existingRelease = isEditing ? releases.find(r => r.id === id) : null;

  const [formData, setFormData] = useState<Omit<Release, 'id'>>({
    title: '',
    artist: '',
    artistId: '',
    year: new Date().getFullYear(),
    type: 'Full-length',
    image: '',
    description: '',
    tracklist: [''],
    inStock: true,
    format: ['Digital'],
    featured: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existingRelease) {
      setFormData({
        title: existingRelease.title,
        artist: existingRelease.artist,
        artistId: existingRelease.artistId,
        year: existingRelease.year,
        type: existingRelease.type,
        image: existingRelease.image,
        description: existingRelease.description,
        tracklist: existingRelease.tracklist,
        inStock: existingRelease.inStock,
        format: existingRelease.format,
        featured: existingRelease.featured || false
      });
    }
  }, [existingRelease]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) || new Date().getFullYear() : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const artistId = e.target.value;
    const selectedBand = bands.find(b => b.id === artistId);
    
    setFormData(prev => ({
      ...prev,
      artistId,
      artist: selectedBand?.name || ''
    }));
  };

  const handleTrackChange = (index: number, value: string) => {
    const newTracklist = [...formData.tracklist];
    newTracklist[index] = value;
    setFormData(prev => ({ ...prev, tracklist: newTracklist }));
  };

  const addTrack = () => {
    setFormData(prev => ({ ...prev, tracklist: [...prev.tracklist, ''] }));
  };

  const removeTrack = (index: number) => {
    if (formData.tracklist.length > 1) {
      setFormData(prev => ({
        ...prev,
        tracklist: prev.tracklist.filter((_, i) => i !== index)
      }));
    }
  };

  const handleFormatChange = (format: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      format: checked 
        ? [...prev.format, format]
        : prev.format.filter(f => f !== format)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Release title is required';
    }
    if (!formData.artistId) {
      newErrors.artistId = 'Artist is required';
    }
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 5) {
      newErrors.year = 'Please enter a valid year';
    }
    if (formData.format.length === 0) {
      newErrors.format = 'At least one format is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const releaseData = {
      ...formData,
      tracklist: formData.tracklist.filter(track => track.trim())
    };

    if (isEditing && id) {
      updateRelease(id, releaseData);
    } else {
      addRelease(releaseData);
    }

    navigate('/admin/releases');
  };

  const availableFormats = ['Digital', 'CD', 'Vinyl', 'Cassette'];
  const releaseTypes = ['Full-length', 'EP', 'Single', 'Split', 'Compilation', 'Demo'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/admin/releases"
            className="mr-4 text-grimdark-300 hover:text-blood-red"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-grimdark-100">
            {isEditing ? 'Edit Release' : 'Add New Release'}
          </h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-grimdark-100 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-grimdark-300 mb-2">
                  Release Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`input-dark ${errors.title ? 'border-red-500' : ''}`}
                />
                {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="artistId" className="block text-grimdark-300 mb-2">
                  Artist *
                </label>
                <select
                  id="artistId"
                  name="artistId"
                  value={formData.artistId}
                  onChange={handleArtistChange}
                  className={`input-dark ${errors.artistId ? 'border-red-500' : ''}`}
                >
                  <option value="">Select an artist</option>
                  {bands.map(band => (
                    <option key={band.id} value={band.id}>{band.name}</option>
                  ))}
                </select>
                {errors.artistId && <p className="text-red-400 text-sm mt-1">{errors.artistId}</p>}
              </div>

              <div>
                <label htmlFor="year" className="block text-grimdark-300 mb-2">
                  Release Year *
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear() + 5}
                  className={`input-dark ${errors.year ? 'border-red-500' : ''}`}
                />
                {errors.year && <p className="text-red-400 text-sm mt-1">{errors.year}</p>}
              </div>

              <div>
                <label htmlFor="type" className="block text-grimdark-300 mb-2">
                  Release Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="input-dark"
                >
                  {releaseTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="image" className="block text-grimdark-300 mb-2">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className={`input-dark ${errors.image ? 'border-red-500' : ''}`}
                  placeholder="https://example.com/cover-image.jpg"
                />
                {errors.image && <p className="text-red-400 text-sm mt-1">{errors.image}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="description" className="block text-grimdark-300 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`input-dark ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Describe the release..."
              />
              {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="mt-6 flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-grimdark-300">Featured Release</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-grimdark-300">In Stock</span>
              </label>
            </div>
          </div>

          {/* Formats */}
          <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-grimdark-100 mb-4">Available Formats *</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {availableFormats.map(format => (
                <label key={format} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.format.includes(format)}
                    onChange={(e) => handleFormatChange(format, e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-grimdark-300">{format}</span>
                </label>
              ))}
            </div>
            {errors.format && <p className="text-red-400 text-sm mt-2">{errors.format}</p>}
          </div>

          {/* Tracklist */}
          <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-grimdark-100">Tracklist</h2>
              <button
                type="button"
                onClick={addTrack}
                className="btn-outline text-sm"
              >
                <Plus size={16} className="mr-1" />
                Add Track
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.tracklist.map((track, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-grimdark-400 w-8">{index + 1}.</span>
                  <input
                    type="text"
                    value={track}
                    onChange={(e) => handleTrackChange(index, e.target.value)}
                    className="input-dark flex-1"
                    placeholder="Track title"
                  />
                  {formData.tracklist.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTrack(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link to="/admin/releases" className="btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-primary">
              <Save size={18} className="mr-2" />
              {isEditing ? 'Update Release' : 'Create Release'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminReleaseForm;