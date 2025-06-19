import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';
import { Band } from '../../data/bands';

const AdminBandForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bands, addBand, updateBand } = useAdminStore();
  
  const isEditing = id !== 'new';
  const existingBand = isEditing ? bands.find(b => b.id === id) : null;

  const [formData, setFormData] = useState<Omit<Band, 'id'>>({
    name: '',
    country: '',
    formedIn: new Date().getFullYear(),
    genres: ['Black Metal'],
    image: '',
    bio: '',
    members: [{ name: '', role: '' }],
    discography: [],
    featured: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existingBand) {
      setFormData({
        name: existingBand.name,
        country: existingBand.country,
        formedIn: existingBand.formedIn,
        genres: existingBand.genres,
        image: existingBand.image,
        bio: existingBand.bio,
        members: existingBand.members,
        discography: existingBand.discography,
        featured: existingBand.featured || false
      });
    }
  }, [existingBand]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleGenreChange = (index: number, value: string) => {
    const newGenres = [...formData.genres];
    newGenres[index] = value;
    setFormData(prev => ({ ...prev, genres: newGenres }));
  };

  const addGenre = () => {
    setFormData(prev => ({ ...prev, genres: [...prev.genres, ''] }));
  };

  const removeGenre = (index: number) => {
    if (formData.genres.length > 1) {
      setFormData(prev => ({
        ...prev,
        genres: prev.genres.filter((_, i) => i !== index)
      }));
    }
  };

  const handleMemberChange = (index: number, field: 'name' | 'role', value: string) => {
    const newMembers = [...formData.members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setFormData(prev => ({ ...prev, members: newMembers }));
  };

  const addMember = () => {
    setFormData(prev => ({
      ...prev,
      members: [...prev.members, { name: '', role: '' }]
    }));
  };

  const removeMember = (index: number) => {
    if (formData.members.length > 1) {
      setFormData(prev => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Band name is required';
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }
    if (!formData.bio.trim()) {
      newErrors.bio = 'Biography is required';
    }
    if (formData.formedIn < 1900 || formData.formedIn > new Date().getFullYear()) {
      newErrors.formedIn = 'Please enter a valid year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const bandData = {
      ...formData,
      members: formData.members.filter(member => member.name.trim() && member.role.trim()),
      genres: formData.genres.filter(genre => genre.trim())
    };

    if (isEditing && id) {
      updateBand(id, bandData);
    } else {
      addBand(bandData);
    }

    navigate('/admin/bands');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/admin/bands"
            className="mr-4 text-grimdark-300 hover:text-blood-red"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-grimdark-100">
            {isEditing ? 'Edit Band' : 'Add New Band'}
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
                <label htmlFor="name" className="block text-grimdark-300 mb-2">
                  Band Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`input-dark ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="country" className="block text-grimdark-300 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`input-dark ${errors.country ? 'border-red-500' : ''}`}
                />
                {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
              </div>

              <div>
                <label htmlFor="formedIn" className="block text-grimdark-300 mb-2">
                  Formed In *
                </label>
                <input
                  type="number"
                  id="formedIn"
                  name="formedIn"
                  value={formData.formedIn}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  className={`input-dark ${errors.formedIn ? 'border-red-500' : ''}`}
                />
                {errors.formedIn && <p className="text-red-400 text-sm mt-1">{errors.formedIn}</p>}
              </div>

              <div>
                <label htmlFor="image" className="block text-grimdark-300 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className={`input-dark ${errors.image ? 'border-red-500' : ''}`}
                  placeholder="https://example.com/band-image.jpg"
                />
                {errors.image && <p className="text-red-400 text-sm mt-1">{errors.image}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="bio" className="block text-grimdark-300 mb-2">
                Biography *
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className={`input-dark ${errors.bio ? 'border-red-500' : ''}`}
                placeholder="Tell us about the band's history, style, and influences..."
              />
              {errors.bio && <p className="text-red-400 text-sm mt-1">{errors.bio}</p>}
            </div>

            <div className="mt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-grimdark-300">Featured Band</span>
              </label>
            </div>
          </div>

          {/* Genres */}
          <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-grimdark-100">Genres</h2>
              <button
                type="button"
                onClick={addGenre}
                className="btn-outline text-sm"
              >
                <Plus size={16} className="mr-1" />
                Add Genre
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.genres.map((genre, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={genre}
                    onChange={(e) => handleGenreChange(index, e.target.value)}
                    className="input-dark flex-1"
                    placeholder="Genre name"
                  />
                  {formData.genres.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeGenre(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Members */}
          <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-grimdark-100">Band Members</h2>
              <button
                type="button"
                onClick={addMember}
                className="btn-outline text-sm"
              >
                <Plus size={16} className="mr-1" />
                Add Member
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.members.map((member, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                    className="input-dark"
                    placeholder="Member name"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
                      className="input-dark flex-1"
                      placeholder="Role (e.g., Vocals, Guitar)"
                    />
                    {formData.members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link to="/admin/bands" className="btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-primary">
              <Save size={18} className="mr-2" />
              {isEditing ? 'Update Band' : 'Create Band'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminBandForm;