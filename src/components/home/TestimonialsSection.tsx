import React from 'react';
import { Quote, Heart, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      couple: 'Younes & Samira',
      location: 'Niamey (Niger) & Paris (France)',
      marriedSince: 'Mariés depuis Octobre 2025',
      quote: 'Nous cherchions tous deux une démarche pudique sans les travers des applications habituelles. La possibilité d\'impliquer mon père (Wali) dès la première semaine a apporté une bénédiction et une sérénité totale à notre union.',
      metrics: 'Rencontrés grâce au filtre de projet matrimonial',
    },
    {
      couple: 'Malick & Aïssatou',
      location: 'Dakar, Sénégal',
      marriedSince: 'Mariés depuis Janvier 2026',
      quote: 'Le score de compatibilité mettait l\'accent sur notre désir partagé d\'investir dans l\'éducation de nos futurs enfants et notre amour de la lecture. Rien n\'était superficiel : tout était axé sur l\'essentiel.',
      metrics: 'Score de compatibilité initial : 94%',
    },
    {
      couple: 'Karim & Leila',
      location: 'Bruxelles, Belgique',
      marriedSince: 'Mariés depuis Août 2025',
      quote: 'En tant que divorcé avec un enfant, j\'avais des craintes légitimes. Sur NIKAH CONNECT, la franchise sur la situation matrimoniale est valorisée. Nous avons trouvé un équilibre plein de tendresse et de respect.',
      metrics: 'Transparence totale sur la situation familiale',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#0F5132]">
            Témoignages & Bénédictions
          </span>
          <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#0F5132]">
            Ils ont construit leur foyer avec NIKAH CONNECT
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Des témoignages réels de couples qui ont fait le choix d'une démarche intègre, protégée et tournée vers l'avenir.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FAF9F6] border border-slate-200/90 flex flex-col justify-between shadow-sm hover:shadow transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[#0F5132]">
                  <Quote className="w-8 h-8 opacity-40 text-[#D4AF37]" />
                  <span className="text-[11px] font-semibold text-[#198754] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Union confirmée
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  « {item.quote} »
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 space-y-1">
                <h4 className="font-serif-brand font-bold text-base text-slate-900 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#0F5132] fill-[#0F5132]" />
                  <span>{item.couple}</span>
                </h4>
                <div className="text-[11px] text-slate-500">
                  <span>{item.location}</span>
                  <span className="mx-1">·</span>
                  <span>{item.marriedSince}</span>
                </div>
                <div className="pt-1 text-[11px] font-medium text-[#0F5132]">
                  {item.metrics}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
