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
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border-t-8 border-emerald-800">
        <div className="mb-8">
          <div className="inline-block p-6 bg-yellow-50 rounded-full mb-6">
            <Trophy className="w-20 h-20 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-serif font-black text-gray-900">Hongera Sana!</h1>
          <p className="text-gray-500 mt-2 font-medium">
            Umefika mwisho wa safari ya busara.
          </p>
        </div>

        <div className="bg-emerald-50 rounded-3xl p-8 mb-8 border border-emerald-100">
          <p className="text-emerald-800 font-bold uppercase tracking-widest text-xs mb-1">
            Alama Ulizopata
          </p>
          <p className="text-7xl font-black text-emerald-900">{score}</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={onRestart}
            className="w-full py-5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            <RotateCcw size={22} /> Jaribu Tena
          </button>
          <button 
            onClick={onBackToStart}
            className="w-full py-4 text-emerald-800 font-bold text-lg hover:underline"
          >
            Rudi Mwanzo
          </button>
        </div>
      </div>
    </div>
  );
};
