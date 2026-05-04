import React from 'react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { LogIn, ShieldAlert } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@sopffi.org' && password === '0987654321') {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      } catch (err: any) {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-login-credentials') {
          // If the user doesn't exist yet, we try to create it for this specific case
          // This is a helper for the user's request
          try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
          } catch (createErr: any) {
            setError('Erreur lors de la création du compte admin: ' + createErr.message);
          }
        } else {
          setError('Erreur de connexion: ' + err.message);
        }
      }
    } else {
      setError('Identifiants invalides.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl shadow-slate-200 divide-y divide-slate-100 overflow-hidden">
        <div className="p-10 text-center">
          <div className="w-20 h-20 bg-sopffi-blue rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-blue-200 ring-8 ring-blue-50">
             <img src="/src/assets/images/675131884_122098591094612867_5726589466815304907_n.jpg" alt="Logo" className="w-full h-full object-cover rounded-[2rem]" />
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
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-sopffi-blue text-sm font-bold"
                placeholder="admin@sopffi.org"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Mot de passe</label>
              <input 
                type="password"
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

          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative px-4 bg-white text-[10px] font-black text-slate-300 uppercase tracking-widest">OU</span>
          </div>
          
          <button
            type="button"
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-4 px-8 py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 shadow-sm group"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" />
            Continuer avec Google
          </button>
          
          <p className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
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
