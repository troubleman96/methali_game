// Presentation Layer - Game Screen Component

import { Star, Timer, Lightbulb, Award } from 'lucide-react';
import { GameState } from '@domain/entities/GameState';
import { ShuffledQuestion } from '@domain/entities/Question';
import { AnswerFeedback } from '@domain/valueObjects/AnswerResult';

interface GameScreenProps {
  gameState: GameState;
  currentQuestion: ShuffledQuestion;
  feedback: AnswerFeedback | null;
  progress: number;
  onAnswer: (option: string) => void;
  onUseHint: () => void;
}

export const GameScreen = ({
  gameState,
  currentQuestion,
  feedback,
  progress,
  onAnswer,
  onUseHint,
}: GameScreenProps) => {
  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative border-b-4 border-emerald-800">
        
        {/* Header */}
        <div className="bg-emerald-800 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-700 p-2 rounded-lg">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            </div>
            <span className="text-2xl font-black">{gameState.score}</span>
          </div>

          <div className={`flex items-center gap-2 text-2xl font-mono font-bold ${
            gameState.timeLeft < 7 ? 'text-red-400 animate-pulse' : 'text-emerald-100'
          }`}>
            <Timer size={24} /> {gameState.timeLeft}s
          </div>

          <div className="text-right">
            <span className="text-xs font-bold opacity-70 block uppercase">Streak</span>
            <span className="text-xl font-black text-yellow-400">x{gameState.streak}</span>
          </div>
        </div>

        <div className="p-8">
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full mb-8">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-700" 
              style={{ width: `${progress}%` }} 
            />
          </div>

          {/* Question */}
          <div className="mb-10 text-center min-h-[140px] flex flex-col items-center justify-center">
            <span className="px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase mb-4 tracking-widest">
              {currentQuestion.type}
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-snug">
              "{currentQuestion.riddle}"
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.shuffledOptions.map((option: string, idx: number) => {
              const isCorrect = feedback && option === currentQuestion.answer;
              const isDisabled = gameState.disabledOptions.includes(option);

              let btnClass = "p-5 rounded-2xl border-2 text-lg font-bold transition-all flex justify-between items-center ";
              
              if (feedback) {
                if (isCorrect) {
                  btnClass += "bg-emerald-50 border-emerald-500 text-emerald-700 ";
                } else {
                  btnClass += "bg-gray-50 border-gray-100 text-gray-200 ";
                }
              } else if (isDisabled) {
                btnClass += "bg-gray-50 border-gray-50 text-gray-200 cursor-not-allowed opacity-40 ";
              } else {
                btnClass += "bg-white border-stone-200 text-gray-800 hover:border-emerald-600 hover:shadow-md active:scale-95 ";
              }

              return (
                <button
                  key={idx}
                  disabled={!!feedback || isDisabled}
                  onClick={() => onAnswer(option)}
                  className={btnClass}
                >
                  <span>{option}</span>
                  {isCorrect && <Award className="text-emerald-600" size={20} />}
                </button>
              );
            })}
          </div>

          {/* Hint Section */}
          <div className="mt-10 flex justify-between items-center border-t pt-6">
            <button 
              onClick={onUseHint}
              disabled={gameState.hintUsed || !!feedback}
              className={`flex items-center gap-2 font-bold text-sm uppercase tracking-wider px-4 py-2 rounded-xl transition-all ${
                gameState.hintUsed || !!feedback 
                  ? 'text-gray-300' 
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <Lightbulb size={18} />
              {gameState.hintUsed ? "Kidokezo kimetumika" : "Omba Kidokezo"}
            </button>
            
            <div className="text-gray-400 font-bold text-sm italic">
              {gameState.currentQuestionIndex + 1} / {gameState.totalQuestions}
            </div>
          </div>

          {gameState.hintUsed && !feedback && (
            <div className="mt-4 p-4 bg-emerald-50 rounded-2xl text-emerald-900 text-sm font-medium border-l-4 border-emerald-500">
              <b>Kidokezo:</b> {currentQuestion.hint}
            </div>
          )}
        </div>

        {/* Feedback Overlay */}
        {feedback && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[1px] pointer-events-none">
            <div className={`p-8 rounded-full font-black text-6xl shadow-2xl animate-in zoom-in duration-200 ${
              feedback === 'correct' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {feedback === 'correct' ? 'VEMA!' : 'SIO!'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
