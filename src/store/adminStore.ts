import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Band, bands as initialBands } from '../data/bands';
import { Release, releases as initialReleases } from '../data/releases';
import { AdminSession, adminAuth } from '../data/admin';

interface AdminStore {
  // Authentication
  session: AdminSession;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  
  // Data management
  bands: Band[];
  releases: Release[];
  
  // Band management
  addBand: (band: Omit<Band, 'id'>) => void;
  updateBand: (id: string, band: Partial<Band>) => void;
  deleteBand: (id: string) => void;
  
  // Release management
  addRelease: (release: Omit<Release, 'id'>) => void;
  updateRelease: (id: string, release: Partial<Release>) => void;
  deleteRelease: (id: string) => void;
  
  // Utility functions
  generateId: () => string;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      // Initial state
      session: adminAuth.getCurrentSession(),
      bands: initialBands,
      releases: initialReleases,
      
      // Authentication
      login: (username: string, password: string) => {
        const session = adminAuth.login(username, password);
        if (session.isAuthenticated) {
          adminAuth.saveSession(session);
          set({ session });
          return true;
        }
        return false;
      },
      
      logout: () => {
        const session = adminAuth.logout();
        adminAuth.saveSession(session);
        set({ session });
      },
      
      // Band management
      addBand: (bandData) => {
        const newBand: Band = {
          ...bandData,
          id: get().generateId()
        };
        set((state) => ({
          bands: [...state.bands, newBand]
        }));
      },
      
      updateBand: (id, updates) => {
        set((state) => ({
          bands: state.bands.map(band => 
            band.id === id ? { ...band, ...updates } : band
          )
        }));
      },
      
      deleteBand: (id) => {
        set((state) => ({
          bands: state.bands.filter(band => band.id !== id)
        }));
      },
      
      // Release management
      addRelease: (releaseData) => {
        const newRelease: Release = {
          ...releaseData,
          id: get().generateId()
        };
        set((state) => ({
          releases: [...state.releases, newRelease]
        }));
      },
      
      updateRelease: (id, updates) => {
        set((state) => ({
          releases: state.releases.map(release => 
            release.id === id ? { ...release, ...updates } : release
          )
        }));
      },
      
      deleteRelease: (id) => {
        set((state) => ({
          releases: state.releases.filter(release => release.id !== id)
        }));
      },
      
      // Utility functions
      generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
      }
    }),
    {
      name: 'admin-store',
      partialize: (state) => ({
        bands: state.bands,
        releases: state.releases
      })
    }
  )
);