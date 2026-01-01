// Presentation Layer - Finish Screen Component

import { Trophy, RotateCcw } from 'lucide-react';

interface FinishScreenProps {
  score: number;
  onRestart: () => void;
  onBackToStart: () => void;
}

export const FinishScreen = ({
  score,
  onRestart,
  onBackToStart,
}: FinishScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-stone-100 flex items-center justify-center p-3 sm:p-4 md:p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 text-center border-t-8 border-emerald-600">
        <div className="mb-6 sm:mb-8">
          <div className="inline-block p-4 sm:p-5 md:p-6 bg-yellow-50 rounded-full mb-4 sm:mb-6">
            <Trophy className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 text-yellow-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-gray-900">Hongera Sana!</h1>
          <p className="text-gray-500 mt-2 font-medium text-sm sm:text-base px-4">
            Umefika mwisho wa safari ya busara.
          </p>
        </div>

        <div className="bg-emerald-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 border border-emerald-100">
          <p className="text-emerald-800 font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-1">
            Alama Ulizopata
          </p>
          <p className="text-5xl sm:text-6xl md:text-7xl font-black text-emerald-900">{score}</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <button 
            onClick={onRestart}
            className="w-full py-4 sm:py-5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl transition-all flex items-center justify-center gap-3 shadow-lg touch-manipulation"
          >
            <RotateCcw size={20} className="sm:w-[22px] sm:h-[22px]" /> Jaribu Tena
          </button>
          <button 
            onClick={onBackToStart}
            className="w-full py-3 sm:py-4 text-emerald-800 font-bold text-base sm:text-lg hover:underline active:text-emerald-900 transition-colors"
          >
            Rudi Mwanzo
          </button>
        </div>
      </div>
    </div>
  );
};
