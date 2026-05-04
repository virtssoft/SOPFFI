import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À Propos', path: '/a-propos' },
    { name: 'Actions', path: '/actions' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/src/assets/images/675131884_122098591094612867_5726589466815304907_n.jpg" 
              alt="SOPFFI Logo" 
              className="w-12 h-12 object-cover rounded-xl shadow-sm ring-4 ring-blue-50"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight leading-none text-blue-900">SOPFFI</span>
              <span className="text-[10px] uppercase tracking-widest text-sopffi-red font-semibold">Solidarité & Dignité</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-sopffi-blue ${
                  location.pathname === link.path ? 'text-sopffi-blue' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-full bg-sopffi-blue text-white text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm active:scale-95"
            >
              Espace Membre
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Nav - Inside Header to stay sticky */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white border-b border-slate-100 shadow-xl"
            >
              <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-slate-700 py-2 border-b border-slate-50 last:border-0"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-4 px-6 py-3 rounded-xl bg-sopffi-blue text-white text-center font-bold"
                >
                  Espace Membre
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/src/assets/images/675131884_122098591094612867_5726589466815304907_n.jpg" 
                alt="SOPFFI Logo" 
                className="w-10 h-10 object-cover rounded-lg"
              />
              <span className="font-bold text-xl text-white">SOPFFI</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Organisation de la société civile dédiée à l'autonomisation et à l'amélioration des conditions de vie des femmes et des familles vulnérables en RDC.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/Sopffi-Asbl" className="hover:text-sopffi-blue transition-colors"><Facebook size={20} /></a>
              <a href="https://instagram.com/Sopffi-Rdc" className="hover:text-sopffi-blue transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Navigation</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-sopffi-blue">Accueil</Link></li>
              <li><Link to="/a-propos" className="hover:text-sopffi-blue">À Propos</Link></li>
              <li><Link to="/actions" className="hover:text-sopffi-blue">Nos Actions</Link></li>
              <li><Link to="/blog" className="hover:text-sopffi-blue">Blog & Actualités</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-sopffi-blue mt-1 flex-shrink-0" />
                <span>Rue NZANGI BUTONDO N°172, Quartier Kyeshero, Goma, Nord-Kivu, RDC</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-sopffi-blue flex-shrink-0" />
                <span>+243 975 587 918</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-sopffi-blue flex-shrink-0" />
                <span>sopffirdc1984@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-4">Restez informé de nos dernières actions.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-sopffi-blue outline-none"
              />
              <button className="p-2 bg-sopffi-blue text-white rounded-lg hover:bg-blue-700">OK</button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; 2024 SOPFFI ASBL. Tous droits réservés.</p>
          <div className="flex gap-6">
            <span>Développement par <span className="text-white font-bold">virtssoft</span></span>
            <Link to="/login" className="hover:text-white">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
