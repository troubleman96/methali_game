// Presentation Layer - Start Screen Component

import { Trophy, BookOpen, ChevronRight } from 'lucide-react';
import { LeaderboardEntry } from '@domain/entities/Score';

interface StartScreenProps {
  onStart: () => void;
  leaderboard: LeaderboardEntry[];
}

export const StartScreen = ({ onStart, leaderboard }: StartScreenProps) => {
  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4 font-serif">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border-t-8 border-emerald-800">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-emerald-50 rounded-full mb-4">
            <BookOpen className="w-12 h-12 text-emerald-800" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Mizungu & Methali
          </h1>
          <p className="text-emerald-700 italic text-lg font-medium">
            "Busara ni akiba ya mzee."
          </p>
        </div>
        
        <button 
          onClick={onStart}
          className="w-full py-5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl font-bold text-xl transition-all shadow-lg flex items-center justify-center gap-2 mb-8"
        >
          Anza Safari <ChevronRight />
        </button>

        {leaderboard.length > 0 && (
          <div className="mt-4 border-t pt-6">
            <h3 className="text-emerald-800 font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
              <Trophy size={14} /> Mabingwa
            </h3>
            <div className="space-y-3">
              {leaderboard.map((entry: LeaderboardEntry) => (
                <div 
                  key={entry.rank} 
                  className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl border border-emerald-100"
                >
                  <span className="text-emerald-800 font-black">#{entry.rank}</span>
                  <span className="text-gray-800 font-bold">{entry.points} pts</span>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase">
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
