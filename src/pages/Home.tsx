import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Users, Briefcase, GraduationCap, Sprout, ShieldAlert, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VolunteerModal } from '../components/VolunteerModal';
import { api, formatImageUrl } from '../lib/api';
import { slugify } from '../data/blogData';
import { Meta } from '../components/Meta';

export function Home() {
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [partnerLogos, setPartnerLogos] = useState<any[]>([]);
  const [heroImage, setHeroImage] = useState<string>('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000');
  const [latestActions, setLatestActions] = useState<any[]>([]);
  const [loadingActions, setLoadingActions] = useState<boolean>(true);
  
  const [latestPosts, setLatestPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    // Fetch dynamic partners
    api.getPartners()
      .then(data => {
        if (data && data.length > 0) {
          setPartnerLogos(data);
        }
      })
      .catch(err => console.error('Failed to load partners from API', err));

    // Fetch dynamic hero / about image
    api.getAbout()
      .then(data => {
        if (data && data.image_url) {
          setHeroImage(data.image_url);
        }
      })
      .catch(err => console.error('Failed to load about details from API', err));

    // Fetch 3 latest actions
    api.getActions()
      .then(data => {
        if (data && data.length > 0) {
          const sorted = [...data].sort((a, b) => String(b.id).localeCompare(String(a.id)));
          setLatestActions(sorted.slice(0, 3));
        } else {
          setLatestActions([]);
        }
      })
      .catch(err => {
        console.error('Failed to load actions from API', err);
        setLatestActions([]);
      })
      .finally(() => setLoadingActions(false));

    // Fetch blog posts for the hero carousel
    api.getBlogPosts()
      .then(data => {
        if (data && data.length > 0) {
          const sorted = data.map((item: any) => ({
            id: String(item.id),
            slug: item.slug || slugify(item.title),
            title: item.title,
            content: item.content,
            excerpt: item.excerpt,
            author: item.author || 'Admin SOPFFI',
            publishedAt: item.published_at || item.created_at || new Date().toISOString(),
            imageUrl: formatImageUrl(item.image_path),
            tags: item.tags ? item.tags.split(',').map((t: string) => t.trim()) : []
          })).sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
          setLatestPosts(sorted);
        } else {
          setLatestPosts([]);
        }
      })
      .catch(err => {
        console.error('Failed to load blog posts from API', err);
        setLatestPosts([]);
      })
      .finally(() => setLoadingPosts(false));
  }, []);

  useEffect(() => {
    if (latestPosts.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % latestPosts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [latestPosts.length]);

  const stats = [
    { label: 'Membres Actifs', value: '1,422', icon: Users },
    { label: 'Femmes Accompagnées', value: '1,008', icon: Heart },
    { label: 'Jeunes Formés', value: '283', icon: GraduationCap },
    { label: 'Provinces d\'Action', value: '2+', icon: ShieldAlert },
  ];

  const domains = [
    {
      title: 'Éducation',
      icon: GraduationCap,
      desc: 'Centres d’apprentissage, parrainage scolaire et conférences pour la jeunesse.',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Agro-pastoral',
      icon: Sprout,
      desc: 'Sécurité alimentaire, coopératives agricoles et protection de l’environnement.',
      color: 'bg-blue-100 text-sopffi-blue',
    },
    {
      title: 'Santé & Nutrition',
      icon: Heart,
      desc: 'Soins primaires, centres nutritionnels et amélioration de l’accès à l’eau.',
      color: 'bg-rose-50 text-rose-600',
    },
    {
      title: 'Droits Humains',
      icon: ShieldAlert,
      desc: 'Lutte contre les VBG et défense des droits des femmes et des enfants.',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Entrepreneuriat & Autonomisation',
      icon: Briefcase,
      desc: 'Formations professionnelles, octroi de micro-crédits et accompagnement dans la création de micro-entreprises.',
      color: 'bg-emerald-50 text-emerald-600',
    }
  ];

  return (
    <div className="overflow-hidden">
      <Meta 
        title="SOPFFI - Solidarité pour la Promotion de la Famille et de la Femme Indigente en RDC"
        description="SOPFFI est une association sans but lucratif engagée pour l’autonomisation socio-économique des femmes et familles indigentes, l'éducation des orphelins, la santé communautaire et le reboisement en République Démocratique du Congo."
        keywords="SOPFFI, association humanitaire RDC, autonomisation femme Goma, orphelins RDC, micro-crédits Goma, reboisement Kalehe, santé communautaire Congo"
        url="https://sopffi-virtssoft.org/"
      />
      {/* Hero Section Carousel */}
      <section className="relative pt-10 pb-20 lg:pt-20 lg:pb-32 bg-slate-50 min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-x-12 -translate-y-12 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-100/30 rounded-full blur-3xl translate-x-12 translate-y-12 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          {loadingPosts ? (
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-pulse">
              <div className="space-y-6">
                <div className="h-6 bg-slate-200 rounded w-1/4" />
                <div className="h-12 bg-slate-200 rounded w-3/4" />
                <div className="h-12 bg-slate-200 rounded w-5/6" />
                <div className="h-24 bg-slate-200 rounded w-full" />
                <div className="h-12 bg-slate-200 rounded w-1/3" />
              </div>
              <div className="aspect-[4/3] bg-slate-200 rounded-[2rem]" />
            </div>
          ) : latestPosts.length > 0 ? (
            <div className="relative">
              <AnimatePresence mode="wait">
                {latestPosts.map((post, index) => {
                  if (index !== currentSlide) return null;
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.6 }}
                      className="relative min-h-[500px] lg:min-h-[600px] rounded-[3rem] overflow-hidden flex items-center px-6 py-12 sm:px-12 md:px-16 lg:px-24 border border-slate-950/10 shadow-2xl"
                    >
                      {/* Background Image of the post with multi-layer high-contrast gradient */}
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={post.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200'} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-[10000ms] hover:scale-105"
                        />
                        {/* Primary left-to-right gradient for desktop reading flow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent hidden md:block" />
                        {/* Primary bottom-to-top gradient for mobile portrait orientation */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent md:hidden" />
                        {/* Secondary ambient dark overlay to ensure maximum contrast on any source image */}
                        <div className="absolute inset-0 bg-black/30" />
                      </div>

                      {/* Content details overlay */}
                      <div className="relative z-10 max-w-3xl space-y-6 text-white">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="inline-block px-4 py-1.5 bg-sopffi-red text-white rounded-full text-[10px] font-black uppercase tracking-wider italic">
                            Dernière Actualité
                          </span>
                          {post.tags && post.tags.slice(0, 2).map((tag: string, i: number) => (
                            <span key={i} className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] hover:text-blue-200 transition-colors">
                          <Link to={`/blog/${post.slug || post.id}`}>
                            {post.title}
                          </Link>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans max-w-2xl line-clamp-3">
                          {post.excerpt || post.content.substring(0, 180) + '...'}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-slate-300 font-bold uppercase tracking-wider">
                          <span>Par {post.author}</span>
                          <span>•</span>
                          <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-2">
                          <Link 
                            to={`/blog/${post.slug || post.id}`} 
                            className="inline-flex items-center gap-2 px-8 py-4 bg-sopffi-blue text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 active:translate-y-0"
                          >
                            Lire l'article <ArrowRight size={16} />
                          </Link>
                          <Link 
                            to="/blog" 
                            className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/20 transition-all backdrop-blur-md"
                          >
                            Toutes les actualités
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Navigation Arrows & Pagination Dots */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-6 pt-6 border-t border-slate-150">
                {/* Dots / Indicators */}
                <div className="flex gap-2.5">
                  {latestPosts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-sopffi-blue' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                      aria-label={`Aller au slide ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentSlide(prev => (prev - 1 + latestPosts.length) % latestPosts.length)}
                    className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-sm flex items-center justify-center"
                    aria-label="Article précédent"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setCurrentSlide(prev => (prev + 1) % latestPosts.length)}
                    className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-sm flex items-center justify-center"
                    aria-label="Article suivant"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-150 p-8 max-w-2xl mx-auto shadow-sm">
              <p className="text-slate-500 font-medium text-lg italic">Aucune actualité disponible pour l'instant.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 transition-colors">
                  <stat.icon className="text-slate-400 group-hover:text-sopffi-blue transition-colors" size={24} />
                </div>
                <p className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-black text-sopffi-blue uppercase tracking-[0.2em] mb-4">Notre Vision</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Un monde où chaque famille indigente jouit de ses droits fondamentaux.
            </h3>
            <p className="text-lg text-slate-600 italic">
              "Nous œuvrons pour un développement durable et inclusif en offrant des solutions concrètes et holistiques."
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {domains.map((domain, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl border border-slate-100 bg-white hover:shadow-xl hover:shadow-slate-100 transition-all"
              >
                <div className={`w-14 h-14 ${domain.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                  <domain.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{domain.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                  {domain.desc}
                </p>
                <Link to="/actions" className="inline-flex items-center gap-2 text-sm font-bold text-sopffi-blue hover:gap-3 transition-all">
                  En savoir plus <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Scrolling Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-150 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-sopffi-blue rounded-full text-xs font-black uppercase tracking-widest mb-4">
            Coalition & Impact
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Ils soutiennent nos actions de terrain
          </h3>
          <p className="text-slate-500 font-medium italic text-sm mt-2">
            Des partenaires stratégiques engagés avec SOPFFI pour le bien-être communautaire en RD Congo.
          </p>
        </div>

        {/* Scrolling wrapper to host the infinite horizontal marquee */}
        <div className="relative w-full overflow-hidden flex items-center">
          {/* Left / Right overlays for smooth fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          {/* Core Track running the custom css animation loop */}
          {partnerLogos.length > 0 ? (
            <div className="flex gap-8 animate-infinite-scroll py-4 hover:[animation-play-state:paused] cursor-pointer w-max">
              {[...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos].map((partner, index) => (
                <div
                  key={`partner-api-${index}`}
                  className="flex items-center justify-center bg-white rounded-2xl border border-slate-100 hover:border-slate-200 px-10 py-5 shadow-sm hover:shadow-md transition-all duration-300 min-w-[240px] h-24"
                >
                  <img
                    src={partner.url}
                    alt={partner.name}
                    className="max-h-16 max-w-[200px] object-contain transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {!partner.url && (
                    <span className="font-extrabold text-slate-800 text-sm">{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-8 animate-infinite-scroll py-4 hover:[animation-play-state:paused] cursor-pointer w-max">
              {/* Round 1 of Logos */}
              {[
                { name: 'UNICEF RDC', tag: 'Nations Unies', logoText: 'UN', color: 'text-sky-600 bg-sky-50 border-sky-100' },
                { name: 'USAID Congo', tag: 'Aide Internationale', logoText: 'US', color: 'text-red-700 bg-red-50 border-red-100' },
                { name: 'PNUD RDC', tag: 'Nations Unies', logoText: 'PN', color: 'text-blue-600 bg-blue-50 border-blue-100' },
                { name: 'HEAL Africa', tag: 'Santé & Protection', logoText: 'HA', color: 'text-violet-600 bg-violet-50 border-violet-100' },
                { name: 'Fonds Femmes Congolaises', tag: 'Genre & Plaidoyer', logoText: 'FC', color: 'text-rose-600 bg-rose-50 border-rose-100' },
                { name: 'Union Européenne', tag: 'Impact Européen', logoText: 'UE', color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
                { name: 'CARITAS Goma', tag: 'Secours Humanitaire', logoText: 'CA', color: 'text-amber-600 bg-amber-50 border-amber-100' },
                { name: 'PAM (WFP)', tag: 'Urgence Alimentaire', logoText: 'PM', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
              ].map((partner, index) => (
                <div
                  key={`p1-${index}`}
                  className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 px-6 py-4 shadow-sm hover:shadow-md transition-all duration-300 min-w-[260px]"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-sm border flex-shrink-0 ${partner.color}`}>
                    {partner.logoText}
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-slate-800 text-sm leading-tight tracking-tight whitespace-nowrap">
                      {partner.name}
                    </h4>
                    <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">
                      {partner.tag}
                    </p>
                  </div>
                </div>
              ))}

              {/* Duplicate Round 2 of Logos for seamless marquee wrapping */}
              {[
                { name: 'UNICEF RDC', tag: 'Nations Unies', logoText: 'UN', color: 'text-sky-600 bg-sky-50 border-sky-100' },
                { name: 'USAID Congo', tag: 'Aide Internationale', logoText: 'US', color: 'text-red-700 bg-red-50 border-red-100' },
                { name: 'PNUD RDC', tag: 'Nations Unies', logoText: 'PN', color: 'text-blue-600 bg-blue-50 border-blue-100' },
                { name: 'HEAL Africa', tag: 'Santé & Protection', logoText: 'HA', color: 'text-violet-600 bg-violet-50 border-violet-100' },
                { name: 'Fonds Femmes Congolaises', tag: 'Genre & Plaidoyer', logoText: 'FC', color: 'text-rose-600 bg-rose-50 border-rose-100' },
                { name: 'Union Européenne', tag: 'Impact Européen', logoText: 'UE', color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
                { name: 'CARITAS Goma', tag: 'Secours Humanitaire', logoText: 'CA', color: 'text-amber-600 bg-amber-50 border-amber-100' },
                { name: 'PAM (WFP)', tag: 'Urgence Alimentaire', logoText: 'PM', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
              ].map((partner, index) => (
                <div
                  key={`p2-${index}`}
                  className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 px-6 py-4 shadow-sm hover:shadow-md transition-all duration-300 min-w-[260px]"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-sm border flex-shrink-0 ${partner.color}`}>
                    {partner.logoText}
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-slate-800 text-sm leading-tight tracking-tight whitespace-nowrap">
                      {partner.name}
                    </h4>
                    <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">
                      {partner.tag}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Realizations Highlight */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-3xl -z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-sm font-black text-sopffi-red uppercase tracking-[0.2em] mb-4">Nos Réalisations</h2>
            <h3 className="text-4xl font-bold mb-16">Changer des vies, une action à la fois.</h3>
            
            {loadingActions ? (
              <div className="grid md:grid-cols-3 gap-12 text-left">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="space-y-4 animate-pulse">
                    <div className="aspect-video bg-slate-800 rounded-2xl mb-6 border border-slate-700" />
                    <div className="h-4 bg-slate-800 rounded w-2/3" />
                    <div className="h-3 bg-slate-800 rounded w-full" />
                    <div className="h-3 bg-slate-800 rounded w-5/6" />
                  </div>
                ))}
              </div>
            ) : latestActions.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-12 text-left">
                {latestActions.map((action) => (
                  <Link key={action.id} to={`/actions/${action.id}`} className="space-y-4 group block cursor-pointer">
                    <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden mb-6 relative border border-slate-700">
                      <img 
                        src={formatImageUrl(action.image_path)} 
                        alt={action.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent flex flex-col justify-end p-6">
                        <p className="font-bold text-lg mb-1 group-hover:text-sopffi-blue transition-colors line-clamp-1">{action.title}</p>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{action.tag || action.domain} • {action.location || action.province}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">{action.excerpt || (action.content ? action.content.substring(0, 140) + '...' : '')}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-slate-800/40 rounded-3xl border border-slate-700/60 max-w-2xl mx-auto my-6">
                <p className="text-slate-400 font-medium text-lg leading-relaxed">
                  Aucune réalisation n'est encore enregistrée pour le moment.
                </p>
                <p className="text-slate-500 text-sm mt-2 italic">
                  Nos équipes de terrain sont à pied d'œuvre et publieront de nouvelles activités d'impact très bientôt.
                </p>
              </div>
            )}
            
            <div className="mt-16">
              <Link to="/actions" className="inline-flex items-center gap-3 text-sopffi-blue font-bold hover:text-blue-400 transition-colors bg-white px-6 py-3 rounded-xl">
                Voir toutes nos réalisations <ArrowRight size={20} />
              </Link>
            </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-sopffi-blue relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Prêt à faire partie du changement avec la SOPFFI ?
          </h2>
          <p className="text-blue-50 text-lg mb-12 max-w-2xl mx-auto">
            Que vous soyez une personne souhaitant donner de son temps ou une organisation cherchant 
            à soutenir nos projets, votre impact compte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsVolunteerModalOpen(true)}
              className="px-10 py-4 bg-white text-sopffi-blue rounded-2xl font-bold text-lg shadow-xl hover:bg-slate-50 transition-all active:scale-95"
            >
              Devenir Bénévole
            </button>
            <button className="px-10 py-4 bg-sopffi-red text-white border border-red-500/30 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all active:scale-95">
              Devenir Partenaire
            </button>
          </div>
        </div>
      </section>
      <VolunteerModal 
        isOpen={isVolunteerModalOpen} 
        onClose={() => setIsVolunteerModalOpen(false)} 
      />
    </div>
  );
}
