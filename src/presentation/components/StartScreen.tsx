// Presentation Layer - Start Screen Component
// Includes category selection for a more personalized game experience

import { useState } from 'react';
import { Trophy, ChevronRight, BookOpen, MessageCircle, HelpCircle } from 'lucide-react';
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-stone-100 flex items-center justify-center p-3 sm:p-4 md:p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border-t-8 border-emerald-600 transition-all duration-500">

        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block mb-3 sm:mb-4">
            <img
              src="/vitendawili_na_methali_favicon/favicon-96x96.png"
              alt="Methali Game Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 animate-bounce-slow"
            />
          </div>
        </div>

        {!showCategories ? (
          <button
            onClick={() => setShowCategories(true)}
            className="group w-full py-4 sm:py-5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl transition-all shadow-lg flex items-center justify-center gap-2 mb-6 sm:mb-8 touch-manipulation"
          >
            Anza Mchezo
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <div className="space-y-3 mb-6 sm:mb-8 animate-fade-in">
            <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">Chagua Aina ya Mchezo:</h2>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onStart(cat.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${cat.color}`}
              >
                <div className="p-2 bg-white/50 rounded-lg">
                  <cat.icon size={24} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">{cat.name}</div>
                  <div className="text-xs opacity-80 font-medium">{cat.desc}</div>
                </div>
              </button>
            ))}
            <button
              onClick={() => onStart()}
              className="w-full py-3 text-gray-500 font-bold hover:text-emerald-700 transition-colors text-sm"
            >
              Mchanganyiko (Zote)
            </button>
          </div>
        )}

        {leaderboard.length > 0 && (
          <div className="mt-4 border-t pt-4 sm:pt-6">
            <h3 className="text-emerald-800 font-bold uppercase text-xs tracking-widest mb-3 sm:mb-4 flex items-center gap-2">
              <Trophy size={14} /> Mabingwa
            </h3>
            <div className="space-y-2 sm:space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
              {leaderboard.map((entry: LeaderboardEntry) => (
                <div
                  key={entry.rank}
                  className="flex justify-between items-center p-2.5 sm:p-3 bg-emerald-50 rounded-lg sm:rounded-xl border border-emerald-100"
                >
                  <span className="text-emerald-800 font-black text-sm sm:text-base">#{entry.rank}</span>
                  <span className="text-gray-800 font-bold text-sm sm:text-base">{entry.points} pts</span>
                  <span className="text-[9px] sm:text-[10px] text-emerald-600 font-bold uppercase">
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
