// Presentation Layer - Start Screen Component
// Includes category selection with consistent card layout and interactive feedback

import { useState } from 'react';
import { Trophy, ChevronRight, BookOpen, MessageCircle, HelpCircle, Shuffle } from 'lucide-react';
import { LeaderboardEntry } from '@domain/entities/Score';
import { QuestionType } from '@domain/entities/Question';

interface StartScreenProps {
  onStart: (type?: QuestionType) => void;
  leaderboard: LeaderboardEntry[];
}

export const StartScreen = ({ onStart, leaderboard }: StartScreenProps) => {
  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    {
      id: 'Kitendawili' as QuestionType,
      name: 'Vitendawili',
      desc: 'Tega na kutegua',
      icon: HelpCircle,
      color: 'bg-orange-100 text-orange-700 border-orange-200'
    },
    {
      id: 'Methali' as QuestionType,
      name: 'Methali',
      desc: 'Hekima ya wahenga',
      icon: BookOpen,
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    },
    {
      id: 'Nahau' as QuestionType,
      name: 'Nahau',
      desc: 'Maana za ndani',
      icon: MessageCircle,
      color: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    {
      id: undefined,
      name: 'Mchanganyiko',
      desc: 'Zote kwa pamoja',
      icon: Shuffle,
      color: 'bg-purple-100 text-purple-700 border-purple-200'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-stone-100 flex items-center justify-center p-3 sm:p-4 md:p-6 font-sans text-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border-t-8 border-emerald-600 transition-all duration-500">

        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block mb-2">
            <img
              src="/vitendawili_na_methali_favicon/favicon-96x96.png"
              alt="Methali Game Logo"
              className={`w-20 h-20 sm:w-24 sm:h-24 animate-bounce-slow ${showCategories ? 'scale-75 mb-0' : 'mb-2'}`}
            />
          </div>
          <h1 className={`${showCategories ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-bold text-gray-900 mb-1 tracking-tight transition-all duration-300`}>
            Mizungu & Methali
          </h1>
          <p className={`text-emerald-700 italic ${showCategories ? 'text-xs sm:text-sm' : 'text-base sm:text-lg'} font-medium font-serif px-2 transition-all duration-300`}>
            "Busara ni akiba ya mzee."
          </p>
        </div>

        {!showCategories ? (
          <button
            onClick={() => setShowCategories(true)}
            className="group w-full py-5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-2xl font-bold text-xl transition-all shadow-lg flex items-center justify-center gap-2 mb-6 touch-manipulation"
          >
            Anza Mchezo
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <div className="space-y-3 mb-6 sm:mb-8 animate-fade-in text-left">
            <h2 className="text-xl font-black text-gray-800 mb-5 text-center">Chagua Aina ya Mchezo:</h2>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => onStart(cat.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${cat.color} group relative overflow-hidden`}
              >
                <div className="p-3 bg-white/60 rounded-xl shadow-sm group-hover:rotate-6 transition-transform">
                  <cat.icon size={28} />
                </div>
                <div>
                  <div className="font-extrabold text-lg leading-tight">{cat.name}</div>
                  <div className="text-[11px] opacity-80 font-bold uppercase tracking-wider">{cat.desc}</div>
                </div>
                <ChevronRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        )}

        {leaderboard.length > 0 && (
          <div className="mt-4 border-t-2 border-stone-50 pt-6">
            <h3 className="text-emerald-800 font-black uppercase text-[10px] tracking-[0.2em] mb-4 flex items-center justify-center gap-2">
              <Trophy size={14} /> Mabingwa
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar px-1">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className="flex justify-between items-center p-3 bg-stone-50 rounded-xl border border-stone-100/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center bg-white rounded-full text-[10px] font-black shadow-sm text-emerald-800">
                      {entry.rank}
                    </span>
                    <span className="text-gray-800 font-bold text-sm">{entry.points} pts</span>
                  </div>
                  <span className="text-[9px] text-stone-400 font-bold uppercase">
                    {entry.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
