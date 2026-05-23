import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BASELINE_POSTS, slugify } from '../data/blogData';
import { api, formatImageUrl } from '../lib/api';

interface Post {
  id: string;
  slug?: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: any;
  imageUrl?: string;
  tags?: string[];
}

export function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const responseList = await api.getBlogPosts();
        const postsData: Post[] = responseList.map(item => ({
          id: String(item.id),
          slug: item.slug || slugify(item.title),
          title: item.title,
          content: item.content,
          excerpt: item.excerpt,
          author: item.author || 'Admin SOPFFI',
          publishedAt: item.published_at || item.created_at || new Date().toISOString(),
          imageUrl: formatImageUrl(item.image_path),
          tags: item.tags ? item.tags.split(',').map(t => t.trim()) : []
        }));
        
        // Sort descending by date
        const sorted = [...postsData].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        setPosts(sorted);
      } catch (error) {
        console.error('Error fetching posts from SOPFFI API:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-20 text-center">
           <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">Actualités & Mises à jour</h1>
           <p className="text-xl text-slate-500 max-w-2xl mx-auto italic font-medium leading-relaxed">
             Suivez nos récentes campagnes, témoignages et l'avancement de nos projets sur le terrain.
           </p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-sopffi-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center bg-white rounded-3xl p-20 border border-slate-100 italic text-slate-400">
            <Search size={48} className="mx-auto mb-6 opacity-20" />
            <p>Aucun article publié pour le moment. Revenez bientôt !</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col"
              >
                <div className="aspect-[16/10] bg-slate-200 relative overflow-hidden">
                  <img 
                    src={post.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600'} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {post.tags?.[0] && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-sopffi-blue text-white text-[10px] font-black uppercase rounded-full tracking-widest shadow-lg">
                        {post.tags[0]}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-sopffi-red" />
                      {new Date(post.publishedAt?.toDate?.() || post.publishedAt).toLocaleDateString('fr-FR')}
                    </span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span className="flex items-center gap-1">
                      <User size={12} className="text-sopffi-red" />
                      {post.author}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-4 group-hover:text-sopffi-blue transition-colors leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 italic">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 font-black text-sopffi-blue uppercase text-[10px] tracking-widest hover:gap-3 transition-all">
                      Lire l'article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
