import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Disc, Calendar, Users, Music, Share2 } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

const BandDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { bands, releases } = useAdminStore();
  
  // Find the current band
  const band = bands.find(b => b.id === id);
  
  // If band not found, show error
  if (!band) {
    return (
      <div className="pt-24 min-h-screen bg-blackmetal-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Artist Not Found</h2>
          <p className="mb-6 text-grimdark-300">
            The artist you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/bands" className="btn-primary">
            Browse All Artists
          </Link>
        </div>
      </div>
    );
  }

  // Find releases by this band
  const bandReleases = releases.filter(release => release.artistId === band.id);

  return (
    <div className="pt-24 bg-blackmetal-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/bands"
          className="inline-flex items-center text-grimdark-300 hover:text-blood-red mb-6"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Artists
        </Link>

        {/* Hero Section */}
        <div className="relative h-80 md:h-96 mb-8 overflow-hidden bg-blackmetal-800 border border-blackmetal-600">
          <div className="absolute inset-0">
            <img 
              src={band.image} 
              alt={band.name} 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blackmetal-900 to-transparent opacity-80" />
          </div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {band.name}
            </motion.h1>
            <motion.div 
              className="flex flex-wrap gap-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {band.genres.map(genre => (
                <span 
                  key={genre} 
                  className="text-xs px-2 py-1 bg-blackmetal-800/80 border border-blackmetal-600 text-grimdark-300"
                >
                  {genre}
                </span>
              ))}
            </motion.div>
            <motion.div 
              className="flex items-center text-grimdark-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="mr-4">
                <Calendar size={16} className="inline mr-1" /> 
                Formed in {band.formedIn}
              </span>
              <span>
                <Users size={16} className="inline mr-1" /> 
                {band.members.length} members
              </span>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Bio and Members */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Biography</h2>
              <p className="text-grimdark-200 whitespace-pre-line">
                {band.bio}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  className="btn-secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }}
                >
                  <Share2 size={16} className="mr-2" />
                  Share
                </button>
              </div>
            </div>

            <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Current Lineup</h2>
              <ul className="divide-y divide-blackmetal-600">
                {band.members.map((member, index) => (
                  <li key={index} className="py-3 flex justify-between">
                    <span className="font-medium">{member.name}</span>
                    <span className="text-grimdark-300">{member.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Discography */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Discography</h2>
              {band.discography.length === 0 ? (
                <p className="text-grimdark-300">No releases available yet.</p>
              ) : (
                <ul className="space-y-4">
                  {band.discography.map((release, index) => {
                    const fullRelease = release.id ? releases.find(r => r.id === release.id) : null;
                    
                    return (
                      <li key={index} className="flex items-start">
                        <Disc size={16} className="mt-1 mr-3 text-grimdark-400" />
                        <div>
                          <div className="flex items-center">
                            {fullRelease ? (
                              <Link 
                                to={`/releases/${fullRelease.id}`}
                                className="font-medium hover:text-blood-red transition-colors duration-300"
                              >
                                {release.title}
                              </Link>
                            ) : (
                              <span className="font-medium">{release.title}</span>
                            )}
                          </div>
                          <div className="text-sm text-grimdark-400">
                            {release.year} • {release.type}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.div>
        </div>

        {/* Releases Section */}
        {bandReleases.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Available Releases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {bandReleases.map((release, index) => (
                <motion.div 
                  key={release.id}
                  className="album-card bg-blackmetal-800 overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
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
                      <h3 className="text-lg font-bold mb-1 group-hover:text-blood-red transition-colors duration-300">{release.title}</h3>
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
        )}
      </div>
    </div>
  );
};

export default BandDetailPage;