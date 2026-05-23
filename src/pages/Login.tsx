import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await api.login(email, password);
      login(response.token, {
        name: response.user?.name || 'Administrateur',
        email: email,
        role: response.user?.role || 'admin'
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Identifiants de connexion invalides.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl shadow-slate-200 divide-y divide-slate-100 overflow-hidden">
        <div className="p-10 text-center">
          <div className="w-20 h-20 bg-sopffi-blue rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-blue-200 ring-8 ring-blue-50">
             <img src="https://apisopffi.ndfdasbl.org/uploads/brand/logosopffi.png" alt="Logo" className="w-full h-full object-contain rounded-[2rem] p-2 bg-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Espace Membre</h1>
          <p className="text-slate-500 font-medium italic">Accès sécurisé réservé à l'équipe SOPFFI</p>
        </div>

        <div className="p-10">
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleCustomLogin} className="space-y-4 mb-8">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Email</label>
              <input 
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-sopffi-blue text-sm font-bold"
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Mot de passe</label>
              <input 
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-sopffi-blue text-sm font-bold"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-sopffi-blue text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-100 active:scale-95 transition-all"
            >
              Se Connecter
            </button>
          </form>

          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
            Seuls les administrateurs et membres autorisés <br /> peuvent accéder à cet espace.
          </p>
        </div>
        
        <div className="p-6 bg-slate-50 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            SOPFFI ASBL &copy; 2024
          </p>
        </div>
      </div>
    </div>
  );
}
