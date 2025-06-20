import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Band, bands as initialBands } from '../data/bands';
import { Release, releases as initialReleases } from '../data/releases';
import { Product, products as initialProducts } from '../data/products';
import { AdminSession, adminAuth } from '../data/admin';

interface AdminStore {
  // Authentication
  session: AdminSession;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  
  // Data management
  bands: Band[];
  releases: Release[];
  products: Product[];
  
  // Band management
  addBand: (band: Omit<Band, 'id'>) => void;
  updateBand: (id: string, band: Partial<Band>) => void;
  deleteBand: (id: string) => void;
  
  // Release management
  addRelease: (release: Omit<Release, 'id'>) => void;
  updateRelease: (id: string, release: Partial<Release>) => void;
  deleteRelease: (id: string) => void;
  
  // Product management
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, inStock: boolean) => void;
  updateStockQuantity: (id: string, quantity: number) => void;
  
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
      products: initialProducts,
      
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
      
      // Product management
      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: get().generateId(),
          inStock: productData.stockQuantity > 0
        };
        set((state) => ({
          products: [...state.products, newProduct]
        }));
      },
      
      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map(product => 
            product.id === id ? { 
              ...product, 
              ...updates,
              inStock: updates.stockQuantity !== undefined ? updates.stockQuantity > 0 : product.inStock
            } : product
          )
        }));
      },
      
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter(product => product.id !== id)
        }));
      },
      
      updateStock: (id, inStock) => {
        set((state) => ({
          products: state.products.map(product => 
            product.id === id ? { 
              ...product, 
              inStock,
              stockQuantity: inStock ? (product.stockQuantity || 1) : 0
            } : product
          )
        }));
      },

      updateStockQuantity: (id, quantity) => {
        set((state) => ({
          products: state.products.map(product => 
            product.id === id ? { 
              ...product, 
              stockQuantity: quantity,
              inStock: quantity > 0
            } : product
          )
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
        releases: state.releases,
        products: state.products
      })
    }
  )
);