import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  X, 
  Filter, 
  GraduationCap, 
  Sprout, 
  Heart, 
  Scale, 
  Briefcase, 
  Globe,
  Info
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api, formatImageUrl } from '../lib/api';
import { Meta } from '../components/Meta';
import { Realization } from '../data/realizationsData';

const DOMAINS_LIST = [
  { id: 'all', name: 'Tous les domaines', icon: Globe },
  { id: 'Education', name: 'Éducation & Formation', icon: GraduationCap },
  { id: 'Agro-pastoral', name: 'Agro-pastoral', icon: Sprout },
  { id: 'Sante', name: 'Santé & Nutrition', icon: Heart },
  { id: 'Autonomisation', name: 'Entrepreneuriat & Autonomisation', icon: Briefcase },
  { id: 'Droits', name: 'Droits Humains', icon: Scale },
];

const PROVINCES_LIST = [
  { id: 'all', name: 'Toutes les provinces' },
  { id: 'NK', name: 'Nord-Kivu' },
  { id: 'SK', name: 'Sud-Kivu' },
  { id: 'KIN', name: 'Kinshasa' },
  { id: 'IT', name: 'Ituri' },
  { id: 'MN', name: 'Maniema' },
];

export function Actions() {
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Realization | null>(null);

  useEffect(() => {
    async function fetchProvinceActivities() {
      setLoading(true);
      try {
        const responseList = await api.getActions();
        const activitiesData: Realization[] = responseList.map(item => {
          return {
            id: String(item.id),
            title: item.title,
            loc: item.location || 'Goma',
            province: item.province,
            domain: item.domain || 'Autonomisation',
            date: item.published_at ? new Date(item.published_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : 'Récemment',
            tag: item.tag || item.domain || 'Action',
            description: item.excerpt || (item.content ? item.content.substring(0, 140) + '...' : ''),
            imageUrl: formatImageUrl(item.image_path),
            beneficiaries: item.beneficiaries || 'Communauté locale',
            status: item.status || 'Réalisé',
            longDescription: item.content || '',
            keyAchievements: item.key_achievements
              ? item.key_achievements.split('\n').map((a: string) => a.trim()).filter(Boolean)
              : [
                  'Action déployée sur le terrain par l\'antenne locale',
                  'Coordination en lien étroit avec les leaders d\'opinion',
                  'Soutien direct aux populations de la province de ' + item.province
                ]
          };
        });
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProvinceActivities();
  }, []);

  // Only show actions from the database
  const allRealizations = activities;

  // Apply Search, Province & Domain Filtering
  const filteredRealizations = allRealizations.filter((item) => {
    const matchesProvince = selectedProvince === 'all' || item.province === selectedProvince;
    const matchesDomain = selectedDomain === 'all' || item.domain === selectedDomain;
    
    const queryLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(queryLower) ||
      item.description.toLowerCase().includes(queryLower) ||
      item.loc.toLowerCase().includes(queryLower) ||
      item.province.toLowerCase().includes(queryLower) ||
      item.tag.toLowerCase().includes(queryLower);

    return matchesProvince && matchesDomain && matchesSearch;
  });

  const handleResetFilters = () => {
    setSelectedProvince('all');
    setSelectedDomain('all');
    setSearchQuery('');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20 lg:py-28">
      <Meta 
        title="Nos Actions & Impact Terrain en RDC - SOPFFI"
        description="Parcourez les réalisations concrètes de la SOPFFI sur le terrain : agro-pastoral à Kalehe, éducation des orphelins à Goma, cliniques mobiles en Ituri et projets d'autonomisation."
        keywords="projets SOPFFI, réalisations humanitaires RDC, projets agro-pastoraux Kalehe, assistance humanitaire Ituri, autonomisation femmes Congo"
        url="https://sopffi-virtssoft.org/actions"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Page Header */}
        <header className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-sopffi-blue rounded-full text-xs font-black uppercase tracking-widest mb-4">
            Rapport Terrain & Impact
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Nos Réalisations Récentes
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto italic font-medium leading-relaxed">
            SOPFFI mène des actions multisectorielles structurantes sur le terrain en RD Congo. 
            Découvrez nos chantiers de proximité et filtrez-les par province ou par domaine d'intervention.
          </p>
        </header>

        {/* Filters Controller Panel */}
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 mb-12 shadow-sm space-y-6">
          
          {/* Top Line: Search Input & Current Filter Summary */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                <Search size={18} />
              </span>
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un projet, une ville, une action..."
                className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-100 focus:border-sopffi-blue focus:bg-white rounded-2xl text-sm font-medium outline-none transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  id="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Active Tags / Reset filter */}
            <div className="flex flex-wrap items-center gap-2 justify-end w-full md:w-auto">
              {(selectedProvince !== 'all' || selectedDomain !== 'all' || searchQuery !== '') && (
                <>
                  <button
                    id="reset-filters-btn"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                  >
                    Réinitialiser les filtres
                    <X size={14} />
                  </button>
                </>
              )}
              <span className="px-4 py-2 bg-blue-50 text-sopffi-blue rounded-xl text-xs font-bold">
                {filteredRealizations.length} projet{filteredRealizations.length > 1 ? 's' : ''} trouvé{filteredRealizations.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Sectors filtering buttons */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Filter size={12} className="text-sopffi-red" />
              Filtrer par Domaine d'Intervention
            </h4>
            <div className="flex flex-wrap gap-2">
              {DOMAINS_LIST.map((dom) => {
                const isSelected = selectedDomain === dom.id;
                const IconComponent = dom.icon;
                return (
                  <button
                    key={dom.id}
                    id={`domain-filter-${dom.id}`}
                    onClick={() => setSelectedDomain(dom.id)}
                    className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-sopffi-blue text-white border-sopffi-blue shadow-md shadow-blue-500/10'
                        : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <IconComponent size={14} />
                    {dom.name}
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Provinces filtering buttons */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <MapPin size={12} className="text-sopffi-red" />
              Filtrer par Province (Antenne)
            </h4>
            <div className="flex flex-wrap gap-2">
              {PROVINCES_LIST.map((prov) => {
                const isSelected = selectedProvince === prov.name || (prov.id === 'all' && selectedProvince === 'all');
                return (
                  <button
                    key={prov.id}
                    id={`province-filter-${prov.id}`}
                    onClick={() => setSelectedProvince(prov.id === 'all' ? 'all' : prov.name)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-sopffi-red text-white border-sopffi-red shadow-md shadow-red-500/10'
                        : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {prov.name}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Realizations Grid Loader */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2.5rem] border border-slate-100">
            <div className="w-12 h-12 border-4 border-sopffi-blue border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-500 font-bold text-sm italic">Synchronisation des activités de terrain...</p>
          </div>
        ) : filteredRealizations.length === 0 ? (
          
          /* Fallback Empty State */
          <div className="text-center bg-white rounded-[3rem] p-24 border border-slate-100 overflow-hidden relative shadow-sm">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sopffi-blue via-sopffi-red to-sopffi-yellow" />
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-2xl mx-auto mb-6 text-slate-300">
              <span className="font-bold italic text-2xl">ø</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Aucune réalisation correspondante</h3>
            <p className="text-slate-500 font-medium italic text-sm max-w-sm mx-auto mb-6">
              Nous n'avons trouvé de projets actifs correspondants aux critères de filtres actuellement actifs.
            </p>
            <button
              id="no-results-reset-btn"
              onClick={handleResetFilters}
              className="px-6 py-3 bg-sopffi-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl uppercase tracking-widest transition-all"
            >
              Afficher tout le catalogue
            </button>
          </div>
        ) : (
          
          /* Dynamic Portfolio Grid with animations */
          <motion.div 
            layout 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredRealizations.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  id={`card-container-${item.id}`}
                  className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden border border-slate-150/60 flex flex-col justify-between hover:shadow-xl hover:border-slate-200 transition-all duration-300 shadow-sm"
                  onClick={() => {
                    if (item.id.startsWith('base-')) {
                      setSelectedItem(item);
                    } else {
                      navigate(`/actions/${item.id}`);
                    }
                  }}
                >
                  
                  {/* Image Block */}
                  <div>
                    <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                      <img 
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                      />
                      
                      {/* Floating Status & Domain Tags */}
                      <div className="absolute top-4 inset-x-4 flex justify-between items-center">
                        <span className="px-3 py-1 bg-white/95 backdrop-blur text-[9px] font-black uppercase rounded-lg tracking-widest text-slate-900 border border-slate-200 shadow-sm">
                          {item.tag}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest text-white shadow-sm ${
                          item.status === 'Réalisé' ? 'bg-green-600' : 'bg-sopffi-blue'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="p-8 pb-0">
                      <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-sopffi-red flex-shrink-0" />
                          {item.loc} ({item.province})
                        </span>
                        <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-sopffi-red flex-shrink-0" />
                          {item.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sopffi-blue transition-colors leading-snug mb-3">
                        {item.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium italic">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card bottom footer */}
                  <div className="p-8 pt-0 border-t border-slate-50 flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-bold text-slate-400 capitalize bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      Cible: {item.beneficiaries}
                    </span>
                    <button
                      id={`read-more-btn-${item.id}`}
                      className="inline-flex items-center gap-1 font-black text-sopffi-blue uppercase text-[9px] tracking-widest group-hover:gap-2 transition-all"
                    >
                      En savoir plus
                      <ArrowRight size={14} className="text-sopffi-red" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Dynamic Detail Modal */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              
              {/* Backdrop blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
                onClick={() => setSelectedItem(null)}
              />

              {/* Modal window */}
              <motion.div
                id="realization-detail-modal"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white rounded-[3rem] w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
              >
                
                {/* Header with Background/Image */}
                <div className="relative aspect-[21/9] bg-slate-100 overflow-hidden flex-shrink-0 border-b border-slate-100">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                  
                  {/* Close button */}
                  <button
                    id="close-modal-btn"
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-900/50 hover:bg-slate-900 text-white flex items-center justify-center transition-all border border-white/10"
                  >
                    <X size={20} />
                  </button>

                  {/* Title & tags embedded on bottom edge */}
                  <div className="absolute bottom-6 left-6 right-6 text-white max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-sopffi-red text-[9px] font-black uppercase rounded-lg tracking-widest shadow">
                        {selectedItem.tag}
                      </span>
                      <span className="px-3 py-1 bg-white/20 text-[9px] font-bold uppercase rounded-lg tracking-widest backdrop-blur border border-white/10">
                        {selectedItem.province}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/10 shadow-sm ${
                        selectedItem.status === 'Réalisé' ? 'bg-green-600 text-white' : 'bg-sopffi-blue text-white'
                      }`}>
                        {selectedItem.status}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-3xl font-black tracking-tight">{selectedItem.title}</h2>
                  </div>
                </div>

                {/* Content body area with standalone scroll bar */}
                <div className="p-8 md:p-10 overflow-y-auto space-y-8 flex-grow">
                  
                  {/* Meta indicators */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Localisation</p>
                      <p className="font-extrabold text-slate-900 text-sm flex items-center justify-center gap-1">
                        <MapPin size={14} className="text-sopffi-red" />
                        {selectedItem.loc} ({selectedItem.province})
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Date d'action</p>
                      <p className="font-extrabold text-slate-900 text-sm flex items-center justify-center gap-1">
                        <Calendar size={14} className="text-sopffi-red" />
                        {selectedItem.date}
                      </p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Bénéficiaires Directs</p>
                      <p className="font-extrabold text-slate-900 text-sm flex items-center justify-center gap-1">
                        <User size={14} className="text-sopffi-red" />
                        {selectedItem.beneficiaries}
                      </p>
                    </div>
                  </div>

                  {/* Descriptions block */}
                  <div className="grid md:grid-cols-5 gap-8 items-start">
                    
                    {/* Long paragraphs (3/5 width) */}
                    <div className="md:col-span-3 space-y-4">
                      <h4 className="text-sm font-black uppercase tracking-widest text-sopffi-blue">
                        Description du projet
                      </h4>
                      <p className="text-slate-600 font-medium text-base leading-relaxed">
                        {selectedItem.longDescription}
                      </p>
                    </div>

                    {/* Checklists (2/5 width) */}
                    <div className="md:col-span-2 bg-gradient-to-tr from-blue-50/50 to-indigo-50/20 p-6 rounded-2xl border border-blue-50/65 space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-sopffi-blue flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-sopffi-red" />
                        Réalisations Majeures
                      </h4>
                      <ul className="space-y-3">
                        {selectedItem.keyAchievements.map((ach, idx) => (
                          <li key={idx} className="flex gap-2 items-start text-xs font-semibold text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-sopffi-red mt-1.5 flex-shrink-0" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                </div>

                {/* Modal actions / bottom footer */}
                <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 flex-shrink-0">
                  <p className="text-xs text-slate-500 font-medium inline-flex items-center gap-2">
                    <Info size={14} className="text-sopffi-blue" />
                    Cette activité est validée et coordonnée par le comité central de SOPFFI.
                  </p>
                  <button
                    id="support-this-modal-btn"
                    onClick={() => {
                      setSelectedItem(null);
                      // Scroll to contact form or navigate
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-sopffi-blue hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-blue-500/10 active:scale-95"
                  >
                    Soutenir nos actions de terrain
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
