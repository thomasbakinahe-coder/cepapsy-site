import React from "react";
import { useData } from "../lib/DataContext";
import { Calendar } from "lucide-react";

export default function NewsSection() {
  const { news } = useData();

  if (!news || news.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6" id="news-section">
      <div className="text-center mb-10">
        <span className="text-xs font-bold font-mono text-emerald-custom-700 uppercase tracking-widest bg-emerald-custom-100 px-3 py-1 rounded-full inline-block">
          Nos Actualités
        </span>
        <h2 className="serif-title text-3xl md:text-4xl font-extrabold text-stone-custom-900 mt-3">
          Travaux de Terrain & Interventions
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((n) => (
          <div key={n.id} className="bg-white rounded-2xl border border-stone-custom-200 overflow-hidden shadow-xs hover:shadow-md transition-all">
            <img src={n.imageUrl} alt={n.title} className="w-full h-48 object-cover" />
            <div className="p-5 space-y-2">
              <span className="text-[10px] font-mono text-stone-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(n.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <h3 className="font-bold text-stone-custom-900 text-base">{n.title}</h3>
              <p className="text-xs text-stone-custom-800 leading-relaxed">{n.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}