import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, MapPin, CheckCircle2, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { BASELINE_POSTS, slugify } from '../data/blogData';
import { api, formatImageUrl } from '../lib/api';
import { Meta } from '../components/Meta';

interface Post {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: any;
  imageUrl?: string;
  tags?: string[];
  province?: string;
  location?: string;
  domain?: string;
  tag?: string;
  beneficiaries?: string;
  status?: string;
  keyAchievements?: string[];
}

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAction, setIsAction] = useState(false);

  useEffect(() => {
    const isActionRoute = window.location.pathname.startsWith('/actions/');
    setIsAction(isActionRoute);

    async function fetchPost() {
      if (!id) return;
      try {
        let matched: any = null;
        if (isActionRoute) {
          matched = await api.getAction(id);
        } else {
          // Try local baseline posts first
          const localPost = BASELINE_POSTS.find(p => p.id === id || p.slug === id || slugify(p.title) === id);
          if (localPost) {
            setPost(localPost);
            setLoading(false);
            return;
          }

          // Fetch from API
          matched = await api.getBlogPost(id);
        }

        if (matched) {
          setPost({
            title: matched.title,
            content: matched.content,
            excerpt: matched.excerpt || '',
            author: matched.author || 'Admin SOPFFI',
            publishedAt: matched.published_at || matched.created_at || new Date().toISOString(),
            imageUrl: formatImageUrl(matched.image_path),
            tags: matched.tags ? matched.tags.split(',').map((t: any) => t.trim()) : [],
            province: matched.province,
            location: matched.location,
            domain: matched.domain,
            tag: matched.tag,
            beneficiaries: matched.beneficiaries,
            status: matched.status,
            keyAchievements: matched.key_achievements
              ? matched.key_achievements.split('\n').map((a: string) => a.trim()).filter(Boolean)
              : undefined
          });
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error fetching post detail from API:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-12 h-12 border-4 border-sopffi-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Article introuvable</h2>
        <p className="text-slate-500 mb-6">Cet article n'existe pas ou a été supprimé.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-sopffi-blue text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft size={18} /> Retour aux actualités
        </Link>
      </div>
    );
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt.toDate?.() || post.publishedAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <div className="bg-slate-50 min-h-screen py-20 lg:py-32">
      <Meta 
        title={`${post.title} - SOPFFI`}
        description={post.excerpt || (post.content ? post.content.substring(0, 160) + '...' : 'Détail de la publication de SOPFFI')}
        keywords={`${post.tags?.join(', ') || ''}, SOPFFI, actualités RDC, projet terrain, humanitaire`}
        image={post.imageUrl}
        type="article"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={isAction ? "/actions" : "/blog"}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-sopffi-blue transition-colors mb-8"
        >
          <ArrowLeft size={16} /> {isAction ? "Retour aux réalisations" : "Retour aux actualités"}
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-12 mb-12"
        >
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">
            <span className="flex items-center gap-1">
              <Calendar size={14} className="text-sopffi-red" />
              {formattedDate}
            </span>
            <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
            <span className="flex items-center gap-1">
              <User size={14} className="text-sopffi-red" />
              Par {post.author}
            </span>
            {post.province && (
              <>
                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                <span className="px-3 py-1 bg-red-50 text-sopffi-red text-[10px] font-black uppercase rounded-lg tracking-widest border border-red-100">
                  Province: {post.province}
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Action specific subtitle/category */}
          {(post.tag || post.domain || post.location) && (
            <div className="text-sopffi-blue font-bold text-lg mb-8 tracking-tight flex items-center flex-wrap gap-2">
              <span className="uppercase tracking-widest px-3 py-1 bg-blue-50 text-sopffi-blue text-[10px] font-black rounded-lg border border-blue-100">
                {post.tag || post.domain || "Action Terrain"}
              </span>
              {post.location && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 font-sans text-sm font-bold flex items-center gap-1.5 align-middle">
                    <MapPin size={16} className="text-sopffi-red inline" />
                    {post.location}
                  </span>
                </>
              )}
            </div>
          )}

          {/* Banner Image */}
          <div className="aspect-[21/9] rounded-2xl bg-slate-100 overflow-hidden mb-8 border border-slate-100">
            <img
              src={post.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200'}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Action Metadata Cards */}
          {(post.beneficiaries || post.status) && (
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-8 max-w-lg">
              {post.beneficiaries && (
                <div className="p-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1 font-sans">Cible / Bénéficiaires</span>
                  <span className="text-sm font-extrabold text-slate-700 font-sans">{post.beneficiaries}</span>
                </div>
              )}
              {post.status && (
                <div className="p-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1 font-sans">Statut</span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white ${
                    post.status === 'Réalisé' || post.status === 'Regle' ? 'bg-green-600' : 'bg-sopffi-blue'
                  }`}>
                    {post.status}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Post Content */}
          <div className="prose prose-slate max-w-none">
            {post.content.split('\n').map((paragraph, idx) => {
              if (!paragraph.trim()) return null;
              return (
                <p key={idx} className="text-slate-700 text-lg leading-relaxed mb-6 font-medium font-sans">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Key Achievements Checklist */}
          {post.keyAchievements && post.keyAchievements.length > 0 && (
            <div className="mt-12 p-8 bg-gradient-to-tr from-blue-50/40 to-indigo-50/15 rounded-3xl border border-blue-100/60 mb-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-sopffi-blue flex items-center gap-2 mb-4 font-sans">
                <CheckCircle2 size={16} className="text-sopffi-red" />
                Réalisations Majeures
              </h4>
              <ul className="grid sm:grid-cols-2 gap-4">
                {post.keyAchievements.map((ach, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-xs font-bold text-slate-700 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-sopffi-red mt-1.5 flex-shrink-0" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-sopffi-blue text-xs font-bold rounded-full"
                >
                  <Tag size={12} /> {tag}
                </span>
              ))}
            </div>
          )}
        </motion.article>
      </div>
    </div>
  );
}
