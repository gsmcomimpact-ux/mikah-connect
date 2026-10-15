import React, { useState } from 'react';
import { BLOG_POSTS } from '../../data/blogPosts';
import { BlogPost } from '../../types';
import { BRANDING } from '../../config/branding';
import { BookOpen, ArrowRight, ArrowLeft, Clock, UserCheck, Sparkles, Share2 } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  const categories = ['Tous', 'Préparer son mariage', 'Famille & Tradition', 'Sécurité en ligne', 'Conseils pour les rencontres'];

  const filteredPosts = selectedCategory === 'Tous'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-14 bg-[#FAF9F6] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* If Reading a Single Post */}
        {activePost ? (
          <div className="max-w-3xl mx-auto space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setActivePost(null)}
              className="text-xs font-semibold text-[#0F5132] hover:underline flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à tous les articles</span>
            </button>

            {/* Post Header */}
            <div className="space-y-3 pb-6 border-b border-slate-100">
              <span className="text-xs font-bold text-[#198754] uppercase tracking-wider block">
                {activePost.category}
              </span>
              <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                {activePost.title}
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{activePost.author}</span>
                <span aria-hidden="true">·</span>
                <span>{activePost.authorRole}</span>
                <span aria-hidden="true">·</span>
                <span>{activePost.publishDate}</span>
                <span aria-hidden="true">·</span>
                <span>{activePost.readTime}</span>
              </div>
            </div>

            {/* Post Content */}
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-normal">
              {activePost.content.map((paragraph, idx) => (
                <p key={idx} className="leading-7">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Ethical Footnote */}
            <div className="pt-6 border-t border-slate-100 p-4 rounded-2xl bg-[#FAF9F6] text-xs text-slate-600 flex items-center justify-between">
              <span>Rédigé dans l'esprit du Coran et de la noble Sunnah.</span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Lien de l\'article copié dans le presse-papiers');
                }}
                className="text-[#0F5132] font-semibold hover:underline flex items-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Partager</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Blog Main Header & Editorial Asset */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-6">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F5132]">
                  Guide Matrimonial & Éthique
                </span>
                <h1 className="font-serif-brand text-3xl sm:text-5xl font-bold text-[#0F5132]">
                  Conseils pour une rencontre sérieuse & un mariage béni
                </h1>
                <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                  Articles, réflexions et repères juridiques et relationnels pour cheminer vers le mariage avec sagesse, discernement et sérénité.
                </p>
              </div>

              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <img
                  src={BRANDING.assets.blogImage}
                  alt="Étude, sagesse et réflexion sur le mariage islamique"
                  className="w-full aspect-[16/9] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium">
                  Sagesse matrimoniale & éveil des cœurs
                </div>
              </div>
            </div>

            {/* Category Filter Pills (Functional Buttons) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#0F5132] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#0F5132]/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Unboxed Metadata (Zero-Pill Rule) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-[#198754]">{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.publishDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-serif-brand text-xl font-bold text-slate-900 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Par {post.author}
                    </span>
                    <button
                      onClick={() => setActivePost(post)}
                      className="text-xs font-bold text-[#0F5132] hover:text-[#198754] flex items-center gap-1 group"
                    >
                      <span>Lire l'article</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};
