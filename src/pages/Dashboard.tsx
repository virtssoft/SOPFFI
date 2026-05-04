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
  Briefcase
} from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';

export function Dashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
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
          <Link to="/dashboard/actions" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <MapPin size={18} /> Nos Réalisations
          </Link>
          <Link to="/dashboard/benevoles" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <Users size={18} /> Bénévoles
          </Link>
          <Link to="/dashboard/partenaires" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all font-bold text-sm text-slate-400 hover:text-white">
            <Briefcase size={18} /> Partenaires
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
            <Route path="/actions" element={<ActionsManager />} />
            <Route path="/benevoles" element={<BenevoleManager />} />
            <Route path="/partenaires" element={<PartenaireManager />} />
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
  const [formData, setFormData] = useState({ title: '', content: '', excerpt: '', author: auth.currentUser?.displayName || 'Admin SOPFFI' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('publishedAt', 'desc'));
      const snap = await getDocs(q);
      setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'posts'), {
        ...formData,
        publishedAt: serverTimestamp(),
      });
      setIsAdding(false);
      setFormData({ title: '', content: '', excerpt: '', author: auth.currentUser?.displayName || 'Admin SOPFFI' });
      fetchPosts();
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'posts');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Supprimer cet article ?')) {
      try {
        await deleteDoc(doc(db, 'posts', id));
        fetchPosts();
      } catch (e) {
        handleFirestoreError(e, OperationType.DELETE, `posts/${id}`);
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
          <button type="submit" className="w-full py-5 bg-sopffi-blue text-white rounded-[1.5rem] font-black text-xl shadow-xl shadow-blue-100 active:scale-[0.98] transition-transform">
            Publier l'Article
          </button>
        </form>
      ) : (
        <div className="grid gap-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group">
              <div className="flex gap-6 items-center">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 font-bold italic">
                  {post.title[0]}
                </div>
                <div>
                   <h3 className="font-bold text-slate-900 group-hover:text-sopffi-blue transition-colors uppercase text-sm tracking-tight">{post.title}</h3>
                   <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">
                     Par {post.author} • {post.publishedAt?.toDate?.()?.toLocaleDateString()}
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
    const fetchV = async () => {
      try {
        const q = query(collection(db, 'volunteers'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setVolunteers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) { console.error(e); }
    };
    fetchV();
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-black text-slate-900 mb-2 italic leading-none">Candidatures Bénévoles</h2>
        <p className="text-slate-500 font-medium italic italic">Suivi des personnes souhaitant s'engager.</p>
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
                  <p className="text-[10px] text-slate-400 mt-0.5">Reçu le {v.createdAt?.toDate?.()?.toLocaleDateString()}</p>
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
                   <button className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue hover:underline">
                     Examiner
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

function ActionsManager() { return ( <div className="p-20 bg-white rounded-[3rem] text-center text-slate-400 italic border border-slate-100">Ce module permet de gérer les photos et descriptions des domaines d'intervention.</div> ) }
function PartenaireManager() { return ( <div className="p-20 bg-white rounded-[3rem] text-center text-slate-400 italic border border-slate-100">Gérez ici vos partenariats techniques et financiers pour les afficher sur le site.</div> ) }
