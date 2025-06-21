import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Disc, ShoppingBag, Music, Share2 } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

const ReleaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { releases, products } = useAdminStore();
  
  // Find the current release
  const release = releases.find(r => r.id === id);
  
  // If release not found, show error
  if (!release) {
    return (
      <div className="pt-24 min-h-screen bg-blackmetal-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Release Not Found</h2>
          <p className="mb-6 text-grimdark-300">
            The release you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/releases" className="btn-primary">
            Browse All Releases
          </Link>
        </div>
      </div>
    );
  }

  // Find related products for this release
  const releaseProducts = products.filter(product => 
    product.releaseId === release.id
  );
  
  // Find other releases by the same artist
  const artistReleases = releases.filter(r => 
    r.artistId === release.artistId && r.id !== release.id
  );

  return (
    <div className="pt-24 bg-blackmetal-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/releases"
          className="inline-flex items-center text-grimdark-300 hover:text-blood-red mb-6"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Releases
        </Link>

        {/* Release Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Release Cover */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-blackmetal-800 border border-blackmetal-600"
          >
            <img
              src={release.image}
              alt={`${release.title} by ${release.artist}`}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Release Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">{release.title}</h1>
            <Link
              to={`/bands/${release.artistId}`}
              className="text-xl text-grimdark-300 hover:text-blood-red block mb-4"
            >
              {release.artist}
            </Link>

            <div className="flex gap-2 mb-6">
              <span className="text-sm px-3 py-1 bg-blackmetal-700 border border-blackmetal-600 text-grimdark-300">
                {release.year}
              </span>
              <span className="text-sm px-3 py-1 bg-blackmetal-700 border border-blackmetal-600 text-grimdark-300">
                {release.type}
              </span>
              {release.format.map(format => (
                <span
                  key={format}
                  className="text-sm px-3 py-1 bg-blackmetal-700 border border-blackmetal-600 text-grimdark-300"
                >
                  {format}
                </span>
              ))}
            </div>

            <div className="bg-blackmetal-800 border border-blackmetal-600 p-4 mb-6">
              <h2 className="text-xl font-bold mb-2">About this Release</h2>
              <p className="text-grimdark-200 mb-4">{release.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Tracklist</h2>
              <ol className="list-decimal list-inside space-y-2">
                {release.tracklist.map((track, index) => (
                  <li key={index} className="text-grimdark-200 pl-2">
                    {track}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to={`/bands/${release.artistId}`}
                className="btn-outline"
              >
                <Music size={16} className="mr-2" />
                View Artist
              </Link>
              {releaseProducts.length > 0 && (
                <Link
                  to={`/shop/product/${releaseProducts[0].id}`}
                  className="btn-primary"
                >
                  <ShoppingBag size={16} className="mr-2" />
                  Buy Now
                </Link>
              )}
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
          </motion.div>
        </div>

        {/* Available Formats */}
        {releaseProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Available Formats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {releaseProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="bg-blackmetal-800 border border-blackmetal-600 hover:border-blood-red group transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link to={`/shop/product/${product.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link
                      to={`/shop/product/${product.id}`}
                      className="block"
                    >
                      <h3 className="text-lg font-medium mb-1 group-hover:text-blood-red transition-colors duration-300">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="mt-2 text-lg font-bold text-blood-red">
                      R${product.price.toFixed(2)}
                    </p>
                    <div className="mt-3">
                      {!product.inStock ? (
                        <span className="text-sm text-grimdark-400">
                          Out of Stock
                        </span>
                      ) : (
                        <Link
                          to={`/shop/product/${product.id}`}
                          className="btn-outline text-sm w-full"
                        >
                          View Details
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* More by Artist */}
        {artistReleases.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              More by {release.artist}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {artistReleases.map((artistRelease, index) => (
                <motion.div
                  key={artistRelease.id}
                  className="album-card bg-blackmetal-800 overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={artistRelease.image}
                      alt={`${artistRelease.title} by ${artistRelease.artist}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blackmetal-900 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <Link
                          to={`/releases/${artistRelease.id}`}
                          className="btn-primary text-sm w-full"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Link to={`/releases/${artistRelease.id}`} className="block">
                      <h3 className="text-lg font-bold mb-1 group-hover:text-blood-red transition-colors duration-300">
                        {artistRelease.title}
                      </h3>
                    </Link>
                    <div className="flex justify-between mt-2 text-sm text-grimdark-400">
                      <span>{artistRelease.year}</span>
                      <span>{artistRelease.type}</span>
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

export default ReleaseDetailPage;