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
  User as UserIcon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, formatImageUrl } from '../lib/api';

export function Dashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    sessionStorage.removeItem('adminBypass');
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className={`bg-slate-900 text-white w-72 flex-shrink-0 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-slate-800">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sopffi-blue rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <LayoutDashboard size={18} />
              </div>
              <span className="font-bold text-lg tracking-tight">SOPFFI Admin</span>
           </div>
        </div>
        
        <nav className="flex-grow p-4 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <LayoutDashboard size={18} /> Vue d'ensemble
          </Link>
          <Link to="/dashboard/blog" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <FileText size={18} /> Gérer le Blog
          </Link>
          <Link to="/dashboard/provinces" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <MapPin size={18} /> Activités Provinces
          </Link>
          <Link to="/dashboard/actions" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <MapPin size={18} /> Nos Réalisations
          </Link>
          <Link to="/dashboard/benevoles" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <Users size={18} /> Bénévoles
          </Link>
          <Link to="/dashboard/partenaires" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <Briefcase size={18} /> Partenaires
          </Link>
          <Link to="/dashboard/utilisateurs" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
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
      <main className="flex-grow overflow-y-auto">
        <div className="p-8 md:p-12 max-w-6xl mx-auto">
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
  const stats = [
    { label: 'Articles', val: '12', color: 'text-blue-600 bg-blue-50' },
    { label: 'Réalisations', val: '48', color: 'text-sopffi-red bg-red-50' },
    { label: 'Bénévoles', val: '15', color: 'text-sopffi-yellow bg-yellow-50' },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-3xl font-black text-slate-900 mb-2 leading-none">Tableau de bord</h2>
        <p className="text-slate-500 font-medium italic italic">Gestion du contenu et des engagements SOPFFI.</p>
      </header>

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
      <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
           <h2 className="text-2xl font-black text-slate-900">Articles du Blog</h2>
           <p className="text-slate-500 font-medium italic text-sm">Gestion des actualités du site.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-3 px-6 py-3 bg-sopffi-blue text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
        >
          {isAdding ? 'Fermer' : <><Plus size={20} /> Nouvel Article</>}
        </button>
      </div>

      {isAdding ? (
        <form onSubmit={handleAdd} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200 space-y-6 max-w-4xl border border-slate-100">
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
            <div key={post.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group">
              <div className="flex gap-6 items-center">
                {post.image_path ? (
                  <img
                    src={formatImageUrl(post.image_path)}
                    alt={post.title}
                    className="w-14 h-14 bg-slate-100 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 font-bold italic">
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
                className="p-3 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
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
      
      <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm">
        <table className="w-full text-left">
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
      <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
           <h2 className="text-2xl font-black text-slate-900">Nos Réalisations Terrain</h2>
           <p className="text-slate-500 font-medium italic text-sm">Gestion des grands chantiers et rapports d'impact.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-3 px-6 py-3 bg-sopffi-blue text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
        >
          {isAdding ? 'Fermer' : <><Plus size={20} /> Nouvelle Réalisation</>}
        </button>
      </div>

      {isAdding ? (
        <form onSubmit={handleAdd} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200 space-y-6 max-w-4xl border border-slate-100">
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
            <div key={act.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group">
              <div className="flex gap-6 items-center">
                {act.image_path ? (
                  <img
                    src={formatImageUrl(act.image_path)}
                    alt={act.title}
                    className="w-14 h-14 bg-slate-100 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 font-bold italic">
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
                className="p-3 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
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
  const [isAdding, setIsAdding] = useState(false);
  const [partners, setPartners] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ name: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const data = await api.getPartners();
      setPartners(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Veuillez joindre l\'image du logo du partenaire !');
      return;
    }
    setSubmitting(true);
    try {
      const d = new FormData();
      d.append('name', formData.name);
      d.append('logo', imageFile);
      await api.createPartner(d);
      setIsAdding(false);
      setImageFile(null);
      setFormData({ name: '' });
      fetchPartners();
    } catch (err) {
      alert('Erreur: ' + err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Retirer ce partenaire ?')) {
      try {
        await api.deletePartner(id);
        fetchPartners();
      } catch (err) {
        alert('Erreur: ' + err);
      }
    }
  };

  return (
    <div className="space-y-12 font-sans">
      <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
           <h2 className="text-2xl font-black text-slate-900">Partenaires Stratégiques</h2>
           <p className="text-slate-500 font-medium italic text-sm">Organisez les logos des institutions et fondations qui défilent sur la page d'accueil.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-3 px-6 py-3 bg-sopffi-blue text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95"
        >
          {isAdding ? 'Fermer' : <><Plus size={20} /> Ajouter un Partenaire</>}
        </button>
      </div>

      {isAdding ? (
        <form onSubmit={handleAdd} className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 max-w-xl space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Nom du partenaire</label>
              <input 
                required
                value={formData.name}
                onChange={e => setFormData({ name: e.target.value })}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm font-bold"
                placeholder="Ex: UNICEF Goma, USAID, etc."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Fichier Logo (.png transparent recommandé)</label>
              <input 
                required
                type="file"
                accept="image/*"
                onChange={e => setImageFile(e.target.files?.[0] || null)}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none text-sm"
              />
              <p className="text-[10px] text-slate-400 font-medium italic mt-1 ml-2">
                Taille recommandée : 320 × 120 pixels (ratio horizontal), max. 2 Mo pour un chargement ultra-rapide.
              </p>
            </div>
          </div>
          <button 
            type="submit"
            disabled={submitting}
            className="w-full py-5 bg-sopffi-blue text-white rounded-2xl font-black text-sm uppercase hover:bg-blue-700 transition-all disabled:bg-slate-300"
          >
            {submitting ? 'Transfert en cours...' : 'Ajouter le Partenaire'}
          </button>
        </form>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map(p => (
            <div key={p.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-between relative group text-center">
              <button 
                onClick={() => handleDelete(p.id)}
                className="absolute top-3 right-3 p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
              >
                <Trash2 size={16} />
              </button>
              <div className="h-24 flex items-center justify-center p-2 mb-4 mt-2">
                <img 
                  src={p.url} 
                  alt={p.name} 
                  className="max-h-20 max-w-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <p className="font-extrabold text-xs text-slate-700 uppercase tracking-tight">{p.name}</p>
                <span className="inline-block px-2.5 py-0.5 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-bold text-slate-400">
                  Rendu : 240px × 96px
                </span>
              </div>
            </div>
          ))}
          {partners.length === 0 && (
            <div className="col-span-full p-20 text-center text-slate-400 italic bg-white rounded-3xl border border-slate-100">
              Aucun logo partenaire configuré.
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
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
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
      setFormData({ name: '', email: '', password: '' });
      fetchUsers();
    } catch (err) {
      alert('Erreur: ' + err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Supprimer cet administrateur ?')) {
      try {
        await api.deleteUser(id);
        fetchUsers();
      } catch (err) {
        alert('Erreur: ' + err);
      }
    }
  };

  return (
    <div className="space-y-12 font-sans text-slate-700">
      <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
           <h2 className="text-2xl font-black text-slate-900">Utilisateurs & Administrateurs</h2>
           <p className="text-slate-500 font-medium italic text-sm">Gestion des identifiants et accès pour la table des administrateurs SOPFFI.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-3 px-6 py-3 bg-sopffi-blue text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95"
        >
          {isAdding ? 'Fermer' : <><Plus size={20} /> Nouvel Administrateur</>}
        </button>
      </div>

      {isAdding ? (
        <form onSubmit={handleAdd} className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 max-w-xl space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Nom complet</label>
              <input 
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
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
        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase font-black tracking-widest text-slate-400">
              <tr>
                <th className="px-8 py-5">Nom</th>
                <th className="px-8 py-5">Email</th>
                <th className="px-8 py-5 text-right flex-shrink-0">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-900">{u.name}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-semibold text-slate-600">{u.email}</p>
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
