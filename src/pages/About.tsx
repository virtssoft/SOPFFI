import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, ShieldCheck, MapPin, Users, Award, Landmark, Search } from 'lucide-react';
import { Meta } from '../components/Meta';

export function About() {
  const sections = [
    {
      title: 'Notre Mission',
      icon: Target,
      content: 'Promouvoir l’autonomisation socio-économique et la dignité humaine des femmes et des familles en situation de précarité, brisant le cycle de la pauvreté par une approche intégrée.',
    },
    {
      title: 'Notre Vision',
      icon: Eye,
      content: 'Un monde où les femmes et les familles indigentes jouissent de leurs droits fondamentaux, sont autonomes et contribuent pleinement au développement de leurs communautés.',
    },
    {
      title: 'Nos Valeurs',
      icon: ShieldCheck,
      content: 'Solidarité, Dignité, Égalité, et Participation Communautaire guident chacune de nos interventions quotidiennes.',
    },
  ];

  const caMembers = [
    { name: 'ZAWADI KUBAGIRE Claudine', role: 'Présidente' },
    { name: 'BAHIGANA MIRHONYI Germain', role: 'Vice-Président' },
    { name: 'BAHAVU KANINGU Daniel', role: 'Secrétaire' },
    { name: 'REHEMA YAMBA Florence', role: 'Trésorière' },
  ];

  return (
    <div className="bg-white">
      <Meta 
        title="Qui Sommes-Nous ? - À Propos de SOPFFI"
        description="Découvrez l'histoire, la mission, la vision et les valeurs fondamentales de SOPFFI. En savoir plus sur notre Conseil d'Administration et nos antennes locales basées à Goma, Nord-Kivu, RDC."
        keywords="qui sommes nous SOPFFI, mission SOPFFI, vision SOPFFI, ONG Goma, association humanitaire Nord-Kivu, conseil d'administration SOPFFI"
        url="https://sopffi-virtssoft.org/a-propos"
      />
      {/* Header Section */}
      <section className="bg-slate-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-slate-900 mb-8">Qui sommes-nous ?</h1>
            <p className="text-xl text-slate-600 leading-relaxed italic">
              La SOPFFI (Solidarité pour la promotion des femmes et familles indigentes.) Asbl. est une organisation 
              de la société civile dédiée à l'autonomisation et à l'amélioration des conditions de vie à Goma, RDC.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Vision Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {sections.map((section, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-sopffi-blue mb-8 transition-transform group-hover:scale-110 shadow-sm border border-blue-100">
                  <section.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{section.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 bg-blue-900 text-white rounded-[4rem] mx-4 mb-24 overflow-hidden relative shadow-2xl shadow-blue-200">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sopffi-blue opacity-20 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-10">Rayon d'action & Gouvernance</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl h-fit border border-white/10 backdrop-blur">
                    <MapPin className="text-sopffi-yellow" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-white">Rayon National</h4>
                    <p className="text-blue-100/70 leading-relaxed">
                      S'étend sur toute la superficie de la RDC et peut s'étendre dans d'autres pays selon le besoin. 
                      Notre siège social est basé à Goma, Province du Nord-Kivu.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl h-fit border border-white/10 backdrop-blur">
                    <Landmark className="text-sopffi-yellow" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-white">Transparence & Reddition</h4>
                    <p className="text-blue-100/70 leading-relaxed">
                      Reposant sur un modèle associatif classique (AG, CA, Bureau Exécutif), nous garantissons 
                      une gestion éthique et responsable auprès de nos bénéficiaires et donateurs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Award className="text-sopffi-yellow" />
                Conseil d'Administration
              </h3>
              <div className="grid sm:grid-cols-2 gap-8">
                {caMembers.map((member, i) => (
                  <div key={i} className="space-y-1">
                    <p className="font-bold text-sopffi-yellow">{member.role}</p>
                    <p className="text-sm text-white/90">{member.name}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-xs text-white/50 italic text-center">
                  Le CA assure l'exécution des décisions de l'Assemblée Générale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Table Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Statistiques de l'organisation (2024)</h2>
            <p className="text-slate-500 max-w-xl mx-auto italic">Une communauté forte et diversifiée engagée pour le changement.</p>
          </div>
          
          <div className="overflow-hidden border border-slate-100 rounded-[2rem] shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5 text-sm font-black text-slate-900 uppercase tracking-widest">Tranche d'âge</th>
                  <th className="px-8 py-5 text-sm font-black text-sopffi-red uppercase tracking-widest">Femmes</th>
                  <th className="px-8 py-5 text-sm font-black text-sopffi-blue uppercase tracking-widest">Hommes</th>
                  <th className="px-8 py-5 text-sm font-black text-slate-900 uppercase tracking-widest">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6 text-sm font-medium text-slate-700">16 à 25 ans</td>
                  <td className="px-8 py-6 text-sm text-slate-600">179</td>
                  <td className="px-8 py-6 text-sm text-slate-600">104</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-900">283</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6 text-sm font-medium text-slate-700">26 à 45 ans</td>
                  <td className="px-8 py-6 text-sm text-slate-600">325</td>
                  <td className="px-8 py-6 text-sm text-slate-600">109</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-900">434</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6 text-sm font-medium text-slate-700">46 ans et +</td>
                  <td className="px-8 py-6 text-sm text-slate-600">504</td>
                  <td className="px-8 py-6 text-sm text-slate-600">201</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-900">705</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-8 py-6 text-sm font-black text-blue-900 uppercase">TOTAL</td>
                  <td className="px-8 py-6 text-sm font-black text-sopffi-red">1,008</td>
                  <td className="px-8 py-6 text-sm font-black text-sopffi-blue">414</td>
                  <td className="px-8 py-6 text-sm font-black text-slate-900 underline decoration-4 decoration-blue-200 underline-offset-4">1,422</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Location Bar */}
      <section className="bg-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-10 text-white/80">
          <div className="flex items-center gap-3">
             <MapPin size={20} className="text-sopffi-blue" />
             <span className="text-sm">Goma, Nord-Kivu, RDC</span>
          </div>
          <div className="w-1.5 h-1.5 bg-slate-700 rounded-full hidden md:block" />
          <div className="flex items-center gap-3">
             <Landmark size={20} className="text-sopffi-red" />
             <span className="text-sm">SOPFFI ASBL</span>
          </div>
          <div className="w-1.5 h-1.5 bg-slate-700 rounded-full hidden md:block" />
          <div className="flex items-center gap-3">
             <Users size={20} className="text-sopffi-yellow" />
             <span className="text-sm">1,422 Membres</span>
          </div>
        </div>
      </section>
    </div>
  );
}
