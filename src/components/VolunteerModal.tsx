import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Heart } from 'lucide-react';

export function VolunteerModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', skills: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'volunteers'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSent(true);
      setTimeout(() => {
        onClose();
        setSent(false);
        setFormData({ fullName: '', email: '', phone: '', skills: '' });
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <X size={24} />
            </button>

            <div className="p-10 pt-12">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-blue-100 text-sopffi-blue rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart size={40} fill="currentColor" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Merci pour votre engagement !</h3>
                  <p className="text-slate-500 italic">Votre candidature a été reçue. Nous vous contacterons bientôt.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-black text-slate-900 mb-2 leading-tight">Rejoignez-nous</h2>
                  <p className="text-slate-500 mb-8 italic">Devenez bénévole pour soutenir les femmes et familles de Goma.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Nom Complet</label>
                      <input 
                        required
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-sopffi-blue transition-all font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Email</label>
                        <input 
                          required
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-sopffi-blue transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Téléphone</label>
                        <input 
                          required
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-sopffi-blue transition-all font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-sopffi-blue ml-2">Compétences / Motivations</label>
                      <textarea 
                        rows={3}
                        value={formData.skills}
                        onChange={e => setFormData({...formData, skills: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-sopffi-blue transition-all resize-none italic text-sm"
                        placeholder="Qu'est-ce qui vous motive à nous rejoindre ?"
                      />
                    </div>
                    <button 
                      disabled={loading}
                      type="submit" 
                      className="w-full bg-sopffi-blue text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 group flex items-center justify-center gap-3"
                    >
                      {loading ? 'Envoi...' : <><Send size={24} className="group-hover:translate-x-1 transition-transform" /> Envoyer ma Candidature</>}
                    </button>
                  </form>
                </>
              )}
            </div>
            
            <div className="bg-slate-900 p-4 text-center">
              <p className="text-[9px] text-white/40 uppercase tracking-widest font-black">Solidarité pour la promotion pour les Femmes et Familles Indigentes</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
