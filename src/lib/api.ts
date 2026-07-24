const API_BASE = 'https://apisopffi.ndfdasbl.org';

export interface ActionItem {
  id: string | number;
  title: string;
  province: string;
  location: string;
  domain: string;
  tag?: string;
  published_at: string;
  image_path: string;
  excerpt: string;
  content: string;
  beneficiaries?: string;
  status: 'Réalisé' | 'En cours';
  key_achievements?: string;
}

export interface BlogItem {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image_path?: string;
  tags?: string;
  province?: string;
  created_at?: string;
  published_at?: string;
  location?: string;
  domain?: string;
  tag?: string;
  beneficiaries?: string;
  status?: string;
  key_achievements?: string;
}

export interface PartnerItem {
  id?: string;
  name: string;
  url: string;
}

export interface AboutResponse {
  title: string;
  image_url: string;
  status: string;
}

// Get JWT token from storage
export function getStoredToken(): string | null {
  return localStorage.getItem('sopffi_jwt') || sessionStorage.getItem('sopffi_jwt') || localStorage.getItem('admin_token');
}

// Set JWT token to storage
export function setStoredToken(token: string, remember: boolean = true) {
  if (remember) {
    localStorage.setItem('sopffi_jwt', token);
    localStorage.setItem('admin_token', token);
  } else {
    sessionStorage.setItem('sopffi_jwt', token);
    localStorage.setItem('admin_token', token);
  }
}

// Remove JWT token
export function removeStoredToken() {
  localStorage.removeItem('sopffi_jwt');
  sessionStorage.removeItem('sopffi_jwt');
  localStorage.removeItem('admin_token');
}

// Generate Authorization Header
export function getAuthHeader() {
  const token = getStoredToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Helper to handle unauthorized or expired sessions
export function handleAuthError(status: number, errorMessage: string): boolean {
  const isExpired = 
    status === 401 || 
    errorMessage.toLowerCase().includes('expir') || 
    errorMessage.toLowerCase().includes('session');
    
  if (isExpired) {
    removeStoredToken();
    localStorage.removeItem('sopffi_user');
    sessionStorage.removeItem('sopffi_user');
    // Redirect to login page with expired flag so they can re-login
    window.location.href = '/login?expired=true';
    return true;
  }
  return false;
}

// Helper to format image paths
export function formatImageUrl(path: string | undefined): string {
  if (!path) return 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600';
  if (path.startsWith('data:image/') || path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${cleanPath}`;
}

// Helper to format partner names from filenames
export function getCleanPartnerName(name: string | undefined): string {
  if (!name) return 'Partenaire';
  // Remove file extension and folder paths if any
  const baseName = name.split('/').pop() || name;
  const clean = baseName.toLowerCase().replace(/\.[^/.]+$/, "");
  
  if (clean === 'partners1' || clean === 'partner1') return 'UNICEF RDC';
  if (clean === 'partners2' || clean === 'partner2') return 'USAID Congo';
  if (clean === 'partners3' || clean === 'partner3') return 'PNUD RDC';
  if (clean === 'partners4' || clean === 'partner4') return 'HEAL Africa';
  if (clean === 'partners5' || clean === 'partner5') return 'Fonds pour les Femmes Congolaises (FFC)';
  if (clean === 'partners6' || clean === 'partner6') return 'Union Européenne';
  if (clean === 'partners7' || clean === 'partner7') return 'CARITAS Goma';
  if (clean === 'partners8' || clean === 'partner8') return 'PAM (WFP)';
  if (clean === 'partners9' || clean === 'partner9') return 'Partenaire Stratégique';
  
  // Clean string as fallback
  return baseName
    .replace(/\.[^/.]+$/, "") // remove extension
    .replace(/[-_]+/g, ' ') // replace dashes/underscores with space
    .replace(/\b\w/g, c => c.toUpperCase()); // capitalize words
}

// CRUD / API methods using the real PHP REST API
export const api = {
  // Auth / Connexion
  async login(email: string, password: string) {
    const cleanEmail = email.trim();
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: cleanEmail,
        password: password,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        token: data.token || data.jwt || 'local-admin-token',
        user: {
          name: data.user?.full_name || data.user?.name || 'Administrateur',
          email: data.user?.email || cleanEmail,
          role: data.user?.role || 'admin'
        }
      };
    } else {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Identifiants de connexion invalides ou compte inactif.');
    }
  },

  // Actions / Réalisations
  async getActions(): Promise<ActionItem[]> {
    const res = await fetch(`${API_BASE}/api/actions`);
    if (!res.ok) throw new Error('Impossible de charger les réalisations');
    const data = await res.json();
    return data;
  },

  async getAction(id: number | string): Promise<ActionItem> {
    const res = await fetch(`${API_BASE}/api/actions/${id}`);
    if (!res.ok) throw new Error('Réalisation introuvable');
    const data = await res.json();
    return data;
  },

  async createAction(formData: FormData): Promise<any> {
    const res = await fetch(`${API_BASE}/api/actions`, {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
      },
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const errMsg = errData.error || 'Erreur lors de la création de la réalisation';
      handleAuthError(res.status, errMsg);
      throw new Error(errMsg);
    }

    return await res.json().catch(() => ({ success: true }));
  },

  async deleteAction(id: number | string): Promise<any> {
    const res = await fetch(`${API_BASE}/api/actions/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const errMsg = errData.error || 'Erreur lors de la suppression de la réalisation';
      handleAuthError(res.status, errMsg);
      throw new Error(errMsg);
    }

    return await res.json().catch(() => ({ success: true }));
  },

  // Blog / Actualités
  async getBlogPosts(): Promise<BlogItem[]> {
    const res = await fetch(`${API_BASE}/api/blog`);
    if (!res.ok) throw new Error('Impossible de charger les articles de blog');
    const data = await res.json();
    return data;
  },

  async getBlogPost(idOrSlug: number | string): Promise<BlogItem> {
    const res = await fetch(`${API_BASE}/api/blog/${idOrSlug}`);
    if (!res.ok) throw new Error('Article introuvable dans la base de donee');
    const data = await res.json();
    return data;
  },

  async createBlogPost(formData: FormData): Promise<any> {
    const res = await fetch(`${API_BASE}/api/blog`, {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
      },
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const errMsg = errData.error || 'Erreur lors de la publication de l\'article';
      handleAuthError(res.status, errMsg);
      throw new Error(errMsg);
    }

    return await res.json().catch(() => ({ success: true }));
  },

  async deleteBlogPost(id: number | string): Promise<any> {
    const res = await fetch(`${API_BASE}/api/blog/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const errMsg = errData.error || 'Erreur lors de la suppression de l\'article';
      handleAuthError(res.status, errMsg);
      throw new Error(errMsg);
    }

    return await res.json().catch(() => ({ success: true }));
  },

  // Partenaires (Partner Logos)
  async getPartners(): Promise<PartnerItem[]> {
    const res = await fetch(`${API_BASE}/api/partenaires`);
    if (!res.ok) throw new Error('Impossible de charger les partenaires');
    const data = await res.json();
    return data;
  },

  async createPartner(formData: FormData): Promise<any> {
    // Left as compatibility stub for potential future forms
    return { success: true };
  },

  async deletePartner(id: number | string): Promise<any> {
    // Left as compatibility stub for potential future forms
    return { success: true };
  },

  // Users Management / Utilisateurs
  async getUsers(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/api/users`, {
      headers: {
        ...getAuthHeader(),
      },
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const errMsg = errData.error || 'Impossible de charger les utilisateurs';
      handleAuthError(res.status, errMsg);
      throw new Error(errMsg);
    }
    const data = await res.json();
    return data;
  },

  async createUser(userData: any): Promise<any> {
    const res = await fetch(`${API_BASE}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        full_name: userData.full_name || userData.name || '',
        email: userData.email,
        password: userData.password,
        role: userData.role || 'admin',
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const errMsg = errData.error || 'Erreur lors de la création de l\'utilisateur';
      handleAuthError(res.status, errMsg);
      throw new Error(errMsg);
    }

    return await res.json().catch(() => ({ success: true }));
  },

  async deleteUser(id: number | string): Promise<any> {
    const res = await fetch(`${API_BASE}/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const errMsg = errData.error || 'Erreur lors de la suppression de l\'utilisateur';
      handleAuthError(res.status, errMsg);
      throw new Error(errMsg);
    }

    return await res.json().catch(() => ({ success: true }));
  },

  // About / À Propos (Home)
  async getAbout(): Promise<AboutResponse> {
    try {
      const res = await fetch(`${API_BASE}/api/about`);
      if (!res.ok) throw new Error('Failed to load about details');
      const data = await res.json();
      return data;
    } catch (e) {
      return {
        title: 'SOPFFI ASBL',
        image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200',
        status: 'online'
      };
    }
  }
};
