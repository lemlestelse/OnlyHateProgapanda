// Admin authentication and permissions
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
  permissions: string[];
}

export interface AdminSession {
  user: AdminUser | null;
  isAuthenticated: boolean;
  token?: string;
}

// Mock admin user for development
export const mockAdminUser: AdminUser = {
  id: '1',
  username: 'admin',
  email: 'admin@onlyhatepropaganda.com',
  role: 'admin',
  permissions: ['manage_bands', 'manage_releases', 'manage_products', 'manage_inventory']
};

// Simple auth functions (in production, use proper authentication)
export const adminAuth = {
  login: (username: string, password: string): AdminSession => {
    // Mock authentication - in production, validate against backend
    if (username === 'admin' && password === 'admin123') {
      return {
        user: mockAdminUser,
        isAuthenticated: true,
        token: 'mock-jwt-token'
      };
    }
    return {
      user: null,
      isAuthenticated: false
    };
  },
  
  logout: (): AdminSession => ({
    user: null,
    isAuthenticated: false
  }),
  
  getCurrentSession: (): AdminSession => {
    const stored = localStorage.getItem('admin-session');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { user: null, isAuthenticated: false };
      }
    }
    return { user: null, isAuthenticated: false };
  },
  
  saveSession: (session: AdminSession) => {
    localStorage.setItem('admin-session', JSON.stringify(session));
  }
};