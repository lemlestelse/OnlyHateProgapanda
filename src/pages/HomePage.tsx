import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Disc, Music } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

const HomePage: React.FC = () => {
  const { releases, bands } = useAdminStore();
  
  const featuredReleases = releases.filter(release => release.featured).slice(0, 3);
  const featuredBands = bands.filter(band => band.featured).slice(0, 4);

  return (
    <div className="bg-blackmetal-900 text-grimdark-100">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center bg-blackmetal-900 border-b border-blackmetal-600">
        <motion.div 
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">ONLYHATE PROPAGANDA</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-grimdark-300">
            Preservando a essência sombria do black metal através da expressão artística sem compromissos
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/releases" className="btn-primary">
              <Disc className="mr-2" size={18} />
              Explorar Lançamentos
            </Link>
            <Link to="/bands" className="btn-outline">
              <Music className="mr-2" size={18} />
              Conhecer Bandas
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Releases */}
      <section className="py-20 bg-blackmetal-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Últimos Lançamentos</h2>
          {featuredReleases.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-grimdark-300 mb-4">Nenhum lançamento em destaque disponível ainda.</p>
              <Link to="/releases" className="btn-outline">
                Ver Todos os Lançamentos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredReleases.map((release, index) => (
                <motion.div 
                  key={release.id}
                  className="album-card bg-blackmetal-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative aspect-square">
                    <img 
                      src={release.image} 
                      alt={`${release.title} by ${release.artist}`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blackmetal-900 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-end">
                      <div className="p-4">
                        <Link to={`/releases/${release.id}`} className="btn-primary text-sm w-full">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Link to={`/releases/${release.id}`}>
                      <h3 className="text-xl font-bold mb-1 hover:text-blood-red transition-colors duration-300">{release.title}</h3>
                    </Link>
                    <Link to={`/bands/${release.artistId}`} className="text-grimdark-300 hover:text-blood-red transition-colors duration-300">
                      {release.artist}
                    </Link>
                    <div className="flex justify-between mt-2 text-sm text-grimdark-400">
                      <span>{release.year}</span>
                      <span>{release.type}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Bands */}
      <section className="py-20 bg-blackmetal-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Bandas em Destaque</h2>
          {featuredBands.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-grimdark-300 mb-4">Nenhuma banda em destaque disponível ainda.</p>
              <Link to="/bands" className="btn-outline">
                Ver Todas as Bandas
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBands.map((band, index) => (
                <motion.div 
                  key={band.id}
                  className="bg-blackmetal-800 border border-blackmetal-600 hover:border-blood-red group transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative aspect-square">
                    <img 
                      src={band.image} 
                      alt={band.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <Link to={`/bands/${band.id}`}>
                      <h3 className="text-lg font-medium mb-1 hover:text-blood-red transition-colors duration-300">{band.name}</h3>
                    </Link>
                    <p className="text-sm text-grimdark-300">{band.country}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {band.genres.slice(0, 2).map(genre => (
                        <span key={genre} className="text-xs px-2 py-1 bg-blackmetal-700 text-grimdark-400">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-blackmetal-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Junte-se à Nossa Newsletter</h2>
            <p className="text-grimdark-300 mb-8">
              Inscreva-se para receber atualizações sobre novos lançamentos e conteúdo exclusivo.
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Seu endereço de email" 
                  className="input-dark flex-grow" 
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Inscrever-se
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;