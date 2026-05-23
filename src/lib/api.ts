const API_BASE = 'https://apisopffi.ndfdasbl.org';

export interface ActionItem {
  id: number;
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
  id: number;
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

// Helper to format image paths
export function formatImageUrl(path: string | undefined): string {
  if (!path) return 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${cleanPath}`;
}

// Helper to parse JSON safely, ignoring trailing PHP errors or warnings
async function safeJson(res: Response): Promise<any> {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    const trimmed = text.trim();
    try {
      return JSON.parse(trimmed);
    } catch (err2) {
      // Extract valid JSON block between braces/brackets if trailing warning/garbage is present
      const firstCurly = trimmed.indexOf('{');
      const firstSquare = trimmed.indexOf('[');
      if (firstCurly !== -1 && (firstSquare === -1 || firstCurly < firstSquare)) {
        const lastCurly = trimmed.lastIndexOf('}');
        if (lastCurly > firstCurly) {
          try {
            return JSON.parse(trimmed.substring(firstCurly, lastCurly + 1));
          } catch (e) {}
        }
      } else if (firstSquare !== -1) {
        const lastSquare = trimmed.lastIndexOf(']');
        if (lastSquare > firstSquare) {
          try {
            return JSON.parse(trimmed.substring(firstSquare, lastSquare + 1));
          } catch (e) {}
        }
      }
      
      console.warn("safeJson parsing fallback or failed for text:", text);
      if (res.ok) {
        return { status: 'success', text: trimmed };
      }
      throw err;
    }
  }
}

// CRUD / API methods
export const api = {
  // Auth
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const errData = await safeJson(res).catch(() => ({}));
      throw new Error(errData.error || 'Erreur d\'identification');
    }
    const data = await safeJson(res);
    if (data.token) {
      setStoredToken(data.token);
    }
    return data; // { token: "...", user: { name: "...", role: "..." } }
  },

  // Actions / Realizations
  async getActions(): Promise<ActionItem[]> {
    const res = await fetch(`${API_BASE}/api/actions`);
    if (!res.ok) throw new Error('Impossible de charger les actions');
    return safeJson(res);
  },

  // Update details with correct API signatures
  async getAction(id: number | string): Promise<ActionItem> {
    const res = await fetch(`${API_BASE}/api/actions/${id}`);
    if (!res.ok) throw new Error('Impossible de charger l\'action');
    return safeJson(res);
  },

  async createAction(formData: FormData): Promise<any> {
    const res = await fetch(`${API_BASE}/api/actions`, {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
         // Do not set Content-Type, fetch sets it automatically with boundary for FormData
      },
      body: formData,
    });
    if (!res.ok) {
      const errData = await safeJson(res).catch(() => ({}));
      throw new Error(errData.error || 'Erreur lors de la création de l\'action');
    }
    return safeJson(res);
  },

  async deleteAction(id: number | string): Promise<any> {
    const res = await fetch(`${API_BASE}/api/actions/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });
    if (!res.ok) {
      const errData = await safeJson(res).catch(() => ({}));
      throw new Error(errData.error || 'Erreur lors de la suppression de l\'action');
    }
    return safeJson(res);
  },

  // Blog
  async getBlogPosts(): Promise<BlogItem[]> {
    const res = await fetch(`${API_BASE}/api/blog`);
    if (!res.ok) throw new Error('Impossible de charger les articles de blog');
    return safeJson(res);
  },

  async getBlogPost(idOrSlug: number | string): Promise<BlogItem> {
    const res = await fetch(`${API_BASE}/api/blog/${idOrSlug}`);
    if (!res.ok) throw new Error('Impossible de charger l\'article de blog');
    return safeJson(res);
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
      const errData = await safeJson(res).catch(() => ({}));
      throw new Error(errData.error || 'Erreur lors de la publication de l\'article');
    }
    return safeJson(res);
  },

  async deleteBlogPost(id: number | string): Promise<any> {
    const res = await fetch(`${API_BASE}/api/blog/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });
    if (!res.ok) {
      const errData = await safeJson(res).catch(() => ({}));
      throw new Error(errData.error || 'Erreur lors de la suppression de l\'article');
    }
    return safeJson(res);
  },

  // Partenaires (Partner Logos)
  async getPartners(): Promise<PartnerItem[]> {
    const res = await fetch(`${API_BASE}/api/partenaires`);
    if (!res.ok) throw new Error('Impossible de charger la liste des partenaires');
    return safeJson(res);
  },

  async createPartner(formData: FormData): Promise<any> {
    const res = await fetch(`${API_BASE}/api/partenaires`, {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
      },
      body: formData,
    });
    if (!res.ok) {
      const errData = await safeJson(res).catch(() => ({}));
      throw new Error(errData.error || 'Erreur lors de la création du partenaire');
    }
    return safeJson(res);
  },

  async deletePartner(id: number | string): Promise<any> {
    const res = await fetch(`${API_BASE}/api/partenaires/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });
    if (!res.ok) {
      const errData = await safeJson(res).catch(() => ({}));
      throw new Error(errData.error || 'Erreur lors de la suppression du partenaire');
    }
    return safeJson(res);
  },

  // Users Management
  async getUsers(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/api/users`, {
      headers: {
        ...getAuthHeader(),
      }
    });
    if (!res.ok) throw new Error('Impossible de charger les utilisateurs');
    return safeJson(res);
  },

  async createUser(userData: any): Promise<any> {
    const res = await fetch(`${API_BASE}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errData = await safeJson(res).catch(() => ({}));
      throw new Error(errData.error || 'Erreur lors de la création de l\'utilisateur');
    }
    return safeJson(res);
  },

  async deleteUser(id: number | string): Promise<any> {
    const res = await fetch(`${API_BASE}/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });
    if (!res.ok) {
      const errData = await safeJson(res).catch(() => ({}));
      throw new Error(errData.error || 'Erreur lors de la suppression de l\'utilisateur');
    }
    return safeJson(res);
  },

  // About Home
  async getAbout(): Promise<AboutResponse> {
    const res = await fetch(`${API_BASE}/api/about`);
    if (!res.ok) throw new Error('Impossible de charger les informations de présentation');
    return safeJson(res);
  }
};
