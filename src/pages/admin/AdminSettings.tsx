import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Download, Trash2, AlertTriangle } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';

const AdminSettings: React.FC = () => {
  const { bands, releases } = useAdminStore();
  const [settings, setSettings] = useState({
    siteName: 'Onlyhate Propaganda',
    siteDescription: 'Selo de Black Metal',
    contactEmail: 'onlyhatepropaganda@gmail.com',
    enableNewsletter: true,
    enableFeaturedBands: true,
    enableFeaturedReleases: true,
    maxFeaturedItems: 4,
  });

  const [showExportConfirm, setShowExportConfirm] = useState(false);
  const [showImportConfirm, setShowImportConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    localStorage.setItem('admin-settings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  const handleExportData = () => {
    const data = {
      bands,
      releases,
      settings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `onlyhate-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowExportConfirm(false);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        // In a real app, this would validate and import the data
        console.log('Import data:', data);
        alert('Data imported successfully! Please refresh the page.');
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
    setShowImportConfirm(false);
  };

  const handleResetData = () => {
    if (showResetConfirm) {
      localStorage.removeItem('admin-store');
      localStorage.removeItem('admin-settings');
      alert('All data has been reset! Please refresh the page.');
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
      setTimeout(() => setShowResetConfirm(false), 5000);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-grimdark-100 mb-2">Settings</h1>
        <p className="text-grimdark-300">Manage your site settings and data.</p>
      </div>

      {/* Site Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg"
      >
        <h2 className="text-xl font-bold text-grimdark-100 mb-6">Site Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="siteName" className="block text-grimdark-300 mb-2">
              Site Name
            </label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              value={settings.siteName}
              onChange={handleInputChange}
              className="input-dark"
            />
          </div>

          <div>
            <label htmlFor="contactEmail" className="block text-grimdark-300 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={handleInputChange}
              className="input-dark"
            />
          </div>

          <div>
            <label htmlFor="maxFeaturedItems" className="block text-grimdark-300 mb-2">
              Máximo de Itens em Destaque
            </label>
            <input
              type="number"
              id="maxFeaturedItems"
              name="maxFeaturedItems"
              value={settings.maxFeaturedItems}
              onChange={handleInputChange}
              min="1"
              max="12"
              className="input-dark"
            />
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="siteDescription" className="block text-grimdark-300 mb-2">
            Descrição do Site
          </label>
          <textarea
            id="siteDescription"
            name="siteDescription"
            value={settings.siteDescription}
            onChange={handleInputChange}
            rows={3}
            className="input-dark"
          />
        </div>

        <div className="mt-6 space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="enableNewsletter"
              checked={settings.enableNewsletter}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-grimdark-300">Habilitar Inscrição na Newsletter</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="enableFeaturedBands"
              checked={settings.enableFeaturedBands}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-grimdark-300">Mostrar Bandas em Destaque na Homepage</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="enableFeaturedReleases"
              checked={settings.enableFeaturedReleases}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-grimdark-300">Mostrar Lançamentos em Destaque na Homepage</span>
          </label>
        </div>

        <div className="mt-6">
          <button onClick={handleSaveSettings} className="btn-primary">
            <Save size={18} className="mr-2" />
            Salvar Configurações
          </button>
        </div>
      </motion.div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg"
      >
        <h2 className="text-xl font-bold text-grimdark-100 mb-6">Gerenciamento de Dados</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Export Data */}
          <div className="bg-blackmetal-700 border border-blackmetal-600 p-4 rounded">
            <h3 className="text-lg font-medium text-grimdark-100 mb-2">Exportar Dados</h3>
            <p className="text-sm text-grimdark-400 mb-4">
              Baixe um backup de todas as suas bandas e lançamentos.
            </p>
            <button
              onClick={() => setShowExportConfirm(true)}
              className="btn-outline w-full"
            >
              <Download size={16} className="mr-2" />
              Exportar Backup
            </button>
          </div>

          {/* Import Data */}
          <div className="bg-blackmetal-700 border border-blackmetal-600 p-4 rounded">
            <h3 className="text-lg font-medium text-grimdark-100 mb-2">Importar Dados</h3>
            <p className="text-sm text-grimdark-400 mb-4">
              Restaure dados de um arquivo de backup exportado anteriormente.
            </p>
            <label className="btn-outline w-full cursor-pointer flex items-center justify-center">
              <Upload size={16} className="mr-2" />
              Importar Backup
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </label>
          </div>

          {/* Reset Data */}
          <div className="bg-blackmetal-700 border border-red-600 p-4 rounded">
            <h3 className="text-lg font-medium text-grimdark-100 mb-2">Resetar Dados</h3>
            <p className="text-sm text-grimdark-400 mb-4">
              Limpe todos os dados e redefina para o estado padrão. Isso não pode ser desfeito!
            </p>
            <button
              onClick={handleResetData}
              className={`w-full flex items-center justify-center px-4 py-2 border transition-colors duration-200 ${
                showResetConfirm
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white'
              }`}
            >
              <Trash2 size={16} className="mr-2" />
              {showResetConfirm ? 'Clique Novamente para Confirmar' : 'Resetar Todos os Dados'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg"
      >
        <h2 className="text-xl font-bold text-grimdark-100 mb-6">Estatísticas do Banco de Dados</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{bands.length}</div>
            <div className="text-grimdark-300">Total de Bandas</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{releases.length}</div>
            <div className="text-grimdark-300">Total de Lançamentos</div>
          </div>
        </div>
      </motion.div>

      {/* Confirmation Modals */}
      {showExportConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 rounded-lg max-w-md">
            <h3 className="text-lg font-bold text-grimdark-100 mb-4">Exportar Dados</h3>
            <p className="text-grimdark-300 mb-6">
              Isso baixará um arquivo JSON contendo todas as suas bandas, lançamentos e configurações.
            </p>
            <div className="flex space-x-4">
              <button onClick={handleExportData} className="btn-primary">
                Exportar
              </button>
              <button onClick={() => setShowExportConfirm(false)} className="btn-secondary">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;