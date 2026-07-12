import React from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Cloud, 
  Lightbulb, 
  Rocket, 
  Target, 
  Compass, 
  Globe, 
  ExternalLink, 
  Wrench, 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  ShieldAlert, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube
} from 'lucide-react';
import { Meta } from '../components/Meta';

export function Virtssoft() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Virtssoft Technologies",
    "alternateName": "Virtssoft",
    "url": "https://sopffi-virtssoft.org/virtssoft",
    "logo": "https://sopffi-virtssoft.org/logo.png",
    "description": "Startup innovante spécialisée dans le développement de solutions intelligentes intégrant l’Intelligence Artificielle, l’Internet des Objets (IoT), le Cloud Computing ainsi que les énergies renouvelables en Afrique.",
    "sameAs": [
      "https://www.facebook.com/virtssoft",
      "https://www.instagram.com/virtssoft?igsh=MTlmZDAwMHhwamN1OQ==",
      "https://www.linkedin.com/in/virtssoft-technologies-8491603b4",
      "https://x.com/virtssoft",
      "https://www.youtube.com/channel/UCvqm3ZF2-GjTmARDwTTPq7g",
      "https://virtssoft.netlify.app"
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Internet of Things",
      "Cloud Computing",
      "Renewable Energy",
      "Software Engineering",
      "Enterprise Resource Planning"
    ]
  };

  const initiatives = [
    {
      title: "Virtssoft Store",
      description: "Un réseau structuré de maintenance électronique visant à professionnaliser le secteur.",
      icon: Wrench,
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "NexaPME",
      description: "Une solution cloud de gestion complète et moderne pour les Petites et Moyennes Entreprises.",
      icon: LayoutDashboard,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Programme Solidaire",
      description: "Accompagnement des organisations et des initiatives sociales dans leur développement et leur transition numérique.",
      icon: Users,
      color: "from-emerald-500 to-teal-600"
    }
  ];

  const axes = [
    {
      num: "01",
      title: "Solutions Logicielles",
      desc: "Développement de plateformes web, mobiles et cloud parfaitement adaptées aux besoins réels des PME et des organisations."
    },
    {
      num: "02",
      title: "Intelligence Artificielle",
      desc: "Analyse avancée de données, traitement d'images et automatisation intelligente pour optimiser les performances opérationnelles."
    },
    {
      num: "03",
      title: "Internet des Objets (IoT)",
      desc: "Conception de systèmes connectés innovants pour sécuriser, automatiser et contrôler intelligemment vos environnements physiques."
    },
    {
      num: "04",
      title: "Maintenance Électronique",
      desc: "Structuration et professionnalisation de l'assistance technique à travers des réseaux d'ateliers hautement qualifiés."
    }
  ];

  const deploiements = [
    "Applications cloud de gestion pour les entreprises",
    "Solutions d'intelligence artificielle appliquées",
    "Systèmes connectés pour l'automatisation (IoT)",
    "Services de maintenance et d'ingénierie électronique",
    "Outils de productivité et de transformation digitale"
  ];

  const valeurs = [
    { title: "Orienté résultats", desc: "Nous développons des solutions concrètes et adaptées aux réalités." },
    { title: "Structure & Organisation", desc: "Une rigueur absolue à chaque étape de nos processus de conception." },
    { title: "Innovation continue", desc: "L'apprentissage et l'intégration constante des dernières technologies mondiales." },
    { title: "Impact durable & local", desc: "Des solutions pensées pour les économies et communautés africaines." }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      <Meta 
        title="Virtssoft Technologies - Startup Innovante en IA, IoT, Cloud & Énergies Renouvelables"
        description="Virtssoft Technologies est une startup innovante spécialisée dans le développement de solutions intelligentes intégrant l’Intelligence Artificielle (IA), l’Internet des Objets (IoT), le Cloud Computing ainsi que les énergies renouvelables en Afrique."
        keywords="Virtssoft, Virtssoft Technologies, startup Afrique, intelligence artificielle, IoT, internet des objets, cloud computing, énergies renouvelables, NexaPME, Virtssoft Store, RDC, Goma"
        url="https://sopffi-virtssoft.org/virtssoft"
      >
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Meta>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,58,138,0.3),transparent_50%)]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Cpu size={14} className="animate-pulse" />
            Virtssoft Technologies
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-8"
          >
            Créer l'avenir, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Ne pas le subir
            </span>
          </motion.h1>

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl font-light italic text-slate-300 max-w-3xl mx-auto border-l-4 border-blue-500 pl-6 text-left my-8 py-2"
          >
            « Chez Virtssoft Technologies, nous avons une conviction forte : nous refusons de subir l’évolution… nous voulons la façonner. »
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <a 
              href="https://virtssoft.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-900/30 active:scale-95 text-sm"
            >
              <Globe size={18} />
              virtssoft.com
              <ExternalLink size={14} />
            </a>
            <a 
              href="https://virtssoft.netlify.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-bold flex items-center gap-2 border border-slate-700 transition-all active:scale-95 text-sm"
            >
              virtssoft.netlify.app
              <ExternalLink size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Presentation section */}
      <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <Rocket className="text-blue-600 flex-shrink-0" size={28} />
              Qui sommes-nous ?
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-normal">
              <strong className="text-slate-900 font-semibold">Virtssoft Technologies</strong> est une startup innovante spécialisée dans le développement de solutions intelligentes intégrant l’Intelligence Artificielle, l’Internet des Objets, le Cloud Computing ainsi que les énergies renouvelables.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Nous concevons des technologies capables d’analyser, d’automatiser et d’optimiser les systèmes afin de répondre concrètement aux réalités africaines.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed font-semibold text-blue-600">
              Notre ambition est claire : devenir un acteur majeur de la transformation numérique en Afrique, en développant des solutions innovantes, accessibles et à fort impact.
            </p>
          </div>
          
          <div className="md:col-span-5 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-6 sm:p-8 border border-blue-100/30 flex flex-col justify-between">
            <div>
              <h3 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-6">Nos Domaines d'Action</h3>
              <ul className="space-y-4">
                {deploiements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                    <span className="text-slate-700 font-semibold text-sm leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-200/60">
              <span className="text-xs font-bold text-slate-400 block mb-2">Suivez nos innovations</span>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://www.facebook.com/virtssoft" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white hover:bg-blue-50 text-blue-600 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors shadow-sm"
                  title="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://www.instagram.com/virtssoft?igsh=MTlmZDAwMHhwamN1OQ==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white hover:bg-rose-50 text-rose-600 rounded-xl border border-slate-200 hover:border-rose-200 transition-colors shadow-sm"
                  title="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/virtssoft-technologies-8491603b4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white hover:bg-blue-50 text-blue-700 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors shadow-sm"
                  title="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href="https://x.com/virtssoft" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white hover:bg-slate-100 text-slate-900 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors shadow-sm font-bold flex items-center justify-center text-xs"
                  title="X (Twitter)"
                >
                  <span className="font-sans leading-none">X</span>
                </a>
                <a 
                  href="https://www.youtube.com/channel/UCvqm3ZF2-GjTmARDwTTPq7g" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white hover:bg-red-50 text-red-600 rounded-xl border border-slate-200 hover:border-red-200 transition-colors shadow-sm"
                  title="YouTube"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Axes */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight flex justify-center items-center gap-3">
            <Target className="text-blue-600" size={28} />
            Nos Quatre Axes Stratégiques
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Une stratégie structurée et rigoureuse pour relever les défis de la transformation digitale et technologique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {axes.map((axis, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <span className="absolute right-6 top-4 text-7xl font-black text-slate-50 group-hover:text-blue-50/50 transition-colors select-none z-0">
                {axis.num}
              </span>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{axis.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{axis.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="max-w-5xl mx-auto px-6 mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight flex justify-center items-center gap-3">
            <Lightbulb className="text-blue-600" size={28} />
            Initiatives Clés Lancées
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Dans notre dynamique de transformation, nous déployons des solutions concrètes prêtes à l'emploi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initiatives.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-md`}>
                    <IconComp size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Approach & Values */}
      <section className="max-w-5xl mx-auto px-6 mt-24">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.15),transparent_60%)]" />
          
          <div className="relative z-10">
            <div className="mb-10">
              <h2 className="text-3xl font-black mb-3 text-white tracking-tight flex items-center gap-3">
                <Compass className="text-blue-400" size={28} />
                Notre Approche & Valeurs
              </h2>
              <p className="text-slate-400 max-w-xl">
                Simple mais rigoureuse, pour un accompagnement pérenne des acteurs technologiques de demain.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {valeurs.map((val, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {val.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sm text-slate-300 max-w-md">
                Nous intervenons auprès des entreprises, institutions académiques, jeunes talents et initiatives communautaires afin de construire un écosystème inclusif.
              </p>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Notre philosophie</p>
                <p className="text-lg font-extrabold text-blue-400">« Être la référence, inspirer l'avenir »</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final pitch / Vision */}
      <section className="max-w-3xl mx-auto px-6 mt-24 text-center">
        <div className="inline-flex p-3 rounded-full bg-blue-50 text-blue-600 mb-6">
          <Cpu size={28} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6">Une Vision, Une Structure, Un Levier</h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-8">
          Virtssoft Technologies n’est pas seulement une entreprise technologique. C’est une vision d'avenir, une structure organisée et robuste, et un véritable levier de transformation durable en Afrique.
        </p>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          SOPFFI ASBL &mdash; Propulsé par Virtssoft Technologies
        </p>
      </section>
    </div>
  );
}
