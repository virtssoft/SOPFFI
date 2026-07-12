import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  MapPin, 
  FileText, 
  LayoutDashboard, 
  Plus, 
  LogOut, 
  Trash2, 
  Search, 
  CheckCircle,
  Clock,
  Briefcase,
  Upload,
  User as UserIcon,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, formatImageUrl } from '../lib/api';
import { Meta } from '../components/Meta';

export function Dashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans relative">
      <Meta 
        title="Administration SOPFFI - Tableau de bord"
        description="Gérer les publications, réalisations, membres et actualités de SOPFFI."
        keywords="admin SOPFFI, gestion SOPFFI"
        url="https://sopffi-virtssoft.org/dashboard"
      />
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity" 
        />
      )}

      {/* Sidebar */}
      <aside className={`bg-slate-900 text-white w-72 flex-shrink-0 flex flex-col fixed lg:static inset-y-0 left-0 z-50 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 border-b border-slate-800 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sopffi-blue rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <LayoutDashboard size={18} />
              </div>
              <span className="font-bold text-lg tracking-tight">SOPFFI Admin</span>
           </div>
           {/* Close button inside sidebar on mobile */}
           <button 
             onClick={() => setIsSidebarOpen(false)}
             className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
           >
             <X size={18} />
           </button>
        </div>
        
        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          <Link to="/dashboard" onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <LayoutDashboard size={18} /> Vue d'ensemble
          </Link>
          <Link to="/dashboard/blog" onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <FileText size={18} /> Gérer le Blog
          </Link>
          <Link to="/dashboard/provinces" onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <MapPin size={18} /> Activités Provinces
          </Link>
          <Link to="/dashboard/actions" onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <MapPin size={18} /> Nos Réalisations
          </Link>
          <Link to="/dashboard/benevoles" onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <Users size={18} /> Bénévoles
          </Link>
          <Link to="/dashboard/partenaires" onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <Briefcase size={18} /> Partenaires
          </Link>
          <Link to="/dashboard/utilisateurs" onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <UserIcon size={18} /> Utilisateurs
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 rounded-xl text-rose-400 hover:bg-rose-400/10 transition-all font-bold text-sm"
          >
            <LogOut size={18} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto flex flex-col">
        {/* Mobile Top Bar */}
        <header className="lg:hidden bg-slate-900 text-white h-16 px-6 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu size={20} />
            </button>
            <span className="font-bold text-sm tracking-tight">SOPFFI Admin</span>
          </div>
          <span className="text-[9px] bg-sopffi-blue px-2.5 py-1 rounded-lg font-black uppercase tracking-wider text-white">
            {user?.role || 'admin'}
          </span>
        </header>

        <div className="p-4 md:p-8 lg:p-12 max-w-6xl w-full mx-auto flex-grow">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/blog" element={<BlogManager />} />
            <Route path="/provinces" element={<ProvinceActivitiesManager />} />
            <Route path="/actions" element={<ActionsManager />} />
            <Route path="/benevoles" element={<BenevoleManager />} />
            <Route path="/partenaires" element={<PartenaireManager />} />
            <Route path="/utilisateurs" element={<UserManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function Overview() {
  const [aboutData, setAboutData] = useState<any>(null);
  const [articlesCount, setArticlesCount] = useState<number>(0);
  const [actionsCount, setActionsCount] = useState<number>(0);
  const [volunteersCount, setVolunteersCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOverview() {
      try {
        const [blogPosts, actions, aboutInfo] = await Promise.all([
          api.getBlogPosts().catch(() => []),
          api.getActions().catch(() => []),
          api.getAbout().catch(() => null)
        ]);

        setArticlesCount(blogPosts.length);
        setActionsCount(actions.length);
        setAboutData(aboutInfo);

        const stored = localStorage.getItem('sopffi_volunteers');
        if (stored) {
          setVolunteersCount(JSON.parse(stored).length);
        } else {
          setVolunteersCount(2);
        }
      } catch (err) {
        console.error('Failed to load overview dynamic data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOverview();
  }, []);

  const isAboutImageMissing = 
    aboutData?.status === 'missing' || 
    aboutData?.status === 'error' || 
    (aboutData?.status && String(aboutData.status).toLowerCase().includes('manqu')) ||
    (aboutData?.status && String(aboutData.status).toLowerCase().includes('miss')) ||
    !aboutData?.image_url;

  const stats = [
    { label: 'Articles', val: String(articlesCount), color: 'text-blue-600 bg-blue-50' },
    { label: 'Réalisations', val: String(actionsCount), color: 'text-sopffi-red bg-red-50' },
    { label: 'Bénévoles', val: String(volunteersCount), color: 'text-sopffi-yellow bg-yellow-50' },
  ];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-2 leading-none">Tableau de bord</h2>
          <p className="text-slate-500 font-medium italic">Gestion du contenu et des engagements SOPFFI.</p>
        </div>
        {aboutData && (
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 font-bold">
            <span className={`w-2.5 h-2.5 rounded-full ${isAboutImageMissing ? 'bg-amber-500' : 'bg-green-500 animate-pulse'}`} />
            Section À Propos : {isAboutImageMissing ? 'Image manquante' : 'Image en ligne'}
          </div>
        )}
      </header>

      {/* About Section Alert Box */}
      {isAboutImageMissing && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50/60 p-6 md:p-8 rounded-[2rem] border border-amber-250 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-100 border border-amber-200 text-amber-800 text-[10px] font-black uppercase tracking-widest rounded-lg">Alerte Contenu</span>
              <span className="font-extrabold text-sm text-amber-900 font-sans">À Propos : Photo de présentation manquante</span>
            </div>
            <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-2xl">
              La photo principale <code className="bg-amber-100/60 font-mono text-amber-800 px-1.5 py-0.5 rounded text-xs font-bold">about.jpg</code> est introuvable à sa place sur votre serveur d'hébergement. 
              Pour vous assurer un affichage optimal de la section présentation ("À Propos"), veuillez s'il vous plaît téléverser votre image via le <strong>Gestionnaire de fichiers LWS (FTP/File Manager)</strong>.
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-block px-4 py-2 bg-white rounded-xl border border-amber-200 text-xs font-black text-amber-800 font-mono uppercase">
              about.jpg attendu
            </span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 animate-pulse h-40" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[4rem] flex items-center justify-center translate-x-6 -translate-y-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                 <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center font-bold`}>
                   {s.label[0]}
                 </div>
              </div>
              <p className="text-5xl font-black text-slate-900 mb-2">{s.val}</p>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-sopffi-blue p-12 rounded-[3.5rem] text-white overflow-hidden relative shadow-2xl shadow-blue-200">
         <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] -mr-32 -mt-32" />
         <h3 className="text-3xl font-bold mb-6">Formation & Support</h3>
         <p className="text-blue-50/80 text-lg max-w-2xl leading-relaxed mb-10 italic">
           Bienvenue dans le réseau IMPACT20. Profitez de votre formation gratuite pour 2 bénévoles 
           en nous contactant via le support dédié.
         </p>
         <button className="px-8 py-4 bg-white text-sopffi-blue rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/10 active:scale-95 transition-all">
           Contacter le Support Technique
         </button>
      </div>
    </div>
  );
}

function BlogManager() {
  const [isAdding, setIsAdding] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '', excerpt: '', author: 'Admin SOPFFI' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const resp = await api.getBlogPosts();
      setPosts(resp);
    } catch (e) {
      console.error('Failed to fetch posts from API:', e);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('excerpt', formData.excerpt);
      data.append('author', formData.author);
      if (imageFile) {
        data.append('image', imageFile);
      }
      await api.createBlogPost(data);
      setIsAdding(false);
      setImageFile(null);
      setFormData({ title: '', content: '', excerpt: '', author: 'Admin SOPFFI' });
      fetchPosts();
    } catch (e) {
      console.error(e);
      alert('Erreur lors de la création de l\'article: ' + e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Supprimer cet article ?')) {
      try {
        await api.deleteBlogPost(id);
        fetchPosts();
      } catch (e) {
        console.error(e);
        alert('Erreur lors de la suppression: ' + e);
      }
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
           <h2 className="text-2xl font-black text-slate-900">Articles du Blog</h2>
           <p className="text-slate-500 font-medium italic text-sm">Gestion des actualités du site.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center justify-center gap-3 px-6 py-3 bg-sopffi-blue text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
        >
          {isAdding ? 'Fermer' : <><Plus size={20} /> Nouvel Article</>}
        </button>
      </div>

      {isAdding ? (
        <form onSubmit={handleAdd} className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[3rem] shadow-xl shadow-slate-200 space-y-6 max-w-4xl border border-slate-100">
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Titre de l'article</label>
              <input 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-sopffi-blue text-lg font-bold"
                placeholder="Ex: Lancement du projet MAKAYABO"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Résumé court</label>
              <input 
                required
                value={formData.excerpt}
                onChange={e => setFormData({...formData, excerpt: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-sopffi-blue italic text-sm text-slate-600"
                placeholder="..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Image de couverture (Optionnel)</label>
              <input 
                type="file"
                accept="image/*"
                onChange={e => setImageFile(e.target.files?.[0] || null)}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-slate-600 focus:ring-2 focus:ring-sopffi-blue text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Contenu intégral</label>
              <textarea 
                required
                rows={10}
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-sopffi-blue text-slate-700 leading-relaxed"
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={submitting}
            className="w-full py-5 bg-sopffi-blue text-white rounded-[1.5rem] font-black text-xl shadow-xl shadow-blue-100 active:scale-[0.98] transition-all disabled:bg-slate-300"
          >
            {submitting ? 'Publication en cours...' : "Publier l'Article"}
          </button>
        </form>
      ) : (
        <div className="grid gap-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                {post.image_path ? (
                  <img
                    src={formatImageUrl(post.image_path)}
                    alt={post.title}
                    className="w-14 h-14 bg-slate-100 rounded-2xl object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 font-bold italic flex-shrink-0">
                    {post.title[0]}
                  </div>
                )}
                <div>
                   <h3 className="font-bold text-slate-900 group-hover:text-sopffi-blue transition-colors uppercase text-sm tracking-tight">{post.title}</h3>
                   <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">
                     Par {post.author} • {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}
                   </p>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(post.id)}
                className="p-3 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all self-end sm:self-auto"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="p-20 text-center text-slate-400 italic">
              Aucun article trouvé.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BenevoleManager() {
  const [volunteers, setVolunteers] = useState<any[]>([]);

  useEffect(() => {
    // Read from local storage to keep candidate data pragmatic and responsive
    const stored = localStorage.getItem('sopffi_volunteers');
    if (stored) {
      setVolunteers(JSON.parse(stored));
    } else {
      const initial = [
        { id: '1', fullName: 'Grâce Muhindo', email: 'grace@example.com', phone: '+243 991 234 567', status: 'pending', createdAt: new Date().toISOString() },
        { id: '2', fullName: 'Jean-Paul Kabulo', email: 'jeanpaul@example.com', phone: '+243 812 345 678', status: 'approved', createdAt: new Date().toISOString() }
      ];
      localStorage.setItem('sopffi_volunteers', JSON.stringify(initial));
      setVolunteers(initial);
    }
  }, []);

  return (
    <div className="space-y-8 font-sans">
      <header>
        <h2 className="text-3xl font-black text-slate-900 mb-2 leading-none">Candidatures Bénévoles</h2>
        <p className="text-slate-500 font-medium italic">Suivi des personnes souhaitant s'engager.</p>
      </header>
      
      <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase font-black tracking-widest text-slate-400">
            <tr>
              <th className="px-8 py-5">Nom</th>
              <th className="px-8 py-5">Contact</th>
              <th className="px-8 py-5">Statut</th>
              <th className="px-8 py-5 text-right flex-shrink-0">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {volunteers.map(v => (
              <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <p className="font-bold text-slate-900">{v.fullName}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Reçu le {new Date(v.createdAt).toLocaleDateString()}</p>
                </td>
                <td className="px-8 py-6">
                  <p className="text-xs font-medium text-slate-600">{v.email}</p>
                  <p className="text-xs text-slate-400 italic">{v.phone}</p>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    v.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-sopffi-blue'
                  }`}>
                    {v.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                   <button 
                     onClick={() => {
                       const updated = volunteers.map(item => item.id === v.id ? { ...item, status: 'approved' } : item);
                       localStorage.setItem('sopffi_volunteers', JSON.stringify(updated));
                       setVolunteers(updated);
                     }}
                     className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue hover:underline"
                   >
                     Approuver
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {volunteers.length === 0 && <div className="p-20 text-center text-slate-400 italic">Aucune candidature pour le moment.</div>}
      </div>
    </div>
  );
}

function ActionsManager() {
  const [isAdding, setIsAdding] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    province: 'Nord-Kivu',
    location: '',
    domain: 'Autonomisation',
    tag: '',
    excerpt: '',
    content: '',
    beneficiaries: '',
    status: 'Réalisé',
    key_achievements: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await api.getActions();
      setItems(data);
    } catch (e) {
      console.error('Failed to get actions:', e);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const d = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        d.append(k, v as string);
      });
      if (imageFile) {
        d.append('image', imageFile);
      }
      await api.createAction(d);
      setIsAdding(false);
      setImageFile(null);
      setFormData({
        title: '',
        province: 'Nord-Kivu',
        location: '',
        domain: 'Autonomisation',
        tag: '',
        excerpt: '',
        content: '',
        beneficiaries: '',
        status: 'Réalisé',
        key_achievements: ''
      });
      fetchItems();
    } catch (err) {
      console.error(err);
      alert('Erreur: ' + err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Supprimer cette réalisation ?')) {
      try {
        await api.deleteAction(id);
        fetchItems();
      } catch (e) {
        console.error(e);
        alert('Erreur: ' + e);
      }
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
           <h2 className="text-2xl font-black text-slate-900">Nos Réalisations Terrain</h2>
           <p className="text-slate-500 font-medium italic text-sm">Gestion des grands chantiers et rapports d'impact.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center justify-center gap-3 px-6 py-3 bg-sopffi-blue text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
        >
          {isAdding ? 'Fermer' : <><Plus size={20} /> Nouvelle Réalisation</>}
        </button>
      </div>

      {isAdding ? (
        <form onSubmit={handleAdd} className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[3rem] shadow-xl shadow-slate-200 space-y-6 max-w-4xl border border-slate-100">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Titre de l'action / projet</label>
              <input 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm font-bold"
                placeholder="Ex: Projet d'insertion Couture Uvira"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Province</label>
              <select
                value={formData.province}
                onChange={e => setFormData({...formData, province: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm font-bold font-sans"
              >
                {['Nord-Kivu', 'Sud-Kivu', 'Kinshasa', 'Ituri', 'Maniema'].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Territoire / Ville</label>
              <input 
                required
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm font-bold"
                placeholder="Ex: Uvira, Territoire de Kalehe, etc."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Domaine d'intervention</label>
              <select 
                value={formData.domain}
                onChange={e => setFormData({...formData, domain: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm font-bold font-sans"
              >
                {['Education', 'Agro-pastoral', 'Sante', 'Autonomisation', 'Droits'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Petit Label / Tag</label>
              <input 
                value={formData.tag}
                onChange={e => setFormData({...formData, tag: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm font-bold"
                placeholder="Ex: Maraîchage, Couture, Reforestation"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Bénéficiaires</label>
              <input 
                value={formData.beneficiaries}
                onChange={e => setFormData({...formData, beneficiaries: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm font-bold"
                placeholder="Ex: 150 mamans veuves"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Statut de réalisation</label>
              <select 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm font-bold font-sans"
              >
                <option value="Réalisé">Réalisé</option>
                <option value="En cours">En cours</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Image d'illustration (.png, .jpg, .webp)</label>
              <input 
                type="file"
                accept="image/*"
                onChange={e => setImageFile(e.target.files?.[0] || null)}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm text-slate-500"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Résumé court (max 200 caract.)</label>
              <input 
                required
                value={formData.excerpt}
                onChange={e => setFormData({...formData, excerpt: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm italic text-slate-600"
                placeholder="Très court résumé pour les grilles d'impact de la page d'accueil"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Contenu et rapport complet du projet</label>
              <textarea 
                required
                rows={6}
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm text-slate-700 leading-relaxed"
                placeholder="Rapport complet et récits de vie des participants à cette action..."
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Points clés de réussite (un point par ligne)</label>
              <textarea 
                rows={3}
                value={formData.key_achievements}
                onChange={e => setFormData({...formData, key_achievements: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm text-slate-700 font-medium"
                placeholder="Ex: 150 kits remis officiellement&#10;92% de pérennité après 6 mois&#10;Taux de scolarité accru de 40%"
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={submitting}
            className="w-full py-5 bg-sopffi-blue text-white rounded-[1.5rem] font-sans font-black text-lg shadow-xl shadow-blue-100 active:scale-[0.98] transition-all disabled:bg-slate-300"
          >
            {submitting ? 'Validation...' : "Soumettre & Enregistrer l'Action"}
          </button>
        </form>
      ) : (
        <div className="grid gap-4">
          {items.map(act => (
            <div key={act.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                {act.image_path ? (
                  <img
                    src={formatImageUrl(act.image_path)}
                    alt={act.title}
                    className="w-14 h-14 bg-slate-100 rounded-2xl object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 font-bold italic flex-shrink-0">
                    {act.title[0]}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-sopffi-blue transition-colors uppercase text-sm tracking-tight">{act.title}</h3>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">
                    {act.province} • {act.location || 'Terrain'} • {act.domain} • {act.status}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(act.id)}
                className="p-3 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all self-end sm:self-auto"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <div className="p-20 text-center text-slate-400 italic">
              Aucune réalisation enregistrée pour l'instant.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PartenaireManager() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const data = await api.getPartners();
      setPartners(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <div className="space-y-12 font-sans">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
           <h2 className="text-2xl font-black text-slate-900">Partenaires Stratégiques</h2>
           <p className="text-slate-500 font-medium italic text-sm">Organisez les logos des institutions et fondations qui défilent sur la page d'accueil.</p>
        </div>
        <button 
          onClick={fetchPartners}
          disabled={loading}
          className="flex items-center justify-center gap-3 px-6 py-3 bg-sopffi-blue text-white rounded-2xl font-bold font-sans shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 disabled:bg-slate-300"
        >
          {loading ? 'Chargement...' : 'Rafraîchir les logos'}
        </button>
      </div>

      {/* FTP Instructions Banner */}
      <div className="bg-gradient-to-r from-blue-50/80 to-slate-50 p-6 md:p-8 rounded-[2.5rem] border border-blue-200/50 space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-sopffi-blue text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Architecture Zéro Base de Données</span>
          <span className="font-extrabold text-sm text-slate-900 font-sans">Gestion directe sur votre hébergement LWS</span>
        </div>
        <p className="text-sm text-slate-600 font-sans leading-relaxed">
          Pour ajouter ou retirer un partenaire de votre carrousel, de manière simple et sécurisée sans base de données, 
          utilisez directement le <strong>File Manager de votre espace LWS</strong> ou votre client FTP habituel :
        </p>
        <div className="grid md:grid-cols-2 gap-4 pt-2">
          <div className="bg-white p-4 rounded-2xl border border-slate-150 space-y-1">
            <h4 className="font-black text-xs text-green-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Ajouter un partenaire
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Glissez-déposez simplement l'image ou le logo de l'institution dans le dossier : <br />
              <code className="bg-slate-50 font-mono text-[10px] p-1 rounded font-bold text-slate-700 select-all">/uploads/partenaires/</code>
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-150 space-y-1">
            <h4 className="font-black text-xs text-rose-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Supprimer un partenaire
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Supprimez simplement le fichier de l'image (ex. <code className="font-mono text-[10px] bg-slate-50 px-1 py-0.5 rounded">logo.png</code>) du même dossier : <br />
              <code className="bg-slate-50 font-mono text-[10px] p-1 rounded font-bold text-slate-700 select-all">/uploads/partenaires/</code>
            </p>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 font-medium font-sans italic pt-1">
          💡 Une fois vos modifications FTP effectuées, cliquez sur le bouton <strong>"Rafraîchir les logos"</strong> ci-dessus pour observer le résultat en temps réel.
        </p>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(n => (
            <div key={n} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-36 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((p, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-between relative group text-center">
              <div className="h-24 flex items-center justify-center p-2 mb-4 mt-2">
                <img 
                  src={p.url} 
                  alt={p.name} 
                  className="max-h-20 max-w-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <p className="font-extrabold text-xs text-slate-700 uppercase tracking-tight">{p.name || `Partenaire #${index + 1}`}</p>
                <span className="inline-block px-2.5 py-0.5 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-bold text-slate-400">
                  Logo actif
                </span>
              </div>
            </div>
          ))}
          {partners.length === 0 && (
            <div className="col-span-full p-20 text-center text-slate-400 italic bg-white rounded-3xl border border-slate-100">
              Aucun logo partenaire trouvé dans le dossier /uploads/partenaires/
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProvinceActivitiesManager() {
  // Re-routes directly to ActionsManager for unified operation block
  return <ActionsManager />;
}

function UserManager() {
  const [isAdding, setIsAdding] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '', role: 'admin' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createUser(formData);
      setIsAdding(false);
      setFormData({ full_name: '', email: '', password: '', role: 'admin' });
      fetchUsers();
    } catch (err: any) {
      alert('Erreur: ' + (err.message || err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Supprimer cet utilisateur / administrateur ?')) {
      try {
        await api.deleteUser(id);
        fetchUsers();
      } catch (err: any) {
        alert('Erreur: ' + (err.message || err));
      }
    }
  };

  return (
    <div className="space-y-12 font-sans text-slate-700">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
           <h2 className="text-2xl font-black text-slate-900">Utilisateurs & Administrateurs</h2>
           <p className="text-slate-500 font-medium italic text-sm">Gestion des identifiants et accès pour la table des administrateurs SOPFFI.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center justify-center gap-3 px-6 py-3 bg-sopffi-blue text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95"
        >
          {isAdding ? 'Fermer' : <><Plus size={20} /> Nouvel Administrateur</>}
        </button>
      </div>

      {isAdding ? (
        <form onSubmit={handleAdd} className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[3rem] shadow-xl border border-slate-100 max-w-xl space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Nom complet</label>
              <input 
                required
                value={formData.full_name}
                onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm font-bold"
                placeholder="Ex: Jean Mukendi"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Email de connexion</label>
              <input 
                required
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm font-bold"
                placeholder="Ex: admin.jean@sopffi.org"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Mot de passe</label>
              <input 
                required
                type="password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm font-bold"
                placeholder="Minimum 6 caractères"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Rôle</label>
              <select
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm font-bold"
              >
                <option value="admin">Administrateur (admin)</option>
                <option value="user">Utilisateur standard (user)</option>
              </select>
            </div>
          </div>
          <button 
            type="submit"
            disabled={submitting}
            className="w-full py-5 bg-sopffi-blue text-white rounded-2xl font-black text-sm uppercase hover:bg-blue-700 transition-all disabled:bg-slate-300"
          >
            {submitting ? 'Validation...' : 'Enregistrer le compte'}
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm overflow-x-auto">
          <table className="w-full text-left min-w-[500px]">
            <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase font-black tracking-widest text-slate-400">
              <tr>
                <th className="px-8 py-5">Nom</th>
                <th className="px-8 py-5">Email</th>
                <th className="px-8 py-5">Rôle</th>
                <th className="px-8 py-5 text-right flex-shrink-0">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-900">{u.full_name || u.name}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-semibold text-slate-600">{u.email}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-2.5 py-1 bg-blue-50 text-sopffi-blue text-[9px] font-black uppercase tracking-wider rounded-lg border border-blue-100">
                      {u.role || 'admin'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleDelete(u.id)}
                      className="p-3 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <div className="p-20 text-center text-slate-400 italic">Aucun utilisateur enregistré.</div>}
        </div>
      )}
    </div>
  );
}
