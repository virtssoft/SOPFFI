import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Sprout, Heart, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';

export function Actions() {
  const domains = [
    {
      id: 'education',
      title: 'Éducation & Formation',
      icon: GraduationCap,
      color: 'from-blue-600 to-indigo-600',
      items: [
        'Centres d’apprentissage professionnel et métiers.',
        'Création d’écoles et parrainage scolaire.',
        'Café des jeunes et matinées scientifiques.',
        'Encadrement de la jeunesse sur l’actualité du pays.'
      ]
    },
    {
      id: 'agro',
      title: 'Domaine Agro-pastoral',
      icon: Sprout,
      color: 'from-sopffi-blue to-blue-900',
      items: [
        'Organisation des membres en club des productions (épargne agricole).',
        'Promotion de la sécurité alimentaire et transformation locale.',
        'Amélioration des variétés de culture vivrière et multiplication de semences.',
        'Création de pharmacies agrovétérinaires pour le bétail.',
        'Protection de l’environnement et sensibilisation à l’élevage de basse cour.'
      ]
    },
    {
      id: 'sante',
      title: 'Domaine Sanitaire',
      icon: Heart,
      color: 'from-rose-600 to-pink-600',
      items: [
        'Prise en charge des soins primaires pour personnes indigentes.',
        'Soutien aux filles-mères et personnes du troisième âge.',
        'Création de centres de soins et centres nutritionnels.',
        'Amélioration du cadre de vie (eau, hygiène et assainissement).',
        'Organisation de conférences sur la situation sanitaire.'
      ]
    },
    {
      id: 'autonomisation',
      title: 'Entrepreneuriat & Autonomisation',
      icon: ShieldAlert,
      color: 'from-amber-600 to-orange-600',
      items: [
        'Ateliers de transformation agro-alimentaire (farine enrichie, jus).',
        'Fabrication de charbon écologique et transformation de déchets plastiques.',
        'Alphabétisation fonctionnelle et gestion de micro-commerce.',
        'Mise en place d’Associations Villageoises d’Épargne et de Crédit (AVEC).',
        'Appui en Kits de démarrage (machines à coudre, intrants agricoles).',
        'Concours de plans d’affaires locaux et foires solidaires.'
      ]
    },
    {
      id: 'droits',
      title: 'Défense des Droits Humains',
      icon: ShieldAlert,
      color: 'from-slate-700 to-slate-900',
      items: [
        'Assistance juridique pour aider les indigents à retrouver leurs droits.',
        'Lutte contre les VBG et stigmatisations faites aux femmes.',
        'Cliniques juridiques et écoute psychosociale.',
        'Sensibilisation sur les droits fonciers et successoraux.'
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Nos Domaines d'Intervention</h1>
           <p className="text-xl text-slate-500 max-w-2xl mx-auto italic">
             Un impact holistique articulé autour de 5 domaines clés pour restaurer la dignité des familles vulnérables.
           </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {domains.map((domain, i) => (
              <motion.div 
                key={domain.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col lg:flex-row group"
              >
                <div className={`lg:w-1/3 p-12 bg-gradient-to-br ${domain.color} text-white flex flex-col justify-between`}>
                  <div>
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                      <domain.icon size={32} />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{domain.title}</h2>
                  </div>
                  <p className="text-white/80 text-sm hidden lg:block italic">
                    Domaine d'intervention #{i+1}
                  </p>
                </div>
                
                <div className="lg:w-2/3 p-12 lg:p-16">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {domain.items.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100">
                          <CheckCircle2 size={14} className="text-sopffi-blue" />
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 pt-12 border-t border-slate-50 flex justify-between items-center">
                    <button className="text-slate-400 group-hover:text-sopffi-red font-bold text-sm transition-colors flex items-center gap-2 uppercase tracking-widest">
                       Voir les projets liés <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Realizations Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Réalisations Récentes</h2>
            <p className="text-slate-500 italic uppercase text-xs font-black tracking-widest">En images</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { title: "Projet MAKAYABO", loc: "Goma", date: "2024", tag: "Autonomisation" },
               { title: "Pépinière d'arbres", loc: "Nyamukubi", date: "2023", tag: "Environnement" },
               { title: "Jardins potagers", loc: "Kabare", date: "2024", tag: "Nutrition" },
               { title: "Kits de démarrage", loc: "Uvira", date: "2024", tag: "Entrepreunariat" },
               { title: "Distribution fournitures", loc: "Goma", date: "2024", tag: "Education" },
               { title: "Sensibilisation VBG", loc: "Minova", date: "2023", tag: "Droits" }
             ].map((action, i) => (
               <div key={i} className="group cursor-pointer">
                 <div className="aspect-[4/3] bg-slate-100 rounded-[2rem] mb-6 overflow-hidden relative">
                    <img 
                      src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=600`}
                      alt={action.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-black uppercase rounded-full tracking-widest text-slate-900 border border-slate-200">
                        {action.tag}
                      </span>
                    </div>
                 </div>
                 <div className="px-2">
                   <p className="text-xs text-sopffi-red font-bold mb-1 uppercase tracking-tighter">{action.loc} — {action.date}</p>
                   <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-sopffi-blue transition-colors">{action.title}</h4>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
