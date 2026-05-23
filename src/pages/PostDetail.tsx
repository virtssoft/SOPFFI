import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { BASELINE_POSTS, slugify } from '../data/blogData';
import { api, formatImageUrl } from '../lib/api';

interface Post {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: any;
  imageUrl?: string;
  tags?: string[];
  province?: string;
}

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      try {
        // Try local baseline posts first
        const localPost = BASELINE_POSTS.find(p => p.id === id || p.slug === id || slugify(p.title) === id);
        if (localPost) {
          setPost(localPost);
          setLoading(false);
          return;
        }

        // Fetch from API
        const matched = await api.getBlogPost(id);
        if (matched) {
          setPost({
            title: matched.title,
            content: matched.content,
            excerpt: matched.excerpt,
            author: matched.author || 'Admin SOPFFI',
            publishedAt: matched.published_at || matched.created_at || new Date().toISOString(),
            imageUrl: formatImageUrl(matched.image_path),
            tags: matched.tags ? matched.tags.split(',').map(t => t.trim()) : [],
            province: matched.province
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-sopffi-blue transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Retour aux actualités
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-12"
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

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Banner Image */}
          <div className="aspect-[21/9] rounded-2xl bg-slate-100 overflow-hidden mb-12 border border-slate-100">
            <img
              src={post.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200'}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Post Content */}
          <div className="prose prose-slate max-w-none">
            {post.content.split('\n').map((paragraph, idx) => {
              if (!paragraph.trim()) return null;
              return (
                <p key={idx} className="text-slate-700 text-lg leading-relaxed mb-6 font-medium">
                  {paragraph}
                </p>
              );
            })}
          </div>

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
