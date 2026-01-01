// Presentation Layer - Start Screen Component

import { Trophy, BookOpen, ChevronRight } from 'lucide-react';
import { LeaderboardEntry } from '@domain/entities/Score';

interface StartScreenProps {
  onStart: () => void;
  leaderboard: LeaderboardEntry[];
}

export const StartScreen = ({ onStart, leaderboard }: StartScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-stone-100 flex items-center justify-center p-3 sm:p-4 md:p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border-t-8 border-emerald-600">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block p-3 sm:p-4 bg-emerald-50 rounded-full mb-3 sm:mb-4">
            <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-700" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 tracking-tight">
            Mizungu & Methali
          </h1>
          <p className="text-emerald-700 italic text-base sm:text-lg font-medium font-serif px-2">
            "Busara ni akiba ya mzee."
          </p>
        </div>
        
        <button 
          onClick={onStart}
          className="w-full py-4 sm:py-5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl transition-all shadow-lg flex items-center justify-center gap-2 mb-6 sm:mb-8 touch-manipulation"
        >
          Anza Safari <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {leaderboard.length > 0 && (
          <div className="mt-4 border-t pt-4 sm:pt-6">
            <h3 className="text-emerald-800 font-bold uppercase text-xs tracking-widest mb-3 sm:mb-4 flex items-center gap-2">
              <Trophy size={14} /> Mabingwa
            </h3>
            <div className="space-y-2 sm:space-y-3 max-h-64 overflow-y-auto">
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
